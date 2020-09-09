<template>
    <b-container>
    <div>
        <Cardbox />
        <p></p>
        <Chartsbox />
    </div>
    </b-container>
</template>

<script>
import Cardbox from '@/components/Dashboard/Cardbox.vue'
import Chartsbox from '@/components/Dashboard/Chartsbox.vue'
export default {
    components: { Cardbox, Chartsbox }
}
</script>

<style scoped>

</style>