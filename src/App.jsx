import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Router from "./router/Router";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </>
  );
}

export default App;
