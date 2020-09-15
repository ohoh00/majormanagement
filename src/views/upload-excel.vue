<template>
  <div>
    <UploadExcelComponent :onSuccess="handleSuccess" :beforeUpload="beforeUpload" />
    <!--การส่งpropผ่านไปยังcomponentอื่นอีกแบบ <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" /> -->
    <b-table striped hover style="width: 100%;margin-top:20px;" :items="tableData" :fields="tableHeader"></b-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data () {
    return {
      tableData: [],
      tableHeader: [],
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
      /*results.forEach(l => {
        console.log(l.ลำดับ1)
      });*/
      //console.log(`results = ${JSON.stringify(results.NAME)}`)
    }
  }
}
</script>
