import { redirect } from "next/navigation";
import "./globals.css";
import Banner from "./components/Banner";
import JobListing from "./components/JobListing";
import TrustedCompanies from "./components/TrustedCompanies ";
type Prop = {
    searchParams?: Promise<{query?: string}>
}
export default async function Home({searchParams}: Prop) {
  const query = (await searchParams)?.query
  return <div>
    <Banner/>
    <TrustedCompanies />
    <JobListing query={query}/>
  </div>
}
