import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "../components/Column";
import { db } from "../firebase";

function Board() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <BoardBody />
      </DndProvider>
    </div>
  );
}
const projectId = "YOsEd6rZapnISPZIdoAg";
export const ProjectContext = createContext();

function BoardBody() {
  const [columns, setColumns] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "projects", projectId), (doc) => {
      setTitle(doc.data().title);
      console.log("onSnapshot");
    });
    return unsub;
  }, []);

  useEffect(() => {
    const columnsQuery = query(
      collection(db, "projects", projectId, "columns")
    );
    onSnapshot(columnsQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log("columns:", data);
      setColumns(data);
    });
  }, []);

  return (
    <>
      <div className="bg-blue-400 p-6 h-screen">
        <h1 className="py-4 font-bold text-xl text-white">{title}</h1>
        <div className="flex items-start overflow-x-auto">
          {columns?.map((column, index) => (
            <ProjectContext.Provider
              value={{ projectId, columnId: column.id }}
              key={index}
            >
              <Column key={index} title={column.title} />
            </ProjectContext.Provider>
          ))}
          <AnotherListButton />
        </div>
      </div>
    </>
  );
}

function AnotherListButton() {
  const [isAdding, setIsAdding] = useState(false);
  const [columnTitle, setColumnTitle] = useState("hello");

  const addNewColumn = async () => {
    try {
      await addDoc(collection(db, "projects", projectId, "columns"), {
        title: columnTitle,
      });
      setColumnTitle("");
      setIsAdding(false);
    } catch (error) {
      console.log(error);
    }
  };
  const AddAnotherList = () => {
    return (
      <button
        onClick={() => setIsAdding(!isAdding)}
        className={`p-2 w-[275px] shrink-0 bg-slate-500/20 hover:bg-slate-500/60 rounded-sm text-left ml-3 `}
      >
        <p className="font-medium">+ Add another list</p>
      </button>
    );
  };

  const AddAnotherListForm = () => {
    return (
      <div
        className={`p-2 w-[275px] shrink-0 bg-gray-200 rounded-sm shadow-md flex flex-col text-left ml-3`}
      >
        <input
          className="placeholder:text-slate-400 p-3"
          placeholder="Enter list title..."
          onChange={(e) => setColumnTitle(e.target.value)}
          value={columnTitle}
        />
        <div className="flex flex-row">
          <button
            className="px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 my-2 "
            onClick={() => addNewColumn()}
          >
            Add list
          </button>
          <button
            className="text-3xl px-3 py-2"
            onClick={() => setIsAdding(!isAdding)}
          >
            x
          </button>
        </div>
      </div>
    );
  };
  return isAdding ? <AddAnotherListForm /> : <AddAnotherList />;
}

export default Board;
