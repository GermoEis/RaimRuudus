import { drinkCategories as defaultDrinkCategories } from '../data/drinks.js';

function DrinksMenu({ categories = defaultDrinkCategories }) {
  return (
    <div className="bar-board" aria-label="Joogimenüü baaritahvlil">
      <div className="bar-board-header">
        <span>Räim Ruudus baaritahvel</span>
        <p>Hinnad ja täpne valik võivad hooaja jooksul muutuda.</p>
      </div>
      <div className="drinks-grid">
        {categories.map((category) => (
          <article className="drink-card" key={category.title}>
            <div className="drink-card-header">
              <h3>{category.title}</h3>
              <span>{category.price}</span>
            </div>
            <div className="drink-tags" aria-label={`${category.title} märksõnad`}>
              {category.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>{category.description}</p>
            <ul>
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export default DrinksMenu;
