export default function Section({ title, children, ...props }) {
  // Section component definition
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
