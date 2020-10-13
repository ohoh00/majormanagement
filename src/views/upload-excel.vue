<template>
  <div>
    <UploadExcelComponent
      :onSuccess="handleSuccess"
      :beforeUpload="beforeUpload"
    />
    <br />
    <div>
    <b-pagination
      v-if="Setstatus()"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <b-table
      id="my-table"
      striped
      hover
      head-variant="dark"
      :items="tableData"
      :fields="tableHeader"
      sticky-header="600px"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      perPage: 100,
      currentPage: 1,
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    Setstatus() {
      if (this.tableData == "") return false;
      else return true;
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1mb in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
  },
  computed: {
      rows() {
        return this.tableData.length
      }
  }
};
</script>
