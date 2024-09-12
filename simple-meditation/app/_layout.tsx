import TimerProvider from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

// this will prevent the splashscreen from auto hiding untill loading all font assets
SplashScreen.preventAutoHideAsync();

//Slot its a component that displays the childRoute in its place (in this case: index.tsx)

export default function RootLayout() {

    const [fontsLoaded, error] = useFonts({
        "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
    });

    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync();

    }, [fontsLoaded, error]);

    if(!fontsLoaded) return null;
    if(!fontsLoaded && !error) return null;

    return (
        //<Slot/>
        <TimerProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                <Stack.Screen name="index" options={{ headerShown: false }}/>
                <Stack.Screen name="meditate/[id]" options={{ headerShown: false }}/>
                <Stack.Screen name="(modal)/adjust-meditation-duration" options={{ headerShown: false, presentation: "modal" }}/>
            </Stack>
        </TimerProvider>
    );
}