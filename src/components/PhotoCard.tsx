import React from "react";
import { Image, StyleSheet, Switch, Text, View } from "react-native";
import { PhotoWithStatus } from "../types";

interface PhotoCardProps {
  photo: PhotoWithStatus;
  onToggle: (id: number, albumId: number, value: boolean) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onToggle }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: photo.thumbnailUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {photo.title}
        </Text>
        <Text style={styles.info}>ID: {photo.id}</Text>
        <Text style={styles.info}>Album ID: {photo.albumId}</Text>
      </View>
      <Switch
        value={photo.isEnabled}
        onValueChange={(value) => onToggle(photo.id, photo.albumId, value)}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={photo.isEnabled ? "#007AFF" : "#f4f3f4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  info: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
