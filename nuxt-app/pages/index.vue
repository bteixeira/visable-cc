<script setup lang="ts">

import type {PaginatedProjects} from '~/types/project'
import {getUpdatedSinceDate} from '~/utils/date'

type Params = {
    pageSize?: number
    page?: number
    updatedSince?: number
}

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1
const DEFAULT_UPDATED_SINCE = 14
const PAGE_SIZES = [10, 25, 50]

const route = useRoute()
const pageSize = computed(() => Number(route.query.pageSize) || DEFAULT_PAGE_SIZE)
const page = computed(() => Number(route.query.page) || DEFAULT_PAGE)
const offset = computed(() => (page.value - 1) * pageSize.value)
const updatedSince = computed(() => Number(route.query.updatedSince) || DEFAULT_UPDATED_SINCE)
const updatedSinceDate = computed(() => getUpdatedSinceDate(updatedSince.value))

const {pending, data} = useFetch<PaginatedProjects>('/api/projects', {
    query: {
        limit: pageSize,
        offset,
        updatedSince: updatedSinceDate,
    },
})

const totalPages = computed(() => !!data.value ? Math.ceil(data.value.totalCount / pageSize.value) : 0)

const buildLink = (params: Params) => {
    const query = {
        pageSize: pageSize.value,
        page: page.value,
        updatedSince: updatedSince.value,
        ...params,
    } as Params

    if (query.pageSize === DEFAULT_PAGE_SIZE) {
        delete query.pageSize
    }
    if (query.page === DEFAULT_PAGE) {
        delete query.page
    }
    if (query.updatedSince === DEFAULT_UPDATED_SINCE) {
        delete query.updatedSince
    }

    return {
        path: '/',
        query: {
            pageSize: query.pageSize?.toString(),
            page: query.page?.toString(),
            updatedSince: query.updatedSince?.toString(),
        },
    }
}

</script>

<template>

    <v-container>
        <h1 class="text-h3 mt-2 mb-6">Browse projects</h1>

        <v-row class="align-center">
            <v-col cols="6" md="auto">
                <v-select
                    hide-details
                    id="select-updated-since" density="compact" variant="outlined" :model-value="updatedSince"
                    :items="[
                        {title: 'Last 7 days', value: 7},
                        {title: 'Last 14 days', value: 14},
                        {title: 'Last 30 days', value: 30},
                    ]"
                    label="Changed since"
                    @update:modelValue="(value: number) => navigateTo(buildLink({updatedSince: value, page: 1}))"
                />
            </v-col>

            <v-col cols="6" md="auto" order-md="4">
                <v-select
                    hide-details
                    id="select-page-size" density="compact" variant="outlined" :items="PAGE_SIZES" :model-value="pageSize"
                    label="Page size"
                    :disabled="totalPages === 0"
                    @update:modelValue="(pageSize: number) => navigateTo(buildLink({pageSize, page: 1}))"
                />
            </v-col>

            <v-col order-md="3">
                <v-pagination v-if="totalPages > 0" :length="totalPages" show-first-last-page density="compact" :model-value="page">
                    <template v-slot:first="props">
                        <v-btn
                            :to="buildLink({page: 1})"
                            nuxt
                            :disabled="props.disabled"
                            variant="text"
                            density="compact"
                            icon
                            :active="false"
                        >
                            <v-icon icon="mdi-page-first"/>
                        </v-btn>
                    </template>
                    <template v-slot:prev="props">
                        <v-btn
                            :to="buildLink({page: page - 1})"
                            nuxt
                            :disabled="props.disabled"
                            variant="text"
                            density="compact"
                            icon
                            :active="false"
                        >
                            <v-icon icon="mdi-chevron-left"/>
                        </v-btn>
                    </template>

                    <template v-slot:item="item">
                        <div v-if="item.isActive" class="pagination-link -active">
                            {{ item.page }}
                        </div>
                        <div v-else-if="item.page === '...'" class="pagination-link">
                            {{ item.page }}
                        </div>
                        <NuxtLink v-else :to="buildLink({page: Number(item.page)})" class="pagination-link">
                            {{ item.page }}
                        </NuxtLink>
                    </template>

                    <template v-slot:next="props">
                        <v-btn
                            :to="buildLink({page: page + 1})"
                            nuxt
                            :disabled="props.disabled"
                            variant="text"
                            density="compact"
                            icon
                            :active="false"
                        >
                            <v-icon icon="mdi-chevron-right"/>
                        </v-btn>
                    </template>
                    <template v-slot:last="props">
                        <v-btn
                            :to="buildLink({page: totalPages})"
                            nuxt
                            :disabled="props.disabled"
                            variant="text"
                            density="compact"
                            icon
                            :active="false"
                        >
                            <v-icon icon="mdi-page-last"/>
                        </v-btn>
                    </template>
                </v-pagination>
            </v-col>

            <v-col class="text-no-wrap text-right text-md-left">
                Total: {{ data?.totalCount ?? 0 }} projects
            </v-col>

        </v-row>

        <ProjectListSkeleton v-if="pending"/>
        <ProjectList v-else-if="totalPages > 0" :projects="data?.projects || []"/>
        <NoResults v-else :reset-link="buildLink({updatedSince: undefined})"/>
    </v-container>
</template>

<style scoped>
.pagination-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1.75em;
    height: 1.75em;
    border-radius: 4px;

    &:hover {
        background-color: #f4f4f4;
    }

    &.-active {
        background-color: #ddd;
    }
}
</style>