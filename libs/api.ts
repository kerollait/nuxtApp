import axios from 'axios'

export default class Api {
    private apiDomain: string = ''
    private apiPathUri: string = ''
    private queryString: string = ''

    constructor() {
        this.apiDomain = 'https://alpha-api.etoos.com'
    }

    setApiPathUri(path:string) : void {
        this.apiPathUri = path
    }

    setQueryString(query:string) : void {
        this.queryString = query
    }

    execute(): any {
        let apiFullPath = this.apiDomain + this.apiPathUri
        if (this.queryString != '') {
            apiFullPath += '?' + this.queryString
        }

        return axios.get(apiFullPath)
        .then((res) => {
            return res.data
        })
    }
}