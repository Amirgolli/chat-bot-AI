"use client";
import SendSvg from "../../../public/svg/send";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthResponse } from "../../types/auth";
import { useRouter } from "next/navigation";
import Modal from "../components/Model";
import { useState } from "react";

interface LoginRequest {
  email: string;
  password: string;
}

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result: AuthResponse = await response.json();
      if (!response.ok) {
        const errorDetail = result.detail
          ? Array.isArray(result.detail)
            ? result.detail.map((err) => err.msg).join(", ")
            : result.detail
          : "Login failed";
        throw new Error(errorDetail);
      }

      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
      } else {
        throw new Error("No access token received");
      }

      setErrorMessage("Login successful!");
      router.push("/");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="md:h-screen mt-60 m-10 h-max w-max md:m-0 md:w-screen flex justify-center items-center">
      <div className="md:w-150 w-40 h-100 flex flex-col gap-8">
        <div className="flex md:justify-between w-max items-center">
          <h1 className="text-[30px] font-bold">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="md:w-150 w-70 p-4 rounded-4xl border border-[#CBD5E1] focus:outline-none h-10 md:h-max focus:border-[#4F46E5]"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
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
              className="md:w-150 w-70 p-4 rounded-4xl border border-[#CBD5E1] focus:outline-none h-10 md:h-max focus:border-[#4F46E5]"
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
