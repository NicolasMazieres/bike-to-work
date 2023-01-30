import { useState, useEffect } from "react";

interface Props {
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    label: string;
    min?: string;
    max?: string;
}

function InputNumber({setNumber, label, min="", max=""}: Props) {
    const [value, setValue] = useState("0");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    useEffect(() => {
        setNumber(Number(value));
    }, [value, setNumber])

    return (
        <div>
            <label htmlFor="distance">{label} : </label>
            <input type="number" name="distance" id="distance" min={min} max={max} value={value} onChange={handleChange} />
        </div>
    )
}

export default InputNumber;