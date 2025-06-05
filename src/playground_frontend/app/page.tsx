import Counter from "./components/Counter";
import Method from "./components/Method";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Counter />
      <Method />
    </main>
  )
} 