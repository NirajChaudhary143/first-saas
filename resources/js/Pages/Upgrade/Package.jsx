import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Packages({ packages }) {
    const { csrf_token } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Package
                </h2>
            }
        >
            <Head title="Package" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {pkg.name} Package
                                        </h2>
                                        <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
                                            Price:{" "}
                                            <span className="font-semibold text-indigo-600">
                                                Rs. {pkg.price}
                                            </span>
                                        </p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
                                            Credits:{" "}
                                            <span className="font-semibold text-indigo-600">
                                                {pkg.credits}
                                            </span>
                                        </p>
                                        <div className="mt-4">
                                            <form
                                                action={route(
                                                    "purchase.package",
                                                    pkg
                                                )}
                                                method="post"
                                            >
                                                <TextInput
                                                    type="hidden"
                                                    name="_token"
                                                    autoComplete="off"
                                                    value={csrf_token}
                                                />
                                                <button className="w-full sm:w-auto mt-4 inline-block rounded-lg bg-indigo-600 text-white font-semibold py-2 px-4 shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300">
                                                    Buy Now
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
