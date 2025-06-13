import React from "react";
import "./Header.css"; // Optional: for styling
import ConnectWalletButton from "../common/ConnectWalletButton/ConnectWalletButton";

const Header = ({
  onWalletConnected = () => {},
  onWalletDisconnected = () => {},
}) => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <ConnectWalletButton
        onConnect={onWalletConnected}
        onError={onWalletDisconnected}
        onDisconnect={onWalletDisconnected}
        className="connect-wallet-btn"
      ></ConnectWalletButton>
    </header>
  );
};

export default Header;
