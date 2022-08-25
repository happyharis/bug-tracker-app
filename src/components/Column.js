import React from "react";

function Column({ isOver, children }) {
  const className = isOver ? "highlight-region" : "";
  return <div className={`col${className}`}>{children}</div>;
}

export default Column;
