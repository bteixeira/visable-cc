export type Project = {
    acronym: string
    projectId: number
    title: string
    website: string
    lastUpdated: string // Date (YYYY-mm-dd)
}

export type ProjectList = {
    projects: Project[]
    totalCount: number
}
