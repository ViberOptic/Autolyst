// src/services/carService.js
import { supabase } from '../config/supabase';

export const carService = {
  // 1. Tambah Mobil Baru
  async createCar(carData) {
    try {
      // Konversi price_value ke integer untuk keamanan data
      const payload = {
        ...carData,
        price_value: parseInt(carData.price_value),
        created_at: new Date().toISOString(),
        is_featured: false // Default tidak masuk featured
      };

      const { data, error } = await supabase
        .from('cars')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating car:', error);
      return { success: false, message: error.message };
    }
  },

  // 2. Update Mobil
  async updateCar(id, carData) {
    try {
      const payload = {
        ...carData,
        price_value: parseInt(carData.price_value),
      };

      const { data, error } = await supabase
        .from('cars')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating car:', error);
      return { success: false, message: error.message };
    }
  },

  // 3. Hapus Mobil
  async deleteCar(id) {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting car:', error);
      return { success: false, message: error.message };
    }
  }
};