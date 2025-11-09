import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { PhotoList } from "../components/PhotoList";
import { SearchBar } from "../components/SearchBar";
import { usePhotos } from "../hooks/usePhotos";
import { RootStackParamList } from "../types";
import { getDisabledPhotos, saveDisabledPhotos } from "../utils/storage";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { photos, loading, fetchPhotos, setPhotos } = usePhotos(true);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [fetchPhotos])
  );

  const handleToggle = async (
    id: number,
    albumId: number,
    isEnabled: boolean
  ) => {
    const key = `${albumId}-${id}`;
    const disabled = await getDisabledPhotos();
    const disabledSet = new Set(disabled);

    if (!isEnabled) {
      disabledSet.add(key);
    } else {
      disabledSet.delete(key);
    }
    await saveDisabledPhotos(Array.from(disabledSet));
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id && photo.albumId === albumId
          ? { ...photo, isEnabled }
          : photo
      )
    );
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DisabledCards")}
      >
        <Text style={styles.buttonText}>View Disabled Cards</Text>
      </TouchableOpacity>
      <PhotoList
        loading={loading}
        photos={filteredPhotos}
        onToggle={handleToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
