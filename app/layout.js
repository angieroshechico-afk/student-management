import "./globals.css";

export const metadata = {
  title: "Student Directory",
  description: "Student directory assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
