import React, {useState} from "react";
import WalletConnectModal from "@/components/common/WalletConnectModal";
import Button from "@/components/common/Button";
import Image from "next/image";
import {motion} from "framer-motion";

const ProtectedPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className="flex items-center justify-center w-full h-[90vh]">
            <div
                className="text-center space-y-6 py-8 px-6 rounded-2xl shadow-xl w-full max-w-lg bg-background-dark/80 border border-white/10 backdrop-blur-md">
                <div className="flex justify-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                        }}
                        className="w-20 h-20"
                    >
                        <Image
                            src="/icon.png"
                            alt="Connecting Icon"
                            width={80}
                            height={80}
                            priority
                            className="object-contain"
                        />
                    </motion.div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white">
                    Connect Required
                </h2>
                <p className="text-sm md:text-base text-secondary-500 leading-relaxed">
                    Please connect your wallet to access this feature securely.
                </p>

                <div className="flex justify-center">
                    <Button
                        label="Connect Wallet"
                        onClick={() => setIsModalOpen(true)}
                        color="primary"
                    />
                </div>

                <WalletConnectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default ProtectedPage;
