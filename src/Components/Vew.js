import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function getData() {
    const dataSet = [
        {
            Date: new Date(2022, 9, 17),
            Number: 3
        },
        {
            Date: new Date(2022, 9, 16),
            Number: 11
        },
        {
            Date: new Date(2022, 9, 15),
            Number: 13
        },
        {
            Date: new Date(2022, 9, 14),
            Number: 5
        },
        {
            Date: new Date(2022, 9, 13),
            Number: 76
        },
        {
            Date: new Date(2022, 9, 12),
            Number: 90
        },
        {
            Date: new Date(2022, 9, 11),
            Number: 3
        },
        {
            Date: new Date(2022, 9, 10),
            Number: 11
        },
        {
            Date: new Date(2022, 9, 9),
            Number: 20
        }
    ]
    return dataSet;
}

function drawData(dataset) {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            console.log(payload[0].payload);
            const date = new Date(payload[0].payload.Date);
            const value = payload[0].payload.Number;
            return (
                <div className="custom-tooltip">
                    {`${date.getFullYear()}/${date.getMonth()}/${date.getDay()} : ${value}`}
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <div className='PageTitle'>
                nombre de vue
            </div>
            {/* 100-4.5-4.5-2 */}
            <ResponsiveContainer width="100%" height="89%">
                <LineChart
                    data={dataset}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="Date" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Number" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

function Vew() {
    return (
        drawData(getData())
    );
}

export default Vew;