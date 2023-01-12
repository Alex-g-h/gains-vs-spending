import React from "react";

const Transaction = () => {
  return (
    <div className="container">
      <div className="d-flex border rounded p-2">
        <div className="flex-grow-1">
          <div className="d-flex flex-row">
            <div className="align-self-center me-2">
              <div className="">
                <p>Sum</p>
              </div>
              <div className="">
                <p>Category</p>
              </div>
              <div className="">
                <p>Account</p>
              </div>
            </div>
            <div className="flex-fill align-self-center">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores hic ratione debitis! Nesciunt, vitae alias.
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex align-self-center">
          <button className="btn">
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button className="btn">
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
