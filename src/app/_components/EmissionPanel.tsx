'use client'
import { useEffect, useState } from 'react'
import { type EmissionData, useCalculatorContext } from '../EmissionCalculatorContext'
import CarbonSource from './CarbonSource'

const calculateTotalEmissions = (transportModes: EmissionData[][]) => {
  return transportModes
    .reduce((total, transport) => {
      total += transport.reduce((acc, { totalEmissions }) => acc + (totalEmissions ?? 0), 0)
      return total
    }, 0)
    .toFixed(2)
}

const EmissionPanel = () => {
  const {
    dispatch,
    state: { transportModes },
  } = useCalculatorContext()
  const [totalemission, setTotalEmissions] = useState(calculateTotalEmissions(transportModes))
  useEffect(() => {
    setTotalEmissions(calculateTotalEmissions(transportModes))
  }, [transportModes])

  return (
    <>
      <h1 className="text-2xl font-bold">Find out your transportation carbon footprint!</h1>
      <div className="flex w-full justify-between">
        <div className="w-full mr-4">
          <div className="mb-2">
            <span className="text-lg">Select the amout of vehicles in your household:</span>
            <select
              className="select select-bordered"
              onChange={(e) => dispatch({ type: 'change_transport_amount', data: { totalTransports: parseInt(e.target.value) } })}
              value={transportModes.length}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          {transportModes?.map((selectedEmissions, transportIndex) => (
            <div key={transportIndex} className="card card-bordered border-gray-700">
              {selectedEmissions.map((source, index) => (
                <CarbonSource key={index} source={source} transportIndex={transportIndex} />
              ))}
            </div>
          ))}
        </div>
        <div className="justify-end min-w-60 w-60 text-center card p-4 card-bordered border-gray-700">
          <h2 className="text-2xl card-title">Total</h2>
          <div className="card-body flex flex-row items-baseline m-auto">
            <span className="text-3xl">{totalemission}</span>
            <span className="font-bold">CO2e/yr</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmissionPanel
