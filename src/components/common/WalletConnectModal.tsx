import React, {useState} from "react";
import {createPortal} from "react-dom";
import {FaTimes} from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/common/Button";
import {useWallet} from "@/context/Wallet";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {getUser} from "@/utils/user";
import LoggedInComponent from "@/components/common/LoggedIn";

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const wallets = [
    {
        name: "MetaMask",
        icon: "/assets/wallets/metamask.png",
        description:
            "MetaMask is a popular Ethereum wallet that lets users manage cryptocurrency, access dApps, and interact with the blockchain.",
    },
    {
        name: "WalletConnect",
        icon: "/assets/wallets/walletconnect.png",
        description:
            "Connect using WalletConnect-compatible mobile wallets via QR code or deep linking.",
    },
    {
        name: "VeloxiAI",
        icon: "/icon.png",
        description: "Use your address and password to connect securely.",
    },
];

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({isOpen, onClose}) => {
    const {connectWallet, disconnectWallet, connectedWallet} = useWallet();
    const alert = useAlert();
    const loader = useLoader();
    const user = getUser();

    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [mode, setMode] = useState<"login" | "register">("login");
    const [form, setForm] = useState({address: "", password: "", repeat_password: ""});

    if (!isOpen) return null;

    const handleConnect = async () => {
        if (selectedWallet === "VeloxiAI") {
            if (!form.address || !form.password || (mode === "register" && form.password !== form.repeat_password)) {
                alert("Validation Error", "Please fill all fields correctly.", "error");
                return;
            }
            await connectWallet(selectedWallet, form.address, form.password, mode === "register");
        } else {
            await connectWallet(selectedWallet || "");
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-10 overflow-y-auto">
            <div
                className="relative bg-background-dark border border-white/10 rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 text-secondary-500 hover:text-white">
                    <FaTimes size={24}/>
                </button>
                <div className="flex flex-col md:flex-row">
                    {connectedWallet ? (
                        <LoggedInComponent user={user} disconnectWallet={disconnectWallet} alert={alert}
                                           loader={loader}/>
                    ) : (
                        <>
                            {user == null && (
                                <div className="w-full md:w-1/3 p-4 border-r border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-2 pt-2">Choose a Wallet</h3>
                                    <ul className="space-y-3">
                                        {wallets.map((w) => (
                                            <li
                                                key={w.name}
                                                onClick={() => {
                                                    setSelectedWallet(w.name);
                                                    if (w.name !== "VeloxiAI") setMode("login");
                                                }}
                                                className={`group transition-all duration-300 cursor-pointer flex items-center gap-3 p-3 rounded-lg border ${
                                                    selectedWallet === w.name
                                                        ? "bg-accent-500/10 border-accent-500"
                                                        : "border-white/10 hover:bg-white/5"
                                                }`}
                                            >
                                                <Image src={w.icon} alt={w.name} width={32} height={32}/>
                                                <span className="text-white font-semibold">{w.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="flex-1 w-[24rem]">
                                {selectedWallet === "VeloxiAI" ? (
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-xl font-bold text-accent-400 mb-2 border-b border-white/10 p-4">
                                            {mode === "login" ? "VeloxiAI Login" : "VeloxiAI Register"}
                                        </h3>
                                        <div className="px-4 flex flex-col gap-4">
                                            {[{name: "address", label: "Username", type: "text"}, {
                                                name: "password",
                                                label: "Password",
                                                type: "password"
                                            }, ...(mode === "register" ? [{
                                                name: "repeat_password",
                                                label: "Repeat Password",
                                                type: "password"
                                            }] : [])].map((field) => (
                                                <div key={field.name} className="relative w-full">
                                                    <input
                                                        type={field.type}
                                                        name={field.name}
                                                        id={field.name}
                                                        placeholder=" "
                                                        value={(form as any)[field.name]}
                                                        onChange={(e) => setForm({
                                                            ...form,
                                                            [field.name]: e.target.value
                                                        })}
                                                        className="peer block w-full appearance-none border border-white/10 bg-background-dark text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-400"
                                                    />
                                                    <label
                                                        htmlFor={field.name}
                                                        className="absolute left-3 -top-2.5 bg-background-dark px-1 text-sm text-accent-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-accent-400"
                                                    >
                                                        {field.label}
                                                    </label>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center mb-4">
                                                <button
                                                    className="text-sm text-white hover:text-accent-400"
                                                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                                                >
                                                    {mode === "login" ? "Need to register?" : "Back to login"}
                                                </button>
                                                <Button label={mode === "login" ? "Login" : "Register"}
                                                        onClick={handleConnect} color="primary"/>
                                            </div>
                                        </div>
                                    </div>
                                ) : selectedWallet ? (
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-xl font-bold text-accent-400 mb-2 border-b border-white/10 p-4">{selectedWallet}</h3>
                                        <p className="text-white mb-4 px-4">
                                            {wallets.find((w) => w.name === selectedWallet)?.description}
                                        </p>
                                        <div className="flex justify-end mx-4 mb-4">
                                            <Button label="Connect" onClick={handleConnect} color="primary"/>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-white text-center py-12 font-semibold text-lg">Select a wallet to
                                        continue.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default WalletConnectModal;
