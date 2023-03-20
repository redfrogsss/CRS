interface SystemImageChatInterface {
    url: string;
    timestamp: string;
}

export default function SystemImageChat({
    url,
    timestamp,
}: SystemImageChatInterface) {
    return (
        <div className="flex justify-start px-8 py-2">
            <div className="block px-4 pt-4 py-2 max-w-md h-fit rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 bg-blue-300">
                <img
                    className="w-full h-[calc(100%-20px)] max-h-[50vh] object-contain rounded"
                    src={url}
                    alt="Movie Poster"
                    title="Movie Poster"
                />
                <p className="text-sm text-gray-400 text-right mt-2">{timestamp}</p>
            </div>
        </div>
    );
}
