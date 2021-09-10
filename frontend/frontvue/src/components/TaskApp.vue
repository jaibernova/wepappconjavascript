<template>
    <div id=tareas>
        <div class="container">
            <div class="row pt-10">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                    <input type="text"  v-model="task.title"
                                    placeholder="insert a task"
                                    class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v v-model="task.description" cols="30" rows="10"
                                    class="form-control"
                                    placeholder="Insert A Description"> </textarea> 
                                </div>
                                <button class="btn btn-primary
                                btn-block">Send</button>
                            </form>
                        </div>
                    </div>

                </div>
                
            </div>

        </div>
        
    </div>
</template>

<script>

class Task{
    constructor(title, description){
        this.title = title;
        this.description = description;
    }
}
export default {
    name: 'TaskApp',
    data() {
        return{
            task = new Task()
        }
    },
    created() {
        this.getTasks
    },
    methods: {
        
        addTask() {
            fetch('/tasks',{
                method: 'POST',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            this.task = new Task;
        },
        getTasks() {
            fetch('/tasks')
            .then(res => res.json())
            .then(data => {
                this.tasks =data;
                console.log(this.tasks)
            });
        }

    }
}
</script>


<style scoped>
   #tareas{
    text-align: center;
  color: #2c3e50;
   width: 100%;
  height: 45vh;
}
 
</style>