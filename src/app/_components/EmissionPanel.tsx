import { EMISSION_FACTORS } from '~/server/emission_factors'
import CarbonSource from './CarbonSource'

const EmissionPanel = () => {
  const fuelEmission = EMISSION_FACTORS.find(({ id }) => id === 2)!
  return (
    <>
      <h1 className="text-2xl font-bold">Find out your car carbon footprint!</h1>
      <div className="grid w-full grid-cols-4 justify-between">
        <div className="container">
          <div className="">
            <h2 className="pt-4 text-xl">{fuelEmission.name}</h2>
            <div className="flex flex-col">
              by {fuelEmission.property}
              <CarbonSource source={fuelEmission.config} />
            </div>
          </div>
        </div>
        <div className="col-end-5 min-w-40 text-center">
          <h2 className="text-2xl">Total</h2>
          <div>
            <span className="font-bold">CO2e/yr</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmissionPanel
