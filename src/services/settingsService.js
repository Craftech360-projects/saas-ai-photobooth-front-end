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

export const saveGenderButtonSettings = async (settings) => {
  try {
    // First get the existing row
    const { data: existingData } = await supabase
      .from('genderbuttontable')
      .select('id')
      .order('id', { ascending: true })
      .limit(1);

    if (existingData && existingData.length > 0) {
      // Update existing row
      const { error } = await supabase
        .from('genderbuttontable')
        .update({
          gender_selection_title: settings.gender_selection_title,
          gender_title_color: settings.gender_title_color,
          gender_button_width: settings.gender_button_width,
          gender_button_height: settings.gender_button_height,
          male_button_background: settings.male_button_background,
          female_button_background: settings.female_button_background,
          gender_button_bg_color: settings.gender_button_bg_color,
          gender_button_text_color: settings.gender_button_text_color,
          male_button_text: settings.male_button_text,
          female_button_text: settings.female_button_text
        })
        .eq('id', existingData[0].id);

      if (error) throw error;
    } else {
      // Create new row if none exists
      const { error } = await supabase
        .from('genderbuttontable')
        .insert([{
          gender_selection_title: settings.gender_selection_title || "Select Your Gender",
          gender_title_color: settings.gender_title_color || "#FFFFFF",
          gender_button_width: settings.gender_button_width || 250,
          gender_button_height: settings.gender_button_height || 250,
          male_button_background: settings.male_button_background || "",
          female_button_background: settings.female_button_background || "",
          gender_button_bg_color: settings.gender_button_bg_color || "#8b5cf6",
          gender_button_text_color: settings.gender_button_text_color || "#FFFFFF",
          male_button_text: settings.male_button_text || "Male",
          female_button_text: settings.female_button_text || "Female"
        }]);

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Exception in saveGenderButtonSettings:", error);
    throw error;
  }
};