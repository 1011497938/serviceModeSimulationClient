import React from 'react';
import { ResponsiveRadar } from '@nivo/radar'

 class Radar extends React.Component{
  constructor(props){
		super(props);
	}
render(){
return(
  <ResponsiveRadar
  data={data}
  keys={[ 'chardonay', 'carmenere', 'syrah' ]}
  indexBy="taste"
  maxValue="auto"
  margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
  curve="linearClosed"
  borderWidth={2}
  borderColor={{ from: 'color' }}
  gridLevels={5}
  gridShape="circular"
  gridLabelOffset={36}
  enableDots={true}
  dotSize={10}
  dotColor={{ theme: 'background' }}
  dotBorderWidth={2}
  dotBorderColor={{ from: 'color' }}
  enableDotLabel={true}
  dotLabel="value"
  dotLabelYOffset={-12}
  colors={{ scheme: 'nivo' }}
  fillOpacity={0.25}
  blendMode="multiply"
  animate={true}
  motionStiffness={90}
  motionDamping={15}
  isInteractive={true}
  legends={[
      {
          anchor: 'top-left',
          direction: 'column',
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
              {
                  on: 'hover',
                  style: {
                      itemTextColor: '#000'
                  }
              }
          ]
      }
  ]}
/>
)
}
}


var data=[
  {
    "taste": "fruity",
    "chardonay": 116,
    "carmenere": 97,
    "syrah": 53
  },
  {
    "taste": "bitter",
    "chardonay": 29,
    "carmenere": 106,
    "syrah": 22
  },
  {
    "taste": "heavy",
    "chardonay": 75,
    "carmenere": 91,
    "syrah": 99
  },
  {
    "taste": "strong",
    "chardonay": 58,
    "carmenere": 71,
    "syrah": 118
  },
  {
    "taste": "sunny",
    "chardonay": 99,
    "carmenere": 112,
    "syrah": 69
  }
]
export default Radar;