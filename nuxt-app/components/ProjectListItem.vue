<script setup lang="ts">

import type {Project} from '~/types/project'

const MAX_TITLE_LENGTH = 60

const props = defineProps<{
    project: Project
}>()

const truncatedTitle = computed(() => {
    const {title} = props.project
    return (title.length > MAX_TITLE_LENGTH)
        ? title.substring(0, MAX_TITLE_LENGTH - 1) + '…'
        : title
})

</script>

<template>
    <NuxtLink :to="`/${project.projectId}`">
        <v-card elevation="4" class="card-full-height">
            <div class="card-contents">
                <h3 :title="project.title" class="card-title text-blue">
                    {{ truncatedTitle }}
                </h3>
                <div class="card-body">
                    Last updated on {{ project.lastUpdated }}
                    <br/>
                    Start: {{ project.startDateString }}
                    <br/>
                    End: {{ project.endDateString }}
                </div>
            </div>
        </v-card>
    </NuxtLink>
</template>

<style scoped>
.card-contents {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    line-height: 1.35;
    gap: 1rem;
    height: 100%;
}
.card-title {
    /*white-space: normal;*/
    letter-spacing: 0.0125em;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.35;
    flex-grow: 1;
}
.card-full-height {
    height: 100%;
}
.card-body {
    font-size: 0.875rem;
}
</style>