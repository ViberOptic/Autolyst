// src/services/carService.js
import { supabase } from '../config/supabase';

export const carService = {
  async createCar(carData) {
    try {
      const payload = {
        ...carData,
        price_value: parseInt(carData.price_value),
        created_at: new Date().toISOString(),
        is_featured: false
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