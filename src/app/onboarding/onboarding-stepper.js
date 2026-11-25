export default function OnboardingStepper({ completedSteps, totalSteps }) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div
      aria-label="Асуулгын явц"
      aria-valuemax={totalSteps}
      aria-valuemin={0}
      aria-valuenow={completedSteps}
      aria-valuetext={`${completedSteps} / ${totalSteps} асуулт бөглөсөн`}
      className="mx-auto mb-6 flex w-full max-w-[560px] items-center gap-2 sm:gap-3"
      role="progressbar"
    >
      {steps.map((step) => (
        <div className="contents" key={step}>
          <span
            aria-hidden="true"
            className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-medium transition-colors sm:size-10 ${
              step <= completedSteps
                ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white"
                : "border-[#dedede] bg-[#f3f3f3] text-[#666]"
            }`}
          >
            {step}
          </span>
          {step < totalSteps && (
            <span
              aria-hidden="true"
              className={`h-0.5 min-w-1 flex-1 transition-colors ${
                step <= completedSteps ? "bg-[var(--brand-blue)]" : "bg-[#dedede]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
