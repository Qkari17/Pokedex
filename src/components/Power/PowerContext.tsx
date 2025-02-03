import React, { createContext, useContext, useState } from "react";

export enum Power {
  ON = "On",
  OFF = "Off",
}

type PowerContextType = {
  power: Power | null;
  toggle: () => void;
};

const PowerContext = createContext<PowerContextType | null>(null);
PowerContext.displayName = "PowerContext";

export const usePowerContext = () => {
  const context = useContext(PowerContext);
  if (!context) {
    throw new Error("usePowerContext must be used within a PowerContextProvider");
  }
  return context;
};

export const PowerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [power, setPower] = useState<Power | null>(Power.OFF);

  const toggle = () => {
    setPower((prevPower) => (prevPower === Power.ON ? Power.OFF : Power.ON));
  };

  return (
    <PowerContext.Provider value={{ power, toggle }}>
      {children}
    </PowerContext.Provider>
  );
};