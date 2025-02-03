import { Power, usePowerContext } from "./PowerContext";

export const PowerButton = () => {
  const { toggle, power } = usePowerContext();

  return (
    <button
      className="w-20 bg-yellow-500 h-15 rounded-r-full flex justify-end items-center border-4"
      onClick={toggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`mr-2 w-12 rounded-full border-2 bg-amber-400 hover:bg-amber-600 duration-500 ease-in-out ${
          power === Power.ON ? "fill-green-500 bg-gray-700 hover:bg-gray-800 " : ""
        }`}
        viewBox="0 -960 960 960"
      >
        <path d="M440-440v-400h80v400zm40 320q-74 0-139.5-28.5T226-226t-77.5-114.5T120-480q0-80 33-151t93-123l56 56q-48 40-75 97t-27 121q0 116 82 198t198 82q117 0 198.5-82T760-480q0-64-26.5-121T658-698l56-56q60 52 93 123t33 151q0 74-28.5 139.5t-77 114.5-114 77.5T480-120" />
      </svg>
    </button>
  );
};
