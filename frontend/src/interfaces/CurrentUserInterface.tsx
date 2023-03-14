export interface CurrentUserInterface {
    id: {currentUserID: string | undefined, setCurrentUserID: React.Dispatch<React.SetStateAction<string | undefined>>};
    name: {currentUsername: string | undefined, setCurrentUsername: React.Dispatch<React.SetStateAction<string | undefined>>};
}