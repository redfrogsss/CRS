import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";

function App() {
    const [currentUsername, setCurrentUsername] = useState<string | undefined>(undefined);
    const [currentUserID, setCurrentUserID] = useState<string | undefined>(undefined);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to="/login" replace />} />
                <Route
                    path="login"
                    element={
                        <LoginPage
                            currentUsername={currentUsername}
                            setCurrentUsername={setCurrentUsername}
                            currentUserID={currentUserID}
                            setCurrentUserID={setCurrentUserID}
                        />
                    }
                />
                <Route
                    path="register"
                    element={
                        <RegisterPage
                            currentUsername={currentUsername}
                            setCurrentUsername={setCurrentUsername}
                            currentUserID={currentUserID}
                            setCurrentUserID={setCurrentUserID}
                        />
                    }
                />
                <Route
                    path="home"
                    element={
                        <HomePage
                            currentUsername={currentUsername}
                            setCurrentUsername={setCurrentUsername}
                            currentUserID={currentUserID}
                            setCurrentUserID={setCurrentUserID}
                        />
                    }
                />
                <Route
                    path="/home/:chatId"
                    element={
                        <HomePage
                            currentUsername={currentUsername}
                            setCurrentUsername={setCurrentUsername}
                            currentUserID={currentUserID}
                            setCurrentUserID={setCurrentUserID}
                        />
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
