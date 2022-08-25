import { useDrop } from "react-dnd";
import Card from "./Card";

export default function Column({ title, data }) {
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
