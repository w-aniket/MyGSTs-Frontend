import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const authHeader = { headers: { Authorization: `Bearer ${token}` } };

export const handlePayNow = async (
  navigate = null,
  serviceRequestId,
  amount,
  fetchRequests = null
) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/payment/create-order`,
      { serviceRequestId, amount },
      authHeader
    );

    const { order, key } = res.data;

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "MyGSTs",
      description: "Service Request Payment",
      order_id: order.id,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              serviceRequestId, // 👈 not invoiceId anymore
            },
            authHeader
          );

          if (verifyRes.data.success) {
            toast.success("Payment successful");
            if (typeof navigate === "function") {
              navigate("/my-service-requests");
            }
            if (typeof fetchRequests === "function") {
              await fetchRequests();
            }
          }
        } catch (error) {
          console.error("Verification failed", error);
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#0d6efd" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error("Payment initiation failed", err);
    toast.error("Unable to start payment");
  }
};
