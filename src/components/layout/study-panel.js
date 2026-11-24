const subjects = [
  {
    id: "mathematics",
    name: "Математик",
    detail: "Сонголт 1 / 2",
    type: "math",
    tone: "blue",
  },
  {
    id: "physics",
    name: "Физик",
    detail: "",
    type: "physics",
    tone: "orange",
  },
  {
    id: "chemistry",
    name: "Хими",
    detail: "",
    type: "chemistry",
    tone: "green",
  },
  {
    id: "biology",
    name: "Биологи",
    detail: "",
    type: "biology",
    tone: "green",
  },
  {
    id: "japan-and-world",
    name: "Япон ба дэлхий",
    detail: "Нийгмийн ухаан",
    type: "social",
    tone: "orange",
  },
  {
    id: "japanese",
    name: "Япон хэл",
    detail: "Бичих · Унших · Сонсох",
    type: "japanese",
    tone: "pink",
  },
];

function SubjectIcon({ type }) {
  if (type === "math") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15 4-7 16M7 10h10M8 15h10" />
      </svg>
    );
  }

  if (type === "physics") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="9" ry="3.6" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.4" />
      </svg>
    );
  }

  if (type === "biology") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4c8 0 4 16 12 16M18 4c-8 0-4 16-12 16M8 7h8m-7 5h6m-7 5h8" />
      </svg>
    );
  }

  if (type === "social") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9m0-18c-3 3-4 6-4 9s1 6 4 9" />
      </svg>
    );
  }

  return <span className="study-subject-japanese" aria-hidden="true">あ</span>;
}

export default function StudyPanel() {
  return (
    <aside className="study-panel" id="subjects" aria-labelledby="study-panel-title">
      <div className="study-session-card">
        <span className="study-target-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="17" />
            <circle cx="24" cy="24" r="10" />
            <circle cx="24" cy="24" r="3" />
          </svg>
        </span>
        <p className="study-session-label">EJU · БЭЛТГЭЛ</p>
        <h2 id="study-panel-title">Хөтөлбөр</h2>
        <p className="study-session-description">Шалгалтад хэрэгтэй 6 хичээл</p>
        <div className="study-subject-count">
          
        </div>
      </div>

      <div className="study-subject-list" aria-label="Бэлтгэх хичээлүүд">
        {subjects.map((subject) => (
          <article className="study-subject-row" key={subject.id}>
            <span className="study-subject-icon" data-tone={subject.tone}>
              <SubjectIcon type={subject.type} />
            </span>
            <span className="study-subject-copy">
              <strong>{subject.name}</strong>
              {subject.detail ? <small>{subject.detail}</small> : null}
            </span>
            <span className="study-subject-arrow" aria-hidden="true">→</span>
          </article>
        ))}
      </div>
      <a className="study-next-step" href="#study-abroad">
        Их сургууль, өргөдлөө төлөвлөх <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
