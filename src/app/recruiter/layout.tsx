import RecruiterNavBar from "../components/recruiter/NavBar";
import "../globals.css"
type Prop = {
  children: React.ReactNode
}

export default function Layout({ children }: Prop) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <RecruiterNavBar />
        {children}
      </body>
    </html>
  );
}