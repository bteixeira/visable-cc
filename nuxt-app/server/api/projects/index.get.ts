import {type ProjectData, type ProjectList} from '~/types/project'

function getDefaultDate () {
    const now = new Date()
    return new Date(Number(now) - (3600 * 24 * 7 * 1000)).toISOString().slice(0, 10)
}

export default defineEventHandler(async (event) => {
    const limit = Number(getQuery(event).limit) || 10
    const offset = Number(getQuery(event).offset) || 0
    const updatedSince = getQuery(event).updatedSince || getDefaultDate()
    
    const projectList = await $fetch<ProjectList>(`https://techport.nasa.gov/api/projects?updatedSince=${updatedSince}`)
    
    const projectPage = projectList.projects.slice(offset, offset + limit)
    
    const expandedProjects = await Promise.all(
        projectPage.map(p => $fetch<ProjectData>(`https://techport.nasa.gov/api/projects/${p.projectId}`).then(p => p.project))
    )
    
    return {
        projects: expandedProjects,
        limit,
        offset,
        totalCount: projectList.totalCount,
    }
})