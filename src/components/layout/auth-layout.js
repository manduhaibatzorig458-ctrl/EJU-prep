import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children, formLabel }) {
  const isLoginPage = formLabel === "Нэвтрэх";
  const accountLinkHref = formLabel === "Нэвтрэх" ? "/signup" : "/login";

  return (
    <>
      <header className="eju-header">
        <nav className="eju-header-inner auth-header-inner" aria-label="Үндсэн цэс">
          <Link className="eju-brand" href="/" aria-label="EJU нүүр хуудас">
            <svg className="eju-brand-plane" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M22 12 19 10.4l-5.6-.2-3.1-5.3-1.9-.4 1.1 5.6-2.8-.4-1.8-2.8-1.3-.3.8 5.4-.8 5.4 1.3-.3 1.8-2.8 2.8-.4-1.1 5.6 1.9-.4 3.1-5.3 5.6-.2L22 12Z" transform="rotate(-45 12 12)" />
            </svg>
            <span className="eju-brand-word">
              EJU
              <span className="eju-brand-accent" aria-hidden="true" />
            </span>
          </Link>
          <div className="eju-nav-links">
            <Link href="/#home">Нүүр</Link>
            <Link href="/#subjects">EJU бэлтгэл</Link>
            <Link href="/#study-abroad">Их сургуулиуд</Link>
            <Link href="/#study-abroad">Тэтгэлэг</Link>
            <Link href="/#workflow">Заавар</Link>
          </div>
          <Link
            className="auth-account-button"
            href={accountLinkHref}
            aria-label="Хэрэглэгчийн бүртгэл"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c.6-3.4 3.1-5.2 7-5.2s6.4 1.8 7 5.2" />
            </svg>
          </Link>
        </nav>
      </header>

      <main className="auth-page">
        <section className="auth-story-panel" aria-labelledby="auth-story-title">
          <div className="auth-story-inner">
            <div className="auth-story-copy eju-hero">
              <h1 id="auth-story-title">
                {isLoginPage ? (
                  <>
                    <span className="auth-title-accent">Бэлтгэл-ээ</span>{" "}
                    үргэлжлүүлье.
                  </>
                ) : (
                  <>
                    <span className="auth-title-accent">EJU-дээ</span> бэлдэж
                    <br />
                    эхэлцгээе.
                  </>
                )}
              </h1>
            </div>

            <div
              className={
                isLoginPage
                  ? "auth-illustration auth-illustration-login"
                  : "auth-illustration"
              }
            >
              <Image
                src={
                  isLoginPage
                    ? "/images/illustrations/eju-graduation-team-paper.png"
                    : "/images/illustrations/eju-study-team-bg.png"
                }
                alt=""
                width={isLoginPage ? 780 : 1010}
                height={isLoginPage ? 622 : 470}
              />
            </div>

            <p className="auth-story-footer">EJU Prep · Японд суралцах зам</p>
          </div>
        </section>

        <section className="auth-form-panel" aria-label={formLabel}>
          <div className="auth-form-content">{children}</div>
        </section>
      </main>
    </>
  );
}
