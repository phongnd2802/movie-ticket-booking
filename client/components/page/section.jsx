export default function Section({ children, className, title, id }) {
  const titleId = title
    ? `section-title-${id || title.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  return (
    <section
      id={id}
      className={`w-full max-w-[85%] mx-auto max-md:max-w-[95%] ${
        className || ""
      }`}
      aria-labelledby={titleId}
    >
      {title && (
        <h2 id={titleId} className="text-2xl font-bold mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
