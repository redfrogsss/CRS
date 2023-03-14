import axios from "axios";
import isChinese from "is-chinese";
import { getBackendURL } from "../context/BackendUrl";
import { createNewConversation } from "./createNewConversation";

export const sendMessage = async (user_id: string, target_id: string, chat_id: string, type: string = "text", message: string) => {
    // target_id means the second user id of the conversation

    const BackendURL = getBackendURL();

    return new Promise(async (resolve: (chat_id: string) => void, reject) => {
        try {
            // create new message via backend /message
            const query = new URL(BackendURL + "/message");
            if (user_id !== undefined)
                query.searchParams.append("user_id", user_id);
            if (chat_id === undefined || chat_id === "") {
                chat_id = await createNewConversation(user_id);
            }
            query.searchParams.append("chat_id", chat_id);

            query.searchParams.append("type", type);
            query.searchParams.append("content", message);

            await axios.post(query.href);

            // create record to /input_queue for recommender to handle
            const UrlWithQuery = new URL(BackendURL + "/input_queue");

            if (target_id !== "")
                UrlWithQuery.searchParams.append("user_id", target_id);
            if (chat_id !== "")
                UrlWithQuery.searchParams.append("chat_id", chat_id);
            UrlWithQuery.searchParams.append("message", message);
            UrlWithQuery.searchParams.append("language", isChinese(message) ? "ZH" : "EN");

            await axios.post(UrlWithQuery.href);
            resolve(chat_id);

        } catch (error) {
            console.error(error)
            reject(error);
        }
    })
}

