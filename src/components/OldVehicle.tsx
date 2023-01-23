import { useState, useContext } from "react";
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

    return (
        <div>
            <SelectButton setName={setName} />
            <p>Ce véhicule émet : {emissionFactor[name as keyof IFactors]} kgCO2/km</p>
            <br />
            <InputNumber setDistance={setDistance} />
        </div>
    )
}

export default OldVehicle;