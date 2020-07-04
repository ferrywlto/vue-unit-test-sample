<template>
    <div @click="onClick">Hi</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'Simple',
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
})
</script>