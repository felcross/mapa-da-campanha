import { ALL_CATEGORIES, GROUP_DESCRIPTIONS } from "../data/categories";

interface ItemListProps {
  activeCategoryId: string;
  activeItemId: string | null;
  onSelectItem: (itemId: string) => void;
}

export default function ItemList({ activeCategoryId, activeItemId, onSelectItem }: ItemListProps) {
  const category = ALL_CATEGORIES.find(c => c.id === activeCategoryId);
  if (!category) return null;

  return (
    <nav className="itemList">
      <p className="itemList__label">
        {category.listLabel}
        <span style={{ marginLeft: 6, opacity: 0.5 }}>({category.items.length})</span>
      </p>
      {category.group && GROUP_DESCRIPTIONS[category.group] && (
        <p className="itemList__groupDesc">{GROUP_DESCRIPTIONS[category.group]}</p>
      )}
      {category.description && (
        <p className="itemList__desc">{category.description}</p>
      )}
      <ul className="itemList__items">
        {category.items.map(item => (
          <li key={item.id}>
            <button
              className="itemList__item"
              type="button"
              aria-current={item.id === activeItemId ? "true" : undefined}
              onClick={() => onSelectItem(item.id)}
            >
              <span className="itemList__glyph">{item.glyph}</span>
              <span className="itemList__name">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
