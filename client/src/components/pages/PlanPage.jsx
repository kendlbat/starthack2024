import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getFaecher } from "src/lib/api.mjs";

export default function PlanPage() {
    useQuery({
        queryKey: ["faecher"],
        queryFn: () => {
            getFaecher().then(console.log);
        },
    });
    return <></>;
}
