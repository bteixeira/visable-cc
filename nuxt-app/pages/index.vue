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
    Title
    <div>
        Your page size is:
        <pre style="border: solid 1px gray; display: inline-block">{{ pageSize }}</pre>&nbsp;
        <span v-for="pageSize in PAGE_SIZES">
            <NuxtLink :to="buildLink({pageSize, page: 1})">{{ pageSize }}</NuxtLink>&nbsp;
        </span>

    </div>
    <div v-if="pending">
        Loading ...
    </div>
    <div v-else>
        <p>
            (total {{ data?.totalCount }} projects in {{ totalPages }} pages)
            <v-pagination :length="totalPages" show-first-last-page density="compact" :model-value="page">
                <template v-slot:first="props">
                    <v-btn :to="buildLink({page: 1})" nuxt :disabled="props.disabled" variant="text" density="compact" icon :active="false">
                        <v-icon icon="mdi-page-first"/>
                    </v-btn>
                </template>
                <template v-slot:prev="props">
                    <v-btn :to="buildLink({page: page - 1})" nuxt :disabled="props.disabled" variant="text" density="compact" icon :active="false">
                        <v-icon icon="mdi-chevron-left"/>
                    </v-btn>
                </template>

                <template v-slot:item="item">
                    <div v-if="item.isActive" class="pagination-link -active">
                        {{ item.page }}
                    </div>
                    <NuxtLink v-else :to="buildLink({page: item.page})" class="pagination-link">
                        {{ item.page }}
                    </NuxtLink>
                </template>

                <template v-slot:next="props">
                    <v-btn :to="buildLink({page: page + 1})" nuxt :disabled="props.disabled" variant="text" density="compact" icon :active="false">
                        <v-icon icon="mdi-chevron-right"/>
                    </v-btn>
                </template>
                <template v-slot:last="props">
                    <v-btn :to="buildLink({page: totalPages})" nuxt :disabled="props.disabled" variant="text" density="compact" icon :active="false">
                        <v-icon icon="mdi-page-last"/>
                    </v-btn>
                </template>
            </v-pagination>
        </p>

        <ProjectList :projects="data?.projects || []"/>
    </div>
    Footer
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