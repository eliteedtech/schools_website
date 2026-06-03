export default function Price() {
    const tables = [
        {
            grade: "Junior Sec",
            type: "Academy with Islamiyyah",
            statuss: "In Take",
            boys: "₦121,700.00",
            girls: "₦124,200.00",
        },
        {
            grade: "Junior Sec",
            type: "Islamiyyah Only",
            statuss: "In Take",
            boys: "₦45,000.00",
            girls: "₦45,000.00",
        },
        {
            grade: "Junior Sec",
            type: "Islamiyyah Only",
            statuss: "Running",
            boys: "₦3,000.00",
            girls: "₦3,000.00",
        },
        {
            grade: "Nursery",
            type: "Academy Only",
            statuss: "In Take",
            boys: "₦91,500.00",
            girls: "₦94,000.00",
        },
        {
            grade: "Pre-Nursery",
            type: "Academy Only",
            statuss: "In Take",
            boys: "₦91,500.00",
            girls: "₦94,000.00",
        },
        {
            grade: "Pre-Nursery",
            type: "Academy with Islamiyyah",
            statuss: "In Take",
            boys: "₦103,000.00",
            girls: "₦106,000.00",
        },
        {
            grade: "Primary",
            type: "Academy with Islamiyyah",
            statuss: "In Take",
            boys: "₦112,000.00",
            girls: "₦115,000.00",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 pt-24 px-4">
            <div className="max-w-7xl mx-auto ">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Tuition and Fees
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Transparent fee structure for all grade levels
                    </p>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-900/20 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-950 dark:bg-yellow-400">
                                <tr>
                                    <th className="py-4 px-6 text-left font-semibold text-white dark:text-blue-950">
                                        Grade Level
                                    </th>
                                    <th className="py-4 px-6 text-left font-semibold text-white dark:text-blue-950">
                                        Program Type
                                    </th>
                                    <th className="py-4 px-6 text-left font-semibold text-white dark:text-blue-950">
                                        Status
                                    </th>
                                    <th className="py-4 px-6 text-left font-semibold text-white dark:text-blue-950">
                                        Boys Fee
                                    </th>
                                    <th className="py-4 px-6 text-left font-semibold text-white dark:text-blue-950">
                                        Girls Fee
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tables.map((table, index) => (
                                    <tr 
                                        key={index} 
                                        className={`
                                            border-b border-gray-100 dark:border-gray-700
                                            ${index % 2 === 0 
                                                ? 'bg-white dark:bg-gray-800' 
                                                : 'bg-gray-50 dark:bg-gray-800/50'
                                            }
                                            
                                            transition-colors duration-150
                                        `}
                                    >
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">
                                            {table.grade}
                                        </td>
                                        <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                            {table.type}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`
                                                px-3 py-1 rounded-full text-xs font-medium
                                                ${table.statuss === "In Take" 
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
                                                }
                                            `}>
                                                {table.statuss}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-semibold">
                                            {table.boys}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-semibold">
                                            {table.girls}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                *All fees are annual. Payment plans available upon request.
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">In Take - Accepting New Students</span>
                                <div className="w-3 h-3 rounded-full bg-blue-500 ml-4"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Running - Current Students</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                            Payment Information
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Fees can be paid in installments. Contact the administration office for payment plans.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                            Additional Charges
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Uniforms, textbooks, and extracurricular activities may incur additional costs.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                            Scholarships
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Merit-based scholarships available. Contact admissions for eligibility criteria.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}