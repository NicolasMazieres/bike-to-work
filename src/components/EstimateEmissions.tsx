import { useState } from "react";
import { IDatas } from "../App";

interface Props {
    oldVehicleData: IDatas;
    newVehicleData: IDatas;
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

    function estimateEmissions(){
        setOldEmissions(oldDistance*oldEmissionFactor*oldDaysPerWeek*weeksWorkedPerYear);
        setNewEmissions(newDistance*newEmissionFactor*newDaysPerWeek*weeksWorkedPerYear);
    }

    return (
        <div>
            <button onClick={estimateEmissions}>Estimer les émissions</button>
            <p>Les anciennes émissions sont de : {oldEmissions} kgCO2 par an</p>
            <p>Les nouvelles émissions sont de : {newEmissions} kgCO2 par an</p>

        </div>
    )
}

export default EstimateEmissions;