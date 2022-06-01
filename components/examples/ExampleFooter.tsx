type ExampleFooterProps = { className?: string };

export function ExampleFooter({ className }: ExampleFooterProps) {
  return (
    <footer className={`bg-gray-900 text-white p-4 text-center ${className}`}>
      This is a footer. Put more stuff here.
    </footer>
  );
}
