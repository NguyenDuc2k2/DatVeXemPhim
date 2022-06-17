import Axios from "axios"
import { DOMAIN,TOKEN} from "../Util/Settings/Config";


 export class BaseServices {
    put = (url, modal) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "PUT",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

    post = (url, modal) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "POST",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        });
    }

    get = (url, modal) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "GET",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

    delete = (url, modal) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "DELETE",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
}