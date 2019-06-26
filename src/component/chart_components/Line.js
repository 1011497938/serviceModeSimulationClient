import React from 'react';
import { ResponsiveLine } from '@nivo/line'

 class Line extends React.Component{
  constructor(props){
		super(props);
	}
render(){
return(
  <ResponsiveLine
  data={data}
  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  xScale={{ type: 'point' }}
  yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
  axisTop={null}
  axisRight={null}
  axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle'
  }}
  axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
  }}
  colors={{ scheme: 'nivo' }}
  pointSize={10}
  pointColor={{ theme: 'background' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  pointLabel="y"
  pointLabelYOffset={-12}
  useMesh={true}
  legends={[
      {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
              {
                  on: 'hover',
                  style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
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
    "id": "japan",
    "color": "hsl(335, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 296
      },
      {
        "x": "helicopter",
        "y": 228
      },
      {
        "x": "boat",
        "y": 254
      },
      {
        "x": "train",
        "y": 14
      },
      {
        "x": "subway",
        "y": 279
      },
      {
        "x": "bus",
        "y": 296
      },
      {
        "x": "car",
        "y": 278
      },
      {
        "x": "moto",
        "y": 195
      },
      {
        "x": "bicycle",
        "y": 183
      },
      {
        "x": "horse",
        "y": 129
      },
      {
        "x": "skateboard",
        "y": 25
      },
      {
        "x": "others",
        "y": 153
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(49, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 227
      },
      {
        "x": "helicopter",
        "y": 57
      },
      {
        "x": "boat",
        "y": 264
      },
      {
        "x": "train",
        "y": 194
      },
      {
        "x": "subway",
        "y": 212
      },
      {
        "x": "bus",
        "y": 245
      },
      {
        "x": "car",
        "y": 135
      },
      {
        "x": "moto",
        "y": 59
      },
      {
        "x": "bicycle",
        "y": 259
      },
      {
        "x": "horse",
        "y": 166
      },
      {
        "x": "skateboard",
        "y": 35
      },
      {
        "x": "others",
        "y": 58
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(51, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 295
      },
      {
        "x": "helicopter",
        "y": 292
      },
      {
        "x": "boat",
        "y": 286
      },
      {
        "x": "train",
        "y": 56
      },
      {
        "x": "subway",
        "y": 36
      },
      {
        "x": "bus",
        "y": 110
      },
      {
        "x": "car",
        "y": 215
      },
      {
        "x": "moto",
        "y": 219
      },
      {
        "x": "bicycle",
        "y": 210
      },
      {
        "x": "horse",
        "y": 113
      },
      {
        "x": "skateboard",
        "y": 149
      },
      {
        "x": "others",
        "y": 9
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(224, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 137
      },
      {
        "x": "helicopter",
        "y": 91
      },
      {
        "x": "boat",
        "y": 158
      },
      {
        "x": "train",
        "y": 11
      },
      {
        "x": "subway",
        "y": 81
      },
      {
        "x": "bus",
        "y": 239
      },
      {
        "x": "car",
        "y": 247
      },
      {
        "x": "moto",
        "y": 155
      },
      {
        "x": "bicycle",
        "y": 118
      },
      {
        "x": "horse",
        "y": 253
      },
      {
        "x": "skateboard",
        "y": 164
      },
      {
        "x": "others",
        "y": 58
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(152, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 274
      },
      {
        "x": "helicopter",
        "y": 139
      },
      {
        "x": "boat",
        "y": 42
      },
      {
        "x": "train",
        "y": 285
      },
      {
        "x": "subway",
        "y": 92
      },
      {
        "x": "bus",
        "y": 20
      },
      {
        "x": "car",
        "y": 183
      },
      {
        "x": "moto",
        "y": 151
      },
      {
        "x": "bicycle",
        "y": 153
      },
      {
        "x": "horse",
        "y": 283
      },
      {
        "x": "skateboard",
        "y": 119
      },
      {
        "x": "others",
        "y": 212
      }
    ]
  }
]

export default Line;