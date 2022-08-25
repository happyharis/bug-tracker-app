import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

function Column({ title, data }) {
  return (
    <>
      <div className="p-6 h-96 w-3/12 ml-20 bg-gray-100 rounded-sm shadow-md flex flex-col">
        <div className="text-l font-medium text-blue-600">{title}</div>
        {data.map((content) => {
          return <Card content={content} />;
        })}
      </div>
    </>
  );
}
function Card({ content }) {
  return (
    <>
      <div className="p-6 bg-white rounded-sm flex my-3">{content}</div>
    </>
  );
}

export default Board;
