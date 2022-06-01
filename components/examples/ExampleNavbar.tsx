type ExampleNavbarProps = { className?: string };

export function ExampleNavbar({ className }: ExampleNavbarProps) {
  return (
    <nav
      className={`bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 ${className}`}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto text-white">
        This is a navbar. Put things here.
      </div>
    </nav>
  );
}
