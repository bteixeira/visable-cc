<script setup lang="ts">

import type {Project} from '~/types/project'

const { pending, data: projects } = useFetch<Project[]>('/api/projects')

</script>

<template>
    Title
    <div v-if="pending">
        Loading ...
    </div>
    <ul v-else>
        <li v-for="project in projects">
            <NuxtLink :to="`/${project.projectId}`">
                [{{ project.projectId }}] {{ project.title }} last updated on {{ project.lastUpdated }}
            </NuxtLink>
        </li>
    </ul>
    Footer
</template>
