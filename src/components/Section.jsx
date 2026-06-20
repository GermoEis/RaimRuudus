function Section({ id, eyebrow, title, lead, tone = 'light', children }) {
  return (
    <section className={`section section-${tone}`} id={id}>
      <div className="section-inner">
        <div className="section-heading">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {lead && <p>{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default Section;
