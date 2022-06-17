<template>
    <div>
          <b-modal id="modal-user" size="lg" hide-header @hide="reset" ref="modalUser1" @show="validateInfo" >
            <template #modal-footer="{cancel }">
      <b-row>
       <b-button size="lg" block :variant="update==0?'outline-success':'outline-primary'" @click="update==0?addUser():editUser()" v-if="validateAll()">
       {{titleModal}}
      </b-button>
       <b-button size="lg" block variant="outline-primary" @click="showAlert()"   v-else>
        Please complete all fields marked 
      </b-button>
          </b-row>
          <b-button size="sm" variant="danger" @click="cancel()">
        Cancel
      </b-button>
    </template>
            
                    <b-card
                    :header="titleModal"
                    header-tag="header"
                    header-class="h4 text-center"
                    header-bg-variant="dark"
                    header-text-variant="white"
                    body-border-variant="dark"
                  footer-bg-variant="danger"
                    footer-text-variant="white"
                    class="mb-0 p-0"
                  ></b-card>
       <b-card
      header-text-variant="white"
      header-class="h4 text-center"
      body-border-variant="dark"
     footer-bg-variant="danger"
      footer-text-variant="white"
      class="mt-0 p-0"
      
    >
 
            <b-row>
                  <b-col cols="12" xl="4"  class="text-center">
                    <label>
                      <span>Name</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-bounding-box"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        v-model="$v.user.name.$model"
                        placeholder="name"
                  :class="{'is-valid':validateNameRegex,'is-invalid':!validateNameRegex}"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                    <b-col cols="12" xl="4"  class="text-center">
                    <label>
                      <span>UserName</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="person-bounding-box"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        v-model="$v.user.username.$model"
                        placeholder="User Name"
                  :class="{'is-valid':!$v.user.username.$invalid,'is-invalid':$v.user.username.$invalid}"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                   <b-col cols="12" xl="4"  class="text-center">
                    <label>
                      <span>Email</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="envelope"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        v-model="$v.user.email.$model"
                        placeholder="Email"
                  :class="{'is-valid':!$v.user.email.$invalid,'is-invalid':$v.user.email.$invalid}"
                      ></b-form-input>
                    </b-input-group>
                  </b-col> 
                <b-col cols="12" xl="4"  class="text-center">
                   <label class="mt-3">
                      <span>Number Phone</span>
                    </label>
                                     <masked-input
                        type="text"
                        name="phone"
                        class="form-control"
                      :class="{'is-valid':validatePhone,'is-invalid':!validatePhone}"
                        v-model="user.phone"
                        mask="(11)-11-11-11-11"
                        :guide="true"
                        placeholderChar="#"
                      ></masked-input>
                        </b-col>
                     <b-col cols="12" xl="8"  class="text-center mt-3">
                    <label>
                      <span>WebSite</span>
                    </label>
                    <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="at"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        class="form-control"
                  :class="{'is-valid':!$v.user.website.$invalid,'is-invalid':$v.user.website.$invalid}"
                        :guide="true"
                        v-model="$v.user.website.$model"
                        placeholder="Web site"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>   
                    </b-row>
                 </b-card>
                    <b-card
                    header="Address"
                    header-tag="header"
                    header-class="h4 text-center"
                    header-bg-variant="dark"
                    header-text-variant="white"
                    body-border-variant="dark"
                  footer-bg-variant="danger"
                    footer-text-variant="white"
                    class="m-0 p-0"
                  >
                  <b-row class="mt-0"> <!--LUGAR DE LOS HECHOS ---->
                <b-col cols="12" xl="3" class="text-center">
                    <label>
                      <span>Zip Code</span>
                    </label>
                     <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="geo-alt-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        :class="{'is-valid':!$v.user.address.zipcode.$invalid,'is-invalid':$v.user.address.zipcode.$invalid}"
                        v-model="$v.user.address.zipcode.$model"
                        placeholder="Código Postal"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                 <b-col cols="12" xl="3" class="text-center">
                    <label>
                      <span>Street</span>
                    </label>
                     <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="geo-alt-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                  :class="{'is-valid':!$v.user.address.street.$invalid,'is-invalid':$v.user.address.street.$invalid}"
                        v-model="$v.user.address.street.$model"
                        placeholder="street"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                   <b-col cols="12" xl="3" class="text-center">
                    <label>
                      <span>Suite</span>
                    </label>
                     <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="geo-alt-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                       :class="{'is-valid':!$v.user.address.suite.$invalid,'is-invalid':$v.user.address.suite.$invalid}"
                        v-model="$v.user.address.suite.$model"
                        placeholder="Suite"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>                   
                   <b-col cols="12" xl="3" class="text-center">
                    <label>
                      <span>City</span>
                    </label>
                     <b-input-group size="md">
                      <b-input-group-prepend is-text>
                        <b-icon icon="geo-alt-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                  :class="{'is-valid':!$v.user.address.city.$invalid,'is-invalid':$v.user.address.city.$invalid}"
                        v-model="$v.user.address.city.$model"
                        placeholder="city"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>  
      </b-row>
                 </b-card>
                 
                    <b-card
                    header="Company"
                    header-tag="header"
                    header-class="h4 text-center"
                    header-bg-variant="dark"
                    header-text-variant="white"
                    body-border-variant="dark"
                  footer-bg-variant="danger"
                    footer-text-variant="white"
                    class="mt-0a p-0"
                  >
                           <b-row>
                             <b-col cols="12" xl="6" class="text-center">
                               <label>
                                 <span>Name</span>
                    </label>
                     <b-input-group size="md">
                       <b-input-group-prepend is-text>
                         <b-icon icon="geo-alt-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        v-model="user.company.name"
                        placeholder="Name"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                   <b-col cols="12" xl="6" class="text-center">
                     <label>
                       <span>CatchPhrase</span>
                    </label>
                     <b-input-group size="md">
                       <b-input-group-prepend is-text>
                         <b-icon icon="geo-alt-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        v-model="user.company.catchPhrase"
                        placeholder="catchPhrase"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                        <b-row>
                          <b-col cols="12" xl="4" class="text-center">
                            <label>
                              <span>Bs</span>
                        </label>
                         <b-input-group size="md">
                           <b-input-group-prepend is-text>
                             <b-icon icon="build"></b-icon>
                          </b-input-group-prepend>
                          <b-form-input
                            type="text"
                            v-model="user.company.bs"
                            placeholder="bs"
                          ></b-form-input>
                        </b-input-group>
                      </b-col>
                            <b-col cols="12" xl="4" class="text-center">
                          <label>
                            <span>latitude</span>
                          </label>
                           <b-input-group size="md">
                            <b-input-group-prepend is-text>
                              <b-icon icon="geo-alt-fill"></b-icon>
                            </b-input-group-prepend>
                            <b-form-input
                              type="text"
                              v-model="user.address.geo.lat"
                              placeholder="latitude"
                            ></b-form-input>
                          </b-input-group>
                        </b-col>
                         <b-col cols="12" xl="4" class="text-center">
                          <label>
                            <span>longitude</span>
                          </label>
                           <b-input-group size="md">
                            <b-input-group-prepend is-text>
                              <b-icon icon="geo-alt-fill"></b-icon>
                            </b-input-group-prepend>
                            <b-form-input
                              type="text"
                              v-model="user.address.geo.lng"
                              placeholder="longitude"
                            ></b-form-input>
                          </b-input-group>
                        </b-col>
                                </b-row>
                      
                          </b-row>
                  </b-card>

       


          </b-modal>

    </div>
