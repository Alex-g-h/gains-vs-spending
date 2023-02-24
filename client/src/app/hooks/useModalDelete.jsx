import React, { useState } from "react";
import { useDispatch } from "react-redux";

const initialState = {
  func: "",
  needDispatch: false,
  param: "",
  itemName: "item",
};

/**
 * Hook for modal confirmation of delete action
 *
 * How to use:
 *  1) Add parameters to delete button :
 *    data-bs-toggle="modal"
 *    data-bs-target={`#${nameForId}`}
 *  2) Get { modalConfirmationForm, setModalDataToHandle } from hook.
 *  3) Place {modalConfirmationForm} in any place of the component.
 *    It's invisible and didn't use any space in HTML design.
 *  4) In delete button handler construct object:
 *    const data = {
 *      func: referenceToFunc,
 *      needDispatch: false,
 *      param: parameterToFunc,
 *      itemName: itemName};
 *    , where are:
 *      referenceToFunc - reference to function you need to call for delete item;
 *      needDispatch - flag for using or not Redux dispatch wrap over function;
 *      param - parameters for function;
 *      itemName - name of item in confirmation question at form.
 *  5) To send prepared data object to modal form call this method
 *    in delete button handler:
 *      setModalDataToHandle(data);
 *  6) If you need to execute several actions after confirmation you
 *    have to add array of data objects from point 4 and send this array
 *    like described in point 5.
 *  7) That's all. If answer will be NO - nothing happens. If answer
 *    will be YES - function calls by itself or via dispatch wrap
 *    depending on parameters.
 *
 * @param {*} nameForId Unique for application name for modal form ID
 * @returns Popups static modal window with confirmation for delete
 */
const useModalDelete = (nameForId) => {
  const [dataToHandle, setDataToHandle] = useState(initialState);
  const dispatch = useDispatch();

  const setModalDataToHandle = (data) => {
    setDataToHandle(data);
  };

  const processingOneDataToHandle = (handleData) => {
    if (!handleData?.func || typeof handleData?.func !== "function") return;

    try {
      if (handleData?.needDispatch && handleData.needDispatch) {
        dispatch(handleData.func(handleData?.param));
      } else {
        handleData.func(handleData?.param);
      }
    } catch (error) {
      console.log("Modal delete form", nameForId, error.message);
    }
  };

  const processingDataToHandle = () => {
    if (!dataToHandle || typeof dataToHandle !== "object") return;

    if (Array.isArray(dataToHandle)) {
      dataToHandle.forEach((data) => processingOneDataToHandle(data));
    } else {
      processingOneDataToHandle(dataToHandle);
    }
  };

  const handleClickYes = () => {
    processingDataToHandle();
    setDataToHandle(initialState);
  };

  const handleClickNo = () => {
    setDataToHandle(initialState);
  };

  const getMessageForConfirmationForm = () => {
    let itemName = "item";

    if (dataToHandle && typeof dataToHandle === "object") {
      if (Array.isArray(dataToHandle)) {
        if (dataToHandle.length > 0) itemName = dataToHandle.at(0).itemName;
      } else {
        itemName = dataToHandle?.itemName;
      }
    }

    return `Are you sure you want to delete this ${itemName}?`;
  };

  const modalConfirmationForm = (
    <div
      className="modal fade"
      id={nameForId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5"
              id="staticBackdropLabel"
            >
              <i className="bi bi-exclamation-square text-warning me-2"></i>
              Warning!
            </h1>
          </div>
          <div className="modal-body">{getMessageForConfirmationForm()}</div>
          <div className="modal-footer">
            <div className="d-flex w-100 justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClickNo}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleClickYes}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return {
    modalConfirmationForm,
    setModalDataToHandle,
  };
};

export default useModalDelete;
