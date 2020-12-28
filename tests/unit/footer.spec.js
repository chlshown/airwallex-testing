import {
  shallowMount
} from '@vue/test-utils'
import Footer from '../../src/components/common/Footer.vue'

describe('Footer.vue', () => {
  it('render Footer', () => {
    const wrapper = shallowMount(
      Footer
    )
    expect(wrapper.find('.title').text()).toEqual('This is footer')
  })
})