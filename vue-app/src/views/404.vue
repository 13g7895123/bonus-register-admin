<template>
    <div class="w-full h-screen relative overflow-hidden">
        <img class="w-screen h-screen" src="../assets/404.gif" alt="error">
        <button 
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none border-none focus:outline-none focus:border-none"
            @click="$router.go(-1)"
        >返回首頁</button>
    </div>
</template>
<script setup>

</script>