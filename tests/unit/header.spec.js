import { shallowMount } from '@vue/test-utils'
import Header from '../../src/components/common/Header.vue'

describe('Header.vue', () => {
  it('render Header', () => {
    const wrapper = shallowMount(
      Header
    )
    expect(wrapper.findAll('img').length).toBe(1)
    expect(wrapper.findAll('.header').length).toBe(1)
  })
})
