'use client'

import { useReducer, type ReactNode, createContext, useContext } from 'react'
import { EMISSION_FACTORS, EmissionFactor } from '~/server/emission_factors'

interface SetEmissionsAction {
  type: 'set_emissions'
  data: {
    transportIndex: number
    emission: EmissionCalculatorContextType['transportModes'][0]['selectedEmissions']
  }
}
interface AddNextEmissionAction {
  type: 'add_next_emission'
  data: {
    transportIndex: number
    emission: EmissionCalculatorContextType['transportModes'][0]['selectedEmissions'][0]
    parentId: number
  }
}
interface RemoveNextEmissionAction {
  type: 'remove_next_emissions'
  data: {
    transportIndex: number
    emissionId: number
  }
}
interface ChangeTransportAmountAction {
  type: 'change_transport_amount'
  data: {
    totalTransports: number
  }
}
interface CleanStateAction {
  type: 'clean'
  data: undefined
}

type DispatchActions = SetEmissionsAction | AddNextEmissionAction | RemoveNextEmissionAction | ChangeTransportAmountAction | CleanStateAction

type EmissionCalculatorContextType = {
  transportModes: [
    {
      selectedEmissions: EmissionFactor[]
      averageMileage: number
      totalEmissions: number
    },
  ]
}
const defaultTransportModeInitialEmission = {
  selectedEmissions: [{ ...EMISSION_FACTORS[0] }] as EmissionFactor[],
  averageMileage: 0,
  totalEmissions: 0,
}
export const initalState: EmissionCalculatorContextType = {
  transportModes: [{ ...defaultTransportModeInitialEmission }],
}
const EmissionCalculatorContext = createContext({
  state: initalState,
  dispatch: (() => {}) as React.Dispatch<DispatchActions>,
})

export const useCalculatorContext = () => {
  return useContext(EmissionCalculatorContext)
}

const contextReducer = (state: EmissionCalculatorContextType, action: DispatchActions): EmissionCalculatorContextType => {
  switch (action.type) {
    case 'set_emissions':
      const currentTransport = {
        ...state.transportModes[action.data.transportIndex],
        selectedEmissions: action.data,
      }
      return {
        ...state,
      }
    case 'add_next_emission': {
      if (state.transportModes[action.data.transportIndex]) {
        const currentTransport = {
          ...state.transportModes[action.data.transportIndex]!,
        }
        const parentEmissionIndex = currentTransport.selectedEmissions.findIndex(({ id }) => id === action.data.parentId)
        // removes all dependant emissions
        const updatedSelectedEmissions = [...currentTransport.selectedEmissions.slice(0, parentEmissionIndex + 1)]
        updatedSelectedEmissions.push(action.data.emission)
        state.transportModes[action.data.transportIndex]!.selectedEmissions = updatedSelectedEmissions
      }
      return {
        ...state,
      }
    }
    case 'remove_next_emissions': {
      if (state.transportModes[action.data.transportIndex]) {
        const currentTransport = {
          ...state.transportModes[action.data.transportIndex]!,
        }
        const currentEmissionIndex = currentTransport.selectedEmissions.findIndex(({ id }) => id === action.data.emissionId)
        const updatedSelectedEmissions = [...currentTransport.selectedEmissions.slice(0, currentEmissionIndex + 1)]
        state.transportModes[action.data.transportIndex]!.selectedEmissions = updatedSelectedEmissions
      }
      return {
        ...state,
      }
    }
    case 'change_transport_amount':
      // console.log(action.data, state.transportModes.length)
      while (action.data.totalTransports > state.transportModes.length) {
        state.transportModes.push({ ...defaultTransportModeInitialEmission })
      }
      if (action.data.totalTransports < state.transportModes.length) {
        const toRemove = state.transportModes.length - action.data.totalTransports
        state.transportModes.splice(state.transportModes.length - toRemove, toRemove)
      }
      return {
        ...state,
      }
    case 'clean':
      return initalState
  }
}

const EmissionCalculatorProvider = ({ children, context }: { children: ReactNode; context: EmissionCalculatorContextType }) => {
  const [state, dispatch] = useReducer(contextReducer, context)

  return <EmissionCalculatorContext.Provider value={{ state, dispatch }}>{children}</EmissionCalculatorContext.Provider>
}

export default EmissionCalculatorProvider
