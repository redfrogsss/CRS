import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import React, { useEffect } from "react";

function App() {
    const Env = React.createContext("");

    const isProduction = (): boolean => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            // dev code
            return false;
        } else {
            // production code
            return true;
        }
    };

    const getBackendURL = (): string => {
        if (isProduction() === true) {
            // if (!process.env.REACT_APP_PROD_API_URL) {
            //     console.error("Environment Variable not found. Did you define environment variable in docker / docker-compose?");
            //     return "";
            // }
            // return process.env.REACT_APP_PROD_API_URL;
            return "backend:3001";  // temp hardcode
        } else {
            // if(!process.env.REACT_APP_API_URL) {
            //     console.error("Environment Variable not found. Did you create a .env file in the root folder?");
            //     return "";
            // }
            // return process.env.REACT_APP_API_URL;
            return "localhost:3001";    // temp hardcode
        }
    };

    useEffect(() => {
        console.log("is production: " , isProduction())
        console.log("backend URL: " + getBackendURL());
    }, []);

    return (
        <Env.Provider value={getBackendURL()}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to="/login" replace />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Env.Provider>
    );
}

export default App;
