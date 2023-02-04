import isChinese from "is-chinese";

interface SystemRecommendChatInterface {
    content: string;
    timestamp: string;
    likeButtonHandler: ()=>void;
    dislikeButtonHandler: ()=>void;
}

export default function SystemRecommendChat({ content, timestamp, likeButtonHandler, dislikeButtonHandler }: SystemRecommendChatInterface) {

    console.log(content, isChinese(content))

    return (
        <>
            <div className="flex justify-start px-8 py-2">
                <div className="block px-4 pt-4 py-2 max-w-md rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 bg-blue-300">
                    <p className="font-normal text-gray-700 dark:text-gray-400 break-words whitespace-pre-line">
                        {content}
                    </p>
                    <p className="text-sm text-gray-400 text-right">{timestamp}</p>
                </div>
            </div>
            <div className="flex justify-start px-8 py-2">
                <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={()=>{likeButtonHandler()}}>{(isChinese(content) ? "我喜欢" : "I like it")}</button>
                <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={()=> {dislikeButtonHandler()}}>{(isChinese(content) ? "我不喜欢" : "I do not like it")}</button>
            </div>
        </>
    );
}
