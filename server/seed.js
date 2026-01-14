require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Mongoose 9+ does not need useNewUrlParser/useUnifiedTopology
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("MongoDB Connected for Seeding to:", process.env.MONGODB_URI);

        const sampleProducts = [
            {
                name: "Premium Noise-Canceling Headphones",
                description: "Experience distraction-free listening with industry-leading noise cancellation and exceptional sound quality.",
                price: 349,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
            {
                name: "Minimalist Mechanical Keyboard",
                description: "Tactile switches and customizable RGB lighting for the ultimate typing experience.",
                price: 159,
                image: "https://images.unsplash.com/photo-1587829741301-308231f890f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
            {
                name: "Smart Watch Series X",
                description: "Stay connected, active, and healthy with advanced sensors and a beautiful always-on Retina display.",
                price: 399,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
            {
                name: "Modern Desk Lamp",
                description: "A sleek, modern aesthetic with adjustable brightness and color temperature.",
                price: 89,
                image: "https://images.unsplash.com/photo-1507473885765-e6ed05e5333e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
            {
                name: "Leather Laptop Messenger",
                description: "Handcrafted from genuine full-grain leather, featuring padded compartments.",
                price: 249,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },
            {
                name: "4K Ultra HD Camera",
                description: "Capture life's moments in stunning detail with this professional-grade mirrorless camera.",
                price: 1299,
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            }
        ];

        try {
            await Product.deleteMany({});
            console.log("Cleared existing products.");

            await Product.insertMany(sampleProducts);
            console.log("Seeded database with sample premium products.");
        } catch (error) {
            console.error("Error seeding data:", error);
        } finally {
            mongoose.disconnect();
            process.exit(0);
        }
    })
    .catch((err) => {
        console.error("DB Connection Error:", err);
        process.exit(1);
    });
