import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useEffect } from "react";

const Authenticated = ({ children }) => {
    const session = useAuth();
    if (!session) {
        window.location.href = "/api/auth/signin";
    }
    return <>{session && children}</>;
};

export default Authenticated;
