"use client"
import { SiGoogle, SiFacebook } from "@icons-pack/react-simple-icons"
import InputField from './ui/InputField'
import Button from './ui/Button'
import { loginSchema } from "@/validation/auth.validation"
import { ChangeEvent, useState } from "react"
import { authApi, LoginFormType } from "@/lib/api"
import axios from "axios"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router = useRouter()
    const [form, setForm] = useState<LoginFormType>({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setForm(prev => ({
            ...prev,
            [name]: value
        }))

        const result = loginSchema.safeParse(form)
        if (!result.success) {
            const { email, password } =
                result.error.flatten().fieldErrors

            setError({
                email: email?.[0] ?? "",
                password: password?.[0] ?? ""
            })
            return false
        }
        setError({
            email: "",
            password: ""
        })
        return true
    }

    async function login() {
        if (!handleForm) return
        try {
            const response = await authApi.login(form)
            router.push("/")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const { email, password } = error.response?.data?.errors
                setError({
                    email: email ?? "",
                    password: password ?? ""
                })
            }
            console.log(error instanceof Error ? error.message : "Intrenal Error")
        }
    }
    return (
        <div className='mx-auto max-w-7xl px-8 md:px-12 mt-20'>
            <h1 className='text-center text-5xl'>Login to your account</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <InputField onChange={(e) => handleForm(e)} error={error.email} name="email" type='email'>Enter your email</InputField>
                <InputField onChange={(e) => handleForm(e)} error={error.password} name="password" type='password'>Enter your password</InputField>
                <Button onClick={login}>Log In</Button>
            </form>
            <div className="flex items-center gap-3 my-5">
                <span className="h-px flex-1 bg-zinc-700" />
                <span className="text-sm font-medium text-zinc-80000 whitespace-nowrap">
                    OR
                </span>
                <span className="h-px flex-1 bg-zinc-700" />
            </div>
            <Button Icon={SiGoogle}>Continue with Google</Button>
            <Button Icon={SiFacebook}>Continue with Feecbook</Button>
        </div>
    )
}

export default LoginForm
