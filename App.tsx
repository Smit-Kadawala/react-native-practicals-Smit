import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DisabledCardsScreen } from "./src/screens/DisabledCardsScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Photos" }}
        />
        <Stack.Screen
          name="DisabledCards"
          component={DisabledCardsScreen}
          options={{ title: "Disabled Cards" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
