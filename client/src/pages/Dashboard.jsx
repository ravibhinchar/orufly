import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Edit, Search, Filter, MoreVertical, X, Check, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });
    const [editingId, setEditingId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, form);
            } else {
                await api.post('/products', form);
            }
            setForm({ name: '', description: '', price: '', image: '' });
            setEditingId(null);
            setIsFormOpen(false);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product) => {
        setForm(product);
        setEditingId(product._id);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this product?")) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your inventory and products</p>
                </div>
                <button
                    onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setForm({ name: '', description: '', price: '', image: '' }); }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Add New Product
                </button>
            </div>

            {/* Stats Cards Row (Mock Data) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Total Products', val: products.length, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Total Value', val: `$${products.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0)}`, color: 'bg-green-50 text-green-600' },
                    { label: 'Active Status', val: 'Online', color: 'bg-purple-50 text-purple-600' }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} font-bold`}>
                            {/* Icon placeholder could go here */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsFormOpen(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl relative z-10"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">{editingId ? 'Edit Product' : 'Create Product'}</h2>
                                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                                        <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="e.g. Wireless Headphones" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                                        <input name="price" type="number" value={form.price} onChange={handleChange} className="input-field" placeholder="0.00" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input name="image" value={form.image} onChange={handleChange} className="input-field pl-10" placeholder="https://example.com/image.jpg" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="input-field resize-none" placeholder="Product details..." required></textarea>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                                    <button type="submit" className="btn-primary flex items-center gap-2">
                                        {editingId ? <Check size={18} /> : <Plus size={18} />}
                                        {editingId ? 'Save Changes' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Data Table */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Product Info</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-6"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                                        <td className="p-6"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                                        <td className="p-6 hidden md:table-cell"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                                        <td className="p-6"></td>
                                    </tr>
                                ))
                            ) : products.length > 0 ? (
                                products.map(product => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                                    {product.image ? (
                                                        <img src={product.image} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-gray-400"><ImageIcon size={20} /></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{product.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {product._id.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-gray-900 font-bold">${product.price}</td>
                                        <td className="p-6 text-gray-500 max-w-xs truncate hidden md:table-cell">{product.description}</td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(product._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-gray-500">
                                        <div className="inline-block p-4 rounded-full bg-gray-50 mb-3">
                                            <Search size={24} className="text-gray-400" />
                                        </div>
                                        <p>No products found. Add your first item!</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
