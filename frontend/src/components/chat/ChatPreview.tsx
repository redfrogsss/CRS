import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../../context/BackendUrl";
import { ChatIdContext } from "../../context/ChatIdContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function ChatPreview() {
    const navigate = useNavigate();

    const [chatPreview, setChatPreview] = useState<any>([]);

    const currentUser = useContext(CurrentUserContext);
    const BackendURL = useContext(BackendUrl);
    const chatId = useContext(ChatIdContext);

    const getChatPreview = async () => {
        
        try {
            if (currentUser === undefined) {
                return;
            }
            if (currentUser.id.currentUserID === undefined) {
                return;
            }

            const requestURL = new URL(BackendURL + "/chatPreview");
            requestURL.searchParams.append("user_id", currentUser.id.currentUserID);
            let result = await axios.get(requestURL.href);
            if (result.data.length === 0) {
                throw new Error("/chatPreview return undefined");
            } else {
                setChatPreview(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    // update chat preview every second
    useEffect(() => {
        getChatPreview();

        const interval = setInterval(() => {
            getChatPreview();
        }, 1000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [chatId])

    return chatPreview.map(
        (preview: {
            username: string;
            content: string;
            chat_id: string;
        }, index: number) =>(

            <div key={index}>
                <div className="mt-4 mb-2 mx-4">
                    <a
                        href={"/home/" + preview.chat_id}
                        title={preview.username}
                        className="grid grid-cols-4"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/home/" + preview.chat_id);
                        }}
                    >
                        <div className="inline-block">
                            <img
                                className="p-1 object-cover rounded-full ring-2 ring-gray-300 h-16 w-16 mx-4"
                                src="/img/user.png"
                                alt="Bordered avatar"
                            />
                        </div>
                        <div className="inline-block align-top col-span-3">
                            <div className="font-bold">{preview.username}</div>
                            <div className="truncate">{preview.content}</div>
                        </div>
                    </a>
                </div>
                <hr />
            </div>
            
        )
    );
}
