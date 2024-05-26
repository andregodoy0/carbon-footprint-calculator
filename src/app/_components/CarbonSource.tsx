'use client'
import { useEffect, useState } from 'react'
import { type EmissionData, useCalculatorContext } from '../EmissionCalculatorContext'
import { fetchEmisisonFactor } from '../_utils/helpers'

const CarbonSource = ({ source, transportIndex }: { source: EmissionData; transportIndex: number }) => {
  const { dispatch } = useCalculatorContext()
  const [selected, setSelectected] = useState<number>(0)
  const [multiplier, setMultiplier] = useState<number>(source.multiplier)

  useEffect(() => {
    if (selected !== undefined) {
      if (source.emission.options[selected]?.suboption !== undefined) {
        fetchEmisisonFactor(source.emission.options[selected]!.suboption!).then((fuelEmission) =>
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
      } else {
        dispatch({
          type: 'remove_next_emissions',
          data: {
            transportIndex,
            emissionId: source.emission.id,
            currentFactor: source.emission.options[selected]!.factor,
          },
        })
      }
    }
  }, [selected])

  useEffect(() => {
    dispatch({ type: 'change_transport_multiplier', data: { emissionId: source.emission.id, multiplier, transportIndex } })
  }, [multiplier])

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
            <input
              type="number"
              className="input input-bordered join-item"
              placeholder={source.emission.multiplierDescription}
              value={multiplier}
              step={1}
              onClick={(e) => setMultiplier((e.target as EventTarget & HTMLInputElement).valueAsNumber)}
              onChange={(e) => setMultiplier(e.target.valueAsNumber)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CarbonSource
