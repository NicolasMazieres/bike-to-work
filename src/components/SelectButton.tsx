interface Props {
    setName: React.Dispatch<React.SetStateAction<string>>;
}

function SelectButton(props: Props) {

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.setName(e.target.value);
    }

    return (
        <div>
            <label htmlFor="vehicle-select">Choisir un véhicule : </label>
            <select name="vehicles" id="vehicle-select" onChange={handleChange}>
                <option value="bike">Vélo / Marche / Télétravail</option>
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
        </div>
    )
}

export default SelectButton;