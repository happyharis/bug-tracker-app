import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "../components/Column";
import { collection, getDocs } from "firebase/firestore";
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
  const [boards, setBoards] = useState([]);

  const getBoard = async (doc) => {
    const board = doc.data();
    const cards = await getDocs(collection(db, `boards/${doc.id}/cards`)).then(
      (snapshot) => snapshot.docs.map((doc) => doc.data().title)
    );
    const boardData = { ...board, cards };
    return boardData;
  };

  async function initBoard() {
    const boardsSnapshot = await getDocs(collection(db, "boards"));
    const getBoards = async () => {
      return Promise.all(boardsSnapshot.docs.map((doc) => getBoard(doc)));
    };
    const boards = await getBoards();
    setBoards(boards);
  }

  useEffect(() => {
    initBoard();
    return () => {};
  });

  return (
    <>
      <div className="bg-indigo-500 h-screen">
        <div className="pt-20"></div>
        <div className="flex flex-row">
          {boards?.map((board, index) => (
            <Column key={index} title={board.name} data={board.cards} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Board;
