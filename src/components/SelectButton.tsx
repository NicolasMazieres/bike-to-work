interface Props {
    setName: React.Dispatch<React.SetStateAction<string>>;
    selectedName: string;
}

function SelectButton(props: Props) {

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.setName(e.target.value);
    }

    return (
        <div>
            <label htmlFor="vehicle-select">Choisir un véhicule : </label>
            <select name="vehicles" id="vehicle-select" onChange={handleChange}>
                <option value="bike" selected={props.selectedName === "bike"}>Vélo / Marche / Télétravail</option>
                <option value="ebike" selected={props.selectedName === "ebike"}>Vélo électrique</option>
                <option value="e85" selected={props.selectedName === "e85"}>Voiture (Superéthanol E85)</option>
                <option value="diesel" selected={props.selectedName === "diesel"}>Voiture (Diesel)</option>
                <option value="petrol" selected={props.selectedName === "petrol"}>Voiture (Essence)</option>
                <option value="gpl" selected={props.selectedName === "gpl"}>Voiture (GPL)</option>
                <option value="motorcycle" selected={props.selectedName === "motorcycle"}>Moto/Scooter</option>
                <option value="escooter" selected={props.selectedName === "escooter"}>Scooter électrique</option>
                <option value="ecar" selected={props.selectedName === "ecar"}>Voiture électrique</option>
                <option value="hybridcar" selected={props.selectedName === "hybridcar"}>Voiture hybride</option>
            </select>
        </div>
    )
}

export default SelectButton;