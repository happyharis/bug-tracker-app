import React from "react";

function BoardBootstrap() {
  return (
    <div className="container">
      <div className="row flex-nowrap mt-4">
        <div style={{ width: "275px" }}>
          <p className="fw-semibold">Doing</p>

          <div className="card">
            <div className="card-body">
              This is some text within a card body.
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-dark w-100 text-start"
            style={{ borderColor: "white" }}
          >
            + New
          </button>
        </div>

        <div style={{ width: "275px" }}>
          <p className="fw-semibold">Done</p>

          <div className="card">
            <div className="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>
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

{
  /* <div className="card h-100" style={{ width: "18rem" }}>
          <div className="card-body">This is some text within a card body.</div>
        </div>
        <div className="card h-100" style={{ width: "18rem" }}>
          <div className="card-body">This is some .</div>
        </div> */
}
