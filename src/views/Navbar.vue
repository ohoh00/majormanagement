<template>
 <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">SUT</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/dashboard">Dashboard</b-nav-item>
        <b-nav-item href="/uploadexcel">Upload Excel</b-nav-item>
        <b-nav-item href="/management">จัดสาขาวิชา</b-nav-item>
        <b-nav-item href="/students">ข้อมูลนักศึกษา</b-nav-item>
        <b-nav-item href="/majors">ข้อมูลสาขาวิชา</b-nav-item>
        <b-nav-item href="/setting">ตั้งค่า</b-nav-item>
      </b-navbar-nav>

       <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button variant="info" size="sm">
        <div class="row">
        <b-container>
        <div class="ml-2"> {{user.Name}}</div>
        <b-nav-item-dropdown right>
          <b-dropdown-item href="/adduser" v-if="user.Name == 'Admin'">เพิ่มบัญชีผู้ใช้</b-dropdown-item>
          <b-dropdown-item @click="signout()">ออกจากระบบ</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-container>
        </div>
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
  </div>
  
</template>

<script>
import firebase from "@/firebaseConfig";
const db = firebase.firestore();
export default {
  data() {
    return{
      user:{}
    }
  },
  methods:{
    signout() {
       firebase.auth().signOut()
       .then(() => {
         this.$router.push("/");
       });
    },
    emailuser() {
      firebase.auth().onAuthStateChanged(user => {
        if (user){
          //console.log('user = ' + user.email)
          this.datauser(user.email)
        }
      })
    },
    datauser(email) {
       db.collection('User').where('Email','==', email).get()
       .then((snapshot) => {
        snapshot.forEach(doc => {
          this.user = doc.data()
          //console.log(this.user.Name)
        });
      })
    },
  },
  created() {
    this.emailuser()
  },
}
</script>
