import type {Config} from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            animation: {
                bounceSlow: 'bounce 3s infinite',
                pulseFast: 'pulse 1s infinite',
            },
            backgroundImage: {
                'veloxiai-gradient': 'linear-gradient(135deg, #1e90ff 0%, #00ff99 100%)',
            },
            fontFamily: {
                futuristic: ['Orbitron', 'sans-serif'],
            },
            boxShadow: {
                velox: '0 0 20px rgba(0, 255, 153, 0.6), 0 0 30px rgba(30, 144, 255, 0.4)',
            },
            colors: {
                primary: {
                    50: "#1a1a1a",
                    100: "#1f1f1f",
                    200: "#2b2b2b",
                    300: "#333333",
                    400: "#3d3d3d",
                    500: "#474747",
                    600: "#2f2f2f",
                    700: "#1e1e1e",
                    800: "#141414",
                    900: "#0d0d0d",
                },
                secondary: {
                    50: "#2e2e2e",
                    100: "#373737",
                    200: "#414141",
                    300: "#4b4b4b",
                    400: "#555555",
                    500: "#5f5f5f",
                    600: "#666666",
                    700: "#707070",
                    800: "#7a7a7a",
                    900: "#858585",
                },
                accent: {
                    100: "#00ffe0",
                    200: "#00f0a0",
                    300: "#00e396",
                    400: "#00ccff",
                    500: "#00bfff",
                    600: "#0099cc",
                },
                background: {
                    DEFAULT: "#0a0a0a",
                    light: "#1C1C1C",
                    dark: "#121312",
                },
                veloxiai: {
                    blue: "#1e90ff",
                    green: "#00ff99",
                    cyan: "#00e0ff",
                    gradientFrom: "#1e90ff",
                    gradientTo: "#00ff99",
                },
            },
            transitionProperty: {
                'bg': 'background-color',
                'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
            },
        },
    },
    plugins: [],
};

export default config;