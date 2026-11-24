import Link from "next/link";
import Image from "next/image";
import { Plane, UserRound } from "lucide-react";
import Button from "../ui/button";

const desktopAuthStoryShiftClass =
  "min-[821px]:translate-x-[clamp(20px,3.6vw,52px)]";
const desktopAuthFormShiftClass =
  "min-[821px]:-translate-x-[clamp(20px,3.6vw,52px)]";
const desktopLoginLayoutClasses =
  "min-[821px]:h-[calc(100svh_-_var(--auth-header-height))] min-[821px]:min-h-0 min-[821px]:grid-rows-[minmax(0,1fr)] min-[821px]:overflow-hidden";
const desktopLoginStoryPanelClasses =
  "min-[821px]:min-h-0 min-[821px]:py-[clamp(16px,3.5svh,36px)]";
const desktopLoginStoryCopyClasses =
  "min-[821px]:py-0 min-[821px]:translate-y-0";
const desktopLoginIllustrationClasses =
  "min-[821px]:mt-[clamp(10px,2.4svh,20px)] min-[821px]:mb-[clamp(8px,1.2svh,12px)]";
const desktopLoginFormPanelClasses =
  "min-[821px]:min-h-0 min-[821px]:py-[clamp(16px,3.5svh,32px)]";
const loginImageClasses =
  "max-h-[min(45svh,380px)] min-[821px]:max-h-[min(44svh,360px,calc(100svh_-_330px))]";
const signupImageClasses = "max-h-[min(32svh,260px)]";
const navigationLinkClasses =
  "transition-colors duration-150 hover:text-[#1a2635]";

