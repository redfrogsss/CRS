import AvatarIcon from "../components/chat/AvatarIcon";
import UserTextChat from "../components/chat/UserTextChat";
import SystemTextChat from "../components/chat/SystemTextChat";
import SystemImageChat from "../components/chat/SystemImageChat";
import ResponseButton from "../components/chat/ResponseButton";
import ChatboxInput from "../components/chat/ChatboxInput";
import ChatPreview from "../components/chat/ChatPreview";
import NewConversationButton from "../components/navbar/NewConversationButton";
import SettingButton from "../components/navbar/SettingButton";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../context/BackendUrl";

export default function HomePage() {
    const [chatPreview, setChatPreview] = useState<any>([]);

    const BackendURL = useContext(BackendUrl);

    const displayChatPreview = () => {
        return chatPreview.map((preview: { username: string; content: string; }) => (
            <ChatPreview username={preview.username} previewContent={preview.content} />
        ))
    }

    useEffect(() => {
        axios
            .get(BackendURL + "/chat")
            .then((result) => {
                console.log(result.data);
                setChatPreview(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                <hr />
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
                    <UserTextChat />
                    <SystemTextChat />
                    <SystemImageChat />
                    <UserTextChat />
                    <SystemTextChat />
                    <ResponseButton />

                    <ChatboxInput />
                </div>
                {/* end of conversation part in right panel */}
            </div>
        </div>
    );
}
