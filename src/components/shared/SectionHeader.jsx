export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  count,
  action,
}) {
  return (
    <div className="section-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>

        <h2>
          {title}
          {count !== undefined && <span className="count"> ({count})</span>}
        </h2>

        {subtitle && <p>{subtitle}</p>}
      </div>

      {action}
    </div>
  );
}
