import { useState, useEffect } from "react";

interface Props {
    setDistance: React.Dispatch<React.SetStateAction<number>>;
}

function InputNumber(props: Props) {
    const [value, setValue] = useState("0");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    useEffect(() => {
        props.setDistance(Number(value));
    }, [value])

    return (
        <div>
            <label htmlFor="distance">Distance aller-retour (en km) : </label>
            <input type="number" name="distance" id="distance" value={value} onChange={handleChange}/>
        </div>
    )
}

export default InputNumber;