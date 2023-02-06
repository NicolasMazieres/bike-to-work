import { useState, useEffect, useContext } from "react";
import { AppContext, IFactors, IDatas } from "../App";
import SelectButton from "./SelectButton";
import InputNumber from "./InputNumber";


interface Props {
    setOldVehicleData: React.Dispatch<React.SetStateAction<IDatas>>;
}

function OldVehicle(props: Props) {
    const [name, setName] = useState("bike");
    const [distance, setDistance] = useState<number>(0);
    const [daysPerWeek, setDaysPerWeek] = useState<number>(0);

    const emissionFactor = useContext(AppContext);
    const selectedEmissionFactor = emissionFactor[name as keyof IFactors]

    const setData = props.setOldVehicleData;

    useEffect(() => {
        setData({vehicle: name, emissionFactor: selectedEmissionFactor, distance: distance, daysPerWeek: daysPerWeek})
    }, [name,distance, daysPerWeek,selectedEmissionFactor, setData])

    return (
        <div className="old-vehicle-container">
            <SelectButton setName={setName} />
            <p>Ce véhicule émet : {selectedEmissionFactor} kgCO2/km</p>
            <br />
            <InputNumber setNumber={setDistance} label="Distance parcourue (en km)" min="0" />
            <p>Distance parcourue : {distance} km</p>
            <InputNumber setNumber={setDaysPerWeek} label="Nombre de jours par semaine" min="1" max="7" />
        </div>
    )
}

export default OldVehicle;