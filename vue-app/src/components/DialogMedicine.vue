<template>
    <el-dialog 
        :before-close="handleClose"
        v-model="props.show"
        :title="props.operation ? '新增藥品資料' : '編輯藥品資料'">
        <el-form
            :model="dialogData"
            ref="dialogRef"
            label-width="120px"
            style="margin: 10px; width: auto"
            >
            <el-form-item prop="medicine_code" label="藥品編號">
                <el-input v-model="dialogData.medicine_code" :readonly="!props.operation"></el-input>
            </el-form-item>
            <el-form-item prop="eng_name" label="英文名">
                <el-input v-model="dialogData.eng_name"></el-input>
            </el-form-item>
            <el-form-item prop="medicine_name" label="中文名">
                <el-input v-model="dialogData.medicine_name"></el-input>
            </el-form-item>
            <el-form-item prop="ingredient" label="成分">
                <el-input v-model="dialogData.ingredient"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="ingredient_num" label="數量">
                <el-input v-model="dialogData.ingredient_num"></el-input>
            </el-form-item> -->
            <el-form-item prop="specification_quantity" label="特殊用量">
                <el-input v-model="dialogData.specification_quantity"></el-input>
            </el-form-item>
            <el-form-item prop="single_compound" label="單複方">
                <el-input v-model="dialogData.single_compound"></el-input>
            </el-form-item>
            <el-form-item prop="price" label="價格">
                <el-input v-model="dialogData.price"></el-input>
            </el-form-item>
            <el-form-item prop="start_and_end" label="起訖日">
                <el-input v-model="dialogData.start_and_end"></el-input>
            </el-form-item>
            <el-form-item prop="medicine_manufacturer" label="製造公司">
                <el-input v-model="dialogData.medicine_manufacturer"></el-input>
            </el-form-item>
            <el-form-item prop="dosage" label="劑量類型">
                <el-input v-model="dialogData.dosage"></el-input>
            </el-form-item>
            <el-form-item prop="classification" label="類別">
                <el-input v-model="dialogData.classification"></el-input>
            </el-form-item>
            <el-form-item prop="classification_group" label="類別群組">
                <el-input v-model="dialogData.classification_group"></el-input>
            </el-form-item>
            <el-form-item prop="ATC_code" label="ATC編號">
                <el-input v-model="dialogData.ATC_code"></el-input>
            </el-form-item>
            <el-form-item prop="remark" label="備註">
                <el-input v-model="dialogData.remark"></el-input>
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
const apiUrl = ref()

const dialogData = ref({    
    medicine_code : '',
    eng_name : '',
    medicine_name : '',
    ingredient : '',
    // ingredient_num : '',
    specification_quantity : '',
    single_compound : '',
    price : '',
    start_and_end : '',
    medicine_manufacturer : '',
    dosage : '',
    classification : '',
    classification_group : '',
    ATC_code : '',
    remark : '',
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
            apiUrl.value = `http://139.162.15.125:9090/api/health-insurance/admin-medicine-${apiUrlOperation}.php`
            const { data: { success, msg } } = await axios.post(
                apiUrl.value,
                dialogData.value
            )

            if (success){
                handleClose()
                Swal.fire({
                    title: `${apiUrlOperationText}藥品成功`,
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
                    title: `${apiUrlOperationText}藥品失敗`,
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