export default function AuthLayout({ children, formLabel }) {
  const isLoginPage = formLabel === "Нэвтрэх";
  const accountLinkHref = isLoginPage ? "/signup" : "/login";
  const authHeaderClasses =
    "mx-auto grid w-[min(calc(100%_-_128px),1280px)] min-h-[82px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-7 max-[1100px]:gap-4 max-[1000px]:w-[calc(100%_-_96px)] max-[560px]:min-h-[72px] max-[560px]:w-[calc(100%_-_40px)]";
  const authBrandClasses =
    "relative col-start-1 inline-flex w-fit items-center text-[#171b2b] text-[29px] font-[750] tracking-[-0.055em] max-[1100px]:text-[25px] max-[560px]:text-2xl";
  const authNavigationClasses =
    "col-start-2 flex items-center justify-center gap-[clamp(20px,3vw,52px)] text-[15px] text-[#606a78] max-[1100px]:gap-5 max-[1100px]:text-[13px] max-[1000px]:hidden";
  const authPageClasses =
    "auth-page [--auth-header-height:83px] grid min-h-[calc(100svh_-_var(--auth-header-height))] grid-cols-[repeat(2,minmax(0,1fr))] bg-[var(--japanese-paper)] max-[820px]:grid-cols-1 max-[560px]:[--auth-header-height:73px]";
  const authStoryPanelClasses =
    "auth-story-panel flex min-w-0 min-h-[calc(100svh_-_var(--auth-header-height))] p-[clamp(32px,5.4vw,80px)] bg-[var(--japanese-paper)] text-[#171b2b] max-[820px]:min-h-[auto] max-[820px]:px-9 max-[820px]:pt-7 max-[820px]:pb-6 max-[560px]:px-6";
  const authStoryInnerClasses =
    `[--auth-copy-offset:clamp(60px,6vw,90px)] mx-auto flex w-[min(100%,600px)] flex-col items-center ${desktopAuthStoryShiftClass} max-[820px]:[--auth-copy-offset:clamp(46px,7vw,65px)] max-[560px]:[--auth-copy-offset:clamp(34px,9vw,44px)] ${isLoginPage ? "min-[821px]:justify-center" : ""}`;
  const authStoryCopyClasses =
    `flex flex-[0_0_auto] flex-col items-center justify-start pt-9 text-center translate-y-[var(--auth-copy-offset)] max-[820px]:pt-[30px] max-[820px]:pb-12 max-[560px]:pt-7 max-[560px]:pb-[42px] ${isLoginPage ? desktopLoginStoryCopyClasses : ""}`;
  const authIllustrationClasses = isLoginPage
    ? `auth-illustration-login flex w-full max-w-[600px] flex-[0_0_auto] items-end justify-center mt-[calc(var(--auth-copy-offset)_-_4px)] mb-[clamp(12px,2vh,20px)] ${desktopLoginIllustrationClasses}`
    : "flex w-full max-w-[600px] flex-[0_0_auto] items-end justify-center mt-[calc(var(--auth-copy-offset)_+_12px)] mb-[clamp(12px,2vh,20px)]";
  const authImageClasses = isLoginPage
    ? `block h-auto w-full object-contain ${loginImageClasses}`
    : `block h-auto w-full object-contain ${signupImageClasses}`;
  const authFormPanelClasses =
    `grid min-w-0 min-h-[calc(100svh_-_var(--auth-header-height))] place-items-center p-12 bg-[var(--japanese-paper)] max-[820px]:min-h-[auto] max-[820px]:border-l-0 max-[820px]:px-6 max-[820px]:pt-9 max-[820px]:pb-[60px] max-[560px]:px-4 max-[560px]:pt-7 max-[560px]:pb-12 ${isLoginPage ? desktopLoginFormPanelClasses : ""}`;
  const authFormContentClasses =
    `flex w-full justify-center ${desktopAuthFormShiftClass} [&_.cl-rootBox]:w-full [&_.cl-rootBox]:max-w-[500px] [&_.cl-cardBox]:w-full [&_.cl-cardBox]:max-w-[500px] [&_.cl-card]:min-h-[min(520px,calc(100svh_-_150px))]`;

  return (
    <>
      <header className="border-b border-[#e9e6de] bg-[var(--japanese-paper)]">
        <nav className={authHeaderClasses} aria-label="Үндсэн цэс">
          <Link
            className={authBrandClasses}
            href="/"
            aria-label="EJU нүүр хуудас"
          >
            <Plane
              className="mr-1.5 size-[34px] flex-[0_0_auto] max-[560px]:size-7"
              aria-hidden="true"
              strokeWidth={1.8}
            />
            <span className="relative inline-block">
              EJU
              <span
                className="absolute right-3 top-0.5 size-2 rounded-full bg-[var(--japanese-red)] max-[560px]:-right-[10px] max-[560px]:top-px max-[560px]:size-[7px]"
                aria-hidden="true"
              />
            </span>
          </Link>
          <div className={authNavigationClasses}>
            <Link className={navigationLinkClasses} href="/#home">Нүүр</Link>
            <Link className={navigationLinkClasses} href="/#subjects">
              EJU бэлтгэл
            </Link>
            <Link className={navigationLinkClasses} href="/#study-abroad">
              Их сургуулиуд
            </Link>
            <Link className={navigationLinkClasses} href="/#study-abroad">
              Тэтгэлэг
            </Link>
            <Link className={navigationLinkClasses} href="/#workflow">
              Заавар
            </Link>
          </div>
          <Button
            href={accountLinkHref}
            aria-label="Хэрэглэгчийн бүртгэл"
            className="col-start-3 justify-self-end"
          >
            <UserRound
              className="size-[21px]"
              aria-hidden="true"
              strokeWidth={1.7}
            />
          </Button>
        </nav>
      </header>

      <main
        className={`${authPageClasses} ${isLoginPage ? desktopLoginLayoutClasses : ""}`}
      >
        <section
          className={authStoryPanelClasses}
          aria-labelledby="auth-story-title"
        >
          <div className={authStoryInnerClasses}>
            <div className={authStoryCopyClasses}>
              <h1 className="m-0 max-w-[600px] text-[#171b2b] text-[clamp(50px,5vw,76px)] font-[760] tracking-[-0.065em] leading-[1.2] max-[820px]:text-[clamp(38px,7vw,54px)] max-[560px]:text-[clamp(34px,9vw,44px)] max-[560px]:leading-[1.08]" id="auth-story-title">
                {isLoginPage ? (
                  <>
                    <span className="text-[var(--brand-blue)]">Бэлтгэл-ээ</span>{" "}
                    үргэлжлүүлье.
                  </>
                ) : (
                  <>
                    <span className="text-[var(--brand-blue)]">EJU-дээ</span>{" "}
                    бэлдэж
                    <br />
                    эхэлцгээе.
                  </>
                )}
              </h1>
            </div>

            <div className={authIllustrationClasses}>
              <Image
                src={
                  isLoginPage
                    ? "/images/illustrations/eju-login-graduates.png"
                    : "/images/illustrations/eju-study-team-bg.png"
                }
                alt=""
                width={isLoginPage ? 720 : 1010}
                height={isLoginPage ? 525 : 470}
                className={authImageClasses}
              />
            </div>

            <p className="m-0 text-xs text-[#89919a]">
              EJU Prep · Японд суралцах зам
            </p>
          </div>
        </section>

        <section
          className={authFormPanelClasses}
          aria-label={formLabel}
        >
          <div className={authFormContentClasses}>{children}</div>
        </section>
      </main>
    </>
  );
}
