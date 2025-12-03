// src/hooks/useCars.js
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export function useCars({ 
  category, 
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
    async function fetchCars() {
      setLoading(true);
      
      try {
        let query = supabase.from('cars').select('*', { count: 'exact' });

        if (search) {
          query = query.or(`name.ilike.%${search}%,brand.ilike.%${search}%`);
        }

        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        if (brand && brand !== 'all') {
          query = query.eq('brand', brand);
        }

        if (priceRange && priceRange !== 'all') {
          if (priceRange === 'under_500') {
            query = query.lt('price_value', 500000000);
          } else if (priceRange === '500_1000') {
            query = query.gte('price_value', 500000000).lte('price_value', 1000000000);
          } else if (priceRange === 'above_1000') {
            query = query.gt('price_value', 1000000000);
          }
        }

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        
        query = query.range(from, to).order('created_at', { ascending: false });

        const { data, error, count } = await query;

        if (error) throw error;

        setCars(data || []);
        setPagination({
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
          currentPage: page
        });

      } catch (err) {
        console.error('Error fetching cars:', err.message);
        setCars([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [category, search, brand, priceRange, limit, page]);

  return { cars, loading, pagination };
}

export function useCarDetail(id) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarDetail() {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (err) {
        console.error('Error fetching car detail:', err.message);
        setCar(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCarDetail();
  }, [id]);

  return { car, loading };
}

export function useFeaturedCars(limit = 4) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('is_featured', true) 
          .limit(limit);

        if (error) throw error;
        
        if (!data || data.length < limit) {
             const { data: fallbackData } = await supabase
             .from('cars')
             .select('*')
             .order('price_value', { ascending: false })
             .limit(limit);
             setCars(fallbackData || []);
        } else {
             setCars(data);
        }

      } catch (err) {
        console.error('Error fetching featured cars:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, [limit]);

  return { cars, loading };
}