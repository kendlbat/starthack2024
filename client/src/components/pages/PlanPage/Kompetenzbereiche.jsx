import { useQuery } from "@tanstack/react-query";
import { getKompetenzbereicheByFach } from "src/lib/api.mjs";
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
import Themenaspekte from "./Themenaspekte";

export default function Kompetenzbereiche({ bc, unset }) {
    const kbQuery = useQuery({
        queryKey: ["kompetenzbereiche", bc[0].o["fb_id"], bc[1].o["f_id"]],
        queryFn: () =>
            getKompetenzbereicheByFach(bc[0].o["fb_id"], bc[1].o["f_id"]).then(
                (res) => {
                    console.log(res);
                    return res;
                }
            ),
    });

    const [selectedKB, setSelectedKB] = useState(undefined);

    let kbs = kbQuery.data?.results;
    return kbs ? (
        selectedKB ? (
            <Themenaspekte
                bc={[
                    ...bc,
                    {
                        o: selectedKB,
                        repr: selectedKB.bezeichnung,
                        unset: () => setSelectedKB(undefined),
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
                        {kbs.map((kb) => (
                            <TableRow
                                key={kb.uid}
                                className="cursor-pointer"
                                onClick={(e) => {
                                    setSelectedKB(kb);
                                }}
                            >
                                <TableCell>{kb.strukturtyp}</TableCell>
                                <TableCell>{kb.bezeichnung}</TableCell>
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
