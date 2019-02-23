<template>
    <div id="wrapper">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import Navbar from './components/shared/navbar/Navbar'

    export default {
        components: {
            Navbar
        }
    }
</script>

<style scoped>
    #wrapper {
        width: 70%;
        position: relative;
        margin: 20px auto;
    }
</style>