import React from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import {FaTelegramPlane} from "react-icons/fa";


const ProductionSection = () => {
    const router = useRouter();

    return (
        <motion.section
            id="product"
            className="relative w-full text-white py-16 lg:py-24 overflow-hidden"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 0.8}}
        >
            <div
                className="relative z-10 flex flex-col max-w-7xl mx-auto px-6 md:px-12 lg:px-20 gap-10 items-start justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-8">
                    <div
                        className="group bg-gradient-to-br from-veloxiai-gradientFrom to-veloxiai-gradientTo p-[2px] rounded-2xl transition hover:scale-[1.02]">
                        <div
                            className="h-full w-full bg-background-dark rounded-2xl p-6 flex flex-col justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Icon name="apps" className="w-6 h-6 text-veloxiai-green"/>
                                <h3 className="text-2xl font-semibold text-white">Discover Tools</h3>
                            </div>
                            <p className="text-secondary-700 text-md">
                                Explore a decentralized suite of AI tools built for creators on-chain. From generating
                                immersive 3D assets to composing music and visual art — all within your wallet-powered
                                dashboard. No signups. No gatekeeping. Just creation.
                            </p>
                            <Button
                                label="Go to Discover"
                                onClick={() => router.push("/discover")}
                                color="secondary"
                                fullWidth={false}
                            />
                        </div>
                    </div>
                    <div
                        className="group bg-gradient-to-br from-veloxiai-gradientTo to-veloxiai-gradientFrom p-[2px] rounded-2xl transition hover:scale-[1.02]">
                        <div
                            className="h-full w-full bg-background-dark rounded-2xl p-6 flex flex-col justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Icon name="magic-pencil" className="w-6 h-6 text-accent-400"/>
                                <h3 className="text-2xl font-semibold text-white">Start Generating</h3>
                            </div>
                            <p className="text-secondary-700 text-md">
                                Instantly mint creativity from prompts. VeloxiAI lets you generate, own, and export
                                AI-powered assets — directly tied to your wallet. You&#39;re not just using tools.
                                You&#39;re
                                building on-chain value.
                            </p>
                            <Button
                                label="Generate Now"
                                onClick={() => router.push("/service")}
                                color="primary"
                                fullWidth={false}
                            />
                        </div>
                    </div>
                    <div
                        className="group bg-gradient-to-br from-veloxiai-gradientFrom to-veloxiai-gradientTo p-[2px] rounded-2xl transition hover:scale-[1.02]">
                        <div
                            className="h-full w-full bg-background-dark rounded-2xl p-6 flex flex-col justify-between gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <FaTelegramPlane className="w-6 h-6 text-sky-400"/>
                                <h3 className="text-2xl font-semibold text-white">Telegram Bot</h3>
                            </div>
                            <p className="text-secondary-700 text-md">
                                Generate AI assets directly in Telegram with our bot. No browser needed — just your
                                wallet and creativity.
                            </p>
                            <Button
                                label="Open Telegram"
                                onClick={() => window.open("https://t.me/veloxiai_bot", "_blank")}
                                color="primary"
                                fullWidth={false}
                            />
                        </div>
                    </div>
                    <div
                        className="group bg-gradient-to-br from-veloxiai-gradientTo to-veloxiai-gradientFrom p-[2px] rounded-2xl transition hover:scale-[1.02]"
                    >
                        <div
                            className="h-full w-full bg-background-dark rounded-2xl p-6 flex flex-col justify-between gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <Icon name="assets" className="w-6 h-6 text-veloxiai-green"/>
                                <h3 className="text-2xl font-semibold text-white">Digital Assets</h3>
                            </div>
                            <p className="text-secondary-700 text-md">
                                Every generation is yours to keep — export visuals, mint NFTs, or integrate into your
                                on-chain experience.
                            </p>
                            <Button
                                label="Your Assets"
                                onClick={() => router.push("/assets")}
                                color="secondary"
                                fullWidth={false}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
};

export default ProductionSection;
