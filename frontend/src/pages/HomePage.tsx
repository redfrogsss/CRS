import AvatarIcon from "../components/chat/AvatarIcon";
import UserTextChat from "../components/chat/UserTextChat";
import SystemTextChat from "../components/chat/SystemTextChat";
import SystemRecommendChat from "../components/chat/SystemRecommendChat";
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
import ChatConversation from "../components/chat/ChatConversation";

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
                const isLastItem = (index === chatMessages.length - 1);
                const isImageType = (message.type === "image");
                const isTextType = (message.type === "text");
                const isRecommendType = (message.type === "recommend");
                const isUserChat = (message_user_id === currentUserID);

                if (isUserChat) {
                    return (<UserTextChat content={message.content} timestamp={message.created_at} />)
                } else {
                    // system chat
                    if (isLastItem) {
                        if (isTextType) {
                            return (<SystemTextChat content={message.content} timestamp={message.created_at} />)
                        } else if (isRecommendType) {
                            return (<SystemRecommendChat content={message.content} timestamp={message.created_at} likeButtonHandler={likeButtonHandler} dislikeButtonHandler={dislikeButtonHandler} />);
                        } else if (isImageType) {
                            return (<SystemImageChat url={message.content} timestamp={message.created_at} />)
                        }
                    } else {
                        if (isImageType) {
                            return (<SystemImageChat url={message.content} timestamp={message.created_at} />);
                        } else {
                            return (<SystemTextChat content={message.content} timestamp={message.created_at} />);
                        }
                    }
                }
            }
        );
    };

    // const createNewConversation = () => {
    //     const registerURL = new URL(BackendURL + "/register");
    //     const username =
    //         "SystemUser" + Math.floor(Math.random() * 99999).toString();
    //     registerURL.searchParams.append("email", username + "@crs.com");
    //     registerURL.searchParams.append("username", username);
    //     registerURL.searchParams.append("password", "123456");

    //     axios
    //         .post(registerURL.href)
    //         .then((response) => {
    //             if (response.data.error !== undefined) {
    //                 console.error(response.data.error);
    //                 return;
    //             }
    //             if (response.data.result === "success") {
    //                 let user_id = response.data.user_id;

    //                 const createChatURL = new URL(BackendURL + "/chat");
    //                 if (currentUserID !== undefined)
    //                     createChatURL.searchParams.append(
    //                         "user_a_id",
    //                         currentUserID
    //                     );
    //                 createChatURL.searchParams.append("user_b_id", user_id);

    //                 axios
    //                     .post(createChatURL.href)
    //                     .then((result) => {
    //                         if (result.data.result === "success") {
    //                             let chat_id = result.data.chat_id;
    //                             setForceUpdate(
    //                                 (forceUpdate) => forceUpdate + 1
    //                             );
    //                             navigate("/home/" + chat_id);
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         console.error(error);
    //                     });
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    const createNewConversation = async () => {

        return new Promise(async (resolve, reject) => {
            try {
                // Register new user for recommender

                const registerURL = new URL(BackendURL + "/register");
                const username =
                    "SystemUser" + Math.floor(Math.random() * 99999).toString();
                registerURL.searchParams.append("email", username + "@crs.com");
                registerURL.searchParams.append("username", username);
                registerURL.searchParams.append("password", "123456");

                let response = await axios.post(registerURL.href);

                if (response.data.error !== undefined) {
                    throw new Error(response.data.error);
                }
                if (response.data.result !== "success") {
                    throw new Error(response.data);
                }

                // Create new conversation

                let user_id = response.data.user_id;

                const createChatURL = new URL(BackendURL + "/chat");
                if (currentUserID !== undefined) {
                    createChatURL.searchParams.append("user_a_id", currentUserID);
                }
                createChatURL.searchParams.append("user_b_id", user_id);

                let result = await axios.post(createChatURL.href);

                if (result.data.result !== "success") {
                    throw new Error(result.data);
                }

                // Success action
                let chat_id = result.data.chat_id;
                resolve(chat_id);
                
            } catch (error) {
                // Error handling
                console.error(error);
                reject(error);
            }
        });

    }


    const sendMessage = async (user_id: string, chat_id: string, type: string = "text", message: string) => {
        try {

            // create new message via backend /message
            const query = new URL(BackendURL + "/message");
            if (currentUserID !== undefined)
                query.searchParams.append("user_id", user_id);
            if (chatIdState !== undefined)
                query.searchParams.append("chat_id", chat_id);
            query.searchParams.append("type", type);
            query.searchParams.append("content", message);

            let result = await axios.post(query.href);
            console.log(result.data);

            // create record to /input_queue for recommender to handle
            const UrlWithQuery = new URL(BackendURL + "/input_queue");

            if (currentUserID !== undefined)
                UrlWithQuery.searchParams.append("user_id", chatTargetID);
            if (chatIdState !== undefined)
                UrlWithQuery.searchParams.append("chat_id", chat_id);
            UrlWithQuery.searchParams.append("message", message);
            UrlWithQuery.searchParams.append("language", isChinese(message) ? "ZH" : "EN");

            let result2 = axios.post(UrlWithQuery.href);
            console.log(result.data);

            setChatboxInputValue("");
            setForceUpdate((forceUpdate) => forceUpdate + 1);

        } catch (error) {
            console.error(error)
        }
    }


    const likeButtonHandler = (language = "en") => {
        if (currentUserID !== undefined && chatIdState !== undefined)
            sendMessage(currentUserID, chatIdState, "text", (language == "zh" ? "我喜欢" : "I like it."));
    }

    const dislikeButtonHandler = (language = "en") => {
        if (currentUserID !== undefined && chatIdState !== undefined)
            sendMessage(currentUserID, chatIdState, "text", (language == "zh" ? "我不喜欢" : "I do not like it."));
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

        createNewConversation().then((chat_id) => {
            setForceUpdate(
                (forceUpdate) => forceUpdate + 1
            );
            navigate("/home/" + chat_id);
        }).catch((error) => {
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
                if (result.data.length === 0) {
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

                    if (user_a_id === currentUserID) {
                        setChatHeader(user_b_name);
                        setChatTargetID(user_b_id);
                    }
                    if (user_b_id === currentUserID) {
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
            delay().then(() => {
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
                <div className="h-[calc(100vh-56px)] overflow-scroll relative pb-12">
                    {/* {displayChatMessages(currentUserID === undefined ? "1" : currentUserID.toString())} */}
                    <ChatConversation chatMessages={chatMessages} currentUserID={currentUserID === undefined ? "1" : currentUserID.toString()} likeButtonHandler={likeButtonHandler} dislikeButtonHandler={dislikeButtonHandler} />
                </div>
                <ChatboxInput
                    onSubmitHandler={onChatboxInputSubmit}
                    onChangeHandler={onChatboxInputChange}
                    value={chatboxInputValue}
                />
                {/* end of conversation part in right panel */}
            </div>
        </div>
    );
}
