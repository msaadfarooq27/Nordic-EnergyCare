import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router";


export default function Login(){
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] =  useState(false);

    async function handleSubmit(event){
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        let loginSucceeded = false;

        try {
            await login(email, password);
            loginSucceeded = true;
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }

        if(loginSucceeded){
             navigate('/dashboard');
        }
    }

    return (
        <section className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-950">Login</h1>
            <p className="mt-4 text-slate-600">
                Sign in to view your energy account.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        placeholder="customer@example.com"
                        className= "mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className= "mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
                >
                    {isSubmitting ? 'Logging in ...' : 'Login'}
                </button>

            </form>
        </section>
    )
}