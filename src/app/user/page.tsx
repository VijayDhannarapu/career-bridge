import { Suspense } from "react";
import "../globals.css";
import Banner from "../components/Banner";
import JobListing from "../components/JobListing";
import TrustedCompanies from "../components/TrustedCompanies ";
import Loading from "../components/loading";
type Prop = {
  searchParams?: Promise<{ query?: string }>
}
export default async function Home({ searchParams }: Prop) {
  const query = (await searchParams)?.query
  return <div>
    <Banner />
    <TrustedCompanies />
    <Suspense fallback={<Loading />}>
      <JobListing query={query} />
    </Suspense>
  </div>
}
