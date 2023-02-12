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
    const [oldCost, setOldCost] = useState<number>(0);
    const [newCost, setNewCost] = useState<number>(0);


    const weeksWorkedPerYear = 45.6;

    const oldDistance = props.oldVehicleData.distance;
    const oldEmissionFactor = props.oldVehicleData.emissionFactor;
    const oldDaysPerWeek = props.oldVehicleData.daysPerWeek;
    const oldConsommation = props.oldVehicleData.consommation / 100;
    const oldPrice = props.oldVehicleData.price;

    const newDistance = props.newVehicleData.distance;
    const newEmissionFactor = props.newVehicleData.emissionFactor;
    const newDaysPerWeek = props.newVehicleData.daysPerWeek;
    const newConsommation = props.newVehicleData.consommation / 100;
    const newPrice = props.newVehicleData.price;

    function estimateEmissions() {
        setOldEmissions(oldDistance * oldEmissionFactor * oldDaysPerWeek * weeksWorkedPerYear / 1000);
        if (props.isBoxChecked && (newDaysPerWeek < oldDaysPerWeek)) {
            setNewEmissions((newDistance * newEmissionFactor * newDaysPerWeek * weeksWorkedPerYear + oldDistance * oldEmissionFactor * (oldDaysPerWeek - newDaysPerWeek) * weeksWorkedPerYear) / 1000);
        }
        else {
            setNewEmissions(newDistance * newEmissionFactor * newDaysPerWeek * weeksWorkedPerYear / 1000);
        }
    }

    function estimatePrices() {
        setOldCost(oldDistance * oldPrice * oldConsommation * oldDaysPerWeek * weeksWorkedPerYear);
        if (props.isBoxChecked && (newDaysPerWeek < oldDaysPerWeek)) {
            setNewCost(newDistance * newPrice * newConsommation * newDaysPerWeek * weeksWorkedPerYear + oldDistance * oldPrice * oldConsommation * (oldDaysPerWeek - newDaysPerWeek) * weeksWorkedPerYear);
        }
        else {
            setNewCost(newDistance * newPrice * newConsommation * newDaysPerWeek * weeksWorkedPerYear);
        }
    }

    function handleClick() {
        estimateEmissions();
        estimatePrices();
    }

    return (
        <div className="estimate-container">
            <h2>Comparatif avant/après</h2>
            <div className="estimate-body-container">
                <div className="estimate-button-container">
                    <button className="estimate-button" onClick={handleClick}>Faire le comparatif</button>
                </div>
                <Chart
                    data1={[oldEmissions, newEmissions]}
                    unit1=" t/an"
                    legend1="Emissions annuelles de CO2"
                    data2={[oldCost, newCost]}
                    unit2=" €/an"
                    legend2="Coût annuel en €"
                />
            </div>
        </div>
    )
}

export default EstimateEmissions;