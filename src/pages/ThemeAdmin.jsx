import { useEffect, useState } from "react";
import { AdminNav } from "../components/admin/AdminNav";
import {
  createTheme,
  deleteTheme,
  getAllThemes,
  updateTheme,
  uploadThemeImage
} from "../services/themeService";

function ThemeAdmin() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({
    name: "",
    description: "",
    thumbnail: "",
    is_active: true,
    display_order: 0
  });
  // Update arrays to have 5 elements instead of 3
  const [maleImages, setMaleImages] = useState([null, null, null, null, null]);
  const [femaleImages, setFemaleImages] = useState([null, null, null, null, null]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    setLoading(true);
    try {
      const data = await getAllThemes();
      setThemes(data);
    } catch (error) {
      setMessage({ text: "Failed to load themes", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTheme({
      ...currentTheme,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (gender, index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please select an image file", type: "error" });
      return;
    }

    if (gender === "male") {
      const newImages = [...maleImages];
      newImages[index] = file;
      setMaleImages(newImages);
    } else {
      const newImages = [...femaleImages];
      newImages[index] = file;
      setFemaleImages(newImages);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please select an image file", type: "error" });
      return;
    }

    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentTheme({
        ...currentTheme,
        thumbnailFile: file,
        thumbnail: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setCurrentTheme({
      name: "",
      description: "",
      thumbnail: "",
      is_active: true,
      display_order: themes.length + 1
    });
    // Reset with 5 null values
    setMaleImages([null, null, null, null, null]);
    setFemaleImages([null, null, null, null, null]);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Validate form
      if (!currentTheme.name.trim()) {
        throw new Error("Theme name is required");
      }

      // Check if we have at least one image for each gender
      const hasMaleImage = maleImages.some(img => img !== null);
      const hasFemaleImage = femaleImages.some(img => img !== null);
      
      if (!hasMaleImage || !hasFemaleImage) {
        throw new Error("Please provide at least one scene image for each gender");
      }

      // Upload thumbnail if it's a file
      let thumbnailUrl = currentTheme.thumbnail;
      if (currentTheme.thumbnailFile) {
        setUploadingImages(true);
        const result = await uploadThemeImage(
          currentTheme.thumbnailFile, 
          currentTheme.name, 
          "thumbnails"
        );
        thumbnailUrl = result.url;
      }

      // Upload all scene images
      const maleScenes = [];
      const femaleScenes = [];

      // Upload male images (only the non-null ones)
      for (let i = 0; i < maleImages.length; i++) {
        if (maleImages[i] instanceof File) {
          const result = await uploadThemeImage(
            maleImages[i],
            currentTheme.name,
            "male"
          );
          maleScenes.push(result.url);
        } else if (typeof maleImages[i] === "string") {
          maleScenes.push(maleImages[i]);
        }
      }

      // Upload female images (only the non-null ones)
      for (let i = 0; i < femaleImages.length; i++) {
        if (femaleImages[i] instanceof File) {
          const result = await uploadThemeImage(
            femaleImages[i],
            currentTheme.name,
            "female"
          );
          femaleScenes.push(result.url);
        } else if (typeof femaleImages[i] === "string") {
          femaleScenes.push(femaleImages[i]);
        }
      }

      setUploadingImages(false);

      // Prepare theme data
      const themeData = {
        ...currentTheme,
        thumbnail: thumbnailUrl,
        male_scenes: maleScenes,
        female_scenes: femaleScenes
      };

      delete themeData.thumbnailFile;

      // Create or update theme
      if (isEditing) {
        await updateTheme(currentTheme.id, themeData);
        setMessage({ text: "Theme updated successfully", type: "success" });
      } else {
        await createTheme(themeData);
        setMessage({ text: "Theme created successfully", type: "success" });
      }

      // Reset form and refresh themes
      resetForm();
      fetchThemes();
    } catch (error) {
      setMessage({ text: error.message || "Failed to save theme", type: "error" });
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  const handleEdit = (theme) => {
    setCurrentTheme({
      ...theme,
      thumbnailFile: null
    });
    
    // Set the scene images
    if (theme.male_scenes && theme.male_scenes.length) {
      setMaleImages(theme.male_scenes);
    }
    
    if (theme.female_scenes && theme.female_scenes.length) {
      setFemaleImages(theme.female_scenes);
    }
    
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this theme?")) return;

    setLoading(true);
    try {
      await deleteTheme(id);
      setMessage({ text: "Theme deleted successfully", type: "success" });
      fetchThemes();
    } catch (error) {
      setMessage({ text: "Failed to delete theme", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Update the UI text to reflect the new requirements
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-violet-800">
            {isEditing ? "Edit Theme" : "Create New Theme"}
          </h1>
          
          {/* Message display */}
          {message.text && (
            <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Theme Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentTheme.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter theme name"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={currentTheme.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter theme description"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    value={currentTheme.display_order}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="1"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={currentTheme.is_active}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Active</span>
                  </label>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {currentTheme.thumbnail && (
                    <div className="mt-2">
                      <img 
                        src={currentTheme.thumbnail} 
                        alt="Thumbnail preview" 
                        className="h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Scene Images</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Male Scenes (Min: 1, Max: 5 images)</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div key={`male-${index}`} className="border border-gray-200 rounded-md p-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange("male", index, e)}
                          className="w-full mb-2"
                        />
                        {maleImages[index] && (
                          <div className="h-24 overflow-hidden rounded-md">
                            <img 
                              src={typeof maleImages[index] === "string" 
                                ? maleImages[index] 
                                : URL.createObjectURL(maleImages[index])} 
                              alt={`Male scene ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Female Scenes (Min: 1, Max: 5 images)</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div key={`female-${index}`} className="border border-gray-200 rounded-md p-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange("female", index, e)}
                          className="w-full mb-2"
                        />
                        {femaleImages[index] && (
                          <div className="h-24 overflow-hidden rounded-md">
                            <img 
                              src={typeof femaleImages[index] === "string" 
                                ? femaleImages[index] 
                                : URL.createObjectURL(femaleImages[index])} 
                              alt={`Female scene ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                {isEditing ? "Cancel" : "Reset"}
              </button>
              
              <button
                type="submit"
                disabled={loading || uploadingImages}
                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:bg-gray-400"
              >
                {loading || uploadingImages ? (
                  <span>
                    {uploadingImages ? "Uploading Images..." : "Saving..."}
                  </span>
                ) : (
                  <span>{isEditing ? "Update Theme" : "Create Theme"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Themes List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-violet-800">Manage Themes</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading themes...</p>
            </div>
          ) : themes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No themes found. Create your first theme above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => (
                <div key={theme.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={theme.thumbnail} 
                      alt={theme.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{theme.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${theme.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {theme.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{theme.description}</p>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEdit(theme)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(theme.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThemeAdmin;