import type { Metadata } from "next";
import AgreementContent from "./AgreementContent";

export const metadata: Metadata = {
  title: "اتفاقية العمل | محمد حروب — مطور ويب Full-Stack",
  description:
    "اتفاقية العمل بين محمد حروب (مطور ويب Full-Stack) والعميل. توضح آلية العمل، نطاق الخدمة، مراحل التنفيذ، الدفع والدعم الفني.",
};

export default function AgreementPage() {
  return <AgreementContent />;
}
