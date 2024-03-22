import { useQuery } from "@tanstack/react-query";
import { getFachbereiche } from "src/lib/api.mjs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Breadcrumb,
    BreadcrumbItem,
} from "flowbite-react";
import Fachbereiche from "./PlanPage/Fachbereiche";

export default function PlanPage() {
    return <Fachbereiche />;
}
