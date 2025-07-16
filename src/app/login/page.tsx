"use client";
import Image from "next/image";
import SendSvg from "../../../public/svg/send";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginRequest, AuthResponse } from "../../types/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const router = useRouter();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        }
      );

      const result: AuthResponse = await response.json();
      if (!response.ok) throw new Error(result.detail || "Login failed");

      localStorage.setItem("token", result.access_token!);
      alert("Login successful!");
      router.push("/");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-150 h-100 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-[30px] font-bold">Login</h1>
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
              className="w-150 p-4 rounded-4xl border border-[#CBD5E1] focus:outline-none focus:border-[#4F46E5]"
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
              className="w-150 p-4 rounded-4xl border border-[#CBD5E1] focus:outline-none focus:border-[#4F46E5]"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Link
              href="/signup"
              className="text-[#4F46E5] text-[20px] hover:underline"
            >
              Create account
            </Link>
            <button
              type="submit"
              className="h-12 w-40 bg-[#4F46E5] rounded-2xl flex justify-center gap-2 items-center"
            >
              <span className="text-white">Login</span>
              <SendSvg />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
