import dblcheck from '../img/dblcheck.svg'
import readdblcheck from '../img/readdblcheck.svg'
import check from '../img/check.svg'

export const getIdInstance = () => {
    const data = localStorage.getItem('Green_API_Data')
    if(data){
        const idInstance = JSON.parse(data).idInstance
        return idInstance
    } 
}

export const getApiTokenInstance = () => {
    const data = localStorage.getItem('Green_API_Data')
    if(data){
        const apiTokenInstance = JSON.parse(data).apiTokenInstance
        return apiTokenInstance
    } 
}

 export const getStatusImg = (status: string | undefined) => {
    switch (status) {
        case 'loading':
            return 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif';
        case 'sent':
            return check;
        case 'delivered':
            return dblcheck;
        case 'read':
            return readdblcheck;
        default:
            return
    }
}

export const getDate = (date:number) =>{
const correctDate = `${new Date(date).getHours()}:${new Date(date).getUTCMinutes()<10 ? '0' + new Date(date).getUTCMinutes() : new Date(date).getUTCMinutes() }` 
return correctDate
}