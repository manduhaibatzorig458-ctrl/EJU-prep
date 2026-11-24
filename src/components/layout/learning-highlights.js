const learningHighlights = [
  "Mock exam",
  "Алдааны дэвтэр",
  "Хуваарьтай давтлага",
];

export default function LearningHighlights() {
  return (
    <ul className="learning-highlights" id="workflow">
      {learningHighlights.map((highlight) => (
        <li key={highlight}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8" />
            <path d="m6.5 10 2.2 2.2 4.8-5" />
          </svg>
          {highlight}
        </li>
      ))}
    </ul>
  );
}
