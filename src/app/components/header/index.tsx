import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import BurgerMenuSvg from "../../../../public/svg/burgermenu";

const HeaderComponent = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.sub);
    }
  }, []);
  return (
    <div className="bg-[#F8FAFC] w-full fixed top-0 left-0 right-0 ">
      <div className="flex justify-between items-center p-4 border-b border-[#E2E8F0] ">
        <div>
          <div className={`${username ? "block" : "hidden"}`}>
            <BurgerMenuSvg />
          </div>
          <div className={`${username ? "hidden" : "block"}`}>
            <Link href={"/"}>
              <Image
                height={100}
                width={100}
                alt="logo"
                src={"/images/Logo.jpg"}
              />
            </Link>
          </div>
        </div>
        <h1 className="font-bold hidden md:block">
          Hacking FBI Server with raspberry pi
        </h1>
        <div
          className={` gap-3 items-center   ${username ? "flex" : "hidden"}`}
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center space-y-2">
            U
          </div>
          <div className="flex flex-col">
            <h3 className=" text-[#1E293B] text-[16px] font-medium">
              welcome {username || "User"}
            </h3>
            <span className=" text-[#475569] text-[16px] font-light ">
              200 Tokens Left
            </span>
          </div>
        </div>
        <div className={`${username ? "hidden" : "block"}`}>
          <Link href={"/signup"}>
            <button
              type="button"
              className=" cursor-pointer p-2 bg-blue-500 rounded-2xl text-white "
            >
              sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
