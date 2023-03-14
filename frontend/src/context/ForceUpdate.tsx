import { createContext, useState } from "react";

export interface ForceUpdateInterface {
    forceUpdate: number;
    setForceUpdate: React.Dispatch<React.SetStateAction<number>>;
}

const forceUpdate = 0;
const setForceUpdate: React.Dispatch<React.SetStateAction<number>> = () => {};

export const ForceUpdateContext = createContext<ForceUpdateInterface>({forceUpdate, setForceUpdate});