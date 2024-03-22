import { useQuery } from "@tanstack/react-query";
import { getFachbereiche, getFaecherByFachbereich } from "src/lib/api.mjs";
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
import Kompetenzbereiche from "./Kompetenzbereiche";

export default function Faecher({ bc, unset }) {
    const faecherQuery = useQuery({
        queryKey: ["faecher", bc[0].o["fb_id"]],
        queryFn: () =>
            getFaecherByFachbereich(bc[0].o["fb_id"]).then((res) => {
                console.log(res);
                return res;
            }),
    });

    const [selectedFach, setSelectedFach] = useState(undefined);

    let faecher = faecherQuery.data?.results;
    return faecher ? (
        selectedFach ? (
            <Kompetenzbereiche
                bc={[
                    ...bc,
                    {
                        o: selectedFach,
                        repr: selectedFach.bezeichnung,
                        unset: () => setSelectedFach(undefined),
                    },
                ]}
            />
        ) : (
            <>
                <Breadcrumb className="mb-2">
                    {bc.map((item, i) => (
                        <BreadcrumbItem
                            key={i}
                            onClick={item.unset}
                            className="cursor-pointer"
                        >
                            {item.repr}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumb>
                <Table>
                    <TableHead>
                        <TableHeadCell>Typ</TableHeadCell>
                        <TableHeadCell>Bezeichnung</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {faecher.map((fach) => (
                            <TableRow
                                key={fach.uid}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={(e) => {
                                    setSelectedFach(fach);
                                }}
                            >
                                <TableCell>{fach.strukturtyp}</TableCell>
                                <TableCell>{fach.bezeichnung}</TableCell>
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
