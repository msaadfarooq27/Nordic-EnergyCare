export default function Login(){
    return (
        <section className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-950">Login</h1>
            <p className="mt-4 text-slate-600">
                JWT authentication will be added in a later phase.
            </p>

            <form className="mt-6 space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        Placeholder="customer@example.com"
                        className= "mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        Placeholder="••••••••"
                        className= "mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
                    />
                </div>

                <button
                    type="button"
                    className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
                >
                    Login
                </button>

            </form>
        </section>
    )
}