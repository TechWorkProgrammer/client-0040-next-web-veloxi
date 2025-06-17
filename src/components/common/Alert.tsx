import React from "react";
import {AlertInterface} from "@/context/Alert";
import {
    FaCheckCircle,
    FaInfoCircle,
    FaExclamationTriangle,
    FaTimes,
} from "react-icons/fa";

interface Props {
    alerts: AlertInterface[];
    removeAlert: (id: string) => void;
}

const Alert: React.FC<Props> = ({alerts, removeAlert}) => (
    <div className="fixed bottom-8 right-5 left-5 md:right-8 flex flex-col gap-4 z-[9999] max-w-xl mx-0">
        {alerts.map((alert) => {
            const getStyles = () => {
                switch (alert.type) {
                    case "success":
                        return {
                            bg: "bg-veloxiai-green/10",
                            border: "border-veloxiai-green",
                            textColor: "text-veloxiai-green",
                            Icon: FaCheckCircle,
                        };
                    case "error":
                        return {
                            bg: "bg-red-500/10",
                            border: "border-red-500",
                            textColor: "text-red-400",
                            Icon: FaExclamationTriangle,
                        };
                    case "warning":
                        return {
                            bg: "bg-yellow-500/10",
                            border: "border-yellow-500",
                            textColor: "text-yellow-400",
                            Icon: FaExclamationTriangle,
                        };
                    case "info":
                    default:
                        return {
                            bg: "bg-white/5",
                            border: "border-veloxiai-blue",
                            textColor: "text-veloxiai-blue",
                            Icon: FaInfoCircle,
                        };
                }
            };

            const {bg, border, textColor, Icon} = getStyles();

            return (
                <div
                    key={alert.id}
                    className={`relative flex items-start gap-3 px-4 py-3 pr-10 rounded-2xl shadow-lg border transition-all duration-500 ease-in-out 
                          ${alert.visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"} 
                          ${bg} ${border} backdrop-blur-md`}
                >
                    <div className="flex-shrink-0 mt-1">
                        <Icon className={`w-5 h-5 ${textColor}`}/>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <p className="text-sm md:text-base font-semibold text-white">{alert.title}</p>
                        <p className="text-xs md:text-sm mt-1 text-secondary-300 max-w-xs md:max-w-md break-words overflow-hidden text-ellipsis">
                            {alert.message}
                        </p>
                    </div>

                    <button
                        onClick={() => removeAlert(alert.id)}
                        className={`absolute top-2 right-2 hover:opacity-80 transition-opacity ${textColor}`}
                    >
                        <FaTimes className="w-4 h-4"/>
                    </button>
                </div>
            );
        })}
    </div>
);

export default Alert;
