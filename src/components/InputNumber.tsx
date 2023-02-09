import { useState, useEffect } from "react";

interface Props {
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    label: string;
    min?: string;
    max?: string;
    initvalue?: string;
}

function InputNumber({ setNumber, label, min = "", max = "", initvalue="0"}: Props) {
    const [value, setValue] = useState("0");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    useEffect(() => {
        setValue(initvalue);
    }, [initvalue])

    useEffect(() => {
        setNumber(Number(value));
    }, [value, setNumber])

    return (
        <div>
            <label htmlFor="inputnumber">{label} : </label>
            <input type="number" name="inputnumber" id="inputnumber" min={min} max={max} value={value} onChange={handleChange} />
        </div>
    )
}

export default InputNumber;