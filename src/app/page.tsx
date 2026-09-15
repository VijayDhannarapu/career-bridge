import { redirect } from "next/navigation";
import "./globals.css";
import Banner from "./components/Banner";
import JobListing from "./components/JobListing";
import TrustedCompanies from "./components/TrustedCompanies ";
export default async function Home() {
  return <div>
    <Banner/>
    <TrustedCompanies/>
    <JobListing />
  </div>
}
