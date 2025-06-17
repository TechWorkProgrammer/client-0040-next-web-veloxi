import React, {useState} from "react";
import {FaPaperPlane} from "react-icons/fa";
import {useAlert} from "@/context/Alert";
import MetaExampleComponent from "@/components/metaverse/MetaExampleComponent";
import Button from "@/components/common/Button";

const MetaGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("Simple Metaverse Modern City Map");
    const alert = useAlert();

    const handleGenerate = () => {
        alert("Coming Soon", "This feature isn't ready yet. Stay tuned.", "info");
    };

    return (
        <div className="text-white w-full h-full flex flex-col lg:flex-row">
            <div
                className="w-full lg:w-[320px] bg-background-dark border-r border-secondary-200 min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-between">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold px-6 py-4 border-b border-secondary-200">
                        Metaverse Generator
                    </h2>
                    <div className="p-6 space-y-4">
                        <label htmlFor="prompt" className="block font-medium text-secondary-300">
                            Prompt
                        </label>
                        <textarea
                            id="prompt"
                            name="prompt"
                            placeholder="Describe the world you want to create..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-primary-800 text-white placeholder-secondary-500 border border-secondary-200 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent-500"
                            rows={6}
                        />
                    </div>
                </div>
                <div className="p-6">
                    <Button
                        onClick={handleGenerate}
                        color="primary"
                        icon={<FaPaperPlane/>}
                        label="Generate"
                        fullWidth
                    />
                </div>
            </div>

            <div className="flex-1 px-6 py-8">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                        Generation Preview
                    </h3>
                    <Button
                        onClick={() => alert("Coming soon", "This feature isn't ready yet. Stay tuned.", "info")}
                        color="primary"
                        label="My Assets"
                    />
                </div>

                <div className="w-full bg-background-dark rounded-xl p-6 min-h-[70vh]">
                    <MetaExampleComponent/>
                </div>
            </div>
        </div>
    );
};

export default MetaGeneration;
