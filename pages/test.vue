<template>
  <div>test protected route
    <button @click="fetch"></button>
  </div>
</template>

<script>
    export default {
        middleware: ['auth'],
        name: "test",

        mounted() {
            console.log(this.$auth.user)
        },

        methods: {
            fetch() {
                this.$axios.$get('/api/locations?keyword=veem')
                    .then(result => {
                    console.log(result)
                })
                    .catch(error => {})
            }
        }
    }
</script>

<style scoped>

</style>
