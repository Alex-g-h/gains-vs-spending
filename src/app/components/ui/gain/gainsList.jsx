import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountLoadingStatus,
  // getAccounts
} from "../../../store/account";
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

const GainsList = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const accountsLoading = useSelector(getAccountLoadingStatus());
  const gains = useSelector(getGains(currentUserId));
  const gainsLoading = useSelector(getGainsLoadingStatus());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = accountsLoading || gainsLoading;

  if (isLoading) return <SpinLoading />;

  const handleEdit = (id) => {
    navigate(`/gain/${id}/edit`);
  };

  const handleDelete = (id) => {
    // TODO: add modal confirmation window
    dispatch(deleteGainById(id));
  };

  return (
    <div>
      {gains?.map((g) => (
        <WithEditDelete
          key={g._id}
          id={g._id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          <Gain
            date={g.date}
            amount={g.amount}
            accountId={g.account_id}
          />
        </WithEditDelete>
      ))}
    </div>
  );
};

export default GainsList;
