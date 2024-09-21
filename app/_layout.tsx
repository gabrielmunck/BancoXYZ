import { Stack } from "expo-router";
import { SessionProvider, useSession } from "@/context/SessionContext";

function StackNavigator() {
    const { isLoggedIn } = useSession();
    console.log("Current isLoggedIn state:", isLoggedIn);

    return (
        <Stack screenOptions={{headerShown: false}}>
            {!isLoggedIn ? (
                <Stack.Screen name="index" options={{ headerShown: false }} />
            ) : (
                
                <Stack screenOptions={{headerShown: false}} >
                    <Stack.Screen name="Home" options={{ headerShown: false }} />
                    <Stack.Screen name="Transfer" options={{ headerShown: false }} />
                    <Stack.Screen name="NewTransfer" options={{ headerShown: false }} />
                </Stack>
                
            )}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <SessionProvider>
            <StackNavigator />
        </SessionProvider>
    );
}
