import { useEffect } from "react";
import { getFaecher } from "src/lib/api.mjs";

export default function PlanPage() {
    useEffect(() => {
        getFaecher().then(console.log);
    }, []);
    return <></>;
}
