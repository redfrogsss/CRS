import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatIdContext } from "../../context/ChatIdContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ForceUpdateContext } from "../../context/ForceUpdate";
import { getTargetID } from "../../utils/getTargetID";
import { sendMessage } from "../../utils/sendMessage";

export default function ChatboxInput () {

    const navigate = useNavigate();

    const chatId = useContext(ChatIdContext);
    const currentUser = useContext(CurrentUserContext);
    const update = useContext(ForceUpdateContext);

    const [chatboxInputValue, setChatboxInputValue] = useState<string>("");

    const onChatboxInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentUser !== undefined && currentUser.id.currentUserID !== undefined && chatId !== undefined) {
            let chat_id = chatId ?? "";
            let target_id = await getTargetID(chatId, currentUser.id.currentUserID);

            chat_id = await sendMessage(currentUser.id.currentUserID, target_id, chat_id, "text", chatboxInputValue);

            setChatboxInputValue("");
            update.setForceUpdate(forceUpdate => forceUpdate + 1);
            navigate("/home/" + chat_id);
        }     
    };

    const onChatboxInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setChatboxInputValue(e.currentTarget.value);
    };
    
    return (
        <div className="w-[75%] bg-white bottom-0 right-0 justify-end flex fixed border-l-2 border-blue-200">
            <div className="h-full w-full pt-2 pb-4 px-8">
                <form
                    onSubmit={onChatboxInputSubmit}
                >
                    <input
                        type="text"
                        id="base-input"
                        placeholder="say something..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[calc(100%-114px-4px-8px)] px-2.5 py-[9px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline-block align-top"
                        onChange={onChatboxInputChange}
                        value={chatboxInputValue}
                    />
                    <button
                        type="submit"
                        className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 ml-2 inline-flex justify-center justify-self-center w-114px"
                    >
                        <svg
                            className="mr-2 w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                        </svg>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
