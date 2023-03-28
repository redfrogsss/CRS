import ChatboxInput from "../components/chat/ChatboxInput";
import ChatPreview from "../components/chat/ChatPreview";
import NewConversationButton from "../components/navbar/NewConversationButton";
import SettingButton from "../components/navbar/SettingButton";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import ChatConversation from "../components/chat/ChatConversation";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { ChatIdContext } from "../context/ChatIdContext";
import { createNewConversation } from "../utils/createNewConversation";
import { ForceUpdateContext } from "../context/ForceUpdate";
import LogoutButton from "../components/navbar/LogoutButton";

export default function HomePage() {
    const navigate = useNavigate();

    const { chatId } = useParams();
    const [chatIdState, setChatIdState] = useState(chatId);
    const [forceUpdate, setForceUpdate] = useState(0);

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        // convert from url params to react state
        setChatIdState(chatId);

        // Login Protect
        loginProtect();
    }, [chatId]);

    const onNewConversationButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentUser === undefined || currentUser.id.currentUserID === undefined) {
            return;
        }
        createNewConversation(currentUser.id.currentUserID).then((chat_id) => {
            navigate("/home/" + chat_id);
        }).catch((error) => {
            console.error(error);
        });
    };

    const loginProtect = () => {
        if (currentUser === undefined || currentUser.id.currentUserID === undefined) {
            navigate("/login");
        }
    }

    return (
        <ForceUpdateContext.Provider value={{ forceUpdate, setForceUpdate }}>
            <ChatIdContext.Provider value={chatIdState}>
                <div className="grid grid-cols-4 divide-x-2 divide-blue-200 w-full h-fit overflow-hidden">
                    {/* Left Panel */}
                    <div className="w-full">
                        <div className="grid grid-cols-3 w-full min-h-[56px]">
                            <div></div>
                            <div>
                                <h2 className="flex items-center justify-center text-2xl w-full h-full font-bold">
                                    CRS Web
                                </h2>
                            </div>
                            <div className="justify-self-end">
                                <div className="flex items-center justify-center text-2xl w-full h-full font-bold">
                                    <NewConversationButton
                                        onClickHandler={onNewConversationButtonClick}
                                    />
                                    <SettingButton />
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
                        <hr className="border-2 border-blue-200" />
                        <div className="overflow-scroll h-[calc(100vh-56px-4px)]">
                            <ChatPreview />
                        </div>
                    </div>
                    {/* Right Panel */}
                    <div className="w-full col-span-3">
                        <div className="grid grid-cols-3 w-full min-h-[56px]">
                            <div>
                                <ChatHeader />
                            </div>
                            <div></div>
                            <div className="justify-self-end"></div>
                        </div>
                        <hr className="border-2 border-blue-200" />
                        {/* conversation part in right panel */}
                        <div className="h-[calc(100vh-56px-4px)] overflow-scroll relative pb-12">
                            <ChatConversation />
                        </div>
                        <ChatboxInput />
                        {/* end of conversation part in right panel */}
                    </div>
                </div>
            </ChatIdContext.Provider>
        </ForceUpdateContext.Provider>
    );
}
