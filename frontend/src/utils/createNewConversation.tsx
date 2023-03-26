import axios from "axios";
import { getBackendURL } from "../context/BackendUrl";
export const createNewConversation = async (currentUserID: string) => {

    const BackendURL = getBackendURL();

    return new Promise(async (resolve: (chat_id: string) => void, reject) => {
        try {
            // Register new user for recommender

            const registerURL = new URL(BackendURL + "/register");
            const username =
                "Movie Recommender " + Math.floor(Math.random() * 99999).toString();
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
