import { supabase } from '../supabaseClient';

export const getThemePageSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('theme_page_settings')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching theme page settings:', error);
    throw error;
  }
};

export const updateThemePageSettings = async (settings) => {
  try {
    const { error } = await supabase
      .from('theme_page_settings')
      .upsert(settings);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating theme page settings:', error);
    throw error;
  }
};