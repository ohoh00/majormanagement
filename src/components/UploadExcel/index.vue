<template>
    <div>
        <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, xls" @change="handleClick">
        <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
            Drop excel file here or
        <button type="button" class='btn btn-primary' style="margin-left:16px;" size="mini" @click="handleUpload">Browse</button>
        </div>
        <br>
        <UploadDatabutton :excelDatas="excelData.results" :excelKey="excelData.header"/>
    </div>
</template>

<script>
import XLSX from 'xlsx'
import UploadDatabutton from '@/components/UploadExcel/UploadDatabutton.vue'
export default {
  components: { UploadDatabutton },
  props: {
    beforeUpload: Function,
    onSuccess: Function,
  },
  data () {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      },
    }
  },
  methods: {
    generateData ({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess(this.excelData)
    },
    handleUpload () {
      // เรียก input refชื่อexcel-upload-input แล้วทำการคลิก
      this.$refs['excel-upload-input'].click()
    },
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload (rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    handleDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        // เช็คในกรณีใส่ไฟล์มาพร้อมกันมากกว่า 1 ไฟล์
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        // เช็คกรณีที่ไม่ใช่ไฟล์ excel
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    isExcel (file) {
      // ฟังค์ชั่นเช็คไฟล์ว่าใช่excelไหม
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    readerData (rawFile) {
      this.loading = true
      //เอา reject ใน Promise ออกเพราะไม่ได้ใช้
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          //console.log(`firstSheetName = ${firstSheetName}`)
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          //console.log(`header = ${header[0]}`)
          const results = XLSX.utils.sheet_to_json(worksheet)
          //console.log(`results = ${JSON.stringify(results[0])}`)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
