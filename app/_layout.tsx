import { Stack} from "expo-router";
import { SessionProvider, useSession } from "@/context/SessionContext";

function StackNavigator() {
    const { isLoggedIn } = useSession();
    console.log("Current isLoggedIn state:", isLoggedIn);

    return (
        <Stack>
            {!isLoggedIn ? (
                <Stack.Screen name="index" options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="Home" options={{ headerShown: true, title: "Home" }} />
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
