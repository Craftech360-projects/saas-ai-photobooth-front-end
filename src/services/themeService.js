import { supabase } from "../supabaseClient";

export async function getAllThemes() {
  try {
    const { data, error } = await supabase
      .from("themes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching themes:", error);
    return [];
  }
}

export async function getActiveThemes() {
  try {
    const { data, error } = await supabase
      .from("themes")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching active themes:", error);
    return [];
  }
}

export async function createTheme(theme) {
  try {
    const { data, error } = await supabase
      .from("themes")
      .insert([theme])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error creating theme:", error);
    throw error;
  }
}

export async function updateTheme(id, updates) {
  try {
    const { data, error } = await supabase
      .from("themes")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error updating theme:", error);
    throw error;
  }
}

export async function deleteTheme(id) {
  try {
    const { error } = await supabase
      .from("themes")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting theme:", error);
    throw error;
  }
}

export async function uploadThemeImage(file, themeName, gender) {
  try {
    // Create a folder structure like: themename/gender/filename
    const folderPath = `${themeName.toLowerCase().replace(/\s+/g, "")}/${gender}`;
    const fileName = `${folderPath}/${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from("nielsen")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nielsen/${fileName}`;
    
    return {
      url: publicURL,
      path: fileName
    };
  } catch (error) {
    console.error("Error uploading theme image:", error);
    throw error;
  }
}