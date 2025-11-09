import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PhotoWithStatus } from "../types";
import { PhotoCard } from "./PhotoCard";

interface PhotoListProps {
  loading: boolean;
  photos: PhotoWithStatus[];
  onToggle: (id: number, albumId: number, isEnabled: boolean) => void;
}

export const PhotoList: React.FC<PhotoListProps> = ({
  loading,
  photos,
  onToggle,
}) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  if (photos.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No cards found.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={photos}
      renderItem={({ item }) => <PhotoCard photo={item} onToggle={onToggle} />}
      keyExtractor={(item) => `${item.albumId}-${item.id}`}
      initialNumToRender={20}
      windowSize={10}
      contentContainerStyle={styles.listContent}
      removeClippedSubviews
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: { paddingVertical: 8 },
});
