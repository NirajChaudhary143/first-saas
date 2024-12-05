import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Packages({ packages, redirected, message }) {
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
                            {redirected && (
                                <div className="p-6">
                                    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg">
                                        {message}
                                    </div>
                                </div>
                            )}
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
                                                <div className="flex space-x-4">
                                                    {/* Stripe Payment Method */}
                                                    <label className="relative cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="payment_method"
                                                            value="stripe"
                                                            className="hidden peer"
                                                        />
                                                        <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 bg-white peer-checked:border-indigo-500 peer-checked:bg-indigo-100 transition duration-300">
                                                            <img
                                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42uI2JPTWjq_uNG9UFt98jnpHODVQrQHysg&s"
                                                                alt="Stripe"
                                                                className="w-8 h-8"
                                                            />
                                                        </div>
                                                    </label>

                                                    {/* Esewa Payment Method */}
                                                    <label className="relative cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="payment_method"
                                                            value="esewa"
                                                            className="hidden peer"
                                                        />
                                                        <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 bg-white peer-checked:border-indigo-500 peer-checked:bg-indigo-100 transition duration-300">
                                                            <img
                                                                src="https://play-lh.googleusercontent.com/MRzMmiJAe0-xaEkDKB0MKwv1a3kjDieSfNuaIlRo750_EgqxjRFWKKF7xQyRSb4O95Y"
                                                                alt="Esewa"
                                                                className="w-8 h-8"
                                                            />
                                                        </div>
                                                    </label>
                                                </div>
                                                <button className="w-full sm:w-auto mt-6 inline-block rounded-lg bg-indigo-600 text-white font-semibold py-2 px-4 shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300">
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
