import { useCallback, useEffect, useRef, useState } from "react";
import { ALL_CATEGORIES } from "../data/categories";

interface CategorySwitcherProps {
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
}

export default function CategorySwitcher({ activeCategoryId, onSelect }: CategorySwitcherProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const activeCategory = ALL_CATEGORIES.find(c => c.id === activeCategoryId);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handleSelect = useCallback((categoryId: string) => {
    onSelect(categoryId);
    close();
  }, [onSelect, close]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open, close]);

  return (
    <div className="switcher">
      <button
        ref={triggerRef}
        className="switcher__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="switcher__seal">{activeCategory?.seal ?? "?"}</span>
        <span className="switcher__text">
          <span className="switcher__eyebrow">Categoria</span>
          <span className="switcher__label">{activeCategory?.label ?? "Selecionar"}</span>
        </span>
        <svg className={`switcher__chevron ${open ? "switcher__chevron--open" : ""}`} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 5l4 4 4-4" />
        </svg>
      </button>
      <ul ref={menuRef} className="switcher__menu" role="listbox" hidden={!open}>
        {ALL_CATEGORIES.map((cat, i) => {
          const prev = i > 0 ? ALL_CATEGORIES[i - 1] : null;
          const showGroup = Boolean(cat.group) && cat.group !== prev?.group;
          return (
            <li key={cat.id}>
              {showGroup && <p className="switcher__groupHeader">{cat.group}</p>}
              <button
                className="switcher__option"
                type="button"
                role="option"
                aria-selected={cat.id === activeCategoryId}
                onClick={() => handleSelect(cat.id)}
              >
                <span className="switcher__optionSeal">{cat.seal}</span>
                <span>{cat.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
