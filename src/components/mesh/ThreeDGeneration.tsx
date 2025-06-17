import React, {useState, useEffect} from "react";
import {FaRegPaperPlane, FaFire, FaSnowflake} from "react-icons/fa";
import {useAlert} from "@/context/Alert";
import {getAccessToken} from "@/utils/user";
import api from "@/utils/axios";
import {io} from "socket.io-client";
import Loader from "@/components/common/Loader";
import MeshResult from "@/components/mesh/MeshResult";
import {useRouter} from "next/router";
import Button from "@/components/common/Button";

interface ThreeDGenerationForm {
    prompt: string;
    art_style: string;
    mode: string;
}

interface TaskResponse {
    taskIdPreview?: string;
    taskIdRefine?: string;
    state: string;
}

const ThreeDGeneration: React.FC = () => {
    const [form, setForm] = useState<ThreeDGenerationForm>({
        prompt: "",
        art_style: "realistic",
        mode: "preview",
    });
    const [task, setTask] = useState<TaskResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [version, setVersion] = useState<"v1" | "v2" | "v3">("v1");

    const alert = useAlert();
    const router = useRouter();
    const eventName = task?.taskIdRefine || task?.taskIdPreview || null;

    useEffect(() => {
        if (!eventName) return;

        const socket = io("wss://api.veloxiai.app");

        socket.on(eventName, (data: { status: string; message?: string }) => {
            setTask(t => t ? {...t, state: data.status} : t);

            if (["done", "SUCCEEDED"].includes(data.status)) {
                setIsLoading(false);
            }
        });

        return () => {
            socket.off(eventName);
            socket.disconnect();
        };
    }, [eventName]);


    const handleChange = (field: keyof ThreeDGenerationForm, value: string) =>
        setForm((f) => ({...f, [field]: value}));

    const handleGenerateMesh = async () => {
        if (!form.prompt.trim()) {
            alert("Missing Prompt", "Please enter a description to generate 3D content.", "error");
            return;
        }
        const token = getAccessToken();
        if (!token) {
            alert("Authentication Required", "Please log in to generate 3D content.", "error");
            return;
        }
        setIsLoading(true);
        try {
            const payload =
                version === "v1"
                    ? {prompt: form.prompt, art_style: form.art_style, mode: form.mode}
                    : version === "v2" ? {prompt: form.prompt, mode: "master"} : {prompt: form.prompt, mode: "rodin"};
            const res = await api.post("/mesh/generate", payload);
            setTask(res.data.data);
        } catch (err: any) {
            alert("Generation Failed", err.response?.data?.message || "Try again later.", "error");
            setIsLoading(false);
        }
    };

    const waitingForResult = isLoading || (task != null && !["done", "SUCCEEDED"].includes(task.state));

    return (
        <div className="text-white w-full">
            <main className="flex w-full">
                <div
                    className="w-[200px] md:w-[280px] lg:w-[320px] flex flex-col bg-background-dark h-[calc(100vh-4rem)] lg:h-screen border-x border-secondary-200">
                    <div className="flex flex-col h-full">
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <h2 className="text-xl font-semibold p-4 border-b border-secondary-200">
                                3D Generation
                            </h2>
                            <div className="p-4 space-y-6 overflow-y-auto flex-1">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-secondary-400 mb-1">Select Model Version</p>
                                    <div className="flex gap-2">
                                        {[
                                            {label: "V1", value: "v1", icon: <FaSnowflake/>},
                                            {label: "V2", value: "v2", icon: <FaFire/>},
                                            {label: "V3", value: "v3", icon: <FaFire/>},
                                        ].map(({label, value, icon}) => (
                                            <div
                                                key={value}
                                                onClick={() => setVersion(value as any)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition
                                                    ${
                                                    version === value
                                                        ? "bg-accent-400 text-black border-accent-400"
                                                        : "bg-primary-700 text-secondary-300 border-secondary-300 hover:bg-primary-600"
                                                }`}
                                            >
                                                <span>{icon}</span>
                                                <span className="text-sm font-medium">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="prompt"
                                           className="mb-2 block text-sm font-medium text-secondary-400">Prompt</label>
                                    <textarea
                                        id="prompt"
                                        name="prompt"
                                        rows={4}
                                        placeholder="Enter your 3D generation prompt"
                                        value={form.prompt}
                                        onChange={(e) => handleChange("prompt", e.target.value)}
                                        disabled={isLoading || !!task}
                                        className="w-full bg-background-dark text-white placeholder-secondary-400 border border-secondary-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-accent-500 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-secondary-200">
                            <div
                                className={`w-full text-center py-2 rounded-lg font-semibold text-sm cursor-pointer transition ${
                                    isLoading || !!task
                                        ? "bg-primary-700 text-secondary-500 cursor-not-allowed"
                                        : "bg-accent-400 text-black hover:bg-accent-300"
                                }`}
                                onClick={() => {
                                    if (!isLoading && !task) handleGenerateMesh().then();
                                }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FaRegPaperPlane/>
                                    Generate
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-1 px-6 py-8">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h3 className="text-xl md:text-2xl font-bold">Generation Result</h3>
                        <Button
                            onClick={() => router.push("/assets/3d")}
                            color="primary"
                            label="My Mesh Assets"
                        />
                    </div>

                    <div
                        className="w-full rounded-lg min-h-[50vh] flex items-center justify-center bg-background-dark">
                        {waitingForResult ? (
                            <Loader size="large"/>
                        ) : task ? (
                            <MeshResult
                                id={task.taskIdRefine || task.taskIdPreview!}
                                embedded
                            />
                        ) : (
                            <p className="text-secondary-500 text-sm">No generation yet. Try generating
                                something.</p>
                        )}
                    </div>
                </main>
            </main>
        </div>
    );
};

export default ThreeDGeneration;
