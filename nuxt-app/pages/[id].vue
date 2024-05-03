<script setup lang="ts">

import type {Project} from '~/types/project'

const route = useRoute()

const { pending, data } = useFetch<Project>(`/api/projects/${route.params.id}`)

</script>

<template>
    Title
    <div v-if="pending">
        Loading ...
    </div>
    <pre v-else>{{ JSON.stringify(data, undefined, 4) }}</pre>
    Footer
</template>
