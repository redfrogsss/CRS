export default function NewConversationButton() {
    const onClickHandler = () => {
        // do something
    };

    return (
        <button
            type="button"
            onClick={() => {
                onClickHandler();
            }}
            className="text-slate-900 hover:bg-slate-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 my-2"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
            </svg>
            <span className="sr-only">New Conversation</span>
        </button>
    );
}
