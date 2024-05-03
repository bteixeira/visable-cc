<script setup lang="ts">

import type {Project} from '~/types/project'

const route = useRoute()

const { pending, data } = useFetch<{project: Project}>(`https://techport.nasa.gov/api/projects/${route.params.id}`)

</script>

<template>
    Title
    <div v-if="pending">
        Loading ...
    </div>
    <ul v-else>
        {{ data?.project }}
    </ul>
    Footer
</template>
