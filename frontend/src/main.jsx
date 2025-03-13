import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
