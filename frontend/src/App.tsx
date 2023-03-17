import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import { CurrentUserContext } from "./context/CurrentUserContext";

function App() {
    const [currentUsername, setCurrentUsername] = useState<string | undefined>(undefined);
    const [currentUserID, setCurrentUserID] = useState<string | undefined>(undefined);

    const currentUserContext = { id: {currentUserID, setCurrentUserID}, name: {currentUsername, setCurrentUsername} }

    return (
        <CurrentUserContext.Provider value={currentUserContext}>
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
                            <HomePage />
                        }
                    />
                    <Route
                        path="/home/:chatId"
                        element={
                            <HomePage />
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </CurrentUserContext.Provider>
    );
}

export default App;
