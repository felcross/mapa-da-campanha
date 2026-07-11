import { useCallback, useState } from "react";

interface AccordionItem {
  key: string;
  label: string;
  sealLabel?: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
}

export default function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openKey, setOpenKey] = useState<string | null>(defaultOpen ?? items[0]?.key ?? null);

  const toggle = useCallback((key: string) => {
    setOpenKey(prev => prev === key ? null : key);
  }, []);

  return (
    <div className={`accordion ${className ?? ""}`}>
      {items.map(item => {
        const isOpen = item.key === openKey;
        return (
          <div key={item.key} className="accordion__item">
            <button
              className="accordion__trigger"
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.key)}
            >
              {item.sealLabel && (
                <span className="accordion__seal">{item.sealLabel}</span>
              )}
              <span className="accordion__label">{item.label}</span>
              <svg
                className={`accordion__chevron ${isOpen ? "accordion__chevron--open" : ""}`}
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 5l4 4 4-4" />
              </svg>
            </button>
            {isOpen && (
              <div className="accordion__content" role="region">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
