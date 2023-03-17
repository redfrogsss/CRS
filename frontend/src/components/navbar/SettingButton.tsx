import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBackendURL } from "../../context/BackendUrl";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function SettingButton() {

    const navigate = useNavigate();

    const currentUser = useContext(CurrentUserContext);
    const BackendURL = getBackendURL();

    const [showModel, setShowModel] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);

    const UsernameForm = () => {
        const [username, setUsername] = useState(currentUser?.name.currentUsername ?? "");

        const onUsernameFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

            try {
                event.preventDefault();

                const query = new URL(BackendURL + "/username");
                if (currentUser === undefined || currentUser.id.currentUserID === undefined) {
                    return;
                }
                query.searchParams.append("user_id", currentUser.id.currentUserID);
                query.searchParams.append("new_username", username);

                let result = await axios.post(query.href);

                if (result.data.error !== undefined) {
                    throw new Error(result.data.error);
                }

                // console.log("username update success")
                if(currentUser) {
                    currentUser.name.setCurrentUsername(username);
                }                

                // show toast and close the setting panel
                setShowUpdateToast(true);
                setShowModel(false);

            } catch (error) {
                console.error(error);
            }
        }

        return (
            <form className="space-y-6" action="#" onSubmit={onUsernameFormSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edit Username</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={username}
                        onChange={(e) => { e.preventDefault(); setUsername(e.target.value); }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Username</button>
            </form>
        )
    }

    const PasswordForm = () => {

        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

        const onPasswordFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            try {
                event.preventDefault();

                // Check if the new password matches the confirm password
                if (newPassword !== confirmPassword) {
                    throw new Error("Confirm Password does not matches the New Password.")
                }

                // post request to backend
                const query = new URL(BackendURL + "/password");
                if (currentUser === undefined || currentUser.id.currentUserID === undefined) {
                    return;
                }
                query.searchParams.append("user_id", currentUser.id.currentUserID);
                query.searchParams.append("password", newPassword);

                let result = await axios.post(query.href);

                if (result.data.error !== undefined) {
                    throw new Error(result.data.error);
                }

                console.log("password successfully changed")

                // show toast and close the setting panel
                setShowUpdateToast(true);
                setShowModel(false);
                currentUser.id.setCurrentUserID(undefined);
                currentUser.name.setCurrentUsername(undefined);
                navigate("/")

            } catch (error) {
                console.error(error);
            }
        }


        return (
            <form className="space-y-6" action="#" onSubmit={onPasswordFormSubmit}>
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Update Password</h3>
                <div>
                    <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                    <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => { e.preventDefault(); setNewPassword(e.target.value); }}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New password</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => { e.preventDefault(); setConfirmPassword(e.target.value) }}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Password</button>
            </form>
        );
    }

    const SettingPanel = () => {
        if (showModel) {
            return (
                <div
                    id="settingpanel-modal"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-slate-700 bg-opacity-40"
                >
                    <div className="relative top-[50%] translate-y-[-50%] w-full h-full m-auto max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                onClick={() => { setShowModel(false) }}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h2 className="mb-4 text-xl font-medium text-gray-900">Setting Panel</h2>
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Update Username</h3>
                                <UsernameForm />

                                <hr className="my-6" />
                                <PasswordForm />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <></>
        }
    }

    const UpdateSuccessToast = () => {

        // Show Toast for 3 seconds then turn it off
        useEffect(()=>{
            if (showUpdateToast === true) {
                setTimeout(()=>{
                    setShowUpdateToast(false);
                }, 3000);
            }
        }, [])

        if (showUpdateToast === true) {
            return (
                <div id="toast-success" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-lg bottom-5 left-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ml-3 text-sm font-normal">Item updated successfully.</div>
                </div>
            );

        } else {
            return (<></>);
        }
    }

    return (
        <>

            <button
                type="button"
                title="Setting Panel"
                onClick={() => { console.log("Opening Setting Panel"); setShowModel(true); }}
                className="text-slate-900 hover:bg-slate-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 my-2"
            >

                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                </svg>

                <span className="sr-only">Setting</span>

            </button>

            <SettingPanel />

            <UpdateSuccessToast />
        </>
    );
}
