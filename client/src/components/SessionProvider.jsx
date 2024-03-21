import { useEffect, useState } from "react";
import { fetchSession } from "../lib/auth";
import { useQuery } from "@tanstack/react-query";

export let session = null;

export default function SessionProvider({ children }) {
    /// Fetch session
    let [fetchedSession, setFetchedSession] = useState(false);
    const { isPending, error, data } = useQuery({
        queryFn: () => {
            fetchSession().then((s) => {
                session = s;
                setFetchedSession(true);
            });
        },
    });
    /// Provide state to children
    return <>{fetchedSession && children}</>;
}
