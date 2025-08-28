import { Inter } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const inter = Inter({
    subsets: ["latin"],
});
export const metadata = {
    title: "ExpenseTrackie",
    description: "Track your expenses effortlessly with ExpenseTrackie",
};
export default function RootLayout({ children, }) {
    return (<ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}><Header />
        <main className=" min-h-screen pt-20">
        {children}
        </main>
        <Toaster richColors/>
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto text-center text-gray-600">
            <p>
              Made with ❤️ by Akash
            </p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>);
}
