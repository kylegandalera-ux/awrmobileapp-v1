import "./globals.css";

export const metadata = {
  title: "Adventist World Radio 89.1 FM",
  description: "A mobile app for Adventist World Radio 89.1 FM"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
