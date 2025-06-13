import React, { useState } from "react";

const PayWithEthButton = () => {
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const handlePayClick = () => {
    setStatus("pending");
    // create fake transaction hash with random number
    setTxHash(`0xFAKE${Math.ceil(Math.random() * 1000000)}`);

    // simulate delay
    setTimeout(() => {
      // 50% chance to fail or succeed
      const isSuccessful = Math.random() > 0.5;
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
    <div>
      <button onClick={handlePayClick}>Pay with ETH</button>
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
