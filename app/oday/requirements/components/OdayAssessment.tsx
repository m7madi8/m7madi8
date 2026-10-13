import OdayForm from "./OdayForm";
import OdayReveal from "./OdayReveal";

export default function OdayAssessment() {
  return (
    <section className="od-shell od-section od-section-first">
      <OdayReveal className="mx-auto max-w-lg text-center">
        <p className="od-step-count">تحليل المتطلبات</p>
        <h1 className="od-intro-headline mt-4 font-medium text-white">
          استبيان فهم احتياجات النظام
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
          إجاباتك بتساعدنا نبني نظام إدارة المكتب على طريقة شغلك الفعلية — بدون
          تكرار أسئلة، وبدون أي التزام قبل ما نراجع المتطلبات سوا.
        </p>
      </OdayReveal>

      <OdayReveal className="mx-auto mt-10 max-w-2xl">
        <OdayForm />
      </OdayReveal>
    </section>
  );
}
