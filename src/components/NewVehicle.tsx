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
        setData({ vehicle: name, emissionFactor: selectedEmissionFactor, consommationFactor: selectedConsommationFactor, distance: distance, daysPerWeek: daysPerWeek, consommation: consommation, price: price })
    }, [name, distance, daysPerWeek, consommation, price, selectedEmissionFactor, selectedConsommationFactor, setData])

    function handleChangeBox() {
        props.setIsBoxChecked(!props.isBoxChecked);
    }

    return (
        <div className="new-vehicle-container">
            <h2>Trajet futur</h2>
            <div className="new-vehicle-body-container">
                <SelectButton setName={setName} selectedName={name} />
                <InputNumber setNumber={setDistance} label="Distance parcourue" unit="km/jour" min="0" max="99" initvalue="10" />
                <InputNumber setNumber={setDaysPerWeek} label="Nombre de jours par semaine" min="1" max="7" initvalue="5" />
                <label className="checkbox-container" htmlFor="check" id="checkbox-label">Conserver le véhicule du trajet actuel pour les autres jours
                    <input type="checkbox" id="check" checked={props.isBoxChecked} onChange={handleChangeBox} />
                    <span className="checkmark"></span>
                </label>
                <InputNumber setNumber={setConsommation} label="Consommation du véhicule" unit="L/100km ou kWh/100km" min="0" max="20" initvalue={initConsommationValue} maxLength={4} />
                <InputNumber setNumber={setPrice} label="Prix du carburant" unit="€/L ou €/kWh" min="0" max="100" initvalue={initFuelValue} maxLength={5} />
            </div>
        </div>
    )
}

export default NewVehicle;