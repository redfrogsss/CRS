import { useNavigate } from "react-router-dom";

interface ChatPreviewInterface {
    username: string;
    previewContent: string;
    chat_id: string;
}

export default function ChatPreview({
    username,
    previewContent,
    chat_id,
}: ChatPreviewInterface) {
    const navigate = useNavigate();

    const href = "/home/" + chat_id;

    return (
        <div className="mt-4 mb-2 mx-4">
            <a
                href={href} // temp
                className="grid grid-cols-4"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                }}
            >
                <div className="inline-block">
                    <img
                        className="p-1 object-cover rounded-full ring-2 ring-gray-300 h-16 w-16 mx-4"
                        src="/img/user.png"
                        alt="Bordered avatar"
                    />
                </div>
                <div className="inline-block align-top col-span-3">
                    <div className="font-bold">{username}</div>
                    <div className="truncate">{previewContent}</div>
                </div>
            </a>
        </div>
    );
}
