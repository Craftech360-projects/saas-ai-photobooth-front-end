import { supabase } from "../supabaseClient";

export async function getAllBackgrounds() {
  try {
    const { data, error } = await supabase
      .from("backgrounds")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching backgrounds:", error);
    return [];
  }
}

export async function getActiveBackgrounds() {
  try {
    const { data, error } = await supabase
      .from("backgrounds")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching active backgrounds:", error);
    return [];
  }
}

export async function uploadBackground(file, name) {
  try {
    // Upload file to storage
    const fileName = `backgrounds/${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from("nielsen")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nielsen/${fileName}`;
    
    // Save background info to database
    const { data, error } = await supabase
      .from("backgrounds")
      .insert([
        {
          name,
          url: publicURL,
          storage_path: fileName,
          is_active: true
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error uploading background:", error);
    throw error;
  }
}

export async function toggleBackgroundStatus(id, currentStatus) {
  try {
    const { data, error } = await supabase
      .from("backgrounds")
      .update({ is_active: !currentStatus })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error toggling background status:", error);
    throw error;
  }
}

export async function deleteBackground(id, url) {
  try {
    // Extract the file path from the URL
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `backgrounds/${fileName}`;
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from("nielsen")
      .remove([filePath]);
    
    // Even if storage deletion fails, try to remove from database
    if (storageError) {
      console.warn("Error deleting file from storage:", storageError);
    }
    
    // Delete from database
    const { error } = await supabase
      .from("backgrounds")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting background:", error);
    throw error;
  }
}