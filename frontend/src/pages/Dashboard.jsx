import { useEffect, useState } from 'react';
import { getDemoProfile } from '../services/api';

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDemoProfile()
        .then((data) => {
            setProfile(data.data);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <section>
            <h1 className="text-3xl font-bold text-slate-950">Customer Dashboard</h1>
            <p className="mt-4 max-w-2xl text-slate-600">
                This dashboard now calls the Express backend. Later it will become a
                protected customer area using JWT authentication.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-950">
                    Backend Connection Test
                </h2>

                {isLoading && (
                    <p className="mt-4 text-slate-600">Loading customer profile...</p>
                )}

                {error && <p className="mt-4 text-red-600">Error: {error}</p>}

                {profile && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <InfoCard label="Customer ID" value={profile.customerId} />
                        <InfoCard label="Name" value={profile.name} />
                        <InfoCard label="City" value={profile.city} />
                        <InfoCard label="Contract" value={profile.contractType} />
                        <InfoCard label="Latest Bill" value={profile.latestBillStatus} />
                        <InfoCard 
                        label="Chatbot Eligible"
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