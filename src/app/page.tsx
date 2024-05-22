import EmissionPanel from './_components/EmissionPanel'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex max-w-screen-lg flex-col items-center justify-center gap-12 px-4 py-16">
        <EmissionPanel />
      </div>
    </main>
  )
}
