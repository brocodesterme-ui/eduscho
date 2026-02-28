import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { inject } from "@vercel/analytics";

// Clear any corrupted Supabase auth sessions before app loads
// This prevents lock manager timeouts from stale refresh tokens
const authKey = Object.keys(localStorage).find(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
if (authKey) {
  try {
    const stored = localStorage.getItem(authKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!parsed?.access_token || parsed.access_token.split('.').length !== 3) {
        localStorage.removeItem(authKey);
        console.log('Cleared corrupted auth session');
      }
    }
  } catch {
    localStorage.removeItem(authKey);
    console.log('Cleared unparseable auth session');
  }
}

inject();

createRoot(document.getElementById("root")!).render(<App />);
