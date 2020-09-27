<template>
<b-container>
    <div>
        <Addmajorbutton :datamajor="Datacodemajor" :datas="datas"/>
        <br>
        <Datatable :datamajor="Datacodemajor" :datas="datas" :docid="id"/>
    </div>
</b-container>
</template>
<script>
import Datatable from '@/components/Setting/Datatable.vue'
import Addmajorbutton from '@/components/Setting/Addmajorbutton.vue'
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    components:{Datatable, Addmajorbutton},
    data() {
        return{
            datas: [],
            id:[]
        }
    },
    methods: {
        Datacodemajor() {
            this.datas = []
            this.id = []
            db.collection('Settingcode').orderBy('Code', "asc").get().then((snapshot) => {
                snapshot.forEach(docs => {
                    console.log(docs.data())
                    this.datas.push(docs.data())
                    this.id.push(docs.id)
                });
            })
        },
    },
    mounted() {
        this.Datacodemajor()
    }
}
</script>