<template>
    <div class="w-screen h-screen">
        <fvm-map :get-neighbours="false"></fvm-map>
    </div>
</template>

<script>

    import FvmMap from "../components/FvmMap";
    export default {
        middleware: ['auth'],
        name: 'AddLocation',
        components: {FvmMap},

    }
</script>