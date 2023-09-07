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
                <el-input v-model="formData.account" :readonly="!props.operation"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密碼">
                <el-input v-model="formData.password" type="password" :placeholder="!props.operation ? '不修改則留空' : ''"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手機">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item prop="birthday" label="生日">
                <el-input v-model="formData.birthday"></el-input>
            </el-form-item>
            <el-form-item prop="server" label="伺服器">
                <el-input v-model="formData.server"></el-input>
            </el-form-item>
            <el-form-item class="flex justify-center">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSubmit(dialogRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const dialogRef = ref()
// const miCate = ref(['自開藥局', '受聘醫師(藥劑生)'])
const apiUrl = ref()

const formData = ref({
    account: '',             // 聯絡人
    password: '',               // 密碼
    passwordCheck: '',          // 密碼確認
    phone: '',                  // 電話
    birthday: '',                   // 郵件
    server: '',
})

watch(
    () => props.editData,
    () => { formData.value = props.editData; }
);

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        if (valid){
            const apiUrlOperation = props.operation == true ? 'add': 'edit'
            const apiUrlOperationText = apiUrlOperation == 'add' ? '新增' : '編輯'
            apiUrl.value = `http://139.162.15.125:9090/api/health-insurance/admin-member-${apiUrlOperation}.php`
            const { data: { success, msg } } = await axios.post(
                apiUrl.value,
                formData.value
            )

            if (success){
                handleClose()
                Swal.fire({
                    title: `${apiUrlOperationText}會員成功`,
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                }).then(() => {
                    emits('handleUpdateProfiles')
                })
            }else{
                handleClose()
                Swal.fire({
                    title: `${apiUrlOperationText}會員失敗`,
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

const handleClose = () => {
    emits("closeModel");
}

// 接收父層資料
const props = defineProps({
    show: Boolean,
    editData: Object,
    operation: Boolean
})

// 回傳至父層，要觸發的方法
const emits = defineEmits(["closeModel", "handleUpdateProfiles"]);
</script>