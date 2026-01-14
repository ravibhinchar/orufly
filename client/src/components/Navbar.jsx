import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User, Home, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        ...(user ? [{ path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }] : []),
    ];

    return (
        <nav className="fixed w-full z-50 top-0 left-0 transition-all duration-300">
            <div className="glass mx-4 mt-4 rounded-2xl px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                    <ShoppingBag className="text-primary-600" /> LuxeStore
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-2 font-medium transition-colors ${isActive(link.path) ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'}`}
                        >
                            <link.icon size={18} /> {link.label}
                        </Link>
                    ))}

                    <div className="h-6 w-px bg-gray-200 mx-2"></div>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                                    <User size={16} />
                                </div>
                                {user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 hover:text-primary-600 transition-colors">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 glass rounded-2xl p-4 flex flex-col gap-4 md:hidden shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive(link.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <link.icon size={20} /> {link.label}
                            </Link>
                        ))}
                        <hr className="border-gray-100" />
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 p-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                                        <User size={20} />
                                    </div>
                                    <span className="font-semibold text-gray-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl font-medium"
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center p-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center p-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg">Register</Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
