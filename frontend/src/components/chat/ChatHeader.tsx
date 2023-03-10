import AvatarIcon from "./AvatarIcon";

interface ChatHeaderInterface {
    username: string;
}

export default function ChatHeader({ username }: ChatHeaderInterface) {

    const isEmpty = (username === "");

    // display content only if there is username
    const Content = () => {
        if (isEmpty) {
            return <></>
        } else {
            return <>
                <AvatarIcon />
                {username}
            </>
        }
    }

    return (
        <h2 className="flex items-center justify-start text-lg w-full h-full mx-4">
            <Content />
        </h2>
    );
}
