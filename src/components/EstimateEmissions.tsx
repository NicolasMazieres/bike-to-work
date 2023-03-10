import { useState, useEffect } from "react";
import { IDatas } from "../App";
import Chart from "./Chart";
import { FaQuestionCircle } from "react-icons/fa";

interface Props {
    oldVehicleData: IDatas;
    newVehicleData: IDatas;
    isBoxChecked: boolean;
}

interface IResults {
    moneySaved: number;
    co2Saved: number;
}

function EstimateEmissions(props: Props) {
    const [oldEmissions, setOldEmissions] = useState<number>(0);
    const [newEmissions, setNewEmissions] = useState<number>(0);
    const [oldCost, setOldCost] = useState<number>(0);
    const [newCost, setNewCost] = useState<number>(0);
    const [savedResults, setSavedResults] = useState<IResults>({ moneySaved: 0, co2Saved: 0 });
    const [showResults, setShowResults] = useState<boolean>(false);

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

    useEffect(() => {
        setSavedResults({ moneySaved: (oldCost - newCost), co2Saved: (oldEmissions - newEmissions) })
    }, [oldCost, newCost, oldEmissions, newEmissions])

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
        setShowResults(true);
    }

    const toolTip = (
        <div className="question-tooltip">
            <FaQuestionCircle className="question" />
            <div className="bottom">
                <p>
                    Cet outil permet de comparer diff??rents modes de transport pour son trajet domicile-travail (et id??alement illustrer l'int??r??t de remplacer la voiture par le v??lo !).
                    <br /><br />
                    Les champs sont pr??-remplis avec des donn??es jug??es coh??rentes mais il est possible d'affiner les valeurs si besoin.
                    <br /><br />
                    Les donn??es sur les ??missions de CO2 sont des donn??es moyennes sur le parc fran??ais de v??hicules. Elles proviennent de la base de donn??es Base Empreinte?? de l'ADEME.
                </p>
                <i></i>
            </div>
        </div>
    );

    const initialTemplate = (
        <div className="estimate-body-container">
            <div className="question-container">
                {toolTip}
            </div>
            <div className="estimate-button-container initial">
                <button className="estimate-button" onClick={handleClick}>Faire le comparatif</button>
            </div >
        </div >
    );

    const resultsTemplate = (
        <div className="estimate-body-container">
            <div className="estimate-button-container">
                <div className="question-container results">
                    {toolTip}
                </div>
                <button className="estimate-button" onClick={handleClick}>Faire une autre comparaison</button>
            </div>
            <div className="svg-container">
                <div className="svg">
                    <img src="./images/emissions.svg" alt="CO2 emissions" height={80} className="co2-img" />
                    <p>{savedResults.co2Saved >= 0 ? ("Moins ") : ("Plus ")} <strong className="co2-strong">{Math.abs(savedResults.co2Saved).toFixed(2)}&nbsp;tonnes de CO2</strong> ??mises par an</p>
                </div>
                <div className="svg euro-svg">
                    <img src="./images/euro.svg" alt="Euro" height={80} className="money-img" />
                    <p>{savedResults.moneySaved >= 0 ? ("Gain de ") : ("Perte de ")} <strong className="money-strong">{Math.abs(savedResults.moneySaved).toFixed(2)}&nbsp;???</strong> par an</p>
                </div>
            </div>
            <Chart
                data1={[oldEmissions, newEmissions]}
                unit1=" t/an"
                legend1="Emissions annuelles de CO2"
                data2={[oldCost, newCost]}
                unit2=" ???/an"
                legend2="Co??t annuel en ???"
            />
        </div>
    );

    return (
        <div className="estimate-container">
            <h2>Comparaison des co??ts et ??missions</h2>
            {showResults ? (resultsTemplate) : (initialTemplate)}
        </div >
    )
}

export default EstimateEmissions;