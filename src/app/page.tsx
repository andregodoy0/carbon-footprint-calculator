import * as React from 'react'
import EmissionCalculatorProvider, { initalState } from './EmissionCalculatorProvider'
import EmissionPanel from './_components/EmissionPanel'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container flex max-w-screen-lg flex-col items-center gap-12 px-4 py-16">
        <EmissionCalculatorProvider context={initalState}>
          <EmissionPanel />
        </EmissionCalculatorProvider>
      </div>
    </main>
  )
}
