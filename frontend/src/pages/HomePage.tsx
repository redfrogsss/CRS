import AvatarIcon from "../components/chat/AvatarIcon";
import UserTextChat from "../components/chat/UserTextChat";
import SystemTextChat from "../components/chat/SystemTextChat";
import SystemRecommendChat from "../components/chat/SystemRecommendChat";
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
import ChatHeader from "../components/chat/ChatHeader";
import SystemImageChat from "../components/chat/SystemImageChat";
import isChinese from "is-chinese";

export default function HomePage({
    currentUsername,
    setCurrentUsername,
    currentUserID,
    setCurrentUserID,
}: PageInterface) {
    const navigate = useNavigate();

    const [chatPreview, setChatPreview] = useState<any>([]);
    const [chatMessages, setChatMessages] = useState<any>([]);
    const [chatHeader, setChatHeader] = useState<string>("");
    const [chatTargetID, setChatTargetID] = useState<string>("");

    const [chatboxInputValue, setChatboxInputValue] = useState<string>("");

    const [forceUpdate, setForceUpdate] = useState(0);

    const BackendURL = useContext(BackendUrl);

    const { chatId } = useParams();
    const [chatIdState, setChatIdState] = useState(chatId);

    const [messageUpdate, setMessageUpdate] = useState(true);
    useEffect(() => {
        setChatIdState(chatId);
    }, [chatId]);

    const displayChatPreview = () => {
        return chatPreview.map(
            (preview: {
                username: string;
                content: string;
                chat_id: string;
            }) => (
                <>
                    <ChatPreview
                        username={preview.username}
                        previewContent={preview.content}
                        chat_id={preview.chat_id}
                    />
                    <hr />
                </>
            )
        );
    };


    const displayChatMessages = (currentUserID: string) => {
        return chatMessages.map(
              (message: { user_id: number; content: string; created_at: string; type: string }, index: number) => {
                let message_user_id = message.user_id.toString();
                if (message_user_id === currentUserID) {
                    return (
                        <UserTextChat content={message.content} timestamp={message.created_at} />
                    )
                } else {
                    if(index === chatMessages.length - 1) {
                        if (message.type === "text") {
                            return (
                                <>
                                    <SystemTextChat content={message.content} timestamp={message.created_at} />
                                </>
                            )
                        } else if (message.type === "recommend") {
                            return (
                                <>
                                    <SystemRecommendChat content={message.content} timestamp={message.created_at} likeButtonHandler={likeButtonHandler} dislikeButtonHandler={dislikeButtonHandler}/>
                                </>
                            );
                        } else if (message.type === "image") {
                            console.log("hv image here")
                            return (
                                <>
                                    <SystemImageChat url={message.content} timestamp={message.created_at}/>
                                </>
                            )
                        }
                        
                    } else {
                        if (message.type === "image") {
                            return (
                                <>
                                    <SystemImageChat
                                        url={message.content}
                                        timestamp={message.created_at}
                                    />
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <SystemTextChat
                                        content={message.content}
                                        timestamp={message.created_at}
                                    />
                                </>
                            );
                        }
                    }
                }
            }
        );
    };

    const sendMessage = (user_id: string, chat_id: string, type:string = "text", message: string) => {
        const UrlWithQuery = new URL(BackendURL + "/message");
        if (currentUserID !== undefined)
            UrlWithQuery.searchParams.append("user_id", user_id);
        if (chatIdState !== undefined)
            UrlWithQuery.searchParams.append("chat_id", chat_id);
        UrlWithQuery.searchParams.append("type", type);
        UrlWithQuery.searchParams.append("content", message);

        axios
            .post(UrlWithQuery.href)
            .then((result) => {
                console.log(result.data);

                const UrlWithQuery = new URL(BackendURL + "/input_queue");

                if (currentUserID !== undefined)
                    UrlWithQuery.searchParams.append("user_id", chatTargetID);
                if (chatIdState !== undefined)
                    UrlWithQuery.searchParams.append("chat_id", chat_id);
                UrlWithQuery.searchParams.append("message", message);
                UrlWithQuery.searchParams.append("language", isChinese(message) ? "ZH" : "EN");
                console.log("language: ", isChinese(message))

                axios.post(UrlWithQuery.href).then((result) => {
                    console.log(result.data);
                    setChatboxInputValue("");
                    setForceUpdate((forceUpdate) => forceUpdate + 1);
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const likeButtonHandler = (language = "en") => {
        if (currentUserID !== undefined && chatIdState !== undefined)
            sendMessage(currentUserID, chatIdState, "text", (language == "zh" ? "我喜欢" : "I like it."));
    }

    const dislikeButtonHandler = (language = "en") => {
        if (currentUserID !== undefined && chatIdState !== undefined)
            sendMessage(currentUserID, chatIdState, "text", (language == "zh" ?  "我不喜欢" : "I do not like it."));
    }

    const onChatboxInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(chatboxInputValue);

        const UrlWithQuery = new URL(BackendURL + "/message");
        if (currentUserID !== undefined)
            UrlWithQuery.searchParams.append("user_id", currentUserID);
        if (chatIdState !== undefined)
            UrlWithQuery.searchParams.append("chat_id", chatIdState);
        UrlWithQuery.searchParams.append("type", "text");
        UrlWithQuery.searchParams.append("content", chatboxInputValue);

        axios
            .post(UrlWithQuery.href)
            .then((result) => {
                console.log(result.data);

                const UrlWithQuery = new URL(BackendURL + "/input_queue");

                if (currentUserID !== undefined)
                    UrlWithQuery.searchParams.append("user_id", chatTargetID);
                if (chatIdState !== undefined)
                    UrlWithQuery.searchParams.append("chat_id", chatIdState);
                UrlWithQuery.searchParams.append("message", chatboxInputValue);
                UrlWithQuery.searchParams.append("language", isChinese(chatboxInputValue) ? "ZH" : "EN");

                axios.post(UrlWithQuery.href).then((result) => {
                    console.log(result.data);
                    setChatboxInputValue("");
                    setForceUpdate((forceUpdate) => forceUpdate + 1);
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onChatboxInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setChatboxInputValue(e.currentTarget.value);
    };

    const onNewConversationButtonClick = (e: React.MouseEvent) => {
        const registerURL = new URL(BackendURL + "/register");
        const username =
            "SystemUser" + Math.floor(Math.random() * 99999).toString();
        registerURL.searchParams.append("email", username + "@crs.com");
        registerURL.searchParams.append("username", username);
        registerURL.searchParams.append("password", "123456");

        axios
            .post(registerURL.href)
            .then((response) => {
                if (response.data.error !== undefined) {
                    console.error(response.data.error);
                    return;
                }
                if (response.data.result === "success") {
                    let user_id = response.data.user_id;

                    const createChatURL = new URL(BackendURL + "/chat");
                    if (currentUserID !== undefined)
                        createChatURL.searchParams.append(
                            "user_a_id",
                            currentUserID
                        );
                    createChatURL.searchParams.append("user_b_id", user_id);

                    axios
                        .post(createChatURL.href)
                        .then((result) => {
                            if (result.data.result === "success") {
                                let chat_id = result.data.chat_id;
                                setForceUpdate(
                                    (forceUpdate) => forceUpdate + 1
                                );
                                navigate("/home/" + chat_id);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (currentUserID === undefined) {
            return;
        }
        const requestURL = new URL(BackendURL + "/chatPreview");
        requestURL.searchParams.append("user_id", currentUserID);
        axios
            .get(requestURL.href)
            .then((result) => {
                if(result.data.length === 0) {
                    console.error("/chatPreview return undefined");
                } else {
                    setChatPreview(result.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [BackendURL, forceUpdate]);

    useEffect(() => {
        axios
            .get(BackendURL + "/chatMessages/" + chatId)
            .then((result) => {
                setChatMessages(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [chatId, BackendURL, forceUpdate]);

    useEffect(() => {
        axios
            .get(BackendURL + "/chat/" + chatId)
            .then((result) => {
                if (result.data.error !== undefined) {
                    console.error(result.data.error);
                } else {
                    let user_a_name = result.data.user_a_name;
                    let user_b_name = result.data.user_b_name;
                    let user_a_id = result.data.user_a_id;
                    let user_b_id = result.data.user_b_id;

                    if(user_a_id === currentUserID) {
                        setChatHeader(user_b_name);
                        setChatTargetID(user_b_id);
                    }
                    if(user_b_id === currentUserID) {
                        setChatHeader(user_a_name);
                    }
                }
            })
            .catch((error) => {
                console.error();
            });
    });

    useEffect(() => {
        if (currentUsername === undefined) {
            navigate("/login");
        }
    });

    // force update for chat message update
    useEffect(() => {
        const delay = () => {
            return new Promise(resolve => setTimeout(resolve, 1000));
        }

        const messageUpdate = () => {
            delay().then(()=>{
                setForceUpdate((forceUpdate) => forceUpdate + 1);
                messageUpdate();
            })
        }

        messageUpdate();

    }, [])

    return (
        <div className="grid grid-cols-4 divide-x-2 divide-blue-200 w-full h-[100vh] overflow-hidden">
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
                        </div>
                    </div>
                </div>
                <hr className="border-2 border-blue-200" />
                <div className="overflow-scroll h-[95vh]">
                    {displayChatPreview()}
                </div>
            </div>
            {/* Right Panel */}
            <div className="w-full col-span-3">
                <div className="grid grid-cols-3 w-full min-h-[56px]">
                    <div>
                        <ChatHeader username={chatHeader} />
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

                    {displayChatMessages(currentUserID === undefined ? "1" : currentUserID.toString())}

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
