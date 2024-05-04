import {type ProjectData, type ProjectList} from '~/types/project'

export default defineEventHandler(async (event) => {
    const limit = Number(getQuery(event).limit) || 10
    const offset = Number(getQuery(event).offset) || 0
    
    const projectList = await $fetch<ProjectList>('https://techport.nasa.gov/api/projects?updatedSince=2024-04-22')
    
    const projectPage = projectList.projects.slice(offset, offset + limit)
    console.log('Page size', limit, 'projects', projectPage.length)
    
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