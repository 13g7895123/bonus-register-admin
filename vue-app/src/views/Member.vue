<template>
    <div class="h-full px-5 py-3">
        <div>
            <el-form :inline="true">
                <el-form-item class="float-right">
                    <el-button type="primary" size="small" @click="handleAdd"
                        >新增</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <el-table
        :data="tableData"
        max-height="75vh"
        style="width: 100%"
        border
        v-if="tableData.length > 0"
        >
        <el-table-column
                label="操作"
                align="center"
                width="120"
                prop="operation"
            >
                <template #default="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleEdit(scope.row)">
                        <el-icon><EditPen /></el-icon>
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">
                        <el-icon><Delete /></el-icon>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column type="index" label="編號" align="center" width="100"/>
            <el-table-column label="帳號" align="center" width="200" prop="account"/>
            <el-table-column label="聯絡人" align="center" width="200" prop="user_name"/>
            <el-table-column label="電話" align="center" width="200" prop="phone"/>
            <el-table-column label="信箱" align="center" width="200" prop="mail"/>
            <el-table-column label="地址" align="center" width="200" prop="address_country"/>
            <el-table-column label="機構代號" align="center" width="200" prop="medical_institution_code"/>
            <el-table-column label="藥局名稱" align="center" width="200" prop="medical_institution_name"/>
            <el-table-column label="種類" align="center" width="200" prop="medical_institution_cate"/>
        </el-table>
        <!-- 分页 -->
        <el-row>
            <el-col :span="24">
                <div class="float-right mt-3">
                    <el-pagination
                        v-model:currentPage="page_index"
                        v-model:page-size="page_size"
                        :page-sizes="page_sizes"
                        small="small"
                        :layout="layout"
                        :total="page_total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </el-col>
        </el-row>
    </div>
    <DialogMember 
        :show="show"
        :editData="editData"
        :operation = 'operation'
        @closeModel="closeModel"
        @handleUpdateProfiles="handelUpdateMember"
        />
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios';
import { EditPen, Delete } from "@element-plus/icons-vue";
import Swal from 'sweetalert2'

const tableData = ref([])
const allTableData = ref([])
const show = ref(false)
const editData = ref()
const operation = ref()   // 0為編輯，1為新增
// 分頁
const page_index = ref(1),
      page_size = ref(5),
      page_total = ref(0),
      page_sizes = [5, 10, 15, 20],
      layout = "total, sizes, prev, pager, next, jumper"

const getMember = async() => {
    const { data: { success, data } } = await axios.post('http://139.162.15.125:9090/api/health-insurance/admin-member.php')

    if (success){
        tableData.value = data
        allTableData.value = data
        setPaginations()
    }else{
        history.go(0)
    }
}

watchEffect(() => getMember())

const handleAdd = () => {
    show.value = true
    operation.value = true
}

const handleEdit = (row) => {
    show.value = true
    editData.value = row
    operation.value = false
}

const handleDelete = async(row) => {
    const { account } = row
    const ajax_data = {
        account: account
    }

    const { data: { success, msg } } = await axios.post(
        `http://139.162.15.125:9090/api/health-insurance/admin-member-delete.php`,
        ajax_data
    )

    if (success){
        Swal.fire({
            title: `刪除會員成功`,
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
        }).then(() => {
            handelUpdateMember()
        })
    }
}

const handelUpdateMember = () => {
    getMember()
}

const handleSizeChange = (pages) => {
    page_index.value = 1;
    page_size.value = pages;

    // 重构数据
    tableData.value = allTableData.value.filter((item, index) => {
        return index < page_size.value;
    });
};

const handleCurrentChange = (page) => {
    let currentPage = page_size.value * (page - 1);
    let pageData = allTableData.value.filter((item, index) => {
        return index >= currentPage;
    });
    tableData.value = pageData.filter((item, index) => {
        return index < page_size.value;
    });
};

const setPaginations = () => {
    page_total.value = allTableData.value.length;
    page_index.value = 1;
    page_size.value = 5;
    // 具体显示几页 6 5 2页 第一页5 第二页1
    tableData.value = allTableData.value.filter((item, index) => {
        return index < page_size.value;
    });
};

const closeModel = () => {
    show.value = false
    editData.value = {}
}

</script>