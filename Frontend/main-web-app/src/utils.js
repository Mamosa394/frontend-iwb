// utils.js

// Function to save data to localStorage
export const saveDataToLocalStorage = (key, data) => {
  try {
    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data);
    // Save the data to localStorage with the given key
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error("Error saving data to localStorage", error);
  }
};

// Function to load data from localStorage
export const loadDataFromLocalStorage = (key) => {
  try {
    // Retrieve the stored data from localStorage
    const jsonData = localStorage.getItem(key);
    if (jsonData) {
      // Parse the JSON string into a JavaScript object
      return JSON.parse(jsonData);
    }
    return null; // Return null if no data is found
  } catch (error) {
    console.error("Error loading data from localStorage", error);
    return null; // Return null in case of an error
  }
};

// Function to load user profile from localStorage
export const loadUserProfile = () => {
  try {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return { name: "", email: "" }; // Default values if no user profile found
  } catch (error) {
    console.error("Error loading user profile from localStorage", error);
    return { name: "", email: "" }; // Return default profile in case of an error
  }
};
