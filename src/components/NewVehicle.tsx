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
    const [name, setName] = useState("bike");
    const [distance, setDistance] = useState<number>(0);
    const [daysPerWeek, setDaysPerWeek] = useState<number>(0);

    const emissionFactor = useContext(AppContext);
    const selectedEmissionFactor = emissionFactor[name as keyof IFactors]

    useEffect(() => {
        props.setNewVehicleData({vehicle: name, emissionFactor: selectedEmissionFactor, distance: distance, daysPerWeek: daysPerWeek})
    }, [name,distance, daysPerWeek,props,selectedEmissionFactor])

    function handleChangeBox() {
        props.setIsBoxChecked(!props.isBoxChecked);
    }

    return (
        <div className="new-vehicle-container">
            <SelectButton setName={setName} />
            <p>Ce véhicule émet : {selectedEmissionFactor} kgCO2/km</p>
            <br />
            <InputNumber setNumber={setDistance} label="Distance parcourue (en km)" min="0" />
            <p>Distance parcourue : {distance} km</p>
            <br />
            <InputNumber setNumber={setDaysPerWeek} label="Nombre de jours par semaine" min="1" max="7" />
            <label htmlFor="check">Conserver l'ancien véhicule pour les autres jours</label>
            <input type="checkbox" id="check" checked={props.isBoxChecked} onChange={handleChangeBox} />
        </div>
    )
}

export default NewVehicle;