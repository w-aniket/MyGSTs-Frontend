import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateAmountApi } from "../../../Utils/APIs/serviceRequestApi";

const AmountUpdate = ({ request, onUpdated }) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const updateAmount = async () => {
    setLoading(true);
    try {
        const res = await updateAmountApi(request._id, { amount: Number(amount), note });
        setNote("");
        setAmount("");
        onUpdated();
        toast.success("Amount update successfully")
    } catch (error) {
      console.error(error);
      toast.error("Amount update failed");
    } finally {
      setLoading(false);
    }
  };

  return <div className="amount-box">
    <h3>Update AMount</h3>

    <label htmlFor="">Current Amount: {request.amount || "N/A"}</label>
    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" />
    <textarea placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
    />

    <button disabled={loading} onClick={updateAmount}>
        {loading ? "Saving..." : "Save Amount"}
    </button>

  </div>;
};

export default AmountUpdate;
