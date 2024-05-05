<script setup lang="ts">

import type {RouteLocationRaw} from 'vue-router'

defineProps<{resetLink: RouteLocationRaw}>()
</script>

<template>
    <div class="text-center d-flex flex-column align-center">
        <div class="text-h4 w-md-50 my-8">There are no projects for the time period you selected.</div>
        <p class="text-body-1">
            Try selecting another time period or resetting to the <NuxtLink :to="resetLink" class="text-blue">default</NuxtLink>.
        </p>
    </div>
</template>

<style scoped>

</style>