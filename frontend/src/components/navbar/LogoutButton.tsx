import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    
    const currentUser = useContext(CurrentUserContext);

    const onClickHandler = () => {
        currentUser?.id.setCurrentUserID(undefined);
        currentUser?.name.setCurrentUsername(undefined);
        navigate("/");
    }

    return (
        <button
            type="button"
            onClick={onClickHandler}
            className="text-slate-900 hover:bg-slate-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 my-2"
        >
            <svg fill="none" className="w-6 h-6" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
            </svg>
            <span className="sr-only">Logout</span>
        </button>
    );
}
