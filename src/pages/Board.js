import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "../components/Column";

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
  return (
    <>
      <div className="bg-indigo-500 h-screen">
        <div className="pt-20"></div>
        <div className="flex flex-row">
          <Column title="doing" data={["hello"]} />
          <Column title="done" data={["goodbye"]} />
        </div>
      </div>
    </>
  );
}

export default Board;
