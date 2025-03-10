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
          enable_data_collection: true, // Add this default value
          enable_email_collection: true,
          require_name: true,
          require_gender: true,
          enable_analytics: false
        };

        const { data: newData, error: createError } = await supabase
          .from("settings")
          .insert(defaultSettings)
          .select()
          .single();

        if (createError) {
          console.error("Error creating default settings:", createError);
          throw createError;
        }

        return newData;
      } else {
        console.error("Error fetching settings:", error);
        throw error;
      }
    }

    return data;
  } catch (error) {
    console.error("Exception in getSettings:", error);
    throw error;
  }
}

export async function updateSettings(settings) {
  try {
    const { error } = await supabase
      .from("settings")
      .update(settings)
      .eq("id", settings.id);

    if (error) {
      console.error("Error updating settings:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Exception in updateSettings:", error);
    throw error;
  }
}