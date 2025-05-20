import React, { createContext, useContext, useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
};

type FavoriteContextType = {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (bookId: string) => void;
};

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  const addFavorite = (book: Book) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === book.id);
      if (exists) return prev;
      return [...prev, book];
    });
  };

  const removeFavorite = (bookId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== bookId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
