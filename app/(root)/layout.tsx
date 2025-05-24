import Header from '@/components/header/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="overflow-hidden">
      <Header />
      <main className="min-h-screen">{children}</main>
    </div>
  )
}
