<template>
  <div>
    <b-button @click="onExport()" variant="danger">ดาวน์โหลด</b-button>
  </div>
</template>
<script>
import XLSX from 'xlsx'

export default {
  props: { json: Array },
  methods: {
    // เมื่อกดปุ่มจะทำการสร้างไฟล์ xcel ด้วย xlsx
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.json)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb,'export.xlsx')
    },
  }
}
</script>