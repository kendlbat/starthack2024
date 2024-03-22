import { useState } from "react";
import FileSelector from "../FileSelector";
import AllocatePupils from "../AllocatePupils";
import EnterGrading from "../EnterGrading";
import { Tabs } from 'flowbite-react';
import "../../styles/EvaluatePage.css"

export default function EvaluatePage() {
    let [phase, setPhase] = useState(1);
    let [gradings, setGradings] = useState([]);
    const [pdfPages, setPdfPages] = useState([]);

    return (
        <div className="scrollable-content">
            <Tabs>
                <Tabs.Item active title="File">
                    <FileSelector setPhase={setPhase} gradings={gradings} setGradings={setGradings} pdfPages={pdfPages} setPdfPages={setPdfPages}></FileSelector>
                </Tabs.Item>.
                <Tabs.Item disabled={phase < 2} title="Allocate">
                    <AllocatePupils pdfPages={pdfPages} setPhase={setPhase} gradings={gradings}></AllocatePupils>
                </Tabs.Item>
                <Tabs.Item disabled={phase < 3} title="Insert">
                    <EnterGrading></EnterGrading>
                </Tabs.Item>
            </Tabs>
        </div>

    );
}
