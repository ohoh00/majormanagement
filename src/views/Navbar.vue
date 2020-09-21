<template>
 <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">SUT</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/">Dashboard</b-nav-item>
        <b-nav-item href="/uploadexcel">Upload Excel</b-nav-item>
        <b-nav-item href="/">จัดสาขา</b-nav-item>
        <b-nav-item href="/setting">ตั้งค่า</b-nav-item>
        <b-nav-item href="/test">Test</b-nav-item>
      </b-navbar-nav>

       <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>Admin</b-nav-item>
        <b-avatar src="https://placekitten.com/300/300"></b-avatar>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
  </div>
  
</template>

<script>
export default {
    
}
</script>
