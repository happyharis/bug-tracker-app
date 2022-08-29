import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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

function BoardBody() {
  const columns = [];
  const projectId = "4vNoCVtkf3Ony0ui3R4g";
  const [title, setTitle] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "project", projectId), (doc) => {
      setTitle(doc.data().title);

      console.log("onSnapshot");
    });
    return unsub;
  }, []);

  return (
    <>
      <div className="bg-indigo-500 h-screen">
        <div className="pt-20"></div>
        <h1>{title}</h1>
        <div className="flex flex-row">
          {columns?.map((board, index) => (
            <Column key={index} title={board.name} data={board.cards} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Board;
