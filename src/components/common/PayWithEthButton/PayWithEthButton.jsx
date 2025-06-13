import "./PayWithEthButton.css";
import React, { useState } from "react";

const PayWithEthButton = ({
  amount,
  walletAddress,
  onPaymentSuccessful = () => {},
}) => {
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleSuccessfulPayment = () => {};

  const handlePayClick = () => {
    setStatus("pending");
    // create fake transaction hash with random number
    setTxHash(`0xFAKE${Math.ceil(Math.random() * 1000000)}`);

    // simulate delay
    setTimeout(() => {
      // 50% chance to fail or succeed
      const isSuccessful = Math.random() > 0.5;

      if (isSuccessful) {
        handleSuccessfulPayment();
        onPaymentSuccessful();
      }

      setStatus(isSuccessful ? "success" : "failed");
    }, 2000);
  };

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "orange";
      case "success":
        return "green";
      case "failed":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div className="pay-with-eth-btn">
      <button disabled={amount <= 0} onClick={handlePayClick}>
        Pay with ETH
      </button>
      {status && (
        <div style={{ marginTop: "10px", color: getStatusColor() }}>
          {status === "pending" && "Pending..."}
          {status === "success" && "Success"}
          {status === "failed" && "Failed"}
        </div>
      )}
      {txHash && (
        <div style={{ marginTop: "5px" }}>Transaction Hash: {txHash}</div>
      )}
    </div>
  );
};

export default PayWithEthButton;
