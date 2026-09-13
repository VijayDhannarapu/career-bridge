import { redirect } from "next/navigation";
import "./globals.css";
import Banner from "./components/Banner";

export default function Home() {
  return <div>
    <Banner/>
  </div>
}
