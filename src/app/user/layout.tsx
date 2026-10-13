import { Metadata } from "next";
import "../globals.css";
import NavBar from "../components/NavBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ClerkProvider } from '@clerk/nextjs'

config.autoAddCss = false;
export const metadata: Metadata = {
  title: {
    default: "Job Portal | Find Jobs & Hire Talent",
    template: "%s | Job Portal",
  },
  description:
    "Find your next career opportunity or hire talented candidates with our job portal. Explore job openings, apply for jobs, and manage recruitment easily.",
  applicationName: "Job Portal",
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-full flex flex-col">
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
