import { Power, usePowerContext } from "./PowerContext";


export const PowerButton= () =>{

    const { power, toggle } = usePowerContext();

    return (
      <button onClick={toggle}>
        {power === Power.ON ? "Turn Off" : "Turn On"}
      </button>
    );
  };