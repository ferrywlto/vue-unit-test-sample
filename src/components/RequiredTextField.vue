<template>
    <v-text-field :rules="requiredRules" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'RequiredTextField',
    data: () => ({
        requiredRules: [
           v => (!!v && v.length > 0) || 'Name is required',
       ]
    })
})
</script>