<template>
    <v-app>

        <v-app-bar class="bg-teal" density="compact">
            <v-container>
                <v-app-bar-title>TechPort Explorer</v-app-bar-title>
            </v-container>
        </v-app-bar>

        <!-- Was using <vmain/> but it seems to have a bug currently that causes issues with SSR and hydration-->
        <main class="pt-12">
            <NuxtPage/>
        </main>

        <v-footer class="align-end py-8">
            <v-container>
                <v-divider thickness="2"/>
            </v-container>
        </v-footer>

    </v-app>
</template>