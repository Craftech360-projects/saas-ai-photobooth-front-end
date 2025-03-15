import { supabase } from '../supabaseClient';

export const getScenePageSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('scene_page_settings')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching scene page settings:', error);
    return null;
  }
};

export const updateScenePageSettings = async (settings) => {
  try {
    const { error } = await supabase
      .from('scene_page_settings')
      .upsert(settings);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating scene page settings:', error);
    throw error;
  }
};