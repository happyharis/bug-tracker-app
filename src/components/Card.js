import { useDrag } from "react-dnd";

export default function Card({ content }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { content },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult)
        console.log(`You dropped ${item.content} into ${dropResult.name}!`);
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
        className="p-2 bg-white border-b border-gray-50 hover:bg-gray-100 flex my-3 shadow-sm"
        style={{ cursor: "pointer", opacity }}
      >
        {content}
      </div>
    </>
  );
}
