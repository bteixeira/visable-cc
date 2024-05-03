<script setup lang="ts">

import type {ProjectList} from '~/types/project'

const { pending, data } = useFetch<ProjectList>('https://techport.nasa.gov/api/projects?updatedSince=2024-04-22')

</script>

<template>
    Title
    <div v-if="pending">
        Loading ...
    </div>
    <ul v-else>
        <li v-for="project in data?.projects">
            <NuxtLink :to="`/${project.projectId}`">
                Project #{{ project.projectId }} last updated on {{ project.lastUpdated }}
            </NuxtLink>
        </li>
    </ul>
    Footer
</template>
