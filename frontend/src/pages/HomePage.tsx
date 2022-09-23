import AvatarIcon from "../components/chat/AvatarIcon";
import UserTextChat from "../components/chat/UserTextChat";
import SystemTextChat from "../components/chat/SystemTextChat";
// import SystemImageChat from "../components/chat/SystemImageChat";
// import ResponseButton from "../components/chat/ResponseButton";
import ChatboxInput from "../components/chat/ChatboxInput";
import ChatPreview from "../components/chat/ChatPreview";
import NewConversationButton from "../components/navbar/NewConversationButton";
import SettingButton from "../components/navbar/SettingButton";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../context/BackendUrl";
import { useNavigate, useParams } from "react-router-dom";
import { PageInterface } from "../interfaces/PageInterface";

export default function HomePage({
    currentUsername,
    setCurrentUsername,
    currentUserID,
    setCurrentUserID
}: PageInterface) {
    const navigate = useNavigate();

    const [chatPreview, setChatPreview] = useState<any>([]);
    const [chatMessages, setChatMessages] = useState<any>([]);

    const [chatboxInputValue, setChatboxInputValue] = useState<string>("");

    const [forceUpdate, setForceUpdate] = useState(0);

    const BackendURL = useContext(BackendUrl);

    const { chatId } = useParams();

    const displayChatPreview = () => {
        return chatPreview.map(
            (preview: { username: string; content: string }) => (
                <>
                    <ChatPreview
                        username={preview.username}
                        previewContent={preview.content}
                    />
                    <hr />
                </>
            )
        );
    };

    const displayChatMessages = () => {
        return chatMessages.map(
            (message: { user_id: number; content: string }) => (
                <>
                    {message.user_id === 1 ? (
                        <UserTextChat content={message.content} />
                    ) : (
                        <SystemTextChat content={message.content} />
                    )}
                </>
            )
        );
    };

    const onChatboxInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(chatboxInputValue);

        const UrlWithQuery = new URL(BackendURL + "/message");
        UrlWithQuery.searchParams.append("user_id", "1");
        UrlWithQuery.searchParams.append("chat_id", "1");
        UrlWithQuery.searchParams.append("type", "text");
        UrlWithQuery.searchParams.append("content", chatboxInputValue);

        axios
            .post(UrlWithQuery.href)
            .then((result) => {
                console.log(result.data);
                setChatboxInputValue("");
                setForceUpdate((forceUpdate) => forceUpdate + 1);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onChatboxInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setChatboxInputValue(e.currentTarget.value);
    };

    useEffect(() => {
        axios
            .get(BackendURL + "/chat")
            .then((result) => {
                setChatPreview(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [BackendURL]);

    useEffect(() => {
        axios
            .get(BackendURL + "/chatMessages/" + chatId)
            .then((result) => {
                // console.log(result.data);
                setChatMessages(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [chatId, BackendURL, forceUpdate]);

    useEffect(() => {
        if (currentUsername === undefined) {
            navigate("/login");
        }
    });

    return (
        <div className="grid grid-cols-4 divide-x-2 divide-blue-200 w-full h-[100vh] overflow-hidden">
            {/* Left Panel */}
            <div className="w-full">
                <div className="grid grid-cols-3 w-full h-[8vh]">
                    <div></div>
                    <div>
                        <h2 className="flex items-center justify-center text-2xl w-full h-full font-bold">
                            CRS Web
                        </h2>
                    </div>
                    <div className="justify-self-end">
                        <div className="flex items-center justify-center text-2xl w-full h-full font-bold">
                            <NewConversationButton />
                            <SettingButton />
                        </div>
                    </div>
                </div>
                <hr className="border-2 border-blue-200" />
                {/* <ChatPreview /> */}
                {displayChatPreview()}
                {/* <hr /> */}
            </div>
            {/* Right Panel */}
            <div className="w-full col-span-3">
                <div className="grid grid-cols-3 w-full h-[8vh]">
                    <div>
                        <h2 className="flex items-center justify-start text-lg w-full h-full mx-4">
                            <AvatarIcon />
                            CRS Bill Gates
                        </h2>
                    </div>
                    <div></div>
                    <div className="justify-self-end"></div>
                </div>
                <hr className="border-2 border-blue-200" />
                {/* conversation part in right panel */}
                <div className="h-[85vh] overflow-scroll relative">
                    {/* <UserTextChat />
                    <SystemTextChat />
                    <SystemImageChat />
                    <UserTextChat />
                    <SystemTextChat />
                    <ResponseButton /> */}

                    {displayChatMessages()}

                    <ChatboxInput
                        onSubmitHandler={onChatboxInputSubmit}
                        onChangeHandler={onChatboxInputChange}
                        value={chatboxInputValue}
                    />
                </div>
                {/* end of conversation part in right panel */}
            </div>
        </div>
    );
}
