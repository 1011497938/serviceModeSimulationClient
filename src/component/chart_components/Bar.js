import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

export class Bar extends React.Component{
  // constructor(props){
  //   super(props);
	// }
render(){
return(
<ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)
}
}


var data=[
  {
    "country": "AD",
    "hot dog": 175,
    "hot dogColor": "hsl(267, 70%, 50%)",
    "burger": 111,
    "burgerColor": "hsl(221, 70%, 50%)",
    "sandwich": 196,
    "sandwichColor": "hsl(71, 70%, 50%)",
    "kebab": 105,
    "kebabColor": "hsl(222, 70%, 50%)",
    "fries": 37,
    "friesColor": "hsl(200, 70%, 50%)",
    "donut": 152,
    "donutColor": "hsl(94, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 68,
    "hot dogColor": "hsl(284, 70%, 50%)",
    "burger": 71,
    "burgerColor": "hsl(178, 70%, 50%)",
    "sandwich": 85,
    "sandwichColor": "hsl(201, 70%, 50%)",
    "kebab": 140,
    "kebabColor": "hsl(311, 70%, 50%)",
    "fries": 188,
    "friesColor": "hsl(113, 70%, 50%)",
    "donut": 161,
    "donutColor": "hsl(349, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 132,
    "hot dogColor": "hsl(280, 70%, 50%)",
    "burger": 31,
    "burgerColor": "hsl(64, 70%, 50%)",
    "sandwich": 158,
    "sandwichColor": "hsl(229, 70%, 50%)",
    "kebab": 26,
    "kebabColor": "hsl(96, 70%, 50%)",
    "fries": 44,
    "friesColor": "hsl(165, 70%, 50%)",
    "donut": 31,
    "donutColor": "hsl(38, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 164,
    "hot dogColor": "hsl(335, 70%, 50%)",
    "burger": 64,
    "burgerColor": "hsl(225, 70%, 50%)",
    "sandwich": 13,
    "sandwichColor": "hsl(41, 70%, 50%)",
    "kebab": 26,
    "kebabColor": "hsl(263, 70%, 50%)",
    "fries": 112,
    "friesColor": "hsl(125, 70%, 50%)",
    "donut": 70,
    "donutColor": "hsl(359, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 43,
    "hot dogColor": "hsl(234, 70%, 50%)",
    "burger": 154,
    "burgerColor": "hsl(71, 70%, 50%)",
    "sandwich": 52,
    "sandwichColor": "hsl(51, 70%, 50%)",
    "kebab": 0,
    "kebabColor": "hsl(87, 70%, 50%)",
    "fries": 111,
    "friesColor": "hsl(283, 70%, 50%)",
    "donut": 129,
    "donutColor": "hsl(158, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 49,
    "hot dogColor": "hsl(275, 70%, 50%)",
    "burger": 86,
    "burgerColor": "hsl(276, 70%, 50%)",
    "sandwich": 22,
    "sandwichColor": "hsl(24, 70%, 50%)",
    "kebab": 19,
    "kebabColor": "hsl(125, 70%, 50%)",
    "fries": 182,
    "friesColor": "hsl(324, 70%, 50%)",
    "donut": 139,
    "donutColor": "hsl(227, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 82,
    "hot dogColor": "hsl(238, 70%, 50%)",
    "burger": 82,
    "burgerColor": "hsl(43, 70%, 50%)",
    "sandwich": 9,
    "sandwichColor": "hsl(28, 70%, 50%)",
    "kebab": 150,
    "kebabColor": "hsl(233, 70%, 50%)",
    "fries": 74,
    "friesColor": "hsl(266, 70%, 50%)",
    "donut": 158,
    "donutColor": "hsl(253, 70%, 50%)"
  }
]

export default Bar;