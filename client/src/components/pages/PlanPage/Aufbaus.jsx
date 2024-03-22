import { useQuery } from "@tanstack/react-query";
import {
    getAufbauByThemenaspekt,
    getKompetenzenByAufbau,
} from "src/lib/api.mjs";
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
import Kompetenzen from "./Kompetenzen";

export default function Aufbaus({ bc, unset }) {
    const taQuery = useQuery({
        queryKey: [
            "aufbaus",
            bc[0].o["fb_id"],
            bc[1].o["f_id"],
            bc[2].o["kb_id"],
            bc[3].o["ha_id"],
        ],
        queryFn: () =>
            getAufbauByThemenaspekt(
                bc[0].o["fb_id"],
                bc[1].o["f_id"],
                bc[2].o["kb_id"],
                bc[3].o["ha_id"]
            ).then((res) => {
                console.log(res);
                return res;
            }),
    });

    const otherKompQuery = useQuery({
        queryKey: [
            "kompetenzen",
            bc[0].o["fb_id"],
            bc[1].o["f_id"],
            bc[2].o["kb_id"],
            bc[3].o["ha_id"],
            null,
        ],
        queryFn: () =>
            getKompetenzenByAufbau(
                bc[0].o["fb_id"],
                bc[1].o["f_id"],
                bc[2].o["kb_id"],
                bc[3].o["ha_id"],
                null
            ).then((res) => {
                console.log(res);
                return res;
            }),
    });

    const [selectedAB, setSelectedAB] = useState(undefined);

    let otherKomp = otherKompQuery.data?.results;
    let abs = taQuery.data?.results;
    return abs ? (
        selectedAB ? (
            <Kompetenzen
                bc={[
                    ...bc,
                    {
                        o: selectedAB,
                        repr: selectedAB.bezeichnung,
                        unset: () => setSelectedAB(undefined),
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
                        {abs.map((ab) => (
                            <TableRow
                                key={ab.uid}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={(e) => {
                                    setSelectedAB(ab);
                                }}
                            >
                                <TableCell>{ab.strukturtyp}</TableCell>
                                <TableCell>{ab.bezeichnung}</TableCell>
                            </TableRow>
                        ))}
                        {otherKomp != undefined &&
                            otherKomp.map((k) => (
                                <TableRow key={k.uid}>
                                    <TableCell>{k.strukturtyp}</TableCell>
                                    <TableCell>{k.bezeichnung}</TableCell>
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
