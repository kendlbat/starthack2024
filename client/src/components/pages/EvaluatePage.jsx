import { useState } from "react";
import FileSelector from "../FileSelector";
import AllocatePupils from "../AllocatePupils";
import EnterGrading from "../EnterGrading";
import { Tabs } from 'flowbite-react';

export default function EvaluatePage() {
    let [phase, setPhase] = useState(1);
    let [gradings, setGradings] = useState([]);

    return (
        <Tabs>
            <Tabs.Item active title="File">
                <FileSelector setPhase={setPhase} setGradings={setGradings}></FileSelector>
            </Tabs.Item>.
            <Tabs.Item disabled={phase < 2} title="Allocate">
                <AllocatePupils></AllocatePupils>
            </Tabs.Item>
            <Tabs.Item disabled={phase < 3} title="Insert">
                <EnterGrading></EnterGrading>
            </Tabs.Item>
        </Tabs>
    );
}
