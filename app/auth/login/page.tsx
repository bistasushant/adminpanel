"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner'; 
import { adminLogin } from '@/helpers/apiHelpers'; 

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await adminLogin(email, password);
            if(data.message === "Login Success") {
                const adminData = {
                    email: data.email,
                    token: data.token,
                };
                // Handle successful login here
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-rose-50/20 via-amber-50/20 to-blue-50/20">
                <div className="container mx-auto px-4 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-md"
                    >
                        <div className="relative bg-gradient-to-br from-slate-950 to indigo-950 rounded-2xl shadow-xl p-8 md:p-10">
                            {/* Decorative elements */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                <div className="absolute -top-20 -left-20 w-64 h-64 bg-slate-200/30 rounded-full blur-3xl" />
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl" />
                            </div>

                            <div className="relative z-10">
                                <div className="text-center mb-8">
                                    <motion.h1
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-bold mb-2 bg-white/80 bg-clip-text text-transparent"
                                    >
                                        Welcome Back
                                    </motion.h1>
                                    <p className="text-white/80">
                                        Admin
                                    </p>
                                </div>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <Label className="text-white mb-2 block">
                                            Email
                                        </Label>
                                        <Input
                                            type="email"
                                            placeholder="example@gmail.com"
                                            className="w-full rounded-lg border-slate-200 focus:ring-2 focus:ring-rose-500 placeholder:text-white"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-white mb-2 block">
                                            Password
                                        </Label>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full rounded-lg border-slate-200 focus:ring-2 focus:ring-rose-500 placeholder:text-white"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all"
                                        disabled={loading}
                                    >
                                        {loading ? "Signing In..." : "Sign In"}
                                    </Button>
                                </form>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
