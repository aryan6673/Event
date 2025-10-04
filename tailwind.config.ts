import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" }
        },
        "line-shadow": {
          "0%": {
            backgroundPosition: "0 0"
          },
          "100%": {
            backgroundPosition: "100% -100%"
          }
        }
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        "line-shadow": "line-shadow 15s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
