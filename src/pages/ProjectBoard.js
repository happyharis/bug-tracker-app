import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { db } from "../firebase";

const ProjectContext = createContext();

export default function ProjectBoard() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <ProjectBoardBody />
      </DndProvider>
    </div>
  );
}

function ProjectBoardBody({ projectId = "YOsEd6rZapnISPZIdoAg" }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const columnsQuery = query(
      collection(db, "projects", projectId, "columns")
    );
    onSnapshot(columnsQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), docId: doc.id };
      });
      data.sort((a, b) => a.id - b.id);
      setLists(data);
    });
  }, [projectId]);

  const addNewList = async (title) => {
    try {
      await addDoc(collection(db, "projects", projectId, "columns"), {
        title,
        id: lists.length + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("BoardBootstrap render");
  return (
    <div className="container">
      <div className="row flex-nowrap mt-4">
        {lists.map((list) => (
          <ProjectContext.Provider
            value={{ projectId, columnId: list.docId }}
            key={list.docId}
          >
            <CardList title={list.title} />
          </ProjectContext.Provider>
        ))}

        <div className="col h-100" style={{ width: "275px" }}>
          <ModalButton
            key={"new-list"}
            buttonTitle="+"
            modalHeader="new-list"
            onPress={(text) => addNewList(text)}
            isFullWidth={false}
          />
        </div>
      </div>
    </div>
  );
}

function CardList({ title }) {
  const [cards, setCards] = useState([]);
  const projectContext = useContext(ProjectContext);
  const projectId = projectContext.projectId;
  const columnId = projectContext.columnId;
  useEffect(() => {
    const columnsQuery = query(
      collection(db, "projects", projectId, "columns", columnId, "cards")
    );
    onSnapshot(columnsQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), docId: doc.id };
      });
      data.sort((a, b) => a.id - b.id);
      setCards(data);
    });
  }, [projectId, columnId]);

  const addNewCard = async (title) => {
    try {
      await addDoc(
        collection(db, "projects", projectId, "columns", columnId, "cards"),
        {
          title,
          id: cards.length + 1,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  const color = isActive ? "blue" : "white";

  console.log(`CardList ${title} render`);
  return (
    <div ref={drop} style={{ width: "275px" }}>
      <p className="fw-semibold">{title}</p>
      {isActive && <hr style={{ borderTop: `3px solid ${color}` }} />}

      {cards.map((card) => {
        return (
          <div className="card mb-2 shadow-sm" key={card.docId}>
            <div className="card-body">{card.title}</div>
          </div>
        );
      })}

      <ModalButton
        key={title}
        buttonTitle="+ New"
        modalHeader={title}
        onPress={(text) => addNewCard(text)}
      />
    </div>
  );
}

function ModalButton({
  buttonTitle,
  modalHeader,
  onPress,
  isFullWidth = true,
}) {
  const [input, setInput] = useState("");
  const width = isFullWidth ? "w-100" : "";
  return (
    <div>
      <button
        type="button"
        className={`btn btn-outline-dark ${width} text-start`}
        style={{ borderColor: "white" }}
        data-bs-toggle="modal"
        data-bs-target={`#${modalHeader}-modal`}
      >
        {buttonTitle}
      </button>
      <div
        className="modal fade"
        id={modalHeader + "-modal"}
        tabIndex="-1"
        aria-labelledby={modalHeader + "-modalLabel"}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={modalHeader + "-modalLabel"}>
                {modalHeader}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onPress(input);
                  setInput("");
                }}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
