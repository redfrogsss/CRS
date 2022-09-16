export default function SystemImageChat () {
    return (
        <div className="flex justify-start px-8 py-2">
            <div className="block px-4 pt-4 py-2 max-w-md rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 bg-blue-300">
                <img className="w-full h-[calc(100%-20px)] object-contain" src="/harry_potter.jpg" alt="movie poster"/>
                <p className="text-sm text-gray-400 text-right">
                    21:00
                </p>
            </div>
        </div>
    );
}
