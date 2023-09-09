<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span>玩家資料修改</span>
            </div>
        </template>
        <el-form
            :model="formData"
            ref="dialogRef"
            label-width="120px"
            style="margin: 10px; width: auto"
            >
            <el-form-item prop="account" label="帳號">
                <el-input v-model="formData.account" ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密碼">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手機">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item prop="birthday" label="生日">
                <el-input v-model="formData.birthday"></el-input>
            </el-form-item>
            <el-form-item prop="server" label="伺服器">
                <el-input v-model="formData.server_name" readonly="true"></el-input>
            </el-form-item>
            <el-form-item class="flex justify-center">
                <el-button @click="">取消</el-button>
                <el-button type="primary" @click="handleSubmit(dialogRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import Swal from 'sweetalert2'

const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/'

const dialogRef = ref()

const formData = ref({
    account: '',             // 聯絡人
    password: '',               // 密碼
    passwordCheck: '',          // 密碼確認
    phone: '',                  // 電話
    birthday: '',                   // 郵件
    server_name: '',
})

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        if (valid){
            const ajax_data = formData.value
            const { data: { success, msg } } = await axios.post(`/api/player_user.php?action=add_player_user`, ajax_data)

            if (success){
                Swal.fire({
                    title: `系統資訊`,
                    text: '新增資料成功',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                }).then(() => {
                    getData()
                })
            }
        }
    })
}

</script>

<style>
.el-form-item__content{
    display: flex;
    justify-content: center;
    margin-left: 0 !important;
}
</style>