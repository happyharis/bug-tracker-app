import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { db } from "../firebase";
import { ProjectContext } from "../pages/Board";
import Card from "./Card";

export default function Column({ title }) {
  const [cards, setCards] = useState([]);
  const projectData = useContext(ProjectContext);
  useEffect(() => {
    const cardsQuery = query(
      collection(
        db,
        "projects",
        projectData.projectId,
        "columns",
        projectData.columnId,
        "cards"
      )
    );
    onSnapshot(cardsQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log("cards in column:", data);
      setCards(data);
    });
  }, [projectData]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  const bgColor = isActive ? "bg-blue-500" : "bg-gray-200";
  return (
    <>
      <div
        ref={drop}
        className={`p-2 w-[500px] shrink-0 ${bgColor} rounded-sm shadow-md flex flex-col text-left ml-3 first:ml-0`}
      >
        <div className="py-1 px-1 text-base font-medium">{title}</div>
        {cards.map((card) => {
          return <Card content={card.title} key={card.id} />;
        })}
      </div>
    </>
  );
}
