import React from "react";
import PropTypes from "prop-types";
import Transaction from "./transaction";

const TransactionHistoryList = ({ data, onDelete, modalNameId }) => {
  return (
    <div>
      {data?.map((d) => (
        <div
          className="mb-3"
          key={d.gainId || d.spendingId}
        >
          <Transaction
            {...d}
            amount={String(d.amount)}
            onDelete={onDelete}
            modalNameId={modalNameId}
          />
        </div>
      ))}
    </div>
  );
};

TransactionHistoryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  modalNameId: PropTypes.string,
};

export default TransactionHistoryList;
