import { render, screen } from '@testing-library/react'
import { type EmissionData } from '~/app/EmissionCalculatorProvider'
import CarbonSource from '~/app/_components/CarbonSource'

vi.mock('../src/app/EmissionCalculatorProvicer', async (importOriginal) => {
  const originalModule = await importOriginal()
  return {
    ...(originalModule as object),
    useCalculatorContext: vi.fn,
  } as unknown
})

describe('CarbonSource', () => {
  const transportIndex = 1
  const emission = {
    id: 2,
    name: 'Test combustion',
    property: 'Fuel Type',
    multiplierDescription: 'Average yearly mileage',
    options: [
      { name: 'Option 1', factor: [3, 0, 0] as [number, number, number], unit: 'gallon' as const },
      { name: 'Option 2', factor: [8, 0, 0] as [number, number, number], unit: 'gallon' as const, suboption: 3 },
    ],
  }
  const emisisonData = {
    emission,
    multiplier: 1,
    selectedFactor: emission.options[0]!.factor,
  } as EmissionData

  const renderComponent = () => {
    render(<CarbonSource source={emisisonData} transportIndex={transportIndex} />)

    return {
      heading: screen.getByRole('heading'),
      select: screen.getByRole('combobox'),
      input: emisisonData.emission.multiplierDescription ? screen.getByPlaceholderText(emisisonData.emission.multiplierDescription) : null,
    }
  }

  it('should render a given EmissionData', () => {
    const { heading, select, input } = renderComponent()

    expect(heading).toHaveTextContent(emisisonData.emission.name + ' by ' + emisisonData.emission.property)
    expect(select).toHaveTextContent(emisisonData.emission.options.map(({ name }) => name).join(''))
    expect(input).toBeInTheDocument()
  })
})
