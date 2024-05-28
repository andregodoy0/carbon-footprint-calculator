'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { type EmissionData, useCalculatorContext } from '../EmissionCalculatorProvider'
import { fetchEmisisonFactor } from '../_utils/helpers'

const CarbonSource = ({ source, transportIndex }: { source: EmissionData; transportIndex: number }) => {
  const { dispatch } = useCalculatorContext()
  const [selected, setSelectected] = useState<number>(0)
  const [multiplier, setMultiplier] = useState<number>(source.multiplier)

  useEffect(() => {
    if (selected !== undefined) {
      if (source.emission.options[selected]?.suboption !== undefined) {
        fetchEmisisonFactor(source.emission.options[selected]!.suboption!)
          .then((fuelEmission) =>
            dispatch({
              type: 'add_next_emission',
              data: {
                transportIndex,
                emission: fuelEmission,
                parentId: source.emission.id,
                currentFactor: source.emission.options[selected]!.factor,
              },
            })
          )
          .catch(() => console.error('Error'))
      } else {
        dispatch({
          type: 'remove_next_emissions',
          data: {
            transportIndex,
            emissionId: source.emission.id,
            currentFactor: source.emission.options[selected]?.factor ?? source.emission.options[0]!.factor,
          },
        })
      }
    }
  }, [selected, dispatch, source.emission.id, source.emission.options, transportIndex])

  useEffect(() => {
    dispatch({ type: 'change_transport_multiplier', data: { emissionId: source.emission.id, multiplier, transportIndex } })
  }, [multiplier, dispatch, source.emission.id, transportIndex])

  return (
    <div className="p-2">
      <h3 className="pl-4 text-lg">
        {source.emission.name} by {source.emission.property}:
      </h3>
      <div className="p-4">
        <div className="join">
          <select className="select select-bordered w-full join-item max-w-xs" value={selected} onChange={(e) => setSelectected(parseInt(e.target.value))}>
            {source.emission.options.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
          {source.emission.multiplierDescription && (
            <>
              <input
                type="number"
                className="input input-bordered join-item w-28"
                placeholder={source.emission.multiplierDescription}
                value={multiplier}
                step={1}
                onClick={(e) => setMultiplier((e.target as EventTarget & HTMLInputElement).valueAsNumber)}
                onChange={(e) => setMultiplier(e.target.valueAsNumber)}
              />
              {/* TODO: [UX improvement] Convert from average mileage and miles per gallon to units of gallons */}
              <div className="input input-bordered join-item w-80 leading-8 pt-1.5">
                {source.emission.multiplierDescription} ({source.emission.options[selected]?.unit})
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarbonSource
