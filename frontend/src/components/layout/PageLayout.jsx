import Navbar from './Navbar.jsx'

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  )}