export interface PageInterface {
    currentUsername?: string;
    setCurrentUsername?: React.Dispatch<
        React.SetStateAction<string | undefined>
    >;
    currentUserID?: string;
    setCurrentUserID?: React.Dispatch<React.SetStateAction<string | undefined>>;
}
