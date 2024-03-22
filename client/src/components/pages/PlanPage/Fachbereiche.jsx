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
    Spinner,
} from "flowbite-react";
import { useState } from "react";
import Faecher from "./Faecher";

export default function Fachbereiche() {
    const fachbereicheQuery = useQuery({
        queryKey: ["fachbereiche"],
        queryFn: () =>
            getFachbereiche().then((res) => {
                console.log(res);
                return res;
            }),
    });

    const [selectedFB, setSelectedFB] = useState(undefined);

    let fachbereiche = fachbereicheQuery.data?.results;
    return fachbereiche ? (
        selectedFB ? (
            <Faecher
                bc={[
                    {
                        o: selectedFB,
                        repr: selectedFB.bezeichnung,
                        unset: () => setSelectedFB(undefined),
                    },
                ]}
            />
        ) : (
            <>
                <Breadcrumb className="mb-2">
                    <BreadcrumbItem>Fachbereich</BreadcrumbItem>
                </Breadcrumb>
                <Table>
                    <TableHead>
                        <TableHeadCell>Typ</TableHeadCell>
                        <TableHeadCell>Bezeichnung</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {fachbereiche.map((fachbereich) => (
                            <TableRow
                                key={fachbereich.uid}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={(e) => {
                                    setSelectedFB(fachbereich);
                                }}
                            >
                                <TableCell>{fachbereich.strukturtyp}</TableCell>
                                <TableCell>{fachbereich.bezeichnung}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    ) : (
        <Spinner />
    );
}
