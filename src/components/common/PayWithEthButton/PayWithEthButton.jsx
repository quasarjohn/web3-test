import "./PayWithEthButton.css";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PayWithEthButton = ({ amount, onPaymentSuccessful = () => {} }) => {
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const { email, walletAddress } = useSelector((state) => state.user);

  const handleSuccessfulPayment = async () => {
    const result = await new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/order", {
          email: email,
          walletAddress: walletAddress,
          amountETH: amount,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    console.log(result);
  };

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
