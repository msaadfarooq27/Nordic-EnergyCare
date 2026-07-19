import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomerProfile } from '../../services/api.js';

export default function CreateProfileForm() {
    const queryClient = useQueryClient();
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: () => createCustomerProfile(city),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
        },
        onError: (err) => {
            setError(err.message || 'Something went wrong');
        },
    });

    function handleSubmit(event) {
        event.preventDefault();
        setError('');
        mutation.mutate();
    }

    return (
        <div>
            <p className="text-slate-600">
                You haven't set up your customer profile yet.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap items-end gap-3">
                <div>
                    <label className="text-sm font-medium text-slate-700">City: </label>
                    <input
                        type="text"
                        placeholder="Espoo"
                        className="mt-2 rounded-lg border border-slate-300 px-4 py-2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
                >
                    {mutation.isPending ? 'Saving...' : 'Create profile'}
                </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    )
}