import {ProjectListSkeleton} from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('ProjectListSkeleton', () => {
    it('mounts correctly', async () => {
        const component = await mountSuspended(ProjectListSkeleton)
        expect(component.text()).toBe('')
        expect(component.html()).toContain('v-skeleton-loader')
    })
})