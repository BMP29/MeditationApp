import { Slot, Stack } from "expo-router";

//Slot its a component that displays the childRoute in its place (in this case: index.tsx)

export default function RootLayout() {
    return (
        //<Slot/>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
        </Stack>
    );
}