import "./ConnectWalletButton.css";
import { useState, useEffect } from "react";
import { setUserData } from "../../../features/user/userSlice";
import { useDispatch } from "react-redux";

const SEPOLIA_TESTNET_CHAIN_ID = "0xaa36a7";

const ConnectWalletButton = ({
  // callback for error
  onError = () => {},
  // callback for successful connection. useful for triggering actions outside of this component
  onConnect = () => {},
  // callback for successful disconnection
  onDisconnect = () => {},
}) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [warning, setWarning] = useState(null);
 const dispatch = useDispatch()

  const checkNetwork = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== SEPOLIA_TESTNET_CHAIN_ID) {
      setWarning("Incorrect network");
    } else {
      setWarning(null);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      onError({
        message: "MetaMask is not installed. Install MetaMask and try again.",
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWalletAddress(accounts[0]);
      onConnect(accounts[0]);
      dispatch(setUserData({ walletAddress: accounts[0] }));

      // validate network after connecting
      await checkNetwork();
    } catch (error) {
      onError({ message: "Failed to connect wallet.", error });
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWarning(null);
    onDisconnect();
  };

  // Listen for chain changes and check if in the correct network
  useEffect(() => {
    if (window.ethereum) {
      const handleChainChanged = () => {
        checkNetwork();
      };

      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  return (
    <div>
      {walletAddress ? (
        <button
          className={`connect-wallet-btn connect-wallet-btn--connected ${
            warning ? "connect-wallet-btn--warning" : ""
          }`}
          onClick={disconnectWallet}
        >
          {warning
            ? warning
            : `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)} `}
        </button>
      ) : (
        <button className="connect-wallet-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
