import SystemImageChat from "./SystemImageChat";
import SystemRecommendChat from "./SystemRecommendChat";
import SystemTextChat from "./SystemTextChat";
import UserTextChat from "./UserTextChat";

interface conversation {
    chatMessages: any[];
    currentUserID: string;
    likeButtonHandler: (language: string) => void;
    dislikeButtonHandler: (language: string) => void;
    sendSampleTextHandler: (text: string) => void;
}

export default function ChatConversation({ chatMessages, currentUserID, likeButtonHandler, dislikeButtonHandler, sendSampleTextHandler }: conversation) {

    const displayChatMessages = (currentUserID: string) => {
        return chatMessages.map(
            (message: { user_id: number; content: string; created_at: string; type: string }, index: number) => {

                let message_user_id = message.user_id.toString();
                const isLastItem = (index === chatMessages.length - 1);
                const isImageType = (message.type === "image");
                const isTextType = (message.type === "text");
                const isRecommendType = (message.type === "recommend");
                const isUserChat = (message_user_id === currentUserID);

                if (isUserChat) {
                    return (<UserTextChat content={message.content} timestamp={message.created_at} />)
                } else {
                    // system chat
                    if (isLastItem) {
                        if (isTextType) {
                            return (<SystemTextChat content={message.content} timestamp={message.created_at} />)
                        } else if (isRecommendType) {
                            return (<SystemRecommendChat content={message.content} timestamp={message.created_at} likeButtonHandler={likeButtonHandler} dislikeButtonHandler={dislikeButtonHandler} />);
                        } else if (isImageType) {
                            return (<SystemImageChat url={message.content} timestamp={message.created_at} />)
                        }
                    } else {
                        if (isImageType) {
                            return (<SystemImageChat url={message.content} timestamp={message.created_at} />);
                        } else {
                            return (<SystemTextChat content={message.content} timestamp={message.created_at} />);
                        }
                    }
                }
            }
        );
    };

    const displayWelcomeScreen = () => {

        const exampleInputs = ["I am looking for scary and horror movie.", "I would like to watch a fantasy movie.", "有没有推荐的爱情电影?", "我想看喜剧电影"]

        const showExampleButton = () => {
            return exampleInputs.map((example)=>{
                return (
                    <button
                        type="button"
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => { sendSampleTextHandler(example) }}>
                        {example}
                    </button>
                )
            })
        }

        return (
            <div className="h-fit w-fit absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] prose lg:prose-xl text-center">
                <h1>CRS Web</h1>
                <p>A web-based conversational recommender system.</p>
                <small>Try this: </small><br />
                {showExampleButton()}
            </div>
        );
    }

    if (chatMessages.length === 0) {
        return (<>{displayWelcomeScreen()}</>)
    } else {
        return (<> {displayChatMessages(currentUserID)} </>)
    }

}