interface Props {
    setDistance: React.Dispatch<React.SetStateAction<number>>;
}

function InputNumber(props: Props) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setDistance(Number(e.target.value));
    }

    return (
        <div>
            <label htmlFor="distance">Distance aller-retour (en km) : </label>
            <input type="number" name="distance" id="distance" value="10" onChange={handleChange}/>
        </div>
    )
}

export default InputNumber;