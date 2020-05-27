import axios from 'axios'
import config from '~/nuxt.config.js'

export default class Api {
	private apiDomain: string = ''
	private apiPathUri: string = ''
	private httpMethod: string = 'GET'
	private queryString: string = ''
	private formBody: string = ''
	private responseDatas: any = null
	private responseParams: any = null
	public isSuccess: boolean = false

	constructor() {
		if (config.dev) {
			this.apiDomain = 'https://qa-api.etoos.com'
		} else {
			this.apiDomain = 'https://api.etoos.com'
		}
	}

	setMethod(method: string) : void {
		this.httpMethod = method
	}

	setApiPathUri(path: string) : void {
		this.apiPathUri = path
	}

	setParams(params: any) : void {
		if (this.httpMethod.toUpperCase() === 'GET' || this.httpMethod.toUpperCase() === 'DELETE') {
			if (params !== null) {
				for (const [key, value] of Object.entries(params)) {
					if (this.queryString !== '') {
						this.queryString += '&'
					}
					
					this.queryString = key + '=' + value
				}
			}
		} else {

		}
	}

	async execute(): Promise<any> {
		let apiFullPath = this.apiDomain + this.apiPathUri
		if (this.queryString != '') {
			apiFullPath += '?' + this.queryString
		}

		const { data } = await axios.get(apiFullPath)

		if (data.api_info.err_cd === 'R00000') {
			this.isSuccess = true
			if (data.datas !== null) {
				this.responseDatas = data.datas
			}

			if (data.params !== null) {			
				this.responseParams = data.params
			}
		} else {
			
		}
	}

	getParamValue(key: string): any {
		if (this.responseParams !== null) {
			return eval('this.responseParams.'+ key)
		}
	}

	getDataList(list: string): any {		
		if (this.responseDatas !== null) {
			return eval('this.responseDatas.'+ list)
		}
	}
}