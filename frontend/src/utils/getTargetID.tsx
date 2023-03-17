import axios from "axios";
import { getBackendURL } from "../context/BackendUrl";

export const getTargetID = async (chat_id: string, user_id: string) => {
    return new Promise(async (resolve: (chat_id: string) => void, reject) => {

        try {
            let result = await axios.get(getBackendURL() + "/chat/" + chat_id);
            if (result.data.error !== undefined) {
                console.error(result.data.error);
            } else {
                let user_a_id = result.data.user_a_id;
                let user_b_id = result.data.user_b_id;

                if (user_a_id === user_id) {
                    resolve(user_b_id);
                }
                if (user_b_id === user_id) {
                    resolve(user_a_id);
                }
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}