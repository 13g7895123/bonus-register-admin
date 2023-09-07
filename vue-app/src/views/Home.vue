<template>
    <div class="w-full max-h-screen overflow-hidden">
        <Navbar />
        <Sidebar />
        <div class="relative top-0 left-[180px] w-[calc(100%-190px)] h-[calc(100%-71px)] overflow-auto flex justify-center">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue';

</script>
