<template>
<b-container>
  <div>
    <br/>
        <form @submit.prevent="Login">
            <h3>เข้าสู่ระบบ</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email">
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password">
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Login</button>
        </form>
    </div>
</b-container>
</template>

<script>
import firebase from "@/firebaseConfig";
//const db = firebase.firestore()
export default {
  data() {
    return {
      email: "",
      password: "",
      user:{}, 
    };
  },
  methods: {
    Login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  }
};
</script>
