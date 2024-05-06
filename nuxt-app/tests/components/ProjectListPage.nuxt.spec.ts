import {mountSuspended, registerEndpoint} from '@nuxt/test-utils/runtime'
import ProjectList from '~/pages/index.vue'

import listData from '../../data-dump/TechPort-20240506-projects-updatedSince-2024-01-11.json'

describe('Project listing page', () => {
    
    it('', async () => {
        registerEndpoint('/api/projects', () => listData)
        
        const component = await mountSuspended(ProjectList)
        expect(component.text()).toContain('Total: 2302 projects')
    })
})