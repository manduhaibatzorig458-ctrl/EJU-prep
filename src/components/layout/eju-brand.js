import Link from "next/link";

export default function EjuBrand({ tone = "brand" }) {
  const textColorClass = tone === "black" ? "text-black" : "text-[#171b2b]";

  return (
    <Link
      className={`relative col-start-1 inline-flex w-fit items-center ${textColorClass} text-[29px] font-[750] tracking-[-0.055em] max-[1100px]:text-[25px] max-[560px]:text-2xl`}
      href="/"
      aria-label="EJU нүүр хуудас"
    >
      <svg
        className="mr-1.5 block size-[34px] flex-[0_0_auto] fill-black stroke-none max-[560px]:size-7"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path
          d="M22 12 19 10.4l-5.6-.2-3.1-5.3-1.9-.4 1.1 5.6-2.8-.4-1.8-2.8-1.3-.3.8 5.4-.8 5.4 1.3-.3 1.8-2.8 2.8-.4-1.1 5.6 1.9-.4 3.1-5.3 5.6-.2L22 12Z"
          transform="rotate(-45 12 12)"
        />
      </svg>
      <span className="relative inline-block">
        EJU
        <span
          className="absolute -right-3 top-0.5 size-2 rounded-full bg-[var(--japanese-red)] max-[560px]:-right-[10px] max-[560px]:top-px max-[560px]:size-[7px]"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
