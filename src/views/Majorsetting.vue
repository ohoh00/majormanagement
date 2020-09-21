<template>
<b-container>
    <div>
        <Managebutton :datamajor="Datacodemajor"/>
        <br>
        <Datatable :datamajor="Datacodemajor" :datas="datas"/>
    </div>
</b-container>
</template>
<script>
import Datatable from '@/components/Setting/Datatable.vue'
import Managebutton from '@/components/Setting/Managebutton.vue'
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    components:{Datatable, Managebutton},
    data() {
        return{
            datas: []
        }
    },
    methods: {
        Datacodemajor() {
            this.datas = []
            db.collection('Settingcode').orderBy('Code', "asc").get().then((snapshot) => {
                snapshot.forEach(docs => {
                    console.log(docs.data())
                    this.datas.push(docs.data())
                });
            })
        },
    },
    mounted() {
        this.Datacodemajor()
    }
}
</script>