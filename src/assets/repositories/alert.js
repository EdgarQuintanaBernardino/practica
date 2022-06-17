import Swal from "sweetalert2";
import "regenerator-runtime/runtime"

const errorApi= async (message)=>{
    let mensaje={
        tittle:'Error',
        text:message,
        icon:'error'
    };
    response(mensaje);
}
const incomplete= async (field)=>{
    let mensaje={
        tittle:'No se puede realizar el guardado revisa tus datos',
        text:`Please complete field `+field,
        icon:'info'
    };
    response(mensaje);
}
const userAdd= async ()=>{
    let mensaje={
        tittle:'Success',
        text:`Guardado Exitosamente`,
        icon:'success'
    };
    response(mensaje);
}
const userEdit= async ()=>{
    let mensaje={
        tittle:'Success',
        text:`Edit User Complete`,
        icon:'success'
    };
    response(mensaje);
}
const response=async(response)=>{
    return Swal.fire({
     title: response.tittle,
     text: response.text,
     icon:response.icon,
     focusConfirm: false,
     showCloseButton: true,
     confirmButtonText:
     '¡Entendido!'
   });

}
export default ()=> ({
    errorApi,incomplete,userAdd,userEdit
});