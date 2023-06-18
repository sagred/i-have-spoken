import React from "react";
import {
  ApiProvider as GearApiProvider,
  AlertProvider as GearAlertProvider,
  AccountProvider,
  ProviderProps,
} from "@gear-js/react-hooks";
import { Alert, alertStyles } from "@gear-js/ui";

function Web3({ children }) {
  return (
    <GearApiProvider providerAddress={"wss://testnet.vara.rs"}>
      <GearAlertProvider>
        <AccountProvider>{children}</AccountProvider>
      </GearAlertProvider>
    </GearApiProvider>
  );
}

export default Web3;
