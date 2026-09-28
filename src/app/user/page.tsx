import { Suspense } from "react";
import "../globals.css";
import Banner from "../components/Banner";
import JobListing from "../components/JobListing";
import TrustedCompanies from "../components/TrustedCompanies";
import Loading from "../components/loading";
type Prop = {
  searchParams?: Promise<{ query?: string, page?: string }>
}
export default async function Home({ searchParams }: Prop) {
  const query = (await searchParams)?.query
  const page = (await searchParams)?.page
  return <div>
    <Banner />
    <TrustedCompanies />
    <Suspense fallback={<Loading />}>
      <JobListing query={query} page={page} />
    </Suspense>
  </div>
}
