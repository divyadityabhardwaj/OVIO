import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>OVIO Polls</h1>
      <Link href="/polls/new">Create a New Poll</Link>
    </div>
  );
}
