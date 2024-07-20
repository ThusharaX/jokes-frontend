import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "JokeHub - Your Ultimate Destination for Jokes",
  description:
    "JokeHub is the ultimate platform for joke enthusiasts! Submit your funniest jokes, let our community moderate them, and enjoy a curated selection of humor. Whether you're looking for a quick laugh or want to share your wit with the world, JokeHub has got you covered. Our secure and scalable system ensures a seamless experience, from joke submission to delivery. Join JokeHub today and become a part of the laughter revolution!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReactQueryClientProvider>
          <Toaster />
          {/* TODO: Add a header */}
          <div className="container mx-auto">{children}</div>
          {/* TODO: Add a footer */}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
