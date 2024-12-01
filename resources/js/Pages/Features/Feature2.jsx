import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Feature2({ feature2, answer }) {
    const { auth } = usePage().props;
    const available_credits = auth.user.available_credits;

    const { data, setData, post, processing, errors, reset } = useForm({
        first_value: "",
        second_value: "",
    });

    const submitForm = (e) => {
        e.preventDefault();

        post(route("feature2.substraction"), {
            onSuccess: () => reset(),
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Feature 2
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center">
                            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
                                {/* Header */}
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
                                    {feature2.name}
                                </h1>
                                <p className="text-center text-gray-600 dark:text-gray-400">
                                    {feature2.description} <br />
                                    <span className="font-semibold">
                                        ({feature2.required_credits} credits
                                        required)
                                    </span>
                                </p>

                                {/* Result Section */}
                                {answer !== null && (
                                    <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg text-center">
                                        <strong>Result of Calculation:</strong>{" "}
                                        {answer}
                                    </div>
                                )}

                                {/* Insufficient Credits Warning */}
                                {(available_credits === 0 ||
                                    available_credits <
                                        feature2.required_credits) && (
                                    <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg text-center">
                                        <p>
                                            You do not have enough credits to
                                            use this feature.
                                        </p>
                                        <a
                                            href={route("purchase")}
                                            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        >
                                            Get More Credits
                                        </a>
                                    </div>
                                )}

                                {/* Form */}
                                <form
                                    onSubmit={submitForm}
                                    className="space-y-6"
                                >
                                    {/* First Value Input */}
                                    <div>
                                        <InputLabel
                                            htmlFor="firstValue"
                                            value="First Value"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        />
                                        <TextInput
                                            type="number"
                                            id="firstValue"
                                            name="first_value"
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                            value={data.first_value}
                                            onInput={(e) =>
                                                setData(
                                                    "first_value",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.first_value}
                                            className="mt-1 text-red-500 text-sm"
                                        />
                                    </div>

                                    {/* Second Value Input */}
                                    <div>
                                        <InputLabel
                                            htmlFor="secondValue"
                                            value="Second Value"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        />
                                        <TextInput
                                            type="number"
                                            id="secondValue"
                                            name="second_value"
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                            value={data.second_value}
                                            onInput={(e) =>
                                                setData(
                                                    "second_value",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.second_value}
                                            className="mt-1 text-red-500 text-sm"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <input
                                            type="submit"
                                            value="Subtraction"
                                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            disabled={processing}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
