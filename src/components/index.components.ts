import { Page } from '@playwright/test';
import { HeaderComponent } from './header.component.js';
import { ProductCardComponent } from './product-card.component.js';
import { SearchComponent } from './search.component.js';
import { StoreComponent } from './store.component.js';

/**
 * Component Factory - For direct component testing when page objects aren't needed
 * Most tests should use components through page objects instead
 */
export interface ComponentInstances {
  header: HeaderComponent;
  productCard: ProductCardComponent;
  search: SearchComponent;
  store: StoreComponent;
}

export function components(page: Page): ComponentInstances {
  return {
    header: new HeaderComponent(page),
    productCard: new ProductCardComponent(page),
    search: new SearchComponent(page),
    store: new StoreComponent(page),
  };
}

// Export individual components for imports and type definitions
export { HeaderComponent, ProductCardComponent, SearchComponent, StoreComponent };
