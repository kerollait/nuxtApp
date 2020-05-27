<template>
  	<div class="container">
		<div v-if="params.notiarclNo == null || params.notiarclNo == ''">	  
	  		<logo />
		  	<h1 class="title">
				nuxtApp
		  	</h1>
		  	<h2 class="subtitle">
				My exceptional Nuxt.js project
		  	</h2>
		  	<div class="links">
				<a href="?notiarcl_no=5892789" class="button--green">API 호출 테스트</a>
				<a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
		  	</div>
		</div>

		<div v-else>
			<div v-if="viewDatas.lectureList1 != null">
				<table border="1">
				<tr>
					<th>No</th>
					<th>강좌아이디</th>
					<th>강좌명</th>
				</tr>
				<tr v-for="(item, index) in viewDatas.lectureList1" v-bind:key="index">
					<td>{{ index }}</td>
					<td>{{ item.lct_id }}</td>
					<td>{{ item.lct_nm }}</td>
				</tr>		
				</table>
			</div>

			<div v-if="viewDatas.lectureList2 != null">
				<table border="1">
				<tr>
					<th>No</th>
					<th>강좌아이디</th>
					<th>강좌명</th>
				</tr>
				<tr v-for="(item, index) in viewDatas.lectureList2" v-bind:key="index">
					<td>{{ index }}</td>
					<td>{{ item.lct_id }}</td>
					<td>{{ item.lct_nm }}</td>
				</tr>		
				</table>
			</div>
		</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue'
import Api from '@/libs/api'

@Component({
  components: {
	Logo
  }
})
export default class IndexPage extends Vue {
	async asyncData ({ query }: { query:any }) {
		let list1 = null
		let list2 = null
		let api = new Api();
		const notiarclNo = query.notiarcl_no

		if (notiarclNo != null && notiarclNo != '') {
			api.setMethod('GET')
			api.setApiPathUri('/qr/bbs/board/article/em/lec/list')
			api.setParams({
				notiarcl_no: notiarclNo
			})
			await api.execute()			
			if (api.isSuccess) {				
				list1 = api.getDataList('list001')
			}
		}

		return {
			params: {
				notiarclNo: notiarclNo
			},
			viewDatas: {
				lectureList1: list1,
				lectureList2: list2
			}			
		}
	}
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
	'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
