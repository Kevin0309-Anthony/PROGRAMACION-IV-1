Vue.component('v-select-alumno',VueSelect.VueSelect);
Vue.component('materia',{
    data:()=>{
        return {
            buscar:'',
            materias:[],
            materia:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                alumno:{
                    id: '',
                    label:'',

                },
                idMateria : '',
                alumn: '',
                materia1: '',
                materia2:'',
                materia3:'',
                materia4:'',
                materia5:'',
                
            }
        }
    },
    methods:{
        buscandomateria(){
            this.obtenermaterias(this.buscar);
        },
        eliminarmateria(materia){
            if( confirm(`Esta seguro de eliminar la materia ${materia.alumn}?`) ){
                this.materia.accion = 'eliminar';
                this.materia.idMateria = materia.idMateria;
                this.guardarmateria();
            }
            this.nuevomateria();
        },
        modificarmateria(datos){
            this.materia = JSON.parse(JSON.stringify(datos));
            this.materia.accion = 'modificar';
        },
        guardarmateria(){
            this.obtenermaterias();
            let materias = JSON.parse(localStorage.getItem('materias')) || [];
            if(this.materia.accion=="nuevo"){
                this.materia.idMateria = generarIdUnicoFecha();
                materias.push(this.materia);
            } else if(this.materia.accion=="modificar"){
                let index = materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                materias[index] = this.materia;
            } else if( this.materia.accion=="eliminar" ){
                let index = materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                materias.splice(index,1);
            }
            localStorage.setItem('materias', JSON.stringify(materias));
            this.nuevomateria();
            this.obtenermaterias();
            this.materia.msg = 'materia procesado con exito';
        },
        obtenermaterias(valor=''){
            this.materias = [];
            let materias = JSON.parse(localStorage.getItem('materias')) || [];
            this.materias = materias.filter(materia=>materia.alumn.toLowerCase().indexOf(valor.toLowerCase())>-1);
        
            this.alumnos =[];
            let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
            this.alumnos = alumnos.map(alumno =>{
                return{
                    id: alumno.idAlumno,
                    label: alumno.nombre,
                }
            });
        },
        nuevomateria(){
            this.materia.accion = 'nuevo';
            this.materia.msg = '';
            this.materia.idMateria = '';
            this.materia.alumno = '';
            this.materia.materia1 = '';
            this.materia.materia2 = '';
            this.materia.materia3 = '';
            this.materia.materia4 = '';
            this.materia.materia5 = '';
          
        }
    },
    created(){
        this.obtenermaterias();
    },
    template:`
        <div id="appSistema">
            <div class="card text-white" id="carmateria">
                <div class="card text-white bg-danger">
                    Registro de materias

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carmateria" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarmateria" @reset="nuevomateria">
                        <div class="row p-1">
                          <div class ="col col-md-2">
                             Alumno:

                           </div>
                          <div class ="col col-md-3">
                             <v-select-alumno v-model="materia.alumno"
                                  :options="alumnos" placeholder ="Seleccione un Alumno"/>
                         
                            </div>

                        </div>
                        <div class="row p-1">
                           <div class="col col-md-2">Materia 1:</div>
                          <div class="col col-md-3">
                               <input title="Ingrese el nombre de la materia" v-model="materia.materia1" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                         </div>
                        </div>

                        <div class="row p-1">
                             <div class="col col-md-2">Materia 2:</div>
                               <div class="col col-md-3">
                                <input title="Ingrese el nombre de la materia" v-model="materia.materia2" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                         </div>
                       </div>
                       <div class="row p-1">
                       <div class="col col-md-2">Materia 3:</div>
                         <div class="col col-md-3">
                          <input title="Ingrese el nombre de la materia" v-model="materia.materia3" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                   </div>
                 </div>
                 <div class="row p-1">
                 <div class="col col-md-2">Materia 4:</div>
                   <div class="col col-md-3">
                    <input title="Ingrese el nombre de la materia" v-model="materia.materia4" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
             </div>
           </div>
           <div class="row p-1">
           <div class="col col-md-2">Materia 5:</div>
             <div class="col col-md-3">
              <input title="Ingrese el nombre de la materia" v-model="materia.materia5" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
       </div>
     </div>
                    
                       
                     
                
               
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="materia.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ materia.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                   <button class="btn btn-success" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                               <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                               <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                             </svg> Guardar</button>
                                
                                  <button class="btn btn-primary" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>Nuevo</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarmateria">
                <div class="card text-white bg-danger ">
                    Busqueda de materias

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarmateria" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandomateria" v-model="buscar" placeholder="Buscar" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                            
                               
                                <th>MATERIA 1</th>
                                <th>MATERIA 2</th>
                                <th>MATERIA 3</th>
                                <th>MATERIA 4</th>
                                <th>MATERIA 5</th>
                             
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in materias" @click='modificarmateria( item )' :key="item.idMateria">
                                
                                <td>{{item.materia1}}</td>
                                <td>{{item.materia2}}</td> 
                                <td>{{item.materia3}}</td>   
                                <td>{{item.materia4}}</td>  
                                <td>{{item.materia5}}</td>  
                              
                                
                                <td>
                                    <button class="btn btn-danger" @click="eliminarmateria(item)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                  </svg> Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});