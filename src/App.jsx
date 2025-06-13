import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PayWithEthButton from "./components/common/PayWithEthButton/PayWithEthButton";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSuccessfulPayment = () => {
    setAmount("");
  };

  return (
    <>
      <Header
        onWalletConnected={() => {
          setIsConnected(true);
        }}
        onWalletDisconnected={() => {
          setIsConnected(false);
        }}
      />
      {isConnected && (
        <div style={{ padding: "20px" }}>
          <label>
            Enter amount (ETH):{" "}
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ marginRight: "10px" }}
            />
          </label>
          <PayWithEthButton
            amount={amount}
            onPaymentSuccessful={handleSuccessfulPayment}
          />
        </div>
      )}
    </>
  );
}

export default App;
