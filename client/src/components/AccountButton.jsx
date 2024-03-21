import { Button } from "flowbite-react";
import { useAuth } from "../lib/auth";

export default function AccountButton() {
    const session = useAuth();

    console.log(session);

    return (
        <>
            {session ? (
                <Button href="/api/auth/signout">Sign out</Button>
            ) : (
                <Button href="/api/auth/signin">Sign in</Button>
            )}
        </>
    );
}
