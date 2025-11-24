import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateAmountApi } from "../../../Utils/APIs/serviceRequestApi";
import "./AmountUpdate.css"

const AmountUpdate = ({ request, onUpdated }) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const updateAmount = async () => {
    setLoading(true);
    try {
      const res = await updateAmountApi(request._id, {
        amount: Number(amount),
        note,
      });
      setNote("");
      setAmount("");
      onUpdated();
      toast.success("Amount update successfully");
    } catch (error) {
      console.error(error);
      toast.error("Amount update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="amount-update">
      <h3 className="section-title">Update Amount</h3>

<div className="form-group">

      <label htmlFor="">Current Amount:</label>
      <div className="current-amount">
         {request.amount || "N/A"}
      </div>
</div>

<div className="form-group">
  <label htmlFor="">New Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
      />
</div>

<div className="form-group">
  <label htmlFor="">Note (optional)</label>
      <textarea
        placeholder="Add a note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
</div>

    <div className="btn-area">


      <button className="btn-primary" disabled={loading} onClick={updateAmount}>
        {loading ? "Saving..." : "Save Amount"}
      </button>
    </div>
    </div>
  );
};

export default AmountUpdate;
