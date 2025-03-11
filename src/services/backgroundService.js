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
    // Validate background name
    if (!["default", "userForm"].includes(name)) {
      throw new Error("Background name must be either 'default' or 'userForm'");
    }

    // Check for existing background with same name
    const { data: existing } = await supabase
      .from("backgrounds")
      .select("*")
      .eq("name", name)
      .single();

    // Upload file to storage
    const fileName = `backgrounds/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("nielsen")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nielsen/${fileName}`;

    // Update or insert based on existence
    const { data, error } = existing ? 
      await supabase
        .from("backgrounds")
        .update({
          url: publicURL,
          storage_path: fileName,
          is_active: true
        })
        .eq("id", existing.id)
        .select() :
      await supabase
        .from("backgrounds")
        .insert([{
          name,
          url: publicURL,
          storage_path: fileName,
          is_active: true
        }])
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

// New functions for button backgrounds
export async function uploadButtonBackground(file, type) {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const storagePath = `button-backgrounds/${filename}`;
    
    // Upload the file to storage
    const { error: uploadError } = await supabase.storage
      .from("nielsen")
      .upload(storagePath, file);
    
    if (uploadError) {
      console.error("Error uploading button background:", uploadError);
      throw uploadError;
    }
    
    // Get the public URL
    const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nielsen/${storagePath}`;
    
    // Since the button_backgrounds table doesn't exist yet, we'll just return the URL
    // and skip trying to save to the database
    console.log("Button background uploaded to storage:", publicURL);
    
    return publicURL;
  } catch (error) {
    console.error("Exception in uploadButtonBackground:", error);
    throw error;
  }
}

export const getButtonBackgrounds = async () => {
  try {
    const { data, error } = await supabase
      .from("genderbuttontable")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching gender button backgrounds:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching button backgrounds:', error);
    return [];
  }
};

// Update this function to use Supabase and save to genderbuttontable
export const uploadGenderButtonBackground = async (file) => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const storagePath = `gender-button-backgrounds/${filename}`;
    
    // Upload the file to storage
    const { error: uploadError } = await supabase.storage
      .from("nielsen")
      .upload(storagePath, file);
    
    if (uploadError) {
      console.error("Error uploading gender button background:", uploadError);
      throw uploadError;
    }
    
    // Get the public URL
    const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nielsen/${storagePath}`;
    
    // Save the URL to the genderbuttontable
    const { data, error } = await supabase
      .from("genderbuttontable")
      .insert([{
        filename: filename,
        url: publicURL,
        type: 'gender',
        created_at: new Date()
      }])
      .select();
    
    if (error) {
      console.error("Error saving to genderbuttontable:", error);
      // Even if DB insert fails, return the URL so the UI can still use it
    } else {
      console.log("Gender button background saved to database:", data);
    }
    
    return publicURL;
  } catch (error) {
    console.error("Exception in uploadGenderButtonBackground:", error);
    throw error;
  }
};

export async function deleteButtonBackground(id, url) {
  try {
    // Extract the file path from the URL
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `button-backgrounds/${fileName}`;
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from("nielsen")
      .remove([filePath]);
    
    // Even if storage deletion fails, try to remove from database
    if (storageError) {
      console.warn("Error deleting button background from storage:", storageError);
    }
    
    // Delete from database
    const { error } = await supabase
      .from("button_backgrounds")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting button background:", error);
    throw error;
  }
}