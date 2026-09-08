import OminoForm from "./OminoForm";
import OminoReveal from "./OminoReveal";

export default function OminoAssessment() {
  return (
    <section className="om-shell om-section om-section-first">
      <OminoReveal className="mx-auto max-w-lg text-center">
        <p className="om-step-count">تقييم سريع</p>
        <h1 className="om-intro-headline mt-4 font-medium text-white">
          خلينا نفهم متجرك أكثر.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
          بضع دقائق بس، وبيساعدنا نفهم احتياجات متجرك بشكل حقيقي — بدون أي
          محاولة إقناع أو تعقيد.
        </p>
      </OminoReveal>

      <OminoReveal className="mx-auto mt-10 max-w-2xl">
        <OminoForm />
      </OminoReveal>
    </section>
  );
}