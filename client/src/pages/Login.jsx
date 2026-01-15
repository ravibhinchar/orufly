import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Current API URL:", import.meta.env.VITE_API_URL);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-dark-bg/40 backdrop-blur-sm"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row"
            >
                {/* Visual Side */}
                <div className="md:w-1/2 bg-gradient-to-br from-primary-600 to-indigo-700 p-12 text-white hidden md:flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
                        <p className="text-primary-100 text-lg leading-relaxed mb-8">
                            Access your premium dashboard and manage your exclusive products with style and ease.
                        </p>
                        <div className="flex gap-2">
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-800">Sign In</h3>
                        <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2 border border-red-100"
                        >
                            <span className="font-bold">Error:</span> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                                <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                                Remember me
                            </label>
                            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 hover:shadow-primary-500/30 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Create Account</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
