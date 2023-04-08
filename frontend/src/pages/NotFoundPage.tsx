import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {

    const location = useLocation();

    return (
        <div className="bg-slate-300 w-[100%] h-[100vh] flex content-center place-content-around justify-center justify-self-center">
            <div className="p-4 w-full m-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 justify-center justify-self-center">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    Page Not Found.
                </h5>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    <p className="my-2">
                        Are you sure you are in the correct page? <br />
                        <Link to="/" className="text-sky-600 underline">Back to Home Page</Link>
                    </p>
                    <div className="text-xs">
                        (Current Pathname: {location.pathname})
                    </div>
                </div>
            </div>
        </div>
    );
}
