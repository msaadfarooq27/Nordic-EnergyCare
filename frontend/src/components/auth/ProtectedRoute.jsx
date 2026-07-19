import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";


export default function ProtectedRoute({children}){
    const { isLoading, isAuthenticated } = useAuth();

    if(isLoading){
        return (
            <div className="flex justify-center py-16 text-slate-500"> Loading ... </div>
        );
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    return children
}