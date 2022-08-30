import React from "react";

const lists = [
  { title: "Doing", index: 0, docId: "asdf" },
  { title: "Done", index: 1, docId: "asdffff" },
];

function BoardBootstrap() {
  const CardList = ({ title }) => {
    return (
      <div style={{ width: "275px" }}>
        <p className="fw-semibold">{title}</p>

        <div className="card mb-2">
          <div className="card-body">This is some text within a card body.</div>
        </div>

        <button
          type="button"
          className="btn btn-outline-dark w-100 text-start"
          style={{ borderColor: "white" }}
        >
          + New
        </button>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="row flex-nowrap mt-4">
        {lists.map((list) => (
          <CardList title={list.title} />
        ))}

        <div className="col h-100" style={{ width: "275px" }}>
          <button
            type="button"
            className="btn btn-outline-dark h-100"
            style={{ borderColor: "white" }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardBootstrap;
