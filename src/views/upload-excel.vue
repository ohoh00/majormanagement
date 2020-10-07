<template>
  <div>
    <UploadExcelComponent :onSuccess="handleSuccess" :beforeUpload="beforeUpload" />
    <br/>
    <b-table striped hover head-variant = 'dark' :items="tableData" :fields="tableHeader" sticky-header="600px"></b-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data () {
    return {
      tableData: [],
      tableHeader: [],
      show: false
    }
  },
  methods: {
    beforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1mb in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess ({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
