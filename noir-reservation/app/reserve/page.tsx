import Nav from "@/components/Nav";
import ReservationFlow from "@/components/reservation/ReservationFlow";

export const metadata = {
  title: "Reserve a Table — NOIR",
};

export default function ReservePage() {
  return (
    <main className="relative flex-1 min-h-screen">
      <Nav />
      <ReservationFlow />
    </main>
  );
}
