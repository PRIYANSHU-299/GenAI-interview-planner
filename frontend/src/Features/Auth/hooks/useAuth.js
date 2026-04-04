import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js";
import toast from 'react-hot-toast';

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            toast.success("Welcome back! 👋")
            return { success: true }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed")
            return { success: false, message: err.response?.data?.message }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            toast.success("Account created successfully! 🎉")
            return { success: true }
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed")
            return { success: false, message: err.response?.data?.message }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            toast.success("Logged out successfully")
        } catch (err) {
            toast.error("Logout failed")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {}
            finally { setLoading(false) }
        }
        getAndSetUser()
    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}