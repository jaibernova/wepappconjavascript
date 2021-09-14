<template>
    <div id=tareas>
        <div class="container">
            <div class="row pt-5">
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
                                <template v-if="edit === false">
                                      <button class="btn btn-primary
                                      btn-block">Enviar</button>
                                </template>
                                <template v-else>
                                      <button class="btn btn-primary
                                      btn-block">Actualizar</button>
                                </template>

                            </form>
                        </div>
                    </div>

                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr v-for="task in tasks" v-bind:key="task.id">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">                                        
                                        Borrar
                                    </button>
                                    <button @click="actualizarTask(task._id)" class="btn btn-secondary">
                                        Actualizar
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>

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
            task : new Task(),
            tasks: [],
            edit: false,
            taskToEdit: ''
        }
    },
    created() {
        this.getTasks();
    },
    methods: {
        
        addTask() {
            if (this.edit === false) {
            fetch('http://localhost:5000/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTasks(data)
            })

                
            } else {
                fetch('http://localhost:5000/api/tasks/' + this.taskToEdit, {
                    method:'PUT',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept' : 'application/json',
                        'Content-type' : 'application/json'
                    }    
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks(data);
                    this.edit=false;
                });
                
            }

            this.task = new Task;
        },
        getTasks() {
            fetch('http://localhost:5000/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.tasks =data;
                console.log(this.tasks)
            });
        },
        deleteTask(id){
            fetch('http://localhost:5000/api/tasks/' + id,{
                method: 'DELETE',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTasks(data);
            });

        },
        actualizarTask(id){
            fetch('http://localhost:5000/api/tasks/' + id)
            .then(res => res.json())
            .then(data => {
                this.task =new Task(data.title, data.description);
                this.taskToEdit=data._id;
                this.edit =true;

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
  height: 10%;
}
 
</style>