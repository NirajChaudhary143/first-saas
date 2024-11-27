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
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {answer !== null && (
                                <div>Result of calculation : {answer}</div>
                            )}
                            {(available_credits == 0 ||
                                available_credits <
                                    feature2.required_credits) &&
                                "You do not have enough credits to use this feature."}

                            <form
                                onSubmit={submitForm}
                                className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
                            >
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {feature2.name}{" "}
                                    <span className="text-sm text-gray-500">
                                        ({feature2.required_credits} credits
                                        required)
                                    </span>
                                </h2>
                                <p className="text-sm text-gray-600 mb-6">
                                    {feature2.description}
                                </p>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="firstValue"
                                        className="block text-sm font-medium text-gray-700"
                                        value="First Value"
                                    />
                                    <TextInput
                                        type="number"
                                        id="firstValue"
                                        name="first_value"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                        value={data.first_value}
                                        onInput={(e) =>
                                            setData(
                                                "first_value",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError message={errors.first_value} />
                                </div>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="secondValue"
                                        className="block text-sm font-medium text-gray-700"
                                        value="Second Value"
                                    />
                                    <TextInput
                                        type="number"
                                        id="secondValue"
                                        name="second_value"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                        value={data.second_value}
                                        onInput={(e) =>
                                            setData(
                                                "second_value",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError message={errors.second_value} />
                                </div>

                                <div>
                                    <input
                                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        type="submit"
                                        value="Substraction"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
