import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ used_feature }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">
                                            Feature
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">
                                            Data
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-semibold">
                                            Created At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {used_feature.data.map((data) => (
                                        <tr
                                            key={data.id}
                                            className="odd:bg-white even:bg-gray-50"
                                        >
                                            <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                                {data.feature.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-gray-600">
                                                {data.data ? (
                                                    <pre className="bg-gray-100 p-2 rounded">
                                                        {JSON.stringify(
                                                            JSON.parse(
                                                                data.data
                                                            ),
                                                            null,
                                                            2
                                                        )}
                                                    </pre>
                                                ) : (
                                                    <span className="text-gray-500 italic">
                                                        No Data
                                                    </span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-gray-600">
                                                {new Date(
                                                    data.created_at
                                                ).toLocaleDateString("en-US")}
                                            </td>
                                        </tr>
                                    )) || (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="text-center text-gray-500 px-4 py-2"
                                            >
                                                No records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
