import { useState } from "react";
import { IDatas } from "../App";

interface Props {
    oldVehicleData: IDatas;
    newVehicleData: IDatas;
}

function EstimateEmissions(props: Props) {
    const [oldEmissions, setOldEmissions] = useState<number>(0);
    const [newEmissions, setNewEmissions] = useState<number>(0);

    const oldDistance = props.oldVehicleData.distance;
    const oldEmissionFactor = props.oldVehicleData.emissionFactor;
    const newDistance = props.newVehicleData.distance;
    const newEmissionFactor = props.newVehicleData.emissionFactor;

    function estimateEmissions(){
        setOldEmissions(oldDistance*oldEmissionFactor);
        setNewEmissions(newDistance*newEmissionFactor);
    }

    return (
        <div>
            <button onClick={estimateEmissions}>Estimer les émissions</button>
            <p>Les anciennes émissions sont de : {oldEmissions} kgCO2 par jour</p>
            <p>Les nouvelles émissions sont de : {newEmissions} kgCO2 par jour</p>

        </div>
    )
}

export default EstimateEmissions;