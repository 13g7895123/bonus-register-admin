<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span class="font-semibold text-left">簡訊儲值</span>
            </div>
        </template>
        <div class="flex justify-center items-center">
            <div class="w-24 h-24 circle border border-slate-700 rounded-full">
                <label>20</label>   <!-- 目前剩餘次數 -->
                <label>/</label>
                <label>100</label>  <!-- 累積儲值次數 -->
            </div>
        </div>
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
    switch: '1',
})

onMounted(() => {
    id.value = router.currentRoute._value.params.id
    getData()
})

const getData = async() => {
    const ajaxFormData = ref({ id: id.value })
    apiParam.value = '?action=get_player_user'
    apiUrl.value = apiUrlPrefix + "player_user.php" + apiParam.value

    const { data: { success, data } } = await axios.post(apiUrl.value, ajaxFormData.value)

    if (success){
        formData.value = data;
    }
}

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        console.log(formData.value);        
        if (valid){
            const ajax_data = formData.value
            const { data: { success, msg } } = await axios.post(`/api/player_user.php?action=edit_player_user`, ajax_data)

            if (success){
                Swal.fire({
                    title: `系統資訊`,
                    text: '修改資料成功',
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

const handleCancel = () => {
    router.push({ path: '/systemUser' })
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

.el-card__body {
    padding-bottom: 15px;
}

</style>