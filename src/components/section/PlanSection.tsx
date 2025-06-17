import React from "react";
import {motion} from "framer-motion";
import {FaCheck} from "react-icons/fa";
import Button from "@/components/common/Button";

const plans = [
    {
        title: "30 Days Free Plan",
        price: "$0",
        description: "every features to start with",
        features: [
            {
                title: "3D Generation",
                description: "Access to generate stunning 3D models with an interactive 3D Canvas."
            },
            {title: "Music Generation", description: "Access to create unique tracks with a built-in Media Player."},
            {title: "Code Generation", description: "Access to generate code with live preview & editor features."},
            {title: "NFT Generation", description: "Access to generate digital assets for NFT collections."},
            {
                title: "Metaverse Generation",
                description: "Access to create immersive assets for Metaverse experiences."
            },
            {title: "Game Generation", description: "Access to develop game-ready content from simple text prompts."},
        ],
        buttonLabel: "Get Started",
    },
];

const tileColors = [
    "bg-accent-500",
    "bg-veloxiai-blue",
    "bg-veloxiai-green",
    "bg-secondary-500",
    "bg-accent-400",
];

const PlanSection = () => {
    return (
        <motion.section
            className="relative flex flex-col items-center justify-center min-h-screen text-white py-16 px-4 my-12"
            id="pricing"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 1}}
        >
            <div
                className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-veloxiai-blue/20 rounded-full blur-3xl z-0"/>
            <div
                className="absolute bottom-0 -right-40 w-[300px] h-[300px] bg-accent-400/20 rounded-full blur-2xl z-0"/>

            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 text-white text-center z-10"
                initial={{y: -50, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.8}}
            >
                Pricing
            </motion.h1>
            <motion.h5
                className="text-xl font-bold mb-12 text-secondary-600 text-center z-10"
                initial={{y: -50, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.8}}
            >
                Access AI cutting-edge tool – First 30 Days Are Free
            </motion.h5>

            <div className="flex flex-wrap justify-center gap-8 w-full z-10">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        className="shadow-xl hover:scale-105 transform transition duration-300 max-w-lg w-full relative overflow-hidden"
                        initial={{scale: 0.8, opacity: 0}}
                        whileInView={{scale: 1, opacity: 1}}
                        transition={{duration: 0.8, delay: index * 0.2}}
                    >
                        <div
                            className="absolute inset-0 grid grid-cols-5 gap-2 p-2 z-0 opacity-80 pointer-events-none">
                            {Array.from({length: 35}).map((_, tileIdx) => (
                                <div
                                    key={tileIdx}
                                    className={`w-full aspect-square ${
                                        tileColors[Math.floor(Math.random() * tileColors.length)]
                                    } rounded-sm`}
                                />
                            ))}
                        </div>

                        <div
                            className="relative backdrop-blur-md z-10 p-12">
                            <div className="text-start mb-6">
                                <h2 className="text-2xl font-bold text-white">{plan.title}</h2>
                                <h3 className="text-4xl font-bold mt-2 text-white">
                                    {plan.price}
                                    <span className="text-lg text-white">/month</span>
                                </h3>
                                <h3 className="text-lg font-bold mt-2 text-white">{plan.description}</h3>
                            </div>
                            <ul className="space-y-4 border-t-2 border-accent-300 py-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex gap-3 items-start">
                                        <FaCheck className="text-white mt-1"/>
                                        <div>
                                            <p className="text-lg font-semibold text-accent-300">{feature.title}</p>
                                            <p className="text-sm text-accent-100">{feature.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="w-full my-6">
                                <Button label={plan.buttonLabel} onClick={() => {
                                }} color="primary" fullWidth={true}/>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default PlanSection;
