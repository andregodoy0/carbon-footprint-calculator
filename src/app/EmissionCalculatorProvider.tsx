'use client'

import { useReducer, type ReactNode, createContext, useContext } from 'react'
import { EMISSION_EQUIVALENCY, EMISSION_FACTORS, type EmissionFactor } from '~/server/emission_factors'

interface AddNextEmissionAction {
  type: 'add_next_emission'
  data: {
    transportIndex: number
    emission: EmissionCalculatorContextType['transportModes'][0][0]['emission']
    parentId: number
    currentFactor: [number, number, number]
  }
}
interface RemoveNextEmissionAction {
  type: 'remove_next_emissions'
  data: {
    transportIndex: number
    emissionId: number
    currentFactor: [number, number, number]
  }
}
interface ChangeTransportAmountAction {
  type: 'change_transport_amount'
  data: {
    totalTransports: number
  }
}
interface ChangeTransportMultiplierAction {
  type: 'change_transport_multiplier'
  data: {
    transportIndex: number
    emissionId: number
    multiplier: number
  }
}
interface CleanStateAction {
  type: 'clean'
  data: undefined
}

type DispatchActions = AddNextEmissionAction | RemoveNextEmissionAction | ChangeTransportAmountAction | CleanStateAction | ChangeTransportMultiplierAction

export interface EmissionData {
  emission: EmissionFactor
  selectedFactor: [number, number, number]
  multiplier: number
  totalEmissions?: number
}

type EmissionCalculatorContextType = {
  transportModes: [EmissionData[]]
}
const defaultTransportModeInitialEmission = {
  emission: { ...EMISSION_FACTORS[0]! } as EmissionFactor,
  selectedFactor: EMISSION_FACTORS[0]!.options[0]!.factor,
  multiplier: 1,
}

export const initalState: EmissionCalculatorContextType = {
  transportModes: [[{ ...defaultTransportModeInitialEmission }]],
}
const EmissionCalculatorContext = createContext({
  state: initalState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: (() => {}) as React.Dispatch<DispatchActions>,
})

export const useCalculatorContext = () => {
  return useContext(EmissionCalculatorContext)
}

const contextReducer = (state: EmissionCalculatorContextType, action: DispatchActions): EmissionCalculatorContextType => {
  switch (action.type) {
    case 'add_next_emission': {
      if (state.transportModes[action.data.transportIndex]) {
        const currentTransport = [...state.transportModes[action.data.transportIndex]!]
        const parentEmissionIndex = currentTransport.findIndex(({ emission: { id } }) => id === action.data.parentId)
        // also removes all dependant emissions
        const updatedSelectedEmissions = [...currentTransport.slice(0, parentEmissionIndex + 1)]
        updatedSelectedEmissions[parentEmissionIndex]!.selectedFactor = action.data.currentFactor
        updatedSelectedEmissions[parentEmissionIndex]!.totalEmissions = getTotalCO2eForEmission(
          action.data.currentFactor,
          updatedSelectedEmissions[parentEmissionIndex]!.multiplier
        )
        updatedSelectedEmissions.push({
          emission: action.data.emission,
          selectedFactor: action.data.emission.options[0]!.factor,
          multiplier: 1,
        })
        state.transportModes[action.data.transportIndex] = updatedSelectedEmissions
      }
      return {
        ...state,
        transportModes: [...state.transportModes],
      }
    }
    case 'remove_next_emissions': {
      if (state.transportModes[action.data.transportIndex]) {
        const currentTransport = [...state.transportModes[action.data.transportIndex]!]
        const currentEmissionIndex = currentTransport.findIndex(({ emission: { id } }) => id === action.data.emissionId)
        const updatedSelectedEmissions = [...currentTransport.slice(0, currentEmissionIndex + 1)]
        updatedSelectedEmissions[currentEmissionIndex]!.selectedFactor = action.data.currentFactor
        state.transportModes[action.data.transportIndex] = updatedSelectedEmissions
      }
      return {
        ...state,
        transportModes: [...state.transportModes],
      }
    }
    case 'change_transport_amount':
      while (action.data.totalTransports > state.transportModes.length) {
        state.transportModes.push([{ ...defaultTransportModeInitialEmission }])
      }
      if (action.data.totalTransports < state.transportModes.length) {
        const toRemove = state.transportModes.length - action.data.totalTransports
        state.transportModes.splice(state.transportModes.length - toRemove, toRemove)
      }
      return {
        ...state,
      }
    case 'change_transport_multiplier':
      if (state.transportModes[action.data.transportIndex]) {
        const currentTransport = [...state.transportModes[action.data.transportIndex]!]
        const currentEmissionIndex = currentTransport.findIndex(({ emission: { id } }) => id === action.data.emissionId)
        const currentEmission = { ...currentTransport[currentEmissionIndex]!, multiplier: action.data.multiplier }
        currentEmission.multiplier = action.data.multiplier
        currentEmission.totalEmissions = getTotalCO2eForEmission(currentEmission.selectedFactor, currentEmission.multiplier)
        currentTransport[currentEmissionIndex] = currentEmission
        state.transportModes[action.data.transportIndex] = currentTransport
      }
      return {
        ...state,
        transportModes: [...state.transportModes],
      }
    case 'clean':
      return { ...initalState }
  }
}

const getTotalCO2eForEmission = (factor: number[], multiplier = 1) => {
  return (factor[0]! * EMISSION_EQUIVALENCY[0]! + factor[1]! * EMISSION_EQUIVALENCY[1]! + factor[2]! * EMISSION_EQUIVALENCY[2]!) * multiplier
}

const EmissionCalculatorProvider = ({ children, context }: { children: ReactNode; context: EmissionCalculatorContextType }) => {
  const [state, dispatch] = useReducer(contextReducer, context)

  return <EmissionCalculatorContext.Provider value={{ state, dispatch }}>{children}</EmissionCalculatorContext.Provider>
}

export default EmissionCalculatorProvider
