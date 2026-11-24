import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="eju-hero" aria-labelledby="eju-hero-title">
      <p className="eju-syllabus-pill">
        <span aria-hidden="true" />
         Математик · Физик · Хими · Биологи · Япон ба дэлхий · Япон хэл
      </p>

      <h1 id="eju-hero-title">
        Өнөөдрөөс эхэлж.
        <br />
        EJU оноогоо ахиул.
      </h1>

      <p className="eju-hero-description" id="study-abroad">
        EJU шалгалтынхаа сэдэв бүрийг богино давтлага, сорилоор бататгаарай. Их сургуулиа сонгож, өргөдлийн бүх алхмаа нэг дороос төлөвлөөрэй.
      </p>

      <div className="eju-hero-actions">
        <Link className="eju-primary-action" href="/sign-up">
          Үнэгүй бүртгүүлэх
        </Link>
        <Link className="eju-secondary-action" href="/login">
          Нэвтрэх
        </Link>
      </div>
    </section>
  );
}