</template>
<script>
import { required, minLength,email,url,alphaNum } from "vuelidate/lib/validators";
import MaskedInput from 'vue-masked-input'
import alert from "@/assets/repositories/alert.js"
const alerts=alert();
//const valphaWith= helpers.regex("alpha","[^A-Za-zÁÉÍÓÚáéíóúñÑ ]");

export default {
  name: 'modalUser',
   components:{
    MaskedInput,
  },
    computed:{
        validateNameRegex(){
            if(this.user.name.length==0){
                return false;
            }
         let valphaWith=new RegExp("[^A-Za-zÁÉÍÓÚáéíóúñÑ ]+","g");
            return !valphaWith.test(this.user.name);
        },
        titleModal(){
        if(this.update){
            return "Edit User"
        }else{
            return "Add User"
        }
        },
         validatePhone() {
      let conteo = 0;
      if (this.$v.user.phone.$model == "" ||this.$v.user.phone.$model == null) {
          return false;
      } else {
        conteo = this.$v.user.phone.$model.split("#").length;
      }
      if (conteo != 1) {
        return false;
      } else {
        if (this.$v.user.phone.$model.length == 0) {
          return false;
        } else {       
          return true;
          }
      }
    }
  },
  validations:{
 user: {
    name: { required, minLength: minLength(4)},
    username: { required, minLength: minLength(4) },
    email: { required, email },
    website:{required,url},
    address:{
    street:{required,alphaNum},
    suite:{required},
    zipcode:{required,minLength: minLength(1)},
    city:{required},
    },
    phone:{ required,minLength: minLength(1) },


   }
    },
    created(){
     
        
        },
    mounted(){
        },
    methods:{
        validateName(){
            
            },
        editUser(){
            this.$store.dispatch('editUser',this.user)
            this.$emit('load');
            this.$refs["modalUser1"].hide();
            alerts.userEdit();

       },
        validateInfo(){
          
            let verifica=this.$store.getters.getTemp;
         if(verifica==null){
             this.reset();
         }else{
             this.edit(verifica); 
         }
        },
         edit(data){
            this.update=1;
            this.user=data;
        },
        addUser(){
            this.$store.commit('addUser',this.user);
            alerts.userAdd();
            this.$emit('load');
            this.$refs["modalUser1"].hide();

           /// this.close()
        },
        response(field){
         alerts.incomplete(field);
        },
        showAlert(){                            
            let v=this.$v.user;
            if(v.name.$invalid||!this.validateNameRegex){

             this.response("name");
              return false;
                }
            if(v.username.$invalid){
               this.response("username");
               return false;
                }
            if(v.email.$invalid){
               this.response("email");
               return false;
                }
            if(v.website.$invalid){
               this.response("website");
               return false;
                }        
            if(!this.validatePhone){
               this.response("phone");
               return false;
                } 
             if(v.address.zipcode.$invalid){
               this.response("zipcode");
               return false;
                } 
            if(v.address.city.$invalid){
               this.response("city");
               return false;
                } 
            if(v.address.street.$invalid){
               this.response("street");
               return false;
                } 
            if(v.address.suite.$invalid){
               this.response("suite");
               return false;
                } 
        },
        validateAll(){
            if(this.$v.$invalid){
                return false;
            }else{
            if(this.validatePhone&&this.validateNameRegex){
                return true;
                }else{
                    return false;
                }
            }

            
        },
      validateUser(bvModalEvent){
                bvModalEvent.preventDefault()

      },
      cargainfo(){
      return{
                id:0,
                name: "",
                username: "",
                email: "",
                address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo:{
                    lat:"",
                    lng:""
                }
                },
                phone: "",
                website: "",
                company: {
                name:"",
                catchPhrase:"",
                bs:""
                }
            }
      },
   
      reset(){
        this.update=0;
        this.user=this.cargainfo();
      },

    },
    data(){
        return{
          user:this.cargainfo()
                ,
          update:0,

          
            
        }
    },

}

</script>
