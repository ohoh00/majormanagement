<template>
    <div>
        <button @click="Countdocuments()">คลิก</button>
        <button @click="readtest()">คลิก2</button>
        {{this.num}}
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from '@/firebaseConfig'
const db = firebase.firestore()
export default {
    data(){
        return{
            datas: [],
            doc_count: null,
            num: null
            //Gpax: []
        }
    },
    methods : {
        Countdocuments() {
            db.collection('Students').doc('Years').collection('2563').get().then((snapshot) =>
            {
                this.doc_count = snapshot.docs.length
                console.log(this.doc_count)
                console.log(`ยาว = ${snapshot.docs.length}`)
                this.Readdata(this.doc_count)
            },
            )
            },
        Readdata(count) {
            var i,j
            var k = 0
            console.log('มาแล้ว')
            console.log(count)
            for(i = 0; i < count; i++) {
                db.collection('Students').doc('Years').collection('2563').doc(`Set${i}`).get()
                .then((docs) => {
                for(j = 0; j < docs.data().Datas.length; j++){
                    //console.log(`results = ${JSON.stringify(docs.data().Datas[j].GPAX)}`)
                    this.datas[k++] = docs.data().Datas[j]
                    this.num = this.num + docs.data().Datas[j].GPAX
                    //console.log(j)
                }
                console.log(`results = ${JSON.stringify(this.datas)}`)
                console.log(`results = ${JSON.stringify(this.datas.length)}`)
                console.log(`results = ${JSON.stringify(this.num)}`)
                //console.log(`results = ${JSON.stringify(docs.data().Datas[1])}`)
                //console.log(`resultssss = ${this.datas}`)
                //console.log(`results1 = ${docs.data()}`)
                });
                }
                console.log('gliH0c]h;')
            },
        datasread() {
            //console.log(`results = ${JSON.stringify(this.datas.GPAX)}`)
            //console.log(`results = ${JSON.stringify()}`)
            //console.log(this.datas.length)
            //var i
            /*for(i = 0; i< 200; i++){
                console.log(this.datas[i])
            }*/
        },
        readtest() {
             db.collection('Students').doc('Years').get()
                .then(function(docs) {
                    console.log(`results = ${JSON.stringify(docs.id)}`)
                    //console.log(`results = ${JSON.stringify(docs.data().Datas.length)}`)
                })
            }
        },
    }
</script>

<style scoped>

</style>