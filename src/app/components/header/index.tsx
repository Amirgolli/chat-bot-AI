import Image from "next/image";
import BurgerMenuSvg from "../../../../public/svg/burgurMenu";
import DownSvg from "../../../../public/svg/down";

const HeaderComponent = () => {
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
          <Image
            height={48}
            width={48}
            alt="logo"
            src={"/images/user.png"}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className=" text-[#1E293B] text-[16px] font-medium">Taha Hosseinpour</h3>
            <span className=" text-[#475569] text-[16px] font-light ">205 Tokens Left</span>
          </div>
          <DownSvg />
        </div>
        <BurgerMenuSvg />
      </div>
    </div>
  );
};

export default HeaderComponent;
