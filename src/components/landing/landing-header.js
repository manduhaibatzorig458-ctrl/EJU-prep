import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="eju-header">
      <nav className="eju-header-inner" aria-label="Үндсэн цэс">
        <Link className="eju-brand" href="/" aria-label="EJU нүүр хуудас">
          <svg className="eju-brand-plane" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M22 12 19 10.4l-5.6-.2-3.1-5.3-1.9-.4 1.1 5.6-2.8-.4-1.8-2.8-1.3-.3.8 5.4-.8 5.4 1.3-.3 1.8-2.8 2.8-.4-1.1 5.6 1.9-.4 3.1-5.3 5.6-.2L22 12Z" transform="rotate(-45 12 12)" fill="#000" stroke="none" />
          </svg>
          <span className="eju-brand-word">
            EJU
            <span className="eju-brand-accent" aria-hidden="true" />
          </span>
        </Link>

        <div className="eju-nav-links">
          <a href="#subjects">Хичээлүүд</a>
          <a href="#workflow">Их сургууль</a>
          <a href="#study-abroad">Японд суралцах</a>
        </div>

        <div className="eju-header-actions">
          
          <Link className="eju-login-button" href="/login">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M10 5H5v14h5m-1-7h11m-5-5 5 5-5 5" />
            </svg>
            Нэвтрэх
          </Link>
          <Link className="eju-signup-button" href="/sign-up">
            Үнэгүй бүртгүүлэх
          </Link>
        </div>
      </nav>
    </header>
  );
}
