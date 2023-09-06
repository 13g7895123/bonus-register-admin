<template>
  <nav class="w-full min-w-[600px] p-[0.4rem] bg-[#555] text-white border-b-2">
    <el-row>
      <el-col :span="12" class="flex justify-start items-center pl-3">
      <!-- <el-col :span="12" class="logo-container"> -->
        <!-- <img src="../assets/logo.png" class="logo" alt="logo" /> -->
        <el-icon :size="20"><Setting /></el-icon>
        <span class="title">後台管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userinfo">
          <img src="../assets/user.png" class="avatar" alt="" />
          <div class="welcome-content">
            <p class="content welcome">Welcome</p>
            <p class="content username">{{ loginAuth.userName }}</p>
          </div>
          <span class="dropdown">
            <!-- <el-dropdown> -->
            <el-dropdown trigegr="click" @command="handleDropdown">
              <span class="el-dropdown-link">
                  <el-icon>   
                    <arrow-down />
                  </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <!-- <el-dropdown-item command="info">個人信息</el-dropdown-item> -->
                  <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </nav>
</template>
  
<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useAuthStore } from "../stores/loginAuth";
import { useRouter } from "vue-router";

const loginAuth = useAuthStore()
const router = useRouter()

const handleDropdown = (item) => {
  switch (item) {
    case 'info':
      showUserInfo();
      break;
    case 'logout':
      logout();
      break;
  }
};

const showUserInfo = () => {
  console.log('跳轉至個人訊息');
}

const logout = () => {

  // 清空 local storage
  localStorage.removeItem('userId')
  localStorage.removeItem('userAccount')

  // 變更 login auth 狀態
  loginAuth.setAuth(false)
  loginAuth.setUser('')

  // 跳轉頁面
  router.push('/login')
}
</script>
  
  <style scoped>
  
  .logo-container {
    line-height: 60px;
    min-width: 400px;
  }
  .logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
  }
  
  .user {
    line-height: 60px;
    text-align: right;
    padding-right: 10px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome-content {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
  }
  .content {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .welcome {
    font-size: 12px;
  }
  .username {
    color: #409eff;
    font-weight: bolder;
  }
  .dropdown {
    cursor: pointer;
    margin-right: 5px;
  }
  .el-dropdown {
    color: #fff;
  }
  
  .dropdown i {
    margin-top: 20px;
  }
  </style>