import React from "react";
import { useNavigate } from "react-router-dom";
import EmailField from "../components/loginFields/Email";
import PasswordField from "../components/loginFields/Password";
import UsernameField from "../components/loginFields/Username";

export default function RegisterPage() {
    const navigate = useNavigate();

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: implement register feature with database
        navigate("/home");
    };

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
            <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 justify-center justify-self-center">
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        onSubmitHandler(e);
                    }}
                >
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        Register
                    </h5>
                    <EmailField />
                    <UsernameField />
                    <PasswordField />
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}