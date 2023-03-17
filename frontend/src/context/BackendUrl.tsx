import { createContext, useContext } from "react";

const isProduction = (): boolean => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        // dev code
        return false;
    } else {
        // production code
        return true;
    }
};

export const getBackendURL = (): string => {
    if (isProduction() === true) {
        // if (!process.env.REACT_APP_PROD_API_URL) {
        //     console.error("Environment Variable not found. Did you define environment variable in docker / docker-compose?");
        //     return "";
        // }
        return "http://" + window.location.hostname + ":3001/api";
    } else {
        // if(!process.env.REACT_APP_API_URL) {
        //     console.error("Environment Variable not found. Did you create a .env file in the root folder?");
        //     return "";
        // }
        // return process.env.REACT_APP_API_URL;
        return "http://192.168.0.37:3001/api"; // temp hardcode
    }
};

export const BackendUrl = createContext(getBackendURL());