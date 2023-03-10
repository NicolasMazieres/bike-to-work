import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface Props {
    data1: [number, number];
    data2: [number, number];
    unit1: string;
    unit2: string;
    legend1: string;
    legend2: string;
}

function Chart(props: Props) {
    const data = [
        {
            name: "Actuel",
            value1: props.data1[0],
            value2: props.data2[0],
        },
        {
            name: "Futur",
            value1: props.data1[1],
            value2: props.data2[1],
        }
    ];

    return (
        <div className="chart-container">
            <ResponsiveContainer className="chart-responsive-container" width="100%" height="100%" >
                <BarChart data={data} >
                    <XAxis dataKey="name" stroke="#eee" />
                    <YAxis dataKey="value1" unit={props.unit1} yAxisId="left" stroke="#eee"/>
                    <YAxis dataKey="value2" unit={props.unit2} yAxisId="right" orientation="right" stroke="#eee"/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend payload={[
                        { value: props.legend1, type: "rect", color: "#24a7a9" },
                        { value: props.legend2, type: "rect", color: "#a82cbb" }
                    ]} />
                    <Bar dataKey="value1" yAxisId="left" fill="#24a7a9" background={{ fill: "#FFFFFF50" }} />
                    <Bar dataKey="value2" yAxisId="right" fill="#a82cbb" background={{ fill: "#FFFFFF50" }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;

