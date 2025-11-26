// src/hooks/useFavorites.js
import { useState, useEffect, useCallback } from 'react';
import favoriteService from '../services/favoriteService';
import { getUserIdentifier } from '../services/userService';

export function useIsFavorited(carId) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    if (!carId) {
        setLoading(false);
        return;
    }
    
    const userId = getUserIdentifier();
    const { success, data } = await favoriteService.getFavorites(userId);
    
    if (success && Array.isArray(data)) {
      // Pastikan perbandingan tipe data aman (integer)
      setIsFavorited(data.includes(parseInt(carId)));
    }
    setLoading(false);
  }, [carId]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const toggleFavorite = async () => {
    if (!carId) return;

    const userId = getUserIdentifier();
    
    // Optimistic Update
    const previousState = isFavorited;
    setIsFavorited(!previousState);

    const result = await favoriteService.toggleFavorite({
      user_identifier: userId,
      car_id: parseInt(carId)
    });

    if (!result.success) {
      // Revert jika gagal
      setIsFavorited(previousState);
      console.error('Gagal update favorit:', result.message);
    } else {
      console.log(`Favorit ${result.action}: Car ID ${carId}`);
    }
    
    return result.success;
  };

  return { isFavorited, loading, toggleFavorite };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    const userId = getUserIdentifier();
    const { success, data } = await favoriteService.getFavorites(userId);
    
    if (success) {
      setFavorites(data || []);
    } else {
      setFavorites([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, refetch: fetchFavorites };
}