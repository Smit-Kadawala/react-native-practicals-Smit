export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotoWithStatus extends Photo {
  isEnabled: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  DisabledCards: undefined;
};
