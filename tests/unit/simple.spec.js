import Vue from 'vue';
import Vuetify from 'vuetify';
import Simple from '@/components/Simple.vue'
import RequiredTextField from '@/components/RequiredTextField.vue'

import { mount, shallowMount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify);
const localVue = createLocalVue();

describe('Simple', () => {
  const onClick = jest.fn();
  const wrapper = shallowMount(Simple, {});

  it('should emit click event when clicked', async () => {
    wrapper.vm.$on('click', onClick);
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClick).toHaveBeenCalled();
  })
})

describe('RequiredTextField.vue', () => {
  //@ts-ignore
  let vuetify;
  beforeEach(() => { vuetify = new Vuetify(
    {
      lang: {
        t: (val) => val,
      }
    })
  })

  //@ts-ignore
  const factory = (options = {}) => {
    return mount(RequiredTextField, {
      //@ts-ignore
      localVue, vuetify, 
      stubs: { 'transition-group': false },
      ...options
    });
  }

  it('should show warning when no input passed - method 1', async () => {
    const wrapper = factory({});
    const tf = wrapper.find('input');

    tf.setValue('');
    await wrapper.vm.$nextTick();

    const errorLabel = wrapper.find('.v-messages__message');
    expect(errorLabel.exists()).toBe(true);
    expect(errorLabel.text()).toBe('Name is required');
  })

  // See - https://github.com/vuejs/vue-test-utils/issues/266
  it('should show warning when no input passed - method 2', async () => {
    const wrapper = factory({});
    // expect(wrapper.html()).toMatchSnapshot();
    console.log(wrapper.html());
    const rule = wrapper.vm.$data.requiredRules[0];
    const ruleResult = rule('');
    expect(ruleResult).toBe('Name is required');
  })
})
