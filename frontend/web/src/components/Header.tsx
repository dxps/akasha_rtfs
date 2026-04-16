import { useEffect, useRef, useState } from "react";
import { Database, Moon, Shapes, Sun, User } from "lucide-react";
import { SpaLink } from "../routing";

interface HeaderProps {
  onToggleTheme: () => void;
  theme: "light" | "dark";
}

export function Header({ onToggleTheme, theme }: HeaderProps) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    function closeUserMenuOnOutsideClick(event: PointerEvent): void {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeUserMenuOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeUserMenuOnOutsideClick);
    };
  }, []);

  function toggleTheme(): void {
    onToggleTheme();
    setIsUserMenuOpen(false);
  }

  return (
    <header className="app-header">
      <SpaLink ariaLabel="Akasha home" className="brand" to="/">
        <img src="/akasha-logo.png" alt="" />
      </SpaLink>
      <nav className="header-nav" aria-label="Primary navigation">
        <SpaLink to="/data-explorer">
          <Database aria-hidden="true" />
          Data Explorer
        </SpaLink>
        <SpaLink to="/types">
          <Shapes aria-hidden="true" />
          Types Mgmt
        </SpaLink>
      </nav>
      <div className="header-actions" ref={userMenuRef}>
        <button
          aria-expanded={isUserMenuOpen}
          aria-haspopup="menu"
          aria-label="Open user menu"
          className="icon-button"
          title="User profile"
          type="button"
          onClick={() => setIsUserMenuOpen((current) => !current)}
        >
          <User aria-hidden="true" />
        </button>
        {isUserMenuOpen ? (
          <div className="user-menu" role="menu">
            <SpaLink role="menuitem" to="/profile" onNavigate={() => setIsUserMenuOpen(false)}>
              <User aria-hidden="true" />
              Profile
            </SpaLink>
            <button
              aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              className="theme-toggle"
              role="menuitem"
              title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              type="button"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
              Toggle Theme
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
