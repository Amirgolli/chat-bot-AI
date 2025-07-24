import { useState } from "react";

const BurgerMenuSvg = () => {
  const [rotate, setRotate] = useState(false);

  const handleRotate = () => {
    setRotate((prev) => !prev);
  };

  return (
    <svg
      onClick={handleRotate}
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transform transition-transform duration-300 cursor-pointer ${
        rotate ? "rotate-180" : ""
      }`}
    >
      <path
        d="M4 18H10"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12L16 12"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BurgerMenuSvg;
