import { api } from "./axios";

export type LoginFormType = {
  email: string
  password: string
}

export type RegisterFormType = {
  username: string
} & LoginFormType

export const authApi = {
    login : (form : LoginFormType) => api.post("/auth/login" ,form),
    register : (form : RegisterFormType) => api.post("/auth/register" ,form)
}