import { NavLink } from "react-router";

const links = [
    { path: "/", label: "Home" },
    { path: "/support", label: "Support" },
    { path: "/billing", label: "Billing" },
    { path: "/contracts", label: "Contracts" },
    { path: "/outages", label: "Outages" },
    { path: "/moving", label: "Moving" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/analytics", label: "Analytics" }
];

export default function Navbar(){
    return (
        <header className="border-b border-slate-200 bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <NavLink to="/" className="text-xl font-bold text-emerald-700">
                    Nordic EnergyCare
                </NavLink>

                <div className="hidden items-center gap-4 md:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className= {({ isActive }) =>
                                `text-sm font-medium ${
                                    isActive ? "text-emerald-700" : "text-slate-600 hover:text-emerald-700"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <NavLink
                    to="/login"
                    className="rounded-LG bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                    Login
                </NavLink>
            </nav>
        </header>
    )
}