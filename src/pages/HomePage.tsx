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
                {/* clickable chat preview */}
                <div className="mt-4 mb-2 mx-2">
                    <a href="#" onClick={()=>{return;}}>
                        <div className="inline-block">
                            <img
                                className="p-1 object-cover rounded-full ring-2 ring-gray-300 dark:ring-gray-500 h-16 w-16 mx-4"
                                src="/img/user.png"
                                alt="Bordered avatar"
                            />
                        </div>
                        <div className="inline-block align-top">
                            <div className="font-bold">CRS Bill Gates</div>
                            <div>You: Sounds Good, Thanks.</div>
                        </div>
                    </a>
                </div>
                {/* end of clickable chat preview */}
                <hr />
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
