import React from "react";
import { useApi, useAccount } from "@gear-js/react-hooks";

const Wallet = () => {
  const { isApiReady } = useApi();
  const { isAccountReady, account, accounts, login } = useAccount();
  console.log(account, accounts, isApiReady);
  const isAppReady = isApiReady && isAccountReady;
  return (
    <div className="mt-5 border p-2">
      <div onClick={() => login(accounts[0])}> Wallet</div>
      <div className="text-sm">{account?.decodedAddress}</div>
      <div className="text-sm">Balance: {account?.balance.value}</div>
    </div>
  );
};

export default Wallet;
