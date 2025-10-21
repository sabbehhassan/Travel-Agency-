// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/approutes";

const App = () => <RouterProvider router={router} />;

export default App;
