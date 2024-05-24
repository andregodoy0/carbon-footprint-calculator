import { type EmissionFactor } from '~/server/emission_factors'

export const fetchEmisisonFactor = async (id: number) => {
  const data = await fetch(`/api/category/${id}`)
  return (await data.json()) as EmissionFactor
}
