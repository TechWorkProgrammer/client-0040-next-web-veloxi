import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";

const Banner: React.FC = () => {
    return (
        <section
            id="about"
            className="relative py-24 lg:pt-44 flex flex-col items-center justify-start overflow-hidden bg-transparent"
        >
            <div
                className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-veloxiai-blue/20 rounded-full blur-3xl z-0 animate-pulse"/>
            <div
                className="absolute top-[40%] -right-24 w-[300px] h-[300px] bg-veloxiai-green/20 rounded-full blur-2xl z-0 animate-bounceSlow"/>

            <motion.div
                className="relative z-10 flex flex-col items-center mx-auto"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                viewport={{once: false}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <div className="w-full text-center space-y-4 md:space-y-8 px-4 md:px-6 md:text-start">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                        Unleash Creative Intelligence
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg bg-gradient-to-r from-veloxiai-gradientFrom to-veloxiai-gradientTo bg-clip-text text-transparent">
                        Powered by VeloxiAI
                    </h1>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-7xl w-full px-4">
                    <div
                        className="relative aspect-video rounded-2xl overflow-hidden border border-veloxiai-blue bg-background-dark shadow-md"
                    >
                        <Image
                            src="/assets/images/ai-generator.webp"
                            alt="AI Generator"
                            fill
                            className="object-cover"
                        />
                        <div
                            className="absolute bottom-3 left-4 text-white font-semibold text-lg bg-black/70 px-3 py-1 rounded-lg">
                            AI Generator
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-veloxiai-gradientFrom to-veloxiai-gradientTo text-white rounded-2xl font-bold text-2xl flex items-center justify-center p-8 shadow-lg">
                        300+ Projects Built
                    </div>

                    <div
                        className="bg-blue-600 text-white p-6 rounded-2xl flex flex-col justify-between gap-4 shadow-md">
                        <p className="text-lg font-semibold">Stunning visuals with the best AI engine</p>
                        <span className="text-sm opacity-90">
                            Experience AI-driven creativity without limits.
                        </span>
                    </div>

                    <div
                        className="bg-background-dark border border-accent-400 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between gap-2 col-span-1 lg:col-span-3">
                        <p className="text-lg font-semibold">Join the Community</p>
                        <span className="text-sm opacity-90">
                            Collaborate, learn, and grow with innovators like you.
                        </span>
                    </div>
                </div>

            </motion.div>
        </section>
    );
};

export default Banner;
