import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PhotoList } from "../components/PhotoList";
import { usePhotos } from "../hooks/usePhotos";
import { RootStackParamList } from "../types";
import { getDisabledPhotos, saveDisabledPhotos } from "../utils/storage";

type DisabledCardsProps = NativeStackScreenProps<
  RootStackParamList,
  "DisabledCards"
>;

export const DisabledCardsScreen: React.FC<DisabledCardsProps> = ({
  navigation,
}) => {
  const { photos, loading, fetchPhotos, setPhotos } = usePhotos(false);

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
      prev
        .map((photo) =>
          photo.id === id && photo.albumId === albumId
            ? { ...photo, isEnabled }
            : photo
        )
        .filter((photo) => !photo.isEnabled)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <PhotoList loading={loading} photos={photos} onToggle={handleToggle} />
    </View>
  );
};
