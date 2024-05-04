<script setup lang="ts">

import type {PaginatedProjects} from '~/types/project'

type Params = {
    pageSize?: number
    page?: number
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
    <div>
        The current page is:
        <pre style="border: solid 1px gray; display: inline-block">{{ page }}</pre>
    </div>
    <div v-if="pending">
        Loading ...
    </div>
    <div v-else>
        <p>
            (total {{ data?.totalCount }} projects in {{ totalPages }} pages)
            Page:
            <span v-for="n in totalPages">
                <NuxtLink :to="buildLink({page: n})">{{ n }}</NuxtLink>&nbsp;
            </span>
        </p>
        <ul>
            <li v-for="project in data?.projects">
                <NuxtLink :to="`/${project.projectId}`">
                    [{{ project.projectId }}] {{ project.title }} last updated on {{ project.lastUpdated }}
                </NuxtLink>
            </li>
        </ul>
    </div>
    Footer
</template>
