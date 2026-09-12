interface Map<K, V> {
  /**
   * Returns the value for `key` if it exists. 
   * Otherwise, calls `callback` to compute the value, inserts it, and returns it.
   */
  getOrInsert(key: K, callback: (key: K) => V): V;

  /**
   * Returns the value for `key` if it exists. 
   * Otherwise, inserts `defaultValue` and returns it.
   */
  getOrInsert(key: K, defaultValue: V): V;
}