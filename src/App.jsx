import Nav from "./components/Nav"
import AppRoutes from "./components/AppRoutes"
import { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="body" data-theme={isDarkMode ? "dark" : "light"}>
      <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <AppRoutes />
    </div>
  );
}

export default App;

