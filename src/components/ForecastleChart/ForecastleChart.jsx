import React from 'react';

import {Line} from "react-chartjs-2";

const ForecastleChart = ({weather}) => {

  const someData = localStorage.getItem('city')
  console.log(JSON.parse(someData))

  return (
    <Line 
      data={{}}
      height={300}
      width={600}
    />
  )
}

export default ForecastleChart;
