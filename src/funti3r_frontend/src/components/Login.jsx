import React from 'react';
import { ConnectWallet } from "@nfid/identitykit/react";

const Login = () => {
  return (
    <div className="login-container">
      <h1>Welcome to Funti3r</h1>
      <p>Please connect your wallet to continue</p>
      <ConnectWallet /> {/* This renders the wallet connection button */}
    </div>
  );
};

export default Login;
