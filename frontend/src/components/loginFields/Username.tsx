interface UsernameFieldInterface {
    onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>,
    value?: string
}

export default function UsernameField({onChangeHandler, value} : UsernameFieldInterface) {
    return (
        <div>
            <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                Username
            </label>
            <input
                type="username"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Jacky"
                onChange={onChangeHandler}
                value={value}
                required
            />
        </div>
    );
}
