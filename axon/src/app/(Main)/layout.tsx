
import Nav from "@/components/nav";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <html lang="en">
      <body>
        {children}
        <Nav/>
      </body>
    </html>

  );
}
