import { EmissionFactor } from '~/server/emission_factors'

const CarbonSource = ({ source }: { source: EmissionFactor['config'] }) => {
  return (
    <div className="p-2">
      <select className="select select-bordered w-full max-w-xs">
        {source.map((item) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
    </div>
  )
}

export default CarbonSource
