import { useSession } from "@/context/SessionContext";
import { Stack, useRouter, Redirect } from "expo-router";


export default function StackNavigator() {
    const router = useRouter();

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(root)" />
            <Stack.Screen name="SignIn" />
        </Stack>
    );
}
