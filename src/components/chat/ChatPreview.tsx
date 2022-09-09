export default function ChatPreview () {
    return (
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
    );
}
