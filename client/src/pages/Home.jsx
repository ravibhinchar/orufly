import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { ExternalLink, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="pt-24 pb-12 px-4 min-h-screen">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-sm font-bold tracking-wide mb-4">
                        NEW COLLECTION ARRIVED
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Exclusive</span> <br />
                        Digital Assets
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Elevate your projects with our curated selection of premium resources. Designed for professionals, by professionals.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/register" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
                            Get Started <ArrowRight size={20} />
                        </Link>
                        <a href="#products" className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg shadow hover:shadow-lg transition-all border border-gray-100">
                            View Collection
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Products Grid */}
            <div id="products" className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <p className="text-gray-500 mt-1">Handpicked items just for you</p>
                    </div>
                    {/* <div className="hidden md:block">Filters here...</div> */}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                                <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {products.length > 0 ? products.map(product => (
                            <motion.div
                                key={product._id}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                            >
                                <div className="relative h-64 overflow-hidden bg-gray-100">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ShoppingBag size={48} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 font-bold text-primary-600 shadow-sm text-sm">
                                        ${product.price}
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                                    <p className="text-gray-500 mb-6 line-clamp-2 text-sm flex-grow">{product.description}</p>
                                    <button className="w-full py-3 rounded-xl border-2 border-primary-50 text-primary-600 font-semibold hover:bg-primary-50 transition-colors flex justify-center items-center gap-2 group/btn">
                                        View Details <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-3 text-center py-20">
                                <div className="inline-block p-6 rounded-full bg-gray-100 mb-4 text-gray-400">
                                    <ShoppingBag size={48} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700">No products found</h3>
                                <p className="text-gray-500 mt-2">Check back later for new arrivals.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;
