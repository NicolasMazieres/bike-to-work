import { useState, useEffect, useContext } from "react";
import { AppContext, IFactors, IDatas } from "../App";
import SelectButton from "./SelectButton";
import InputNumber from "./InputNumber";


interface Props {
    setOldVehicleData: React.Dispatch<React.SetStateAction<IDatas>>;
}

function OldVehicle(props: Props) {
    const [name, setName] = useState("diesel");
    const [distance, setDistance] = useState<number>(0);
    const [daysPerWeek, setDaysPerWeek] = useState<number>(0);
    const [consommation, setConsommation] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    const factors = useContext(AppContext);
    const emissionFactors = factors[0];
    const consommationFactors = factors[1];
    const fuelPrices = factors[2];
    const selectedEmissionFactor = emissionFactors[name as keyof IFactors];
    const selectedConsommationFactor = consommationFactors[name as keyof IFactors];
    const initConsommationValue = selectedConsommationFactor.toString();
    const selectedFuelPrice = fuelPrices[name as keyof IFactors];
    const initFuelValue = selectedFuelPrice.toString();

    const setData = props.setOldVehicleData;

    useEffect(() => {
        setData({vehicle: name, emissionFactor: selectedEmissionFactor, consommationFactor: selectedConsommationFactor, distance: distance, daysPerWeek: daysPerWeek, consommation: consommation, price: price})
    }, [name,distance, daysPerWeek, consommation, price, selectedEmissionFactor, selectedConsommationFactor, setData])

    return (
        <div className="old-vehicle-container">
            <h2>Avant</h2>
            <SelectButton setName={setName} selectedName={name} />
            <p>Ce véhicule émet : {selectedEmissionFactor} kgCO2/km</p>
            <br />
            <InputNumber setNumber={setDistance} label="Distance parcourue (en km)" min="0" initvalue="10" />
            <br />
            <InputNumber setNumber={setDaysPerWeek} label="Nombre de jours par semaine" min="1" max="7" initvalue="5"/>
            <br />
            <InputNumber setNumber={setConsommation} label="Consommation du véhicule (L/100km ou kWh/100km)" min="0" max="20" initvalue={initConsommationValue} />
            <br />
            <InputNumber setNumber={setPrice} label="Prix du carburant (€/L ou €/kWh)" min="0" max="5" initvalue={initFuelValue} />
            <br /><br /><br /><br />
        </div>
    )
}

export default OldVehicle;