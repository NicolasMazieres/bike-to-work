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

    const emissionFactor = useContext(AppContext);
    const selectedEmissionFactor = emissionFactor[name as keyof IFactors]

    useEffect(() => {
        props.setOldVehicleData({vehicle: name, emissionFactor: selectedEmissionFactor, distance: distance})
    }, [name,distance,props,selectedEmissionFactor])

    return (
        <div className="old-vehicle-container">
            <SelectButton setName={setName} />
            <p>Ce véhicule émet : {selectedEmissionFactor} kgCO2/km</p>
            <br />
            <InputNumber setDistance={setDistance} />
            <p>Distance parcourue : {distance} km</p>
        </div>
    )
}

export default OldVehicle;