import Link from "next/link";

const buttonBaseClasses =
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const buttonVariantClasses = {
  outline:
    "border border-[#dfe3e8] text-[#293444] hover:border-[var(--brand-blue)] hover:bg-[#f2f0ea]",
};

const buttonSizeClasses = {
  icon: "size-11 rounded-full",
};

export default function Button({
  href,
  variant = "outline",
  size = "icon",
  className = "",
  children,
  type = "button",
  ...props
}) {
  const buttonClasses = `${buttonBaseClasses} ${buttonVariantClasses[variant]} ${buttonSizeClasses[size]} ${className}`.trim();

  if (href) {
    return (
      <Link className={buttonClasses} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} type={type} {...props}>
      {children}
    </button>
  );
}
