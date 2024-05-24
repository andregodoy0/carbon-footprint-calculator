'use client'
import { useEffect, useState } from 'react'
import { EmissionFactor } from '~/server/emission_factors'
import { useCalculatorContext } from '../EmissionCalculatorContext'
import { fetchEmisisonFactor } from '../_utils/helpers'

const CarbonSource = ({ source, transportIndex }: { source: EmissionFactor; transportIndex: number }) => {
  const { dispatch } = useCalculatorContext()
  const [selected, setSelectected] = useState<number>()

  useEffect(() => {
    if (selected !== undefined) {
      if (source.options[selected]?.suboption !== undefined) {
        fetchEmisisonFactor(source.options[selected]!.suboption!).then((fuelEmission) =>
          dispatch({ type: 'add_next_emission', data: { transportIndex, emission: fuelEmission, parentId: source.id } })
        )
      } else {
        dispatch({ type: 'remove_next_emissions', data: { transportIndex, emissionId: source.id } })
      }
    }
  }, [selected])

  return (
    <div className="p-2">
      <h3 className="pl-4 text-lg">
        {source.name} by {source.property}:
      </h3>
      <div className="p-4">
        <div className="join">
          <select className="select select-bordered w-full join-item max-w-xs" value={selected} onChange={(e) => setSelectected(parseInt(e.target.value))}>
            {source.options.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
          {source.multiplier && <input type="number" className="input input-bordered join-item" placeholder={source.multiplier} />}
        </div>
      </div>
    </div>
  )
}

export default CarbonSource
