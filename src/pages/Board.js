import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
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
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  const bgColor = isActive ? "bg-blue-500" : "bg-gray-100";
  return (
    <>
      <div
        ref={drop}
        className={`p-6 h-96 w-3/12 ml-20 ${bgColor} rounded-sm shadow-md flex flex-col`}
      >
        <div className="text-l font-medium text-blue-600">{title}</div>
        {data.map((content) => {
          return <Card content={content} key={content} />;
        })}
      </div>
    </>
  );
}
function Card({ content }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { content },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult)
        console.log(`You dropped ${item.name} into ${dropResult.name}!`);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <>
      <div
        ref={drag}
        className="p-6 bg-white rounded-sm flex my-3"
        style={{ cursor: "grab", opacity }}
      >
        {content}
      </div>
    </>
  );
}

export default Board;
