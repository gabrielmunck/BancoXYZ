import { Slot } from "expo-router";
import { SessionProvider } from "@/context/SessionContext";


export default function RootLayout() {
    return (
        <SessionProvider>
            <Slot/>
        </SessionProvider>
    );
}
