import { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useDebouncedState
 * A small helper to debounce a rapidly changing value (e.g., editor content)
 */
export function useDebouncedState(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
