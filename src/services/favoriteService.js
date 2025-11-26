// src/services/favoriteService.js
import { supabase } from '../config/supabase';

class FavoriteService {
  async getFavorites(userIdentifier) {
    if (!userIdentifier) return { success: false, message: "User ID missing" };

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('car_id')
        .eq('user_identifier', userIdentifier);
      
      if (error) throw error;
      return { success: true, data: data.map(f => f.car_id) };
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      return { success: false, message: error.message };
    }
  }

  async toggleFavorite(data) {
    const { car_id, user_identifier } = data;
    if (!car_id || !user_identifier) return { success: false, message: "Invalid data" };

    try {
      // Cek apakah data sudah ada
      const { data: existing, error: fetchError } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_identifier', user_identifier)
        .eq('car_id', car_id)
        .maybeSingle(); // Gunakan maybeSingle agar tidak error jika kosong

      if (fetchError) throw fetchError;

      if (existing) {
        // Hapus jika sudah ada
        const { error: deleteError } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existing.id);
          
        if (deleteError) throw deleteError;
        return { success: true, action: 'removed' };
      } else {
        // Tambah jika belum ada
        const { error: insertError } = await supabase
          .from('favorites')
          .insert([{ user_identifier, car_id }]);
          
        if (insertError) throw insertError;
        return { success: true, action: 'added' };
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      return { success: false, message: error.message };
    }
  }
}

export default new FavoriteService();