<template>
    <div>
     <b-row>
        <b-col cols="12">
          <b-card>
               <b-card header="Práctica">           
                 <b-row>
                    <b-col sm="6" md="4">
                      <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Search"
                      style="font-size: 1em"
                      autocomplete="off"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        :disabled="!filter"
                        @click="filter = ''"
                        variant="danger"
                        style="color: white; font-size: 1em"
                        >Clear</b-button
                      >
                    </b-input-group-append>
                       </b-input-group>
                    </b-col>
                    <b-col cols="" sm="6" md="2">
                        <b-btn
                         variant="primary"
                          block
                          @click.prevent="addUser()"
                          >Add User
                          </b-btn>
                          
                    </b-col>
                      <b-col cols="" sm="6" md="2">
                           <b-btn
                            variant="danger"
                            block
                            @click.prevent="getUsers()"
                            >Reset Users
                           </b-btn>
                 
                    </b-col>
                       <b-col cols="" sm="6" md="2">
                           <b-btn
                            variant="secondary"
                            block
                            @click.prevent="Download()"
                            >Download
                           </b-btn>
                 
                    </b-col>
                    <b-col sm="6" md="2" >
                            <b-form-group
                            label="rows:"                                               
                            >
                                <b-form-select
                                v-model="config.total_show_rows"
                                id="perPageSelect"
                                size="lg"
                                :options="config.pageOptions"
                                ></b-form-select>
                            </b-form-group>                  
                    </b-col>
               </b-row>
               </b-card>
            <b-card-body>
              <b-table
                show-empty                
                :items="Users"
                :fields="config.columns"
                :current-page="config.currentPage"
                :per-page="config.total_show_rows"
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
                striped
                hover
                bordered
                responsive                
              >
                          
               <template v-slot:cell(Actions)="row">
                       <b-container fluid>
                        <b-row class="justify-content-md-center">
                        <b-button
                            size="md"
                            block
                            @click.prevent="infoUser(row.item)"
                            variant="outline-primary"
                            class="mr-1 mb-1 mt-2"
                            >
                            <b-icon icon="pencil"></b-icon> 
                        </b-button>                                         
                        <b-button
                        size="md"
                        variant="outline-danger"
                        block
                        @click="deleteUser(row.item)"
                         class="mr-1 mb-1  mt-2"
                      >
                        <b-icon icon="trash-fill"></b-icon> 
                      </b-button>
                    </b-row>
                                </b-container>

                </template>               
                <template v-slot:cell(address)="row">
                <b-button size="sm" @click="row.toggleDetails" variant="outline-primary">
                 {{ row.detailsShowing ? 'Hide' : 'Show' }} Address
                 </b-button>

                </template>
                <template v-slot:cell(company)="row">                        
                    {{row.item.company.name}}
                </template>
                <template  v-slot:row-details="row">
                    <b-card>
                    <ul>
                        <li v-for="(value, key) in row.item.address" :key="key">{{ key }}: {{ value }}</li>
                    </ul>
                    </b-card>
                </template>
                <template v-slot:head()="data">
                  <span class="text-primary">{{ data.label.toUpperCase() }}</span>
                </template>
              </b-table>
              <b-row>
                <b-col sm="7" md="12" class="my-1">
                  <b-pagination
                    v-model="config.currentPage"
                    :total-rows="Users.length"
                    :per-page="config.total_show_rows"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
     
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    <modalUser @load="loadUsers" ></modalUser>
<!--<span v-for="u in Users" :key="u.id"  v-if="false">{{u}} </span> <br> -->
    </div>
</template>
<script>
import data from "@/assets/repositories/users.js"
import alert from "@/assets/repositories/alert.js"
import Swal from "sweetalert2";
import modalUser from "@/components/modalUser.vue"

const users=data();
const alerts=alert();
export default {
  name: 'CrudPrueba',
  components:{
    modalUser,
  },
  data(){
    return{
        Users:[],
        sortBy: "",
        sortDesc: false,
        sortDirection: "asc",
        filter: null,
        filterOn: [],
        isBusy:true,
        config:{
            total_show_rows:10,
            pageOptions: [5, 10, 15, 25, 50],
            columns:['id','name','username','email','address','phone','website','company','Actions'],
            currentPage:1,
            }
         }
 },
  props: {
    
  },
  mounted() {
    this.getUsers();
  },
  methods:{
    Download(){
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.Users)));
      element.setAttribute('download', "Users.txt");
      element.style.display = 'none';
      document.body.appendChild(element);    
      element.click();    
      document.body.removeChild(element);
    },
    infoUser(item){
   let info=JSON.parse(JSON.stringify(item));
  this.$store.commit('userNow',info);
      this.$bvModal.show("modal-user");
    },
    addUser(){
      this.$store.commit('userNow',null);
      this.$bvModal.show("modal-user");

    },
    async getUsers(){
     try{
        await users.getUsers().then((res)=>{  
            res.status==200?this.saveData(res.data):this.showError(res); 
        });
        }catch(error){
            console.log(error)
            }
    },
    loadUsers(){
        this.Users=this.$store.getters.getUsers;
    },
    saveData(usersApi){        
        this.$store.commit('setUsers',usersApi.reverse());
        this.loadUsers();
    },
    showError(data){
       alerts.errorApi(data.message);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.config.total_show_rows = filteredItems.length;
      this.currentPage = 1;
    },
    async deleteUser(item){   
    await  Swal.fire({
        title: "¿Delete?",
        text: "¿Do you want to remove the user '" + item.name + "'?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
        this.$store.commit('deleteUser',item.id);
        this.loadUsers();
        }else{
        return false;
        }
      });
    }
    
  },

}
</script>