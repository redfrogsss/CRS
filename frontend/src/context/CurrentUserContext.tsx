import { createContext } from "react";
import { CurrentUserInterface } from "../interfaces/CurrentUserInterface";

export const CurrentUserContext = createContext<CurrentUserInterface | undefined>(undefined);