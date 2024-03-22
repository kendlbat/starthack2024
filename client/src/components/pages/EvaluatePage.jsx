import { useState } from "react";
import FileSelector from "../FileSelector";
import AllocatePupils from "../AllocatePupils";
import EnterGrading from "../EnterGrading";

export default function EvaluatePage() {
    let [phase, setPhase] = useState(1);
    let [gradings, setGradings] = useState([]);

    return (
        <>
            {(() => {
                switch (phase) {
                    case 1:
                        return <FileSelector></FileSelector>;

                    case 2:
                        return <AllocatePupils></AllocatePupils>;

                    case 3:
                        return <EnterGrading></EnterGrading>;
                }
            })()}
        </>
    );
}
