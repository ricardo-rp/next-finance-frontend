type ExampleFooterProps = { className?: string };

export function ExampleFooter({ className }: ExampleFooterProps) {
  return (
    <footer className={className}>
      This is a footer. Put more stuff here.
    </footer>
  );
}
