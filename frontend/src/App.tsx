import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

function App() {

    return (
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to="/login" replace />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
