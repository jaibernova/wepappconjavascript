<template>
  <div id="dashboard">
    <h1>This is an about page</h1>
    <TaskApp/>
  </div>
</template>


<script>
// @ is an alias to /src
import TaskApp from '@/components/TaskApp.vue'

export default {
  name: 'Task',
  components: {
    TaskApp
  }
}
</script>

<style scoped>
#dashboard h1 {
  text-align: center; 
  width: 100%;
  padding: 1%;
  height: 10vh;  
}

</style>

