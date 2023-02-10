import { useState, useEffect, useContext } from "react";
import { AppContext, IFactors, IDatas } from "../App";
import SelectButton from "./SelectButton";
import InputNumber from "./InputNumber";


interface Props {
    setNewVehicleData: React.Dispatch<React.SetStateAction<IDatas>>;
    isBoxChecked: boolean;
    setIsBoxChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewVehicle(props: Props) {
    const [name, setName] = useState("ebike");
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

    const setData = props.setNewVehicleData;

    useEffect(() => {
        setData({ vehicle: name, emissionFactor: selectedEmissionFactor, consommationFactor: selectedConsommationFactor, distance: distance, daysPerWeek: daysPerWeek, consommation: consommation, price: price})
    }, [name, distance, daysPerWeek, consommation, price, selectedEmissionFactor, selectedConsommationFactor, setData])

    function handleChangeBox() {
        props.setIsBoxChecked(!props.isBoxChecked);
    }

    return (
        <div className="new-vehicle-container">
            <h2>Après</h2>
            <SelectButton setName={setName} selectedName={name} />
            <p>Ce véhicule émet : {selectedEmissionFactor} kgCO2/km</p>
            <br />
            <InputNumber setNumber={setDistance} label="Distance parcourue (en km)" min="0" initvalue="10"/>
            <br />
            <InputNumber setNumber={setDaysPerWeek} label="Nombre de jours par semaine" min="1" max="7" initvalue="5"/>
            <label htmlFor="check">Conserver l'ancien véhicule pour les autres jours</label>
            <input type="checkbox" id="check" checked={props.isBoxChecked} onChange={handleChangeBox} />
            <br /><br />
            <InputNumber setNumber={setConsommation} label="Consommation du véhicule (L/100km ou kWh/100km)" min="0" max="20" initvalue={initConsommationValue} />
            <br />
            <InputNumber setNumber={setPrice} label="Prix du carburant (€/L ou €/kWh)" min="0" max="5" initvalue={initFuelValue} />
            <br /><br /><br /><br />
        </div>
    )
}

export default NewVehicle;