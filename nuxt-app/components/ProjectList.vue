<script setup lang="ts">

import type {Project} from '~/types/project'

defineProps<{
    projects: Project[]
}>()

</script>

<template>
    <v-row>
        <v-col v-for="project in projects" cols="12" sm="6" md="4" lg="3" xl="2">
            <ProjectListItem :project="project"/>
        </v-col>
    </v-row>
</template>
