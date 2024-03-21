import { useEffect, useState } from "react";
import { fetchSession } from "../lib/auth";

export let session = null;

export default function SessionProvider({ children }) {
    /// Fetch session
    let [fetchedSession, setFetchedSession] = useState(false);
    useEffect(() => {
        fetchSession().then((s) => {
            session = s;
            setFetchedSession(true);
        });
    }, []);
    console.log("Running");
    /// Provide state to children
    return <>{fetchedSession && children}</>;
}
