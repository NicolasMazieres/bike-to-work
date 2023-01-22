import { useState, useEffect } from "react";

interface Props {
    estimateCO2: ((vehicle: string, distance:number) => number)
}

function VehicleSelector(props: Props) {
    const [vehicle, setVehicle] = useState("");
    const [emission, setEmission] = useState(0);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setVehicle(e.target.value);
    }

    useEffect(() =>{
        setEmission(props.estimateCO2(vehicle,10));
    }, [vehicle])

    return (
        <div>
            <label htmlFor="vehicle-select">Choisir un véhicule : </label>
            <select name="vehicles" id="vehicle-select" onChange={handleChange}>
                <option value="bike">Vélo</option>
                <option value="ebike">Vélo électrique</option>
                <option value="e85">Voiture (Superéthanol E85)</option>
                <option value="diesel">Voiture (Diesel)</option>
                <option value="petrol">Voiture (Essence)</option>
                <option value="gpl">Voiture (GPL)</option>
                <option value="motorcycle">Moto/Scooter</option>
                <option value="escooter">Scooter électrique</option>
                <option value="ecar">Voiture électrique</option>
                <option value="hybridcar">Voiture hybride</option>
            </select>
            <p>Emission = {emission}</p>
        </div>
    )
}

export default VehicleSelector;