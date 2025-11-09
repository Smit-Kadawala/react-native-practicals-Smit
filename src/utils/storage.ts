import AsyncStorage from "@react-native-async-storage/async-storage";

const DISABLED_PHOTOS_KEY = "@disabled_photos";

export const saveDisabledPhotos = async (
  disabledIds: string[]
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      DISABLED_PHOTOS_KEY,
      JSON.stringify(disabledIds)
    );
  } catch (error) {
    console.error("Error saving disabled photos:", error);
  }
};

export const getDisabledPhotos = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(DISABLED_PHOTOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading disabled photos:", error);
    return [];
  }
};
