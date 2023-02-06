import { useState } from "react";
import { IDatas } from "../App";
import Chart from "./Chart";

interface Props {
    oldVehicleData: IDatas;
    newVehicleData: IDatas;
    isBoxChecked: boolean;
}

function EstimateEmissions(props: Props) {
    const [oldEmissions, setOldEmissions] = useState<number>(0);
    const [newEmissions, setNewEmissions] = useState<number>(0);

    const weeksWorkedPerYear = 45.6;

    const oldDistance = props.oldVehicleData.distance;
    const oldEmissionFactor = props.oldVehicleData.emissionFactor;
    const oldDaysPerWeek = props.oldVehicleData.daysPerWeek;

    const newDistance = props.newVehicleData.distance;
    const newEmissionFactor = props.newVehicleData.emissionFactor;
    const newDaysPerWeek = props.newVehicleData.daysPerWeek;

    function estimateEmissions() {
        setOldEmissions(oldDistance * oldEmissionFactor * oldDaysPerWeek * weeksWorkedPerYear/1000);
        if (props.isBoxChecked && (newDaysPerWeek < oldDaysPerWeek)) {
            setNewEmissions((newDistance * newEmissionFactor * newDaysPerWeek * weeksWorkedPerYear + oldDistance * oldEmissionFactor * (oldDaysPerWeek - newDaysPerWeek) * weeksWorkedPerYear)/1000);
        }
        else {
            setNewEmissions(newDistance * newEmissionFactor * newDaysPerWeek * weeksWorkedPerYear/1000);
        }
    }

    return (
        <div>
            <button onClick={estimateEmissions}>Estimer les émissions</button>

            <Chart oldEmissions={oldEmissions} newEmissions={newEmissions}/>
        </div>
    )
}

export default EstimateEmissions;