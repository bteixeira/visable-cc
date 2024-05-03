import type {ProjectData} from '~/types/project'

export default defineEventHandler(event => {
    const id = event.context.params?.id
    return $fetch<ProjectData>(`https://techport.nasa.gov/api/projects/${id}`).then(p => p.project)
})