import { CreateUserInput, UpdateUserInput } from "@/validation/user.validation";
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

export const userApi = {
  GetAll : () => api.get("/users"),
  GetUser : (id : number) => api.get(`/users/${id}`),
  CreateUser :(data : CreateUserInput) => api.post("/users" ,data),
  UpdateUser : (id : number ,data : UpdateUserInput) => api.put(`/users/${id}` ,data),
  DeleteUser : (id : number) => api.delete(`/users/${id}`)
}