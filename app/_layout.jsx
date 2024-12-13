import { Stack } from 'expo-router';

export default function Layout() {
return (
    <Stack
        screenOptions={{}}>
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen name="index" options={{}} />
        <Stack.Screen name="register" options={{  headerShown: false}} />
        
    </Stack>
);
}
