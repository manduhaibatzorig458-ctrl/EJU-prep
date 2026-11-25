import Link from "next/link";
import EjuBrand from "./eju-brand";

export default function LandingHeader() {
  return (
    <header className="eju-header">
      <nav className="eju-header-inner home-header-inner" aria-label="Үндсэн цэс">
        <EjuBrand />

        <div className="eju-nav-links">
          <a href="#home">Нүүр</a>
          <a href="#subjects">EJU бэлтгэл</a>
          <a href="#study-abroad">Их сургуулиуд</a>
          <a href="#study-abroad">Тэтгэлэг</a>
          <a href="#workflow">Заавар</a>
        </div>

        <div className="eju-header-actions">
          
          <Link className="eju-login-button" href="/login">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M10 5H5v14h5m-1-7h11m-5-5 5 5-5 5" />
            </svg>
            Нэвтрэх
          </Link>
          <Link className="eju-signup-button" href="/signup">
            Үнэгүй бүртгүүлэх
          </Link>
        </div>
      </nav>
    </header>
  );
}
