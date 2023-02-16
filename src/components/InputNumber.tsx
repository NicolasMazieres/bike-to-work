import { useState, useEffect } from "react";

interface Props {
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    label: string;
    unit?: string;
    min?: string;
    max?: string;
    initvalue?: string;
    maxLength?: number;
}

function InputNumber({ setNumber, label, unit = "", min = "", max = "", initvalue = "0", maxLength = 10 }: Props) {
    const [value, setValue] = useState("0");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (Number(e.target.value) > Number(max)) {
            setValue(max);
        }
        else if (Number(e.target.value) < Number(min)) {
            setValue(min);
        }
        else setValue(e.target.value);
    }

    useEffect(() => {
        setValue(initvalue);
    }, [initvalue])

    useEffect(() => {
        if (value.length > maxLength) {
            setValue(value.slice(0, maxLength));
        }
        setNumber(Number(value));
    }, [value, setNumber, maxLength])

    return (
        <div>
            <label htmlFor="inputnumber">{label} : </label>
            <div className="inputnumber-block">
                <input type="number" name="inputnumber" id="inputnumber" min={min} max={max} value={value} onChange={handleChange} />
                <span className="unit">{unit}</span>
            </div>
        </div>
    )
}

export default InputNumber;