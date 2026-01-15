

export const getFavorites = (): string[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (id: string): void => {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        const updated = [...favorites, id];
        localStorage.setItem("favorites", JSON.stringify(updated));
        window.dispatchEvent(new Event("favoritesChanged"));
    }
};

export const removeFavorite = (id: string): void => {
    const favorites = getFavorites();
    const updated = favorites.filter((fav) => fav !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favoritesChanged"));
};

export const toggleFavorite = (id: string): void => {
    const favorites = getFavorites();
    if (favorites.includes(id)) {
        removeFavorite(id);
    } else {
        addFavorite(id);
    }
};

export const isFavorite = (id: string): boolean => {
    return getFavorites().includes(id);
};