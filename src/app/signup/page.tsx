"use client";
import Image from "next/image";
import SendSvg from "../../../public/svg/send";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterRequest, AuthResponse } from "../../types/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();
  const router = useRouter();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        }
      );

      const result: AuthResponse = await response.json();
      if (!response.ok) throw new Error(result.detail || "Registration failed");

      alert("User created successfully!");
      router.push("/login");
    } catch (error) {
      alert(error.message || "Registration failed");
    }
  };

  return (
    <div className="md:h-screen mt-60 m-10 h-max w-max md:m-0 md:w-screen flex justify-center items-center">
      <div className="md:w-150 w-40  h-100 flex flex-col gap-8">
        <div className="flex md:justify-between w-max  items-center">
          <h1 className="text-[30px] font-bold">Signup</h1>
          <div>
            <Image height={120} width={120} alt="logo" src="/images/Logo.jpg" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <label htmlFor="username" className="block text-gray-700"></label>
            <input
              id="username"
              {...register("username", { required: "Username is required" })}
              className="md:w-150  p-4 rounded-4xl border border-[#CBD5E1] focus:outline-none h-10 md:h-max focus:border-[#4F46E5]"
              placeholder="Username"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700"></label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="md:w-150 p-4 rounded-4xl border border-[#CBD5E1] focus:outline-none h-10 md:h-max focus:border-[#4F46E5]"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex gap-15 w-max md:justify-between items-center">
            <Link
              href="/login"
              className="text-[#4F46E5] text-[14px] md:text-[20px] hover:underline"
            >
              Have an account?
            </Link>
            <button
              type="submit"
              className="md:h-12 h-8 md:w-40 w-20 bg-[#4F46E5] rounded-2xl flex justify-center gap-2 items-center"
            >
              <SendSvg />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
