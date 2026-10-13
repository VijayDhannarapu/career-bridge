import RecruiterNavBar from "../components/recruiter/NavBar";
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs";
type Prop = {
  children: React.ReactNode
}
export const metadata = {
  title: {
    default: "Job Portal | Find Jobs & Hire Talent",
    template: "%s | Job Portal",
  },
  description:
    "Find your next career opportunity or hire talented candidates with our job portal. Explore job openings, apply for jobs, and manage recruitment easily.",
  applicationName: "Job Portal",
};

export default function Layout({ children }: Prop) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-full flex flex-col">
          <RecruiterNavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}