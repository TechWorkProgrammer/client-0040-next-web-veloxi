import React from "react";
import {motion} from "framer-motion";
import {FaWallet, FaCheckCircle, FaCogs, FaMagic} from "react-icons/fa";

const steps = [
    {
        title: "Connect Wallet",
        icon: <FaWallet className="text-2xl text-veloxiai-green"/>,
        description: "Securely connect your crypto wallet to access VeloxiAI features."
    },
    {
        title: "Open Service Page",
        icon: <FaMagic className="text-2xl text-accent-400"/>,
        description: "Navigate to our AI service dashboard."
    },
    {
        title: "Pick & Prompt",
        icon: <FaCogs className="text-2xl text-veloxiai-blue"/>,
        description: "Select what you want to create: 3D, music, or code — then describe it."
    },
    {
        title: "Done & Mint",
        icon: <FaCheckCircle className="text-2xl text-lime-400"/>,
        description: "AI will handle the rest. Preview, export, or mint your asset."
    }
];

const HowToUseSection = () => {

    return (
        <motion.section
            id="how-to-use"
            className="relative w-full py-20 lg:py-28 px-6 md:px-12 text-white"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 1}}
        >
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold">How to Use <span
                    className="drop-shadow-lg bg-gradient-to-r from-veloxiai-gradientFrom to-veloxiai-gradientTo bg-clip-text text-transparent">VeloxiAI</span>
                </h2>
                <p className="text-secondary-400 mt-4 max-w-2xl mx-auto">
                    A simple step-by-step journey to transform your ideas into on-chain creations.
                </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto z-10">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="relative bg-background-dark rounded-2xl p-6 border border-accent-300/10 flex flex-col items-center text-center shadow-md"
                    >
                        <div className="mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-secondary-500 text-sm">{step.description}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default HowToUseSection;
