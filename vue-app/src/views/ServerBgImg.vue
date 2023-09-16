<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span class="font-semibold text-left">背景圖片設定</span>
            </div>
        </template>
        <el-upload
        ref="uploadRef"
        class="upload-demo"
        :action="imgUploadUrl"
        :multiple="false"
        :show-file-list="false"
        :file-list="fileList"
        accept=".png,.jpg,.jpeg"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="handleBeforeUpload"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        >
            <el-button type="primary">上傳</el-button>
        </el-upload>
    </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()
const id = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = ref('/api/')
const dialogRef = ref()

// Api config
const phpAction = 'server';

const formData = ref({
    name: '',
    code_name: '',
    max_num: '',
    db_name: '',
    db_ip: '',
    db_port: '',
    db_username: '',
    db_password: '',
    switch: 1
})

let imgUploadUrl = ref()

onMounted(() => {
    id.value = router.currentRoute._value.params.id
    getData()
    
    // 這邊的檔案上傳不可用vite proxy，會失敗
    imgUploadUrl.value = `http://missa.mercylife.cc/img_upload/upload.php?action=server&sid=${id.value}`
})

const getData = async() => {
    const ajaxFormData = ref({ id: id.value })
    apiParam.value = `?action=get_${phpAction}`
    apiUrl.value = apiUrlPrefix.value + `${phpAction}.php` + apiParam.value

    const { data: { success, data } } = await axios.post(apiUrl.value, ajaxFormData.value)

    if (success){
        formData.value = data;
    }
}

const handleSuccess = (response, file, fileList, rowInfo) => {
    const { data: { success, msg } } = response
    console.log(response);
    console.log(response.success);
}

const handleCancel = () => {
    router.push({ path: '/server' })
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