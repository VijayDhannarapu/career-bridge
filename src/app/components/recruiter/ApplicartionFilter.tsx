"use client";
import { JOB_CATEGORIES, JOB_LOCATIONS } from "@/app/recruiter/addJob/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ApplicationFilter({ routeName }: { routeName: string }) {
    const name = routeName.includes("applications") ? "Applications" : "Jobs"
    const [filterType, setFilterType] = useState<"location" | "jobCategory">(
        "location"
    );
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const router = useRouter()
    const handleCheckboxChange = (value: string) => {
        if (filterType === "location") {
            setSelectedLocations((prev) =>
                prev.includes(value)
                    ? prev.filter((item) => item !== value)
                    : [...prev, value]
            );
        } else {
            setSelectedCategories((prev) =>
                prev.includes(value)
                    ? prev.filter((item) => item !== value)
                    : [...prev, value]
            );
        }
    };

    const currentOptions = filterType === "location" ? JOB_LOCATIONS : JOB_CATEGORIES;
    const selectedValues = filterType === "location" ? selectedLocations : selectedCategories;
    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedCategories.length > 0)
            params.set("categories", selectedCategories.join(","))
        if (selectedLocations.length > 0)
            params.set("locations", selectedLocations.join(","))

        router.push(`${routeName}?${params.toString()}`)
    }
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1049e5] px-5 py-3
                       text-sm font-semibold text-white shadow-sm transition
                       hover:bg-blue-700 focus:outline-none focus:ring-4
                       focus:ring-blue-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 7h16M7 12h10m-7 5h4" />
                </svg>
                Filter
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50">
                    <button
                        type="button"
                        aria-label="Close filter panel"
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 h-full w-full bg-black/40 backdrop-blur-sm"
                    />

                    <div className="absolute left-1/2 top-10 flex max-h-[90vh] w-[95%]
                                max-w-5xl -translate-x-1/2 flex-col overflow-hidden
                                rounded-2xl border border-gray-200 bg-white shadow-2xl">

                        <div className="flex items-center justify-between border-b border-gray-200
                                    px-5 py-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Filter {name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Refine {name} by location or category.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                                className="rounded-lg p-2 text-gray-500 transition
                                       hover:bg-gray-100 hover:text-gray-900"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <div className="flex flex-col md:flex-row">

                                <div className="w-full border-b border-gray-200 bg-gray-50
                                            p-4 md:w-[30%] md:border-b-0 md:border-r">
                                    <div className="space-y-2">
                                        <label
                                            className={`flex cursor-pointer items-center gap-3
                                            rounded-xl border p-3 transition-all ${filterType === "location"
                                                    ? "border-[#1049e5] bg-blue-50 text-[#1049e5]"
                                                    : "border-transparent text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="filterType"
                                                checked={filterType === "location"}
                                                onChange={() => setFilterType("location")}
                                                className="h-4 w-4 accent-[#1049e5]"
                                            />
                                            <span className="text-sm font-semibold">Location</span>
                                            {selectedLocations.length > 0 && (
                                                <span className="ml-auto rounded-full bg-[#1049e5]
                                                             px-2 py-0.5 text-xs font-semibold text-white">
                                                    {selectedLocations.length}
                                                </span>
                                            )}
                                        </label>

                                        <label
                                            className={`flex cursor-pointer items-center gap-3
                                            rounded-xl border p-3 transition-all ${filterType === "jobCategory"
                                                    ? "border-[#1049e5] bg-blue-50 text-[#1049e5]"
                                                    : "border-transparent text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="filterType"
                                                checked={filterType === "jobCategory"}
                                                onChange={() => setFilterType("jobCategory")}
                                                className="h-4 w-4 accent-[#1049e5]"
                                            />
                                            <span className="text-sm font-semibold">Job Category</span>
                                            {selectedCategories.length > 0 && (
                                                <span className="ml-auto rounded-full bg-[#1049e5]
                                                             px-2 py-0.5 text-xs font-semibold text-white">
                                                    {selectedCategories.length}
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="min-w-0 flex-1 p-5 sm:p-6">
                                    <div className="mb-5 flex items-center justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {filterType === "location"
                                                    ? "Filter by Location"
                                                    : "Filter by Job Category"}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Select one or more options.
                                            </p>
                                        </div>

                                        {selectedValues.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    filterType === "location"
                                                        ? setSelectedLocations([])
                                                        : setSelectedCategories([])
                                                }
                                                className="shrink-0 text-sm font-semibold text-[#1049e5]
                                                       transition hover:text-blue-700 hover:underline"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {currentOptions.map((option) => {
                                            const checked = selectedValues.includes(option);

                                            return (
                                                <label
                                                    key={option}
                                                    className={`flex cursor-pointer items-center gap-3
                                                    rounded-xl border p-3 transition-all ${checked
                                                            ? "border-[#1049e5] bg-blue-50 shadow-sm"
                                                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={option}
                                                        checked={checked}
                                                        onChange={() => handleCheckboxChange(option)}
                                                        className="h-4 w-4 rounded accent-[#1049e5]"
                                                    />
                                                    <span
                                                        className={`text-sm ${checked
                                                            ? "font-semibold text-[#1049e5]"
                                                            : "text-gray-700"
                                                            }`}
                                                    >
                                                        {option}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>

                                    {currentOptions.length === 0 && (
                                        <p className="py-8 text-center text-sm text-gray-500">
                                            No filter options available.
                                        </p>
                                    )}

                                    <div className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-500">
                                        {selectedValues.length} option
                                        {selectedValues.length !== 1 ? "s" : ""} selected
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 border-t
                                    border-gray-200 bg-white px-5 py-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedLocations([]);
                                    setSelectedCategories([]);
                                }}
                                className="rounded-xl border border-gray-300 px-4 py-2.5
                                       text-sm font-semibold text-gray-700 transition
                                       hover:bg-gray-50"
                            >
                                Reset All
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    handleSearch();
                                    setIsOpen(false);
                                }}
                                className="rounded-xl bg-[#1049e5] px-7 py-2.5
                                       text-sm font-semibold text-white shadow-sm
                                       transition hover:bg-blue-700 focus:outline-none
                                       focus:ring-4 focus:ring-blue-200"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}