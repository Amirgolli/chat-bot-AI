// src/types/auth.ts
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token?: string;
  token_type?: string;
  msg?: string;
  detail?: string;
}
