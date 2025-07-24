import axios, { AxiosError } from "axios";
import { AuthResponse, RegisterRequest, LoginRequest } from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/api/register`,
      data
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(
      axiosError.response?.data?.message || "Registration failed"
    );
  }
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/api/login`,
      data
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};
