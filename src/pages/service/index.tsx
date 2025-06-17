import React from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import TelegramBanner from "@/components/section/TelegramBanner";
import FeatureCard from "@/components/feature/FeatureCard";

const featureData = [
    {
        title: "Text to 3D Models",
        path: "/3d",
        iconName: "3d",
        description: "Transform your words into stunning 3D models rendered with AI-powered precision.",
    },
    {
        title: "Text to Music",
        path: "/music",
        iconName: "music",
        description: "Compose original music by simply describing the mood, genre, or emotion.",
    },
    {
        title: "Text to Code",
        path: "/program",
        iconName: "code",
        description: "Convert natural language into functional, structured code instantly.",
    },
    {
        title: "Text to NFT",
        path: "/nft",
        iconName: "nft",
        description: "Create and mint unique NFT artworks tied to your creative prompts.",
    },
    {
        title: "Text to Metaverse",
        path: "/metaverse",
        iconName: "metaverse",
        description: "Craft immersive Metaverse assets and avatars using pure imagination.",
    },
    {
        title: "Text to Game",
        path: "/game",
        iconName: "game",
        description: "Build game assets and mechanics through AI — from text to interaction.",
    },
];

const Feature: React.FC = () => {
    return (
        <SidebarLayout>
            <div className="relative px-4 md:px-8 xl:px-20 py-8 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-14">
                    <div>
                        <p className="uppercase text-accent-400 text-sm font-semibold tracking-wider mb-2">
                            powered by blockchain & ai
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            Transform Ideas into Reality <br/>
                            with{" "}
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400">
                                CypherAI
                            </span>
                        </h1>
                    </div>
                </div>

                <div className="space-y-12">
                    {[0, 2, 4].map((start, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FeatureCard {...featureData[start]} />
                            <FeatureCard {...featureData[start + 1]} />
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <TelegramBanner/>
                </div>
            </div>
        </SidebarLayout>
    );
};

export default Feature;
