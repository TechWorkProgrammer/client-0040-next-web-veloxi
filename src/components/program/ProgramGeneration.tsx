import React, {useState} from "react";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";
import {FaRegPaperPlane} from "react-icons/fa";
import {getAccessToken} from "@/utils/user";
import api from "@/utils/axios";
import Loader from "@/components/common/Loader";
import {CodeData} from "@/types/code";
import ProgramResult from "@/components/program/ProgramResult";

const ProgramGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [code, setCode] = useState<CodeData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const alert = useAlert();

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert("We can handle your prompt", "Please enter a prompt first to generate code.", "error");
            return;
        }

        const token = getAccessToken();
        if (!token) {
            alert("Oops...", "You need to log in to generate code. Please log in.", "error");
            return;
        }

        try {
            setIsLoading(true);
            const res = await api.post(`/code/generate`, {
                prompt: prompt.trim(),
            });
            setCode(res.data.data);
        } catch (err: any) {
            alert("Oops...", err.response?.data?.message || "Failed to generate code. Try again later.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full text-white flex flex-col lg:flex-row">
            <aside
                className="w-full lg:w-[320px] bg-background-dark border-r border-secondary-200 h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-between">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold px-6 py-4 border-b border-secondary-200">
                        Code Generator
                    </h2>
                    <div className="px-6 py-4 space-y-3">
                        <label htmlFor="prompt" className="block text-sm font-medium text-secondary-400">
                            Your Prompt
                        </label>
                        <textarea
                            id="prompt"
                            name="prompt"
                            placeholder="Describe your creative idea for the code program..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-primary-800 text-white placeholder-secondary-500 border border-secondary-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent-500"
                            rows={6}
                        />
                    </div>
                </div>
                <div className="px-6 py-4">
                    <Button
                        onClick={handleGenerate}
                        color="primary"
                        icon={<FaRegPaperPlane/>}
                        disabled={isLoading || !prompt.trim() || code !== null}
                        label="Generate"
                        fullWidth
                    />
                </div>
            </aside>
            <main className="flex-1 px-6 py-8">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h3 className="text-xl md:text-2xl font-bold">Generation Result</h3>
                    <Button
                        onClick={() => (window.location.href = "/assets/code")}
                        color="primary"
                        label="My Code Assets"
                    />
                </div>

                <div className="w-full bg-background-dark rounded-xl p-6 min-h-[60vh]">
                    {isLoading ? (
                        <div className="w-full flex justify-center items-center h-[40vh]">
                            <Loader size="large"/>
                        </div>
                    ) : code?.id ? (
                        <ProgramResult id={code.id} embedded={true}/>
                    ) : (
                        <p className="text-secondary-500 text-center mt-20">
                            No code generated yet. Try entering a prompt above.
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProgramGeneration;
