<template>
   <el-form ref="form" label-width="80px" label-position="left" >
        <el-form-item label="活動區域" prop="area">
            <el-input  placeholder="請輸入活動區域"></el-input>
        </el-form-item>
        <el-form-item prop="name">
            <div slot="label">
                <span>活動名稱</span>
                <el-input placeholder="請輸入活動名稱"></el-input>
            </div>
        </el-form-item>
        <el-button @click="">送出</el-button>
    </el-form>
</template>