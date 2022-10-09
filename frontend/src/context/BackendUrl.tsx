import { createContext } from "react";

const isProduction = (): boolean => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        // dev code
        return false;
    } else {
        // production code
        return true;
    }
};

const getBackendURL = (): string => {
    if (isProduction() === true) {
        // if (!process.env.REACT_APP_PROD_API_URL) {
        //     console.error("Environment Variable not found. Did you define environment variable in docker / docker-compose?");
        //     return "";
        // }
        // return process.env.REACT_APP_PROD_API_URL;
        return "http://backend:3001"; // temp hardcode
    } else {
        // if(!process.env.REACT_APP_API_URL) {
        //     console.error("Environment Variable not found. Did you create a .env file in the root folder?");
        //     return "";
        // }
        // return process.env.REACT_APP_API_URL;
        return "http://192.168.0.30:3001"; // temp hardcode
    }
};

export const BackendUrl = createContext(getBackendURL());
