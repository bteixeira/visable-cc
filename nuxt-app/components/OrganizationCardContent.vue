<script setup lang="ts">

import type {Organization} from '~/types/project'

defineProps<{organization: Organization}>()

</script>

<template>
    <v-card-text>
        <h6 class="text-subtitle-1">
            {{ organization.organizationName }}
            <template v-if="organization.acronym">
                ({{ organization.acronym }})
            </template>
        </h6>
        <div v-if="organization.city || organization.country" class="text-caption">{{ organization.city }}, {{ organization.country?.name }}</div>
    </v-card-text>
</template>