"use client";
import Image from "next/image";
import SendSvg from "../../../public/svg/send";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginRequest, AuthResponse } from "../../types/auth";
import { useRouter } from "next/navigation";
import Modal from "../components/Model";
import { useState } from "react";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      if (!response.ok) throw new Error(result.detail || "Registration failed");

      setErrorMessage("User created successfully!");
      router.push("/");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="md:h-screen mt-60 m-10 h-max w-max md:m-0 md:w-screen flex justify-center items-center">
      <div className="md:w-150 w-40  h-100 flex flex-col gap-8">
        <div className="flex md:justify-between w-max  items-center">
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
              className="md:w-150 p-4 rounded-4xl h-10 md:h-max border border-[#CBD5E1] focus:outline-none focus:border-[#4F46E5]"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-between w-max gap-20 items-center">
            <Link
              href="/signup"
              className="text-[#4F46E5] text-[14px] md:text-[20px] hover:underline"
            >
              Create account
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
      <Modal
        errorMessage={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
}
