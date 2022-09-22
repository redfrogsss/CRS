interface EmailFieldInterface {
    onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>,
    value?: string
}

export default function EmailField({onChangeHandler, value} : EmailFieldInterface) {
    return (
        <div>
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                Email Address
            </label>
            <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@example.com"
                onChange={onChangeHandler}
                value={value}
                required
            />
        </div>
    );
}
