import Link from "next/link";

export default function AppLink({
  children,
  disabled,
  href,
  className,
}) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
