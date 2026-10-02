import { createRecruiter } from "../actions/actions";

export default function OnBoarding() {

    return <div className="w-full max-w-md mx-auto mt-16 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
            Set up your recruiter profile
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Tell us a bit about your company to get started.
        </p>

        <form action={createRecruiter} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <label htmlFor="officeName" className="text-sm font-medium text-gray-700">
                    Company Name
                </label>
                <input
                    type="text"
                    id="officeName"
                    name="officeName"
                    placeholder="e.g. TechNova Solutions"
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="imageUpload" className="text-sm font-medium text-gray-700">
                    Company Logo
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    name="uploaded_image"
                    accept="image/*"
                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    required
                />
            </div>

            <button
                type="submit"
                className="mt-2 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
                Continue
            </button>
        </form>
    </div>
}