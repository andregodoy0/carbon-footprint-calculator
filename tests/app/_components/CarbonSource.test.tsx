import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useCalculatorContext, type EmissionData } from '~/app/EmissionCalculatorProvider'
import CarbonSource from '~/app/_components/CarbonSource'
import { fetchEmisisonFactor } from '~/app/_utils/helpers'

const dispatch = vi.fn()
vi.mock('~/app/EmissionCalculatorProvider', async (importOriginal) => {
  const originalModule = await importOriginal()
  return {
    ...(originalModule as object),
    useCalculatorContext: vi.fn(() => ({
      dispatch,
    })),
  } as unknown
})
vi.mock('~/app/_utils/helpers')

describe('CarbonSource', () => {
  const transportIndex = 1
  const emission1 = {
    id: 2,
    name: 'Test combustion',
    property: 'Fuel Type',
    multiplierDescription: 'Average yearly units',
    options: [
      { name: 'Option 1', factor: [3, 0, 0] as [number, number, number], unit: 'gallon' as const },
      { name: 'Option 2', factor: [8, 0, 0] as [number, number, number], unit: 'gallon' as const, suboption: 3 },
    ],
  }
  const emission2 = {
    id: 3,
    name: 'Test stationary combustion',
    property: 'Fuel Type',
    options: [
      { name: 'Option 3', factor: [5, 0, 0] as [number, number, number], unit: 'gallon' as const },
      { name: 'Option 4', factor: [13, 0, 0] as [number, number, number], unit: 'gallon' as const },
    ],
  }
  const emissionData = {
    emission: emission1,
    multiplier: 0,
    selectedFactor: emission1.options[0]!.factor,
  } as EmissionData

  const renderComponent = () => {
    render(<CarbonSource source={emissionData} transportIndex={transportIndex} />)

    return {
      heading: screen.getByRole('heading'),
      select: screen.getByRole('combobox'),
      input: screen.getByPlaceholderText(emissionData.emission.multiplierDescription!),
    }
  }

  it('should render a given EmissionData', () => {
    const { heading, select, input } = renderComponent()

    expect(heading).toHaveTextContent(emissionData.emission.name + ' by ' + emissionData.emission.property)
    expect(select).toHaveTextContent(emissionData.emission.options.map(({ name }) => name).join(''))
    expect(input).toBeInTheDocument()
  })

  it('should fetch new EmissionData if one with a suboption is selected', async () => {
    const { select } = renderComponent()
    vi.mocked(fetchEmisisonFactor).mockResolvedValue(emission2)
    const suboptionIndex = 1

    fireEvent.change(select, { target: { value: suboptionIndex + '' } })

    expect(fetchEmisisonFactor).toHaveBeenCalledWith(emission1.options[suboptionIndex]?.suboption)
  })

  it('should update the total once the user enters a value for the multiplier', async () => {
    const { input } = renderComponent()

    expect(input).toBeInTheDocument()
    const user = userEvent.setup()
    console.log(vi.mocked(useCalculatorContext().dispatch).mock.calls)
    await user.type(input, '10')

    console.log(vi.mocked(useCalculatorContext().dispatch).mock.calls)
    expect(useCalculatorContext().dispatch).toHaveBeenCalledWith({
      type: 'change_transport_multiplier',
      data: {
        emissionId: emission1.id,
        multiplier: 10,
        transportIndex,
      },
    })
  })
})
