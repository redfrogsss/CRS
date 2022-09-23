import AvatarIcon from "./AvatarIcon";

interface ChatHeaderInterface {
    username: string;
}

export default function ChatHeader({ username }: ChatHeaderInterface) {
    return (
        <h2 className="flex items-center justify-start text-lg w-full h-full mx-4">
            <AvatarIcon />
            {username}
        </h2>
    );
}
