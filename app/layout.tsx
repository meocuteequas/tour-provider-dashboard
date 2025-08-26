import { Nunito } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Nunito({
  variable: "--font-nunito-sans",
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tour Provider Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <div className=" px-40 min-w-[1600px] max-w-[1920px] mx-auto">
          <nav className="py-10 mb-40">
            <ul className="flex items-center space-x-6 text-lg font-bold">
              <li className="text-4xl mr-auto font-extrabold">
                <Link href="/">Ventures</Link>
              </li>
              <li>
                <Link href="/">My dashboard</Link>
              </li>
              <li>
                <Link href="/tours">My tours</Link>
              </li>
              <li>
                <Link href="/tours/create">Create a new tour</Link>
              </li>
            </ul>
          </nav>
          {children}

          <footer>
            <div className="container mx-auto py-40">
              <p className="text-center text-base text-gray-500">
                &copy; {new Date().getFullYear()} Ventures. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
