<script setup lang="ts">

import type {PaginatedProjects} from '~/types/project'

type Params = {
    pageSize?: number | string
    page?: number | string
    updatedSince?: string // Date
}

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1
const PAGE_SIZES = [10, 25, 50]

const route = useRoute()
const pageSize = computed(() => Number(route.query.pageSize) || DEFAULT_PAGE_SIZE)
const page = computed(() => Number(route.query.page) || DEFAULT_PAGE)
const offset = computed(() => (page.value - 1) * pageSize.value)

const {pending, data} = useFetch<PaginatedProjects>('/api/projects', {
    query: {
        limit: pageSize,
        offset: offset,
    },
})

const totalPages = computed(() => !!data.value ? Math.ceil(data.value.totalCount / pageSize.value) : 0)

const buildLink = (params: Params) => {
    const query = {
        pageSize: pageSize.value,
        page: page.value,
        ...params,
    } as Params
    if (query.pageSize === DEFAULT_PAGE_SIZE) {
        delete query.pageSize
    }
    if (query.page === DEFAULT_PAGE) {
        delete query.page
    }

    return {
        path: '/',
        query: {
            pageSize: query.pageSize?.toString(),
            page: query.page?.toString(),
        },
    }
}

</script>

<template>

    <v-container>
        <h1 class="text-h3">Browse projects</h1>

        <v-row>
            <v-col cols="auto">
                <v-select
                    id="select-last-updated" density="compact" variant="outlined" :items="[
                        'Last 7 days',
                        'Last 14 days',
                        'Last 30 days',
                    ]"
                    label="Changed since"
                    class="d-inline-block"
                />
            </v-col>

            <v-col>
                Total: {{ data?.totalCount }} projects
            </v-col>

            <v-col>
                <v-pagination :length="totalPages" show-first-last-page density="compact" :model-value="page">
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
                        <NuxtLink v-else :to="buildLink({page: item.page})" class="pagination-link">
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

            <v-col>
                <v-select
                    id="select-page-size" density="compact" variant="outlined" :items="PAGE_SIZES" :model-value="pageSize"
                    label="Page size"
                    @update:modelValue="(pageSize: number) => navigateTo(buildLink({pageSize}))"
                />
            </v-col>
        </v-row>

        <div v-if="pending">
            Loading ...
        </div>
        <ProjectList v-else :projects="data?.projects || []"/>
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