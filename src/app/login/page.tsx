import Image from "next/image";
import SendSvg from "../../../public/svg/send";
import Link from "next/link";
// import SendSvg from "../../../public/svg/send";
// import TextLogoSvg from "../../../public/svg/txtlogo";

const Login = () => {
  return (
    <div className="h-screen w-screen  flex justify-center items-center">
      <div className=" w-150 h-100 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-[30px] font-bold">Login</h1>
          <div className="">
            <Image
              height={120}
              width={120}
              alt="logo"
              src={"/images/Logo.jpg"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="email"
            className="w-150 p-4 rounded-4xl border border-[#CBD5E1]"
            placeholder="Email"
          />
          <input
            type="password"
            className="w-150 p-4 rounded-4xl border border-[#CBD5E1]"
            placeholder="Password"
          />
          <div className="flex justify-between">
            <h2 className="text-[#4F46E5] text-[20px]">
              <Link href={"/signup"}>
                {" "}
                <h2 className="text-[#4F46E5] text-[20px]">create account</h2>
              </Link>
            </h2>
            <button
              type="button"
              className="h-12 w-40 bg-[#4F46E5] rounded-2xl flex justify-center gap-2 items-center"
            >
              <span className="text-white">Send</span>
              <SendSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
