import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../../context/BackendUrl";
import { ChatIdContext } from "../../context/ChatIdContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { getTargetID } from "../../utils/getTargetID";
import { sendMessage } from "../../utils/sendMessage";
import SystemImageChat from "./SystemImageChat";
import SystemRecommendChat from "./SystemRecommendChat";
import SystemTextChat from "./SystemTextChat";
import UserTextChat from "./UserTextChat";

export default function ChatConversation() {

    const navigate = useNavigate();

    const [chatMessages, setChatMessages] = useState<any>([]);

    const BackendURL = useContext(BackendUrl);
    const chatId = useContext(ChatIdContext);
    const currentUser = useContext(CurrentUserContext);

    const getChatMessage = async () => {
        try {
            let result = await axios.get(BackendURL + "/chatMessages/" + chatId)
            setChatMessages(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    // update chat message every second
    useEffect(() => {
        getChatMessage();

        const interval = setInterval(() => {
            getChatMessage();
        }, 1000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [chatId])
    
    const likeButtonHandler = async (language = "en") => {
        if (currentUser !== undefined && currentUser.id.currentUserID !== undefined &&  chatId !== undefined) {
            let target_id = await getTargetID(chatId, currentUser.id.currentUserID);

            let message = (language === "zh" ? "我喜欢" : "I like it.");

            sendMessage(currentUser.id.currentUserID, target_id, chatId, "text", message);
        }
    }

    const dislikeButtonHandler = async (language = "en") => {
        if (currentUser !== undefined && currentUser.id.currentUserID !== undefined && chatId !== undefined) {
            let target_id = await getTargetID(chatId, currentUser.id.currentUserID);

            let message = (language === "zh" ? "我不喜欢" : "I do not like it.");

            sendMessage(currentUser.id.currentUserID, target_id, chatId, "text", message);
        }
    }

    const sendSampleTextHandler = async (message:string) => {

        if (currentUser !== undefined && currentUser.id.currentUserID !== undefined) {

            let target_id = undefined;

            let chat_id = chatId ?? "";
            if(chat_id !== "") {
                target_id = await getTargetID(chat_id, currentUser.id.currentUserID);
            }

            chat_id = await sendMessage(currentUser.id.currentUserID, target_id ?? "", chat_id, "text", message);
            navigate("/home/" + chat_id);
        }
    }


    const ChatMessages = () => {
        return chatMessages.map(
            (message: { user_id: number; content: string; created_at: string; type: string }, index: number) => {

                if (currentUser === undefined) return;

                let message_user_id = message.user_id.toString();
                const isLastItem = (index === chatMessages.length - 1);
                const isImageType = (message.type === "image");
                const isTextType = (message.type === "text");
                const isRecommendType = (message.type === "recommend");
                const isUserChat = (message_user_id === currentUser.id.currentUserID?.toString());

                if (isUserChat) {
                    return (<UserTextChat content={message.content} timestamp={message.created_at} key={index}/>)
                } else {
                    // system chat
                    if (isLastItem) {
                        if (isTextType) {
                            return (<SystemTextChat content={message.content} timestamp={message.created_at} key={index}/>)
                        } else if (isRecommendType) {
                            return (<SystemRecommendChat content={message.content} timestamp={message.created_at} likeButtonHandler={likeButtonHandler} dislikeButtonHandler={dislikeButtonHandler} key={index}/>);
                        } else if (isImageType) {
                            return (<SystemImageChat url={message.content} timestamp={message.created_at} key={index}/>)
                        }
                    } else {
                        if (isImageType) {
                            return (<SystemImageChat url={message.content} timestamp={message.created_at} key={index}/>);
                        } else {
                            return (<SystemTextChat content={message.content} timestamp={message.created_at} key={index}/>);
                        }
                    }
                }
            }
        );
    };

    const WelcomeScreen = () => {

        const exampleInputs = ["I am looking for scary and horror movie.", "I would like to watch a fantasy movie.", "有没有推荐的爱情电影?", "我想看喜剧电影"]

        const showExampleButton = () => {
            return exampleInputs.map((example, index)=>{
                return (
                    <button
                        type="button"
                        key={index}
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => { sendSampleTextHandler(example) }}>
                        {example}
                    </button>
                )
            })
        }

        return (
            <div className="h-fit w-fit absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] prose lg:prose-xl text-center">
                <h1>CRS Web</h1>
                <p>A web-based conversational recommender system.</p>
                <small>Try this: </small><br />
                {showExampleButton()}
            </div>
        );
    }

    if (chatMessages.length === 0) {
        return (<WelcomeScreen />);
    } else {
        return (<ChatMessages />);
    }

}