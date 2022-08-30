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
        className={`p-2 w-[275px] shrink-0 ${bgColor} rounded shadow-md text-left ml-3 first:ml-0`}
      >
        <div className="flex py-1 px-1 justify-between">
          <p className="text-base font-medium">{title}</p>
          <button className="hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
        {cards.map((card) => {
          return <Card content={card.title} key={card.id} />;
        })}

        <button className="p-2 text-grey-dark hover:bg-gray-300 w-full text-left">
          + Add a card
        </button>
      </div>
    </>
  );
}
