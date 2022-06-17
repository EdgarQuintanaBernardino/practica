import "regenerator-runtime/runtime"
import Axios from "axios";
const server ="https://jsonplaceholder.typicode.com/users";
const getUsers = async()=>{
        let result = await Axios.get(server).then((res) => {
            return res;
        }).catch((error) => {
            return error;    
        });
        return result;     
}
export default ()=> ({
    getUsers,
});