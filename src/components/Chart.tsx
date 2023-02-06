import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
    oldEmissions: number;
    newEmissions: number;
}

function Chart(props: Props) {
    const data = [
        {
            name: 'Anciennes émissions',
            co2: props.oldEmissions,
        },
        {
            name: 'Nouvelles émissions',
            co2: props.newEmissions,
        }
    ];

    return (
        <div className="barchart-container">
            <h2>Bar Chart</h2>
            <ResponsiveContainer width="50%" aspect={2} >
                <BarChart data={data} margin={{top: 20, right: 100, left: 100, bottom: 5,}} barSize={100}>
                    <XAxis dataKey="name" scale="point" padding={{ left: 100, right: 100 }} />
                    <YAxis dataKey="co2" unit=" t/an" />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="co2" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;

