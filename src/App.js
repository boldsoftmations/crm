import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Components/Header/Header";
import { RouteScreen } from "./Routes/RouteScreen";
import { BrowserRouter } from "react-router-dom";

/** Basename from Vite BASE_URL: /crm on GitHub Pages, / on Cloudflare (base=/). */
function routerBasename() {
  const raw = import.meta.env.BASE_URL || "/";
  let path = raw;
  try {
    if (/^https?:\/\//i.test(raw)) {
      path = new URL(raw).pathname;
    }
  } catch (e) {
    path = "/";
  }
  const normalized = path.replace(/\/$/, "") || "/";
  return normalized === "/" ? undefined : normalized;
}

function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <Header />
      <main id="app">
        <RouteScreen />
      </main>
    </BrowserRouter>
  );
}

export default App;
