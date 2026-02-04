require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');


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
                image: "https://imgs.search.brave.com/ZorOFH28N06T5KQErmtFOPY5Bkyz9Hqsk6YnedQWK1I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9nbGFj/aWVycGNnYW1pbmcu/Y29tL2Nkbi9zaG9w/L3Byb2R1Y3RzL2ds/YWNpZXItbWluaW1h/bGlzdC1rZXlib2Fy/ZC10dXJxdW9pc2Ut/NTk5MjIyLmpwZz92/PTE3NDA1NDgwMzUm/d2lkdGg9MTk0Ng"
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
                image: "https://imgs.search.brave.com/46_wSocTmaC66MCySQ93n3X0jjElFFf3bPZbpOIF9-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/NTUzNzc0My9waG90/by9kZXNrLWxhbXAt/d2l0aC1zcG90bGln/aHQtYmxhY2stYmFj/a2dyb3VuZC13aXRo/LWNvcHktc3BhY2Uu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXNWbE1iNDdWLS1L/UG1CYXVuQk9lUHFS/UzBlRFBkMXdFZ2pY/MEEyaG9CQ1k9"
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
