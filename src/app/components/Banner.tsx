'use client'
export default function Banner() {
  return (
    <div className="mt-6 w-full h-auto px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-2xl bg-gradient-to-br bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-4 py-10 shadow-xl sm:px-6 md:px-12 md:py-16">
        <h1 className="max-w-4xl text-center text-2xl font-bold leading-snug text-purple-200 md:text-4xl md:leading-relaxed">
          Discover thousands of opportunities across all industries.
          <span className="block mt-3 text-purple-200/80 text-base font-normal md:text-xl md:font-medium">
            Whether you are a fresher or experienced professional, your next
            job is just one click away!
          </span>
        </h1>

        <form action="" className="mt-8 flex w-full max-w-md flex-col gap-2 rounded-xl p-1 md:max-w-xl sm:flex-row sm:bg-white sm:shadow-lg">
          <input
            type="text"
            name="query"
            placeholder="Search job title..."
            className="w-full flex-1 rounded-xl border-none bg-white px-4 py-3 text-gray-800 shadow-md outline-none placeholder:text-gray-400 sm:bg-transparent sm:shadow-none"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 px-6 py-3 font-semibold text-white transition  active:scale-95 sm:w-auto shrink-0"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
