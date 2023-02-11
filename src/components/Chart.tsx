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
            name: "Avant",
            value1: props.data1[0],
            value2: props.data2[0],
        },
        {
            name: "Après",
            value1: props.data1[1],
            value2: props.data2[1],
        }
    ];

    return (
        <div className="barchart-container">
            <ResponsiveContainer width="50%" aspect={2} >
                <BarChart data={data} margin={{ top: 20, right: 100, left: 100, bottom: 5, }} barSize={100}>
                    <XAxis dataKey="name" scale="point" padding={{ left: 100, right: 100 }} />
                    <YAxis dataKey="value1" unit={props.unit1} yAxisId="left" />
                    <YAxis dataKey="value2" unit={props.unit2} yAxisId="right" orientation="right" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend payload={[
                        { value: props.legend1, type: "rect", color: "#8884d8" },
                        { value: props.legend2, type: "rect", color: "#1884d8" }
                    ]} />
                    <Bar dataKey="value1" yAxisId="left" fill="#8884d8" background={{ fill: '#eee' }} />
                    <Bar dataKey="value2" yAxisId="right" fill="#1884d8" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;

