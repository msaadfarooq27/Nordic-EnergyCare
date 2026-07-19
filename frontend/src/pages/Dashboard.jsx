import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext.jsx';
import { getCustomerProfile } from '../services/api.js';
import CreateProfileForm from '../components/dashboard/CreateProfileForm.jsx';

export default function Dashboard() {
    const { user } = useAuth();

    const { data, isLoading, error } = useQuery({
        queryKey: ['customerProfile'],
        queryFn: getCustomerProfile,
        retry: false,
    });

    const profile = data?.data ?? null;
    const profileMissing = error?.status === 404;

    return (
        <section>
            <h1 className="text-3xl font-bold text-slate-950">
                Welcome{user ? `, ${user.name}` : ''}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
                Here's a quick look at your energy account.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {isLoading && (
                    <p className="text-slate-600">Loading your account...</p>
                )}

                {!isLoading && profileMissing && <CreateProfileForm />}

                {!isLoading && error && !profileMissing && (
                    <p className="text-red-600">
                        Something went wrong loading your account. Please try again shortly.
                    </p>
                )}

                {!isLoading && !profileMissing && profile && (
                    <div className="grid gap-4 md:grid-cols-2">
                        <InfoCard label="Customer ID" value={profile.customerId} />
                        <InfoCard label="City" value={profile.city} />
                        <InfoCard
                            label="Chatbot eligible"
                            value={profile.chatBotEligible ? 'Yes' : 'No'}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
        </div>
    )
}