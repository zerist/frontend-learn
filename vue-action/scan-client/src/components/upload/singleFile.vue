<template>
    <el-upload
        class="upload-single"
        action="http://localhost:9001/upload/single_file"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        name="file"
    >
        <el-button size="small" type="primary">upload</el-button>
        <template #tip>
            <div class="el-upload__tip">only .go file</div>
        </template>
    </el-upload>
</template>

<script>
export default {
    name: "SingleFile",
    data() {
        return {
            fileList: []
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        handleExceed(files, fileList) {
            this.$message.warning('1 file at most')
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`Sure to remove ${ file.name }`)
        }
    },
}
</script>