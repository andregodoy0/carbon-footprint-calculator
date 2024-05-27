import { type NextRequest } from 'next/server'
import { EMISSION_FACTORS } from '~/server/emission_factors'

/**
 * Gets a category of emission and its configuration. Currently uses static data from
 * EMISSION_FACTORS, but it could as well fetch it from a database.
 */
export function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const emissionId = parseInt(params.id)
  if (isNaN(emissionId)) {
    return Response.json({ error: 'Invalid' }, { status: 500 })
  }

  const emission = EMISSION_FACTORS.find(({ id }) => id === emissionId)
  if (!emission) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json(emission, { status: 200 })
}
