import { useCallback, useState } from "react";
import { DATA, ALL_CATEGORIES } from "../../data/categories";
import type { Category } from "../../data/categories";
import CategorySwitcher from "../CategorySwitcher";
import ItemList from "../ItemList";
import DetailScreen from "../DetailScreen";

interface ClassesViewProps {
  onBack: () => void;
}

export default function ClassesView({ onBack }: ClassesViewProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(ALL_CATEGORIES[0]?.id ?? "");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeCategory = DATA[activeCategoryId] as Category | undefined;
  const activeItem = activeCategory?.items.find(i => i.id === activeItemId) ?? null;

  const handleCategorySelect = useCallback((categoryId: string) => {
    setActiveCategoryId(categoryId);
    setActiveItemId(null);
    setSidebarOpen(false);
  }, []);

  const handleItemSelect = useCallback((itemId: string) => {
    setActiveItemId(itemId);
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(o => !o);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const rootClasses = [
    "classesProject",
    sidebarOpen ? "classesProject--sidebarOpen" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={rootClasses}>
      <aside className="classesProject__sidebar">
        <div className="classesProject__sidebarHeader">
          <button className="classesProject__hubBtn" onClick={onBack}>
            ← Voltar ao Hub
          </button>
          <button className="classesProject__closeBtn" onClick={closeSidebar} aria-label="Fechar menu">
            ✕
          </button>
        </div>
        <CategorySwitcher
          activeCategoryId={activeCategoryId}
          onSelect={handleCategorySelect}
        />
        <ItemList
          activeCategoryId={activeCategoryId}
          activeItemId={activeItemId}
          onSelectItem={handleItemSelect}
        />
      </aside>

      <div className="classesProject__backdrop" onClick={closeSidebar} />

      <button
        className="classesProject__toggle"
        aria-label="Abrir menu"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <main className="classesProject__main">
        {activeItem && activeCategory ? (
          <DetailScreen categoryLabel={activeCategory.label} item={activeItem} />
        ) : (
          <div className="detail">
            <div className="detail__body">
              <p className="classesProject__emptyHint">
                Selecione uma categoria e um item ao lado para ver os detalhes.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
