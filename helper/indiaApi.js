import axios from 'axios'
const IndiaSearch = axios.create({
    baseURL : 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org'
}) 

export default IndiaSearch;