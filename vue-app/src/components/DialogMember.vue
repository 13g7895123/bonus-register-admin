<template>
    <el-dialog 
        :before-close="handleClose"
        v-model="props.show"
        :title="props.operation ? '新增會員資料' : '編輯會員資料'">
        <el-form
            :model="dialogData"
            ref="dialogRef"
            label-width="120px"
            style="margin: 10px; width: auto"
            >
            <el-form-item prop="account" label="帳號">
                <el-input v-model="dialogData.account" :readonly="!props.operation"></el-input>
            </el-form-item>
            <el-form-item prop="user_name" label="聯絡人">
                <el-input v-model="dialogData.user_name"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密碼">
                <el-input v-model="dialogData.password" type="password" :placeholder="!props.operation ? '不修改則留空' : ''"></el-input>
            </el-form-item>
            <el-form-item prop="passwordCheck" label="密碼確認">
                <el-input v-model="dialogData.passwordCheck" type="password" :placeholder="!props.operation ? '不修改則留空' : ''"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手機">
                <el-input v-model="dialogData.phone"></el-input>
            </el-form-item>
            <el-form-item prop="mail" label="郵件">
                <el-input v-model="dialogData.mail"></el-input>
            </el-form-item>
            <!-- 地址先不開放變更 -->
            <el-form-item prop="medical_institution_name" label="藥局名稱">
                <el-input v-model="dialogData.medical_institution_name"></el-input>
            </el-form-item>
            <el-form-item prop="medical_institution_code" label="醫療機構代號">
                <el-input v-model="dialogData.medical_institution_code"></el-input>
            </el-form-item>
            <el-form-item prop="medical_institution_cate" label="醫療機構種類">
                <el-select v-model="dialogData.medical_institution_cate" placeholder="醫療機構種類">
                    <el-option
                        v-for="(formType, index) in miCate"
                        :key="index"
                        :label="formType"
                        :value="formType"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="text-right">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSubmit(dialogRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const dialogRef = ref()
const miCate = ref(['自開藥局', '受聘醫師(藥劑生)'])
const apiUrl = ref()

const dialogData = ref({
    account: '',
    user_name: '',              // 聯絡人
    password: '',               // 密碼
    passwordCheck: '',          // 密碼確認
    phone: '',                  // 電話
    mail: '',                   // 郵件
    address1: '',
    address2: '',
    address3: '',
    medical_institution_code: '',
    medical_institution_code: '',
    medical_institution_cate: ''
})

watch(
    () => props.editData,
    () => {
        dialogData.value = props.editData;
    }
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
                dialogData.value
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