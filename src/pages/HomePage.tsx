import AvatarIcon from "../components/chat/AvatarIcon";
import NewConversationButton from "../components/navbar/NewConversationButton";
import SettingButton from "../components/navbar/SettingButton";

export default function HomePage() {
    return (
        <div className="grid grid-cols-4 divide-x-2 divide-blue-200 w-full h-[100vh]">
            {/* Left Panel */}
            <div className="w-full">
                <div className="grid grid-cols-3 w-full h-[8%]">
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
                {/* clickable chat preview */}
                <div className="mt-4 mb-2 mx-2">
                    <a
                        href="#"
                        onClick={() => {
                            return;
                        }}
                    >
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
            <div className="w-full col-span-3">
                <div className="grid grid-cols-3 w-full h-[8%]">
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
                <div className="h-[83%]">
                    <p></p>
                </div>
                {/* end of conversation part in right panel */}

                {/* chatbox part in right panel */}
                <div className="h-[8%]">
                    <div className="h-full w-full p-4">
                        <input
                            type="text"
                            id="base-input"
                            placeholder="say something..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[calc(100%-114px-4px-8px)] px-2.5 py-[9px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline-block align-top"
                        />
                        <button
                            type="submit"
                            className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 ml-2 inline-flex justify-center justify-self-center w-114px"
                        >
                            <svg
                                className="mr-2 -ml-1 w-6 h-6"
                                fill="none"
                                role="img"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                ></path>
                            </svg>
                            Sign In
                        </button>
                    </div>
                </div>
                {/* end of chatbox part in right panel */}
            </div>
        </div>
    );
}
