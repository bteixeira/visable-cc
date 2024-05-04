import {type ProjectData, type ProjectList} from '~/types/project'

export default defineEventHandler(async (event) => {
    const pageSize = Number(getQuery(event).pageSize) || 10
    
    const projects = await $fetch<ProjectList>('https://techport.nasa.gov/api/projects?updatedSince=2024-04-22')
    
    const projectsPage = projects.projects.slice(0, pageSize)
    console.log('Page size', pageSize, 'projects', projectsPage.length)
    
    const expanded = await Promise.all(
        projectsPage.map(p => $fetch<ProjectData>(`https://techport.nasa.gov/api/projects/${p.projectId}`).then(p => p.project))
    )
    
    return expanded
})