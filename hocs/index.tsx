import {
  ApiProvider as GearApiProvider,
  AlertProvider as GearAlertProvider,
  AccountProvider,
  ProviderProps,
} from "@gear-js/react-hooks";
import { Alert, alertStyles } from "@gear-js/ui";
import { ComponentType } from "react";

function ApiProvider({ children }: ProviderProps) {
  return (
    <GearApiProvider providerAddress={"wss://testnet.vara.rs"}>
      {children}
    </GearApiProvider>
  );
}

function AlertProvider({ children }: ProviderProps) {
  return <GearAlertProvider>{children}</GearAlertProvider>;
}

const providers = [AlertProvider, ApiProvider, AccountProvider];

function withProviders(Component: ComponentType) {
  return () =>
    providers.reduceRight(
      (children, Provider) => <Provider>{children}</Provider>,
      <Component />,
    );
}

export default withProviders;
