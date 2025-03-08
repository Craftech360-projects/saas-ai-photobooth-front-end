import { supabase } from "../supabaseClient";

export async function getSettings() {
  try {
    // First, check if settings exist
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error) {
      // If no settings exist, create default settings
      if (error.code === "PGRST116") {
        const defaultSettings = {
          app_title: "AI PhotoBooth",
          welcome_message: "Welcome to the AI PhotoBooth!",
          privacy_policy: "",
          terms_of_service: "",
          max_photo_size_mb: 5,
          enable_email_collection: true,
          require_name: true,
          require_gender: true,
          enable_analytics: false
        };

        const { data: newData, error: insertError } = await supabase
          .from("settings")
          .insert([defaultSettings])
          .select()
          .single();

        if (insertError) throw insertError;
        return newData;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

export async function updateSettings(settings) {
  try {
    // First, check if settings exist
    const { data: existingData, error: checkError } = await supabase
      .from("settings")
      .select("id")
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (existingData) {
      // Update existing settings
      const { data, error } = await supabase
        .from("settings")
        .update(settings)
        .eq("id", existingData.id)
        .select();

      if (error) throw error;
      return data[0];
    } else {
      // Insert new settings
      const { data, error } = await supabase
        .from("settings")
        .insert([settings])
        .select();

      if (error) throw error;
      return data[0];
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
}