<script setup lang="ts">

import sanitizeHtml from 'sanitize-html'
import type {Project} from '~/types/project'

const route = useRoute()

const {pending, data} = useFetch<Project>(`/api/projects/${route.params.id}`)

type ContactType =
    'programDirectors'
    | 'programManagers'
    | 'projectManagers'
    | 'principalInvestigators'
    | 'coInvestigators'
type SummarizedContact = {
    id: number
    name: string
    email?: string
    types: Set<ContactType>
}
const ContactTypeConfig: Record<ContactType, {color: string, label: string}> = {
    programDirectors: {color: 'primary', label: 'Program Director'},
    programManagers: {color: 'blue-darken-1', label: 'Program Manager'},
    projectManagers: {color: 'light-blue-lighten-1', label: 'Project Manager'},
    principalInvestigators: {color: 'blue-gray-lighten-1', label: 'Principal Investigator'},
    coInvestigators: {color: 'gray-lighten-4', label: 'Co-investigator'},
}

const contacts = computed(() => {
    const result = new Map<number, SummarizedContact>()

    if (!data.value) {
        return result
    }

    function processContacts (contactType: ContactType) {
        data.value![contactType]?.forEach(contact => {
            if (result.has(contact.contactId)) {
                result.get(contact.contactId)!.types.add(contactType)
            } else {
                result.set(contact.contactId, {
                    id: contact.contactId,
                    name: contact.fullNameInverted,
                    email: contact.publicEmail ? contact.primaryEmail : undefined,
                    types: new Set<ContactType>([contactType]),
                })
            }
        })
    }

    (['programDirectors', 'programManagers', 'projectManagers', 'principalInvestigators', 'coInvestigators'] as const).forEach(
        processContacts)

    return result
})

</script>

<template>

    <div class="bg-blue-lighten-5">
        <v-container>
            <v-row>
                <v-col xs="12" lg="9" xl="6" offset-xl="2" xxl="4">
                    <h1 class="text-h3 my-16 title-heading">{{ data?.title }}</h1>
                </v-col>
            </v-row>
        </v-container>
    </div>

    <v-container fluid>
        <NuxtLink to="/">
            <v-icon icon="mdi-chevron-left"/>
            Back to all projects
        </NuxtLink>
    </v-container>
    <v-container>
        <v-row>

            <v-col cols="12" md="6" lg="8">
                <v-card v-if="data?.description">
                    <v-card-text>
                        <h2 class="text-h5 mb-4">Description</h2>
                        <p class="text-body-1 long-text">
                            {{ sanitizeHtml(data?.description || '', {allowedTags: []}) }}
                        </p>
                    </v-card-text>
                </v-card>

                <v-card v-if="data?.benefits" class="mt-6">
                    <v-card-text>
                        <h2 class="text-h5 mb-4">Benefits</h2>
                        <p class="text-body-1 long-text">
                            {{ sanitizeHtml(data?.benefits || '', {allowedTags: []}) }}
                        </p>
                    </v-card-text>
                </v-card>

            </v-col>

            <v-col cols="12" md="6" lg="4">
                <v-card>
                    <v-list>
                        <v-list-item v-if="data?.website">
                            <NuxtLink :to="data?.website" target="_blank" class="text-blue">
                                {{ data?.website }}
                            </NuxtLink>
                        </v-list-item>
                        <v-list-item title="Project ID:" :subtitle="data?.projectId"/>
                        <v-list-item v-if="data?.acronym" title="Acronym:" :subtitle="data?.acronym"/>
                        <v-list-item v-if="data?.statusDescription" title="Status:" :subtitle="data?.statusDescription"/>
                    </v-list>
                </v-card>

                <v-card class="mt-6">
                    <v-card-title>All project contacts</v-card-title>
                    <v-list>
                        <v-list-item v-for="[id, contact] in contacts" :key="id">
                            <h6 class="text-subtitle-1">{{ contact.name }}</h6>
                            <a v-if="contact.email" class="text-caption" :href="`mailto:${contact.email}`" target="_blank">{{ contact.email }}</a>
                            <div>
                                <v-chip v-for="type in contact.types" :color="ContactTypeConfig[type].color" variant="outlined" size="x-small">
                                    {{ ContactTypeConfig[type].label }}
                                </v-chip>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-card>

                <v-card class="mt-6">
                    <v-card-title>Lead Organization</v-card-title>
                    <OrganizationCardContent v-if="data?.leadOrganization" :organization="data.leadOrganization"/>
                    <template v-if="data?.supportingOrganizations">
                        <v-card-title>Supporting Organizations</v-card-title>
                        <OrganizationCardContent v-for="organization in data.supportingOrganizations" :organization="organization"/>
                    </template>
                    <template v-if="data?.coFundingPartners">
                        <v-card-title>Co-funding Organizations</v-card-title>
                        <OrganizationCardContent v-for="organization in data.coFundingPartners" :organization="organization"/>
                    </template>
                </v-card>
            </v-col>

        </v-row>

        <v-expansion-panels class="mt-6">
            <v-expansion-panel title="Raw JSON for debugging">
                    <v-expansion-panel-text>
                        <pre class="raw-json">{{ JSON.stringify(data, undefined, 4) }}</pre>
                    </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <div v-if="pending">
            Loading ...
        </div>
    </v-container>

</template>

<style scoped>
.title-heading {
    line-height: 1.5;
}

.long-text {
    line-height: 1.8;
}

.raw-json {
    white-space: pre-wrap;
    max-height: 60em;
    padding: 1em;
    overflow: auto;
    border: solid 1px #ddd;
    border-radius: 3px;
    font-size: 0.75rem;
}
</style>
