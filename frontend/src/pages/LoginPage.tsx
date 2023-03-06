import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmailField from "../components/loginFields/Email";
import PasswordField from "../components/loginFields/Password";
import WarningToast from "../components/toasts/Warning";
import RegisterSuccessToast from "../components/toasts/RegisterSuccess";
import { BackendUrl } from "../context/BackendUrl";
import { PageInterface } from "../interfaces/PageInterface";

export default function LoginPage({
    currentUsername,
    setCurrentUsername,
    currentUserID,
    setCurrentUserID
}: PageInterface) {
    const navigate = useNavigate();

    let [searchParams, setSearchParams] = useSearchParams();
    const [regSuccessMessage, setRegSuccessMessage] = useState("");

    useEffect(()=> {
        // show register success
        console.log("regSuccess = " , searchParams.get("regSuccess"))

        let regSuccess = searchParams.get("regSuccess");

        if (!(regSuccess === undefined || regSuccess === null || regSuccess.length === 0)) {
            setRegSuccessMessage("Register Success");
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const BackendURL = useContext(BackendUrl) + "/login";

    const onEmailChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };

    const onPasswordChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(email, password);
        console.log(BackendURL);

        const UrlWithQuery = new URL(BackendURL);
        UrlWithQuery.searchParams.append("email", email);
        UrlWithQuery.searchParams.append("password", password);

        axios
            .post(UrlWithQuery.href)
            .then((result) => {
                console.log(result.data.result);
                let loginStatus = result.data.result;
                if (loginStatus === "success") {
                    if (setCurrentUsername !== undefined) {
                        setCurrentUsername(result.data.username);
                    }
                    if (setCurrentUserID !== undefined) {
                        setCurrentUserID(result.data.user_id);
                    }
                    navigate("/home");
                } else {
                    // print error
                    setErrorMessage("Login Failed");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onClickHandler = (item = "") => {
        if (item === "") {
            return;
        }
        if (item === "signin") {
            navigate("/register");
        }
    };

    useEffect(() => {
        if(currentUserID !== undefined) {
            navigate("/home");
        }
    }, [])

    return (
        <div className="bg-slate-300 w-[100%] h-[100vh] grid grid-cols-2 gap-4 content-center place-content-around">
            <div className="flex h-full w-[80%] justify-center justify-self-center text-center align-middle">
                <div className="m-auto">
                    <h1 className="text-6xl font-bold">CRS Web</h1>
                    <h2 className="text-lg">
                        The Best Conversational Recommendation System in the
                        world.
                    </h2>
                </div>
            </div>
            <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 justify-center justify-self-center">
                <form className="space-y-6" onSubmit={onSubmitHandler}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        Sign in
                    </h5>
                    <EmailField
                        onChangeHandler={onEmailChangeHandler}
                        value={email}
                    />
                    <PasswordField
                        onChangeHandler={onPasswordChangeHandler}
                        value={password}
                    />
                    <button
                        type="submit"
                        className="w-full text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 mr-2 mb-2 inline-flex justify-center justify-self-center"
                    >
                        <svg
                            className="mr-2 -ml-1 w-6 h-6"
                            fill="none"
                            role="img"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                        </svg>
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onClickHandler("signin");
                        }}
                        className="w-full text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 mr-2 mb-2 inline-flex justify-center justify-self-center"
                    >
                        <svg
                            className="mr-2 -ml-1 w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                        </svg>
                        Register
                    </button>
                </form>
                <div className="mt-2">
                    {errorMessage.length === 0 ? (
                        <></>
                    ) : (
                        <WarningToast
                            content={errorMessage}
                            closeHandler={() => {
                                setErrorMessage("");
                            }}
                        />
                    )}
                    {regSuccessMessage.length === 0 ? (<></>) : (
                        <RegisterSuccessToast 
                            content={regSuccessMessage}
                            closeHandler={()=>{
                                setRegSuccessMessage("");
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
