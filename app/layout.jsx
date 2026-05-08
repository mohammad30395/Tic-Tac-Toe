import "./globals.css";

export const metadata = {
  title: "Tic Tac Toe Arena",
  description: "A frontend-only tic tac toe game with two-player and computer modes."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
