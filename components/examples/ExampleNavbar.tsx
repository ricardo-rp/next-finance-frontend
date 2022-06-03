type ExampleNavbarProps = { className?: string };

export function ExampleNavbar({ className }: ExampleNavbarProps) {
  return (
    <header className={className}>
      <nav className="container">
        <ul>
          <li>
            <strong>Brand</strong>
          </li>
        </ul>

        <ul>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#" role="button">
              Button
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        header {
          border-bottom: solid 1px var(--muted-border-color);
        }
      `}</style>
    </header>
  );
}
