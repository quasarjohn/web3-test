import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PayWithEthButton from "./components/common/PayWithEthButton/PayWithEthButton";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log(isConnected);
  }, [isConnected]);

  return (
    <>
      <Header
        onWalletConnected={() => {
          setIsConnected(true);
        }}
        onWalletDisconnected={() => {
          setIsConnected(false);
        }}
      ></Header>
      {isConnected && <PayWithEthButton />}
    </>
  );
}

export default App;
