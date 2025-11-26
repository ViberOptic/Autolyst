// src/hooks/useCars.js
import { useState, useEffect } from 'react';
import { carData } from '../data/cars';

export function useCars({ 
  category, // Ini sekarang filter 'Electric' atau 'Hybrid'
  search, 
  brand, 
  priceRange, 
  limit = 10, 
  page = 1 
} = {}) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1
  });

  useEffect(() => {
    setLoading(true);
    
    let result = [...carData]; // Semua data sudah EV/Hybrid

    // 1. Filter Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.brand.toLowerCase().includes(q)
      );
    }

    // 2. Filter Kategori (Electric vs Hybrid)
    if (category && category !== 'all') {
      result = result.filter(c => c.category === category);
    }

    // 3. Filter Brand
    if (brand && brand !== 'all') {
      result = result.filter(c => c.brand === brand);
    }

    // 4. Filter Harga
    if (priceRange && priceRange !== 'all') {
      result = result.filter(c => {
        const priceNum = parseInt(c.price.replace(/[^0-9]/g, ''));
        if (priceRange === 'under_500') return priceNum < 500000000;
        if (priceRange === '500_1000') return priceNum >= 500000000 && priceNum <= 1000000000;
        if (priceRange === 'above_1000') return priceNum > 1000000000;
        return true;
      });
    }

    // 5. Pagination
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    
    let paginatedResult = result;
    if (limit > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        paginatedResult = result.slice(startIndex, endIndex);
    }

    setTimeout(() => {
      setCars(paginatedResult);
      setPagination({ total, totalPages, currentPage: page });
      setLoading(false);
    }, 300);
  }, [category, search, brand, priceRange, limit, page]);

  return { cars, loading, pagination };
}

export function useCarDetail(id) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const found = carData.find(c => c.id === parseInt(id));
    setTimeout(() => {
      setCar(found);
      setLoading(false);
    }, 300);
  }, [id]);

  return { car, loading };
}