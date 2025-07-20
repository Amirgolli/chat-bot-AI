import Image from "next/image";
import BurgerMenuSvg from "../../../../public/svg/burgurMenu";
import DownSvg from "../../../../public/svg/down";
import { useEffect, useState } from "react";
import Link from "next/link";

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
        <div className="">
          <Image height={100} width={100} alt="logo" src={"/images/Logo.jpg"} />
        </div>
        <h1 className="font-bold hidden md:block">
          Hacking FBI Server with raspberry pi
        </h1>
        <div className=" gap-3 items-center hidden md:flex">
          <div className={`${username ? "hidden" : "block"}`}>
            <Link href={"/signup"}>
              <button type="button" className=" cursor-pointer p-2 bg-blue-400 rounded-2xl text-white">
                sign up
              </button>
            </Link>
          </div>
          <Image
            height={48}
            width={48}
            alt="logo"
            src={"/images/user.png"}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className=" text-[#1E293B] text-[16px] font-medium">
              welcome {username || "User"}
            </h3>
            <span className=" text-[#475569] text-[16px] font-light ">
              205 Tokens Left
            </span>
          </div>
          <DownSvg />
        </div>
        <div className="drawer drawer-end md:hidden">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="absolute right-0 top-[-20] "
            >
              <BurgerMenuSvg />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-white text-base-content min-h-full w-60 p-4">
              {/* Sidebar content here */}
              <li>
                <a>
                  <div className={`${username ? "hidden" : "block"}`}>
                    <Link href={"/signup"}>
                      <button type="button" className=" cursor-pointer">
                        sign up
                      </button>
                    </Link>
                  </div>
                </a>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
