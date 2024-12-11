import dynamic from 'next/dynamic'

const SalesCoworker = dynamic(
  () => import('./components/SalesCoworker'),
  { ssr: false }
)

export default function Home() {
  return (
    <main>
      <SalesCoworker />
    </main>
  )
}
