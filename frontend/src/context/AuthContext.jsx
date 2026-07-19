import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, loginUser, logoutUser } from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: ({ email, password}) => loginUser(email, password),
        onSuccess: (response) => {
            queryClient.setQueryData(['me'], response);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(['me'], null);
        },
    });

    const user = data?.data?.user ?? null;

    const value = {
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login: (email, password) => loginMutation.mutateAsync({ email, password}),
        logout: () => logoutMutation.mutateAsync(),
    };

    return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>
}

export function useAuth(){
    const context =  useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be within an Authprovider')
    }

    return context;
}