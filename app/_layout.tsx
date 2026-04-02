import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="[name]"
          options={{
            headerBackButtonDisplayMode: "minimal",
            presentation: "formSheet",
            sheetAllowedDetents: [0.3, 0.5, 0.7],
            sheetGrabberVisible: true,
            sheetCornerRadius: 20,
            sheetResizeAnimationEnabled: true,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
