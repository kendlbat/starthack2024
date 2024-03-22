import { useQuery } from "@tanstack/react-query";
import {
    getKompetenzbereicheByFach,
    getThemenaspekteByKompetenzbereich,
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
import Aufbaus from "./Aufbaus";

export default function Themenaspekte({ bc, unset }) {
    const taQuery = useQuery({
        queryKey: [
            "themenaspekte",
            bc[0].o["fb_id"],
            bc[1].o["f_id"],
            bc[2].o["kb_id"],
        ],
        queryFn: () =>
            getThemenaspekteByKompetenzbereich(
                bc[0].o["fb_id"],
                bc[1].o["f_id"],
                bc[2].o["kb_id"]
            ).then((res) => {
                console.log(res);
                return res;
            }),
    });

    const [selectedTA, setSelectedTA] = useState(undefined);

    let tas = taQuery.data?.results;
    return tas ? (
        selectedTA ? (
            <Aufbaus
                bc={[
                    ...bc,
                    {
                        o: selectedTA,
                        repr: selectedTA.bezeichnung,
                        unset: () => setSelectedTA(undefined),
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
                        {tas.map((ta) => (
                            <TableRow
                                key={ta.uid}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={(e) => {
                                    setSelectedTA(ta);
                                }}
                            >
                                <TableCell>{ta.strukturtyp}</TableCell>
                                <TableCell>{ta.bezeichnung}</TableCell>
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
