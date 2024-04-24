import type { Writable } from 'svelte/store';

type CurrencyOption = string;

type StoreMap = Map<string, Writable<CurrencyOption>>;

const registeredStores: StoreMap = new Map();

export function registerStore(id: string, store: Writable<CurrencyOption>) {
  registeredStores.set(id, store);
}

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    import.meta.hot.data.stores = registeredStores;
  });
}
