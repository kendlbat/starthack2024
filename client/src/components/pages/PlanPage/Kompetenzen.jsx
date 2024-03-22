import { useQuery } from "@tanstack/react-query";
import { getKompetenzenByAufbau } from "src/lib/api.mjs";
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

export default function Kompetenzen({ bc, unset }) {
    const taQuery = useQuery({
        queryKey: [
            "kompetenzen",
            bc[0].o["fb_id"],
            bc[1].o["f_id"],
            bc[2].o["kb_id"],
            bc[3].o["ha_id"],
            bc[4].o["aufbau"],
        ],
        queryFn: () =>
            getKompetenzenByAufbau(
                bc[0].o["fb_id"],
                bc[1].o["f_id"],
                bc[2].o["kb_id"],
                bc[3].o["ha_id"],
                bc[4].o["aufbau"]
            ).then((res) => {
                console.log(res);
                return res;
            }),
    });

    let ks = taQuery.data?.results;
    return ks ? (
        <>
            <Breadcrumb className="mb-2">
                {bc.map((item, i) => (
                    <BreadcrumbItem
                        key={i}
                        onClick={item.unset}
                        className="cursor-pointer hover:bg-gray-100"
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
                    {ks.map((k) => (
                        <TableRow key={k.uid}>
                            <TableCell>{k.strukturtyp}</TableCell>
                            <TableCell>{k.bezeichnung}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    ) : (
        <Spinner />
    );
}
