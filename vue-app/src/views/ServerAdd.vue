<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span class="font-semibold text-left">伺服器設定</span>
            </div>
        </template>
        <!-- <div class="flex justify-center"> -->
            <el-form
                :model="formData"
                ref="dialogRef"
                style="margin: 10px; width: auto;"
                >
                <el-form-item prop="name" label="伺服器名稱">
                    <el-input v-model="formData.name" class="text-center"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="伺服器代號">
                    <el-input v-model="formData.account" class="text-center"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="帳號數量">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="資料庫IP">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="資料庫PORT">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="資料庫名稱">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="資料庫帳號">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="資料庫密碼">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="switch" label="啟用狀態" class="radio_column">
                    <el-switch 
                        v-model="formData.switch" 
                        :active-value="1"
                        :inactive-value="0"
                    />
                </el-form-item>
                
                <el-form-item class="flex justify-center">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="handleSubmit(dialogRef)">提交</el-button>
                </el-form-item>
            </el-form>
        <!-- </div> -->
    </el-card>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()
const id = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/'
const dialogRef = ref()

const formData = ref({
    name: '',
    account: '',             // 聯絡人
    password: '',            // 密碼
    switch: 1
})

onMounted(() => {
    id.value = router.currentRoute._value.params.id
})

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {    
        if (valid){
            const ajax_data = formData.value
            const { data: { success, msg } } = await axios.post(`/api/system_admin.php?action=add_system_admin`, ajax_data)

            if (success){
                Swal.fire({
                    title: `系統提示`,
                    text: msg,
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                }).then(() => {
                    router.push({ path: '/systemAdmin' })
                })
            }else{
                Swal.fire({
                    title: `系統提示`,
                    text: msg,
                    icon: 'error',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                })
            }
        }
    })
}

const handleCancel = () => {
    router.push({ path: '/systemAdmin' })
}

</script>

<style>
.el-form-item__content{
    display: flex;
    justify-content: center;
    margin-left: 0 !important;
}

.radio_column .el-form-item__content{
    justify-content: flex-start;
}

.date_column .el-input,
.date_column .el-input__wrapper,
.date_column .el-form-item__content{
    width: 100%;
}
</style>