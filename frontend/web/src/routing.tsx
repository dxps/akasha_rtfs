import { type MouseEvent, type ReactNode } from "react";

export type AppPath = "/" | "/data-explorer" | "/types" | "/profile";

export function getCurrentPath(): AppPath {
  const path = window.location.pathname;

  if (path === "/data-explorer" || path === "/types" || path === "/profile") {
    return path;
  }

  return "/";
}

interface SpaLinkProps {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  role?: string;
  to: AppPath;
}

export function SpaLink({ ariaLabel, children, className, onNavigate, role, to }: SpaLinkProps) {
  function navigate(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault();

    if (window.location.pathname !== to) {
      window.history.pushState(null, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    onNavigate?.();
  }

  return (
    <a aria-label={ariaLabel} className={className} href={to} role={role} onClick={navigate}>
      {children}
    </a>
  );
}
