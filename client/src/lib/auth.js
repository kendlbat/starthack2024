import { session } from "../components/SessionProvider";

export const fetchSession = async () => {
    const res = await fetch("/api/secure/session", {
        credentials: "include",
    });
    if (!res.ok) {
        return null;
    }
    return res.json();
};

export const useAuth = () => {
    return session;
};
