<template>
<b-container>
  <div>
    <h1 class="mb-4">ลงทะเบียน</h1>
    <b-form @submit.prevent = createuser>

       <div class="form-group">
            <label>ชื่อ-นามสกุล</label>
            <input type="text" class="form-control form-control-lg" v-model="name">
        </div>

       <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control form-control-lg" v-model="useremail">
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" :state="validation" class="form-control form-control-lg" v-model="password">
            <b-form-invalid-feedback :state="validation">
            รหัสผ่านต้องมีอักขระอย่างน้อย 6 ตัว
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
            </b-form-valid-feedback>
        </div>

        <div class="form-group">
            <label>ยืนยัน Password</label>
            <input type="password" :state="validationconfirm" class="form-control form-control-lg" v-model="confirmpassword">
            <b-form-invalid-feedback :state="validationconfirm">
            รหัสผ่านไม่ตรงกัน
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationconfirm">
            </b-form-valid-feedback>
        </div>

        <div class="form-group">
          <label for="exampleFormControlFile1">Example file input</label>
          <input type="file" accept="image/jpeg, image/png" class="form-control-file" id="exampleFormControlFile1" @change="createImage">
          <img :src="image" />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block mt-3">ลงทะเบียนบัญชี</button>

    </b-form>
  </div>
</b-container>
</template>
<script>
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
    data(){
        return{
          name:'',
          useremail:'',
          password:'',
          confirmpassword:'',
          image: '',
          file: null
      }
    },
    //computed ใช้เมื่อต้องการดักจับการเปลี่ยนแปลง
    computed: {
      validation() {
        return this.password.length >= 6
      },
      validationconfirm(){
        return this.password == this.confirmpassword
      }
    },
    methods: {
        createuser() {
          if(this.password == this.confirmpassword){
            firebase.auth().createUserWithEmailAndPassword(this.useremail, this.password)
            .then(() => {
              this.adduser()
              this.uploadimg(this.file[0])
              alert('ลงทะเบียนสำเร็จ')
            })
            .catch(function(error) {
            // Handle Errors here.
              alert(error.message)
            // ...
            });
          }
        },
        createImage(e) {
          this.file = e.target.files || e.dataTransfer.files
          //new FileReader() ใช้อ่านไบนารี่
          var reader = new FileReader()
          //.readAsDataURL อ่านไบนารี่
          reader.readAsDataURL(this.file[0])
          // .onload ใช้เพื่อให้รูปภาพโหลดให้เสร็จก่อน
          reader.onload = e => {
            this.image = e.target.result
          }
        },
        uploadimg(file) {
          const storageRef = firebase.storage().ref(this.useremail)
          storageRef.put(file)
        },
        adduser() {
          db.collection('User').add({
            Name: this.name,
            Email: this.useremail,
            Password: this.password
          })
          .then(() => {
            console.log("Document written with ID: ");
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          });
        }
    }
};
</script>
<style scoped>
img {
  width: 20%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
