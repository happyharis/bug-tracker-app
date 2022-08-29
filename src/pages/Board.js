import { collection, doc, onSnapshot, query } from "firebase/firestore";
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
export const ProjectContext = createContext();

function BoardBody() {
  const [columns, setColumns] = useState([]);
  const projectId = "YOsEd6rZapnISPZIdoAg";
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
      <div className="bg-indigo-500 h-screen">
        <div className="pt-20"></div>
        <h1>{title}</h1>
        <div className="flex flex-row">
          {columns?.map((column, index) => (
            <ProjectContext.Provider
              value={{ projectId, columnId: column.id }}
              key={index}
            >
              <Column key={index} title={column.title} />
            </ProjectContext.Provider>
          ))}
        </div>
      </div>
    </>
  );
}

export default Board;
