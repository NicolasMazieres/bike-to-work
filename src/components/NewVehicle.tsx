import { useState, useContext } from "react";
import { AppContext, IFactors, IDatas } from "../App";
import SelectButton from "./SelectButton";
import InputNumber from "./InputNumber";


interface Props {
    setNewVehicleData: React.Dispatch<React.SetStateAction<IDatas>>;
}

function NewVehicle(props: Props) {
    const [name, setName] = useState("bike");
    const [distance, setDistance] = useState<number>(0);

    const emissionFactor = useContext(AppContext);

    return (
        <div className="new-vehicle-container">
            <SelectButton setName={setName} />
            <p>Ce véhicule émet : {emissionFactor[name as keyof IFactors]} kgCO2/km</p>
            <br />
            <InputNumber setDistance={setDistance} />
            <p>Distance parcourue : {distance} km</p>
        </div>
    )
}

export default NewVehicle;