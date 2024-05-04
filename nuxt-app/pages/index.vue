<script setup lang="ts">

import type {Project} from '~/types/project'

const route = useRoute()
const pageSize = computed(() => route.query.pageSize || 10)

const { pending, data: projects } = useFetch<Project[]>('/api/projects', {
    query: {
        pageSize
    }
})

</script>

<template>
    Title
    <div>
        Your page size is:
        <pre style="border: solid 1px gray; display: inline-block">{{ pageSize }}</pre>
    </div>
    <p>
        <NuxtLink to="/">10</NuxtLink>&nbsp;
        <NuxtLink to="/?pageSize=25">25</NuxtLink>&nbsp;
        <NuxtLink to="/?pageSize=50">50</NuxtLink>
    </p>
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
