

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark bg-neutral-900 text-white">

      {children}

    </div> 
  );
}
