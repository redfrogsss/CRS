import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BackendUrl } from "../../context/BackendUrl";
import { ChatIdContext } from "../../context/ChatIdContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import AvatarIcon from "./AvatarIcon";

export default function ChatHeader() {

    const [chatHeader, setChatHeader] = useState<string>("");

    const currentUser = useContext(CurrentUserContext);
    const BackendURL = useContext(BackendUrl);
    const chatId = useContext(ChatIdContext);

    const isEmpty = (chatHeader === "");

    const getChatInfo = async () => {
        try {
            if(currentUser === undefined) {
                return;
            }
            if(chatId === ""){
                return;
            }
            let result = await axios.get(BackendURL + "/chat/" + chatId);
            if (result.data.error !== undefined) {
                console.error(result.data.error);
            } else {
                let user_a_name = result.data.user_a_name;
                let user_b_name = result.data.user_b_name;
                let user_a_id = result.data.user_a_id;
                let user_b_id = result.data.user_b_id;

                if (user_a_id === currentUser.id.currentUserID) {
                    setChatHeader(user_b_name);
                }
                if (user_b_id === currentUser.id.currentUserID) {
                    setChatHeader(user_a_name);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // display content only if there is username
    const Content = () => {
        if (isEmpty) {
            return <></>
        } else {
            return <>
                <AvatarIcon />
                {chatHeader}
            </>
        }
    }

    // force update for update
    useEffect(() => {
        getChatInfo();
    }, [chatId]);

    return (
        <h2 className="flex items-center justify-start text-lg w-full h-full mx-4">
            <Content />
        </h2>
    );
}
