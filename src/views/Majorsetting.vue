<template>
<b-container>
    <div>
        <div class="row">
            <div>
                <Addmajorbutton :datas="datas"/>
            </div>
        </div>
        <br>
        <Datatable :datas="datas" :docid="id"/>
    </div>
</b-container>
</template>
<script>
import Datatable from '@/components/Setting/Datatable.vue'
import Addmajorbutton from '@/components/Setting/Addmajorbutton.vue'
//import Editfilterbutton from '@/components/Setting/Editfilterbutton.vue'
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
            db.collection('Setting').doc('Major').collection('Data').orderBy('Code', "asc").onSnapshot(snapshot => {
                this.datas = []
                this.id = []
                snapshot.forEach(docs => {
                    this.datas.push(docs.data())
                    this.id.push(docs.id)
                });
            })
        },
    },
    created() {
        this.Datacodemajor()
    }
}
</script>