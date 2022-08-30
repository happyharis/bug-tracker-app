import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
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

        <AddCardButton cardsLength={cards.length} />
      </div>
    </>
  );
}

function AddCardButton({ cardsLength }) {
  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const projectData = useContext(ProjectContext);
  const projectId = projectData.projectId;
  const columnId = projectData.columnId;

  const addNewCard = async () => {
    try {
      await addDoc(collection(db, "projects", projectId, "columns", columnId), {
        title: cardTitle,
        id: cardsLength + 1,
      });
      setCardTitle("");
      setIsAdding(false);
    } catch (error) {
      console.log(error);
    }
  };

  const AddCard = () => {
    return (
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="p-2 text-grey-dark hover:bg-gray-300 w-full text-left opacity-60 hover:opacity-80"
      >
        <p className="font-medium"> + Add a card</p>
      </button>
    );
  };

  const AddCardForm = () => {
    return (
      <>
        <textarea
          className="w-full"
          placeholder="Enter list title..."
          onChange={(e) => {
            console.log(cardTitle);
            setCardTitle(e.target.value);
          }}
          value={cardTitle}
        />
        <div className="flex flex-row">
          <button
            className="px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 my-2 "
            onClick={() => addNewCard()}
          >
            Add card
          </button>
          <button
            className="text-3xl px-3 py-2"
            onClick={() => setIsAdding(!isAdding)}
          >
            x
          </button>
        </div>
      </>
    );
  };
  return isAdding ? <AddCardForm /> : <AddCard />;
}
