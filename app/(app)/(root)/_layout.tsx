import { useSession } from "@/context/SessionContext";
import { Stack, useRouter, Redirect } from "expo-router"

export default function RootLayout() {
    const { isLoggedIn } = useSession();
    const router = useRouter();
    

    if (!isLoggedIn) {
        return <Redirect href="/SignIn" />;
    }

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" />
            <Stack.Screen name="TransferList" />
            <Stack.Screen name="NewTransfer" />
        </Stack>
    );
}
