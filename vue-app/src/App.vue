<script setup>
import { watchEffect } from 'vue';
import { useAuthStore } from './stores/loginAuth.js';
import { useLoginCheckStore } from './stores/loginCheck.js';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { ElConfigProvider } from 'element-plus'
import zhTw from 'element-plus/lib/locale/lang/zh-tw'

const loginStore = useAuthStore()
const loginCheck = useLoginCheckStore();
const router = useRouter()

watchEffect(() => {
  if(localStorage.userAccount){
    loginStore.setAuth(true)
    loginStore.setUser(localStorage.userAccount)
    loginStore.setUserName(localStorage.userName)
  }else{
    // if (loginCheck.getIsLogin){
    //   Swal.fire({
    //     title: '驗證失敗',
    //     text: '跳轉至登入畫面',
    //     icon: 'error',
    //     showConfirmButton: false,
    //     showCancelButton: false,
    //     timer: 2000,
    //   }).then(() => {
    //     router.push('/login')
    //   })
    // }
  }
})

</script>

<template>
  <div class="max-h-screen max-w-screen overflow-hidden">
    <div id="app">
      <el-config-provider :locale="zhTw">
        <router-view></router-view>
      </el-config-provider>>  
    </div>
  </div>
</template>

<style scoped>
</style>
