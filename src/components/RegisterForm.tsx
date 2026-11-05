"use client"
import InputField from './ui/InputField'
import Button from './ui/Button'
import { ChangeEvent, useState } from 'react'
import { authApi, RegisterFormType } from '@/lib/api'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { registerSchema } from '@/validation/auth.validation'

const RegisterForm = () => {
    const router = useRouter()
    const [form, setForm] = useState<RegisterFormType>({
        username: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setForm(prev => ({
            ...prev,
            [name]: value
        }))

        const result = registerSchema.safeParse(form)
        if (!result.success) {
            const { username, email, password } =
                result.error.flatten().fieldErrors

            setError({
                username: username?.[0] ?? "",
                email: email?.[0] ?? "",
                password: password?.[0] ?? ""
            })
            return false
        }
        setError({
            username: "",
            email: "",
            password: ""
        })
        return true
}

async function register() {
    if(!handleForm)return
    try {
        const response = await authApi.register(form)
        router.push("/")
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const { username, email, password } = error.response?.data?.errors
            setError({
                username: username ?? "",
                email: email ?? "",
                password: password ?? ""
            })
        }
        console.log(error instanceof Error ? error.message : "Intrenal Error")
    }
}
return (
    <div className='mx-auto max-w-7xl px-8 md:px-12 mt-20'>
        <h1 className='text-center text-5xl'>Create your account</h1>
        <form onSubmit={(e) => e.preventDefault()}>
            <InputField onChange={(e) => handleForm(e)} error={error.username} name="username" type="text">Enter your username</InputField>
            <InputField onChange={(e) => handleForm(e)} error={error.email} name="email" type="email">Enter your email</InputField>
            <InputField onChange={(e) => handleForm(e)} error={error.password} name="password" type="password">Enter your password</InputField>
            <Button onClick={register}>Register</Button>
        </form>
    </div>
)
}

export default RegisterForm