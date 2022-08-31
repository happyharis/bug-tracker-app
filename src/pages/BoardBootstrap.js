import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function BoardBootstrap({ projectId = "YOsEd6rZapnISPZIdoAg" }) {
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

  console.log("BoardBootstrap render");
  return (
    <div className="container">
      <div className="row flex-nowrap mt-4">
        {lists.map((list) => (
          <CardList title={list.title} key={list.docId} />
        ))}

        <div className="col h-100" style={{ width: "275px" }}>
          <ModalButton
            key={"new-list"}
            buttonTitle="+"
            modalHeader="new-list"
            onPress={(text) => console.log(text)}
            isFullWidth={false}
          />
        </div>
      </div>
    </div>
  );
}

function CardList({ title }) {
  return (
    <div style={{ width: "275px" }}>
      <p className="fw-semibold">{title}</p>

      <div className="card mb-2">
        <div className="card-body">This is some text within a card body.</div>
      </div>

      <ModalButton
        key={title}
        buttonTitle="+ New"
        modalHeader={title}
        onPress={(text) => {
          console.log("+new");
          console.log(text);
        }}
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
        data-bs-target={`#${modalHeader}-addListModal`}
      >
        {buttonTitle}
      </button>
      <div
        className="modal fade"
        id={modalHeader + "-addListModal"}
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
                onClick={() => onPress(input)}
                type="button"
                className="btn btn-primary"
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
