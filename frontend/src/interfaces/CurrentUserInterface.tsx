export interface CurrentUserInterface {
    id: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
    name: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
}