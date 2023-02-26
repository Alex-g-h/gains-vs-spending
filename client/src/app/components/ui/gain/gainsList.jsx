import React from "react";
import { useSelector } from "react-redux";
import { getAccountLoadingStatus } from "../../../store/account";
import {
  deleteGainById,
  getGains,
  getGainsLoadingStatus,
} from "../../../store/gain";
import { getCurrentUserId } from "../../../store/user";
import WithEditDelete from "../hoc/withEditDelete";
import SpinLoading from "../spinLoading";
import Gain from "./gain";
import { useNavigate } from "react-router-dom";
import useModalDelete from "../../../hooks/useModalDelete";

const GainsList = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const accountsLoading = useSelector(getAccountLoadingStatus());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoading = useSelector(getGainsLoadingStatus());
  const navigate = useNavigate();

  const modalNameForId = "Gains";
  const { modalConfirmationForm, setModalDataToHandle } =
    useModalDelete(modalNameForId);

  const isLoading = accountsLoading || gainsLoading;

  if (isLoading) return <SpinLoading />;

  const handleEdit = (id) => {
    navigate(`/gain/${id}/edit`);
  };

  const handleDelete = (id) => {
    const data = {
      func: deleteGainById,
      needDispatch: true,
      param: id,
      itemName: "gain",
    };
    setModalDataToHandle(data);
  };

  return (
    <div className="list-block">
      {modalConfirmationForm}
      {gains?.map((g) => (
        <WithEditDelete
          key={g._id}
          id={g._id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          modalNameId={modalNameForId}
        >
          <Gain
            date={g.date}
            amount={g.amount}
            accountId={g.accountId}
          />
        </WithEditDelete>
      ))}
    </div>
  );
};

export default GainsList;
