import 'babel-polyfill'
import 'babel-core/register'

import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import ElementUI from 'element-ui'
import Login from '../../src/components/page/Login.vue'

const localVue = createLocalVue()

localVue.use(ElementUI)

describe('Login.vue', () => {
  const wrapper = mount(Login, {
    localVue,
  })

  it('render Login', () => {
    expect(wrapper.findAll('.sign-button').length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('Broccoli & Co.')
  })

  it('Login popup shows after click', (done) => {
    expect(wrapper.findAll('.login-btn').length).toBe(0)
    wrapper.find('.sign-button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.login-btn').length).toBe(1)
      done()
    })
  })

  it('Right param get right answer', async (done) => {
    wrapper.vm.param.username = 'test'
    wrapper.vm.param.email = 'test@google.com'
    wrapper.vm.param.confirmEmail = 'test@google.com'

    const res = await wrapper.vm.postAuthApi()
    expect(res.success).toEqual(true)
    done()
  })

  it('wrong param get wrong answer', async (done) => {
    wrapper.vm.param.username = 'test'
    wrapper.vm.param.email = 'usedemail@airwallex.com'
    wrapper.vm.param.confirmEmail = 'usedemail@airwallex.com'

    const res = await wrapper.vm.postAuthApi()
    expect(res.success).toEqual(false)
    expect(res.code).toEqual(400)
    done()
  })
})