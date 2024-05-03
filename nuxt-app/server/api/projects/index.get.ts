import {type ProjectData, type ProjectList} from '~/types/project'

export default defineEventHandler(async (event) => {
    const projects = await $fetch<ProjectList>('https://techport.nasa.gov/api/projects?updatedSince=2024-04-22')
    
    const expanded = await Promise.all(
        projects.projects.map(p => $fetch<ProjectData>(`https://techport.nasa.gov/api/projects/${p.projectId}`).then(p => p.project))
    )
    
    return expanded
})