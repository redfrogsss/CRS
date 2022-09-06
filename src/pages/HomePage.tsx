import AvatarIcon from "../components/chat/AvatarIcon";
import NewConversationButton from "../components/navbar/NewConversationButton";
import SettingButton from "../components/navbar/SettingButton";

export default function HomePage() {
    return (
        <div className="grid grid-cols-3 divide-x-2 divide-blue-200 w-full h-[100vh]">
            {/* Left Panel */}
            <div className="w-full">
                <div className="grid grid-cols-3 w-full h-14">
                    <div></div>
                    <div>
                        <h2 className="flex items-center justify-center text-2xl w-full h-full font-bold">
                            CRS Web
                        </h2>
                    </div>
                    <div className="justify-self-end">
                        <NewConversationButton />
                        <SettingButton />
                    </div>
                </div>
                <hr className="border-1 border-blue-200" />
            </div>
            {/* Right Panel */}
            <div className="w-full col-span-2">
                <div className="grid grid-cols-3 w-full h-14">
                    <div>
                        <h2 className="flex items-center justify-start text-lg w-full h-full mx-4">
                            <AvatarIcon />
                            CRS Bill Gates
                        </h2>
                    </div>
                    <div></div>
                    <div className="justify-self-end"></div>
                </div>
                <hr className="border-1 border-blue-200" />
            </div>
        </div>
    );
}
