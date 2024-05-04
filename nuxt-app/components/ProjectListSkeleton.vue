<template>
    <v-row>
        <v-col v-for="n in 6" cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card elevation="4" class="card-full-height">
                <v-skeleton-loader type="heading"/>
                <v-skeleton-loader type="subtitle"/>
                <v-skeleton-loader type="list-item-three-line"/>
            </v-card>
        </v-col>
    </v-row>
</template>