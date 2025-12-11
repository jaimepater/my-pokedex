type CacheEntry<T> = {
    value: T;
    expiry: number;
};

// Singleton cache instance
const cache = new Map<string, CacheEntry<unknown>>();

export const memoryCache = {
    get: <T>(key: string): T | null => {
        const entry = cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiry) {
            cache.delete(key);
            return null;
        }

        return entry.value as T;
    },

    set: <T>(key: string, value: T, ttlSeconds: number = 60 * 5) => {
        const expiry = Date.now() + ttlSeconds * 1000;
        cache.set(key, { value, expiry });
    },

    clear: () => {
        cache.clear();
    },
};
