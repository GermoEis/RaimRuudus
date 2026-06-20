import { drinkCategories } from '../data/drinks.js';

function DrinksMenu() {
  return (
    <div className="drinks-grid">
      {drinkCategories.map((category) => (
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
  );
}

export default DrinksMenu;
