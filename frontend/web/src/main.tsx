import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Moon, Server, Smartphone, Sun } from "lucide-react";
import { apiRoutes, appInfo, type HealthResponse } from "@akasha/shared";
import "./styles.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9908";
type ThemeMode = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [apiStatus, setApiStatus] = useState("Not checked yet");
  const healthUrl = `${apiBaseUrl}${apiRoutes.health}`;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  async function checkApiHealth(): Promise<void> {
    try {
      const response = await fetch(healthUrl);
      const health = (await response.json()) as HealthResponse;
      setApiStatus(`${health.appName} API is ${health.status}`);
    } catch {
      setApiStatus("API is unreachable");
    }
  }

  return (
    <main className="app-shell">
      <button
        aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        className="theme-toggle"
        title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        type="button"
        onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
      >
        {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
      </button>
      <section className="intro">
        <p className="eyebrow">Fullstack TypeScript</p>
        <h1>{appInfo.name}</h1>
        <p>{appInfo.description}</p>
        <div className="actions">
          <button type="button" onClick={checkApiHealth}>
            <Server aria-hidden="true" />
            Check API health
          </button>
          <div className="mobile-note">
            <Smartphone aria-hidden="true" />
            React Native ready
          </div>
        </div>
        <p className="status">
          <Server aria-hidden="true" />
          {apiStatus}
        </p>
        <p className="route">Backend route: {healthUrl}</p>
      </section>
    </main>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element was not found.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
