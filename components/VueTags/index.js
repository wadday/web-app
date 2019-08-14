import VueTags from './VueTags';

export default {
    install(Vue) {
        Vue.component('vue-tags', VueTags);
    },
};

export { VueTags };