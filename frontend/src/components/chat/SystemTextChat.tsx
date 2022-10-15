interface SystemTextChatInterface {
    content: string;
    timestamp: string;
}

export default function SystemTextChat({ content, timestamp }: SystemTextChatInterface) {
    return (
        <div className="flex justify-start px-8 py-2">
            <div className="block px-4 pt-4 py-2 max-w-md rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 bg-blue-300">
                <p className="font-normal text-gray-700 dark:text-gray-400 break-words whitespace-pre-line">
                    {content}
                </p>
                <p className="text-sm text-gray-400 text-right">{timestamp}</p>
            </div>
        </div>
    );
}
