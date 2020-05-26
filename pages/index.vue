<template>
  <div class="container">
	<div>
	  <logo />
	  <h1 class="title">
		nuxtApp
	  </h1>
	  <h2 class="subtitle">
		My exceptional Nuxt.js project
	  </h2>
	  <div class="links">
		<a href="https://nuxtjs.org/" target="_blank" class="button--green">
		  Documentation
		</a>
		<a
		  href="https://github.com/nuxt/nuxt.js"
		  target="_blank"
		  class="button--grey"
		>
		  GitHub
		</a>
	  </div>

	  <div>
		<table border="1">
		<tr>
			<th>No</th>
			<th>강좌아이디</th>
			<th>강좌명</th>
		</tr>		
		<template v-if="lectureData != null">
			<tr v-for="(item, index) in lectureData" v-bind:key="index">
				<td>{{ index }}</td>
				<td>{{ item.lct_id }}</td>
				<td>{{ item.lct_nm }}</td>
			</tr>
		</template>

		<template v-else>
			<tr>
				<td colspan="3" align="center">등록된 강좌가 없습니다.</td>
			</tr>
		</template>
		</table>

		<br>

		<table border="1">
		<tr>
			<th>No</th>
			<th>강좌아이디</th>
			<th>강좌명</th>
		</tr>		
		<template v-if="lectureData2 != null">
			<tr v-for="(item, index) in lectureData2" v-bind:key="index">
				<td>{{ index }}</td>
				<td>{{ item.lct_id }}</td>
				<td>{{ item.lct_nm }}</td>
			</tr>
		</template>

		<template v-else>
			<tr>
				<td colspan="3" align="center">등록된 강좌가 없습니다.</td>
			</tr>
		</template>
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
	async asyncData ({ query }: { query: any }) {
		let lectureData: any = null
		let lectureData2: any = null
		let api: any = null
		const notiarclNo = query.notiarcl_no
		if (notiarclNo == null || notiarclNo == '') {
			
		} else {			
			api = new Api();
			api.setApiPathUri('/qr/bbs/board/article/em/lec/list')
			api.setQueryString('notiarcl_no='+ notiarclNo)

			lectureData = await api.execute().then((res: any) => {				
				if (res != null) {
					return res.datas.list001
				}
			})

			api = new Api();
			api.setApiPathUri('/qr/bbs/board/article/em/lec/list')
			api.setQueryString('notiarcl_no='+ notiarclNo)

			lectureData2 = await api.execute().then((res: any) => {				
				if (res != null) {
					return res.datas.list001
				}
			})

			return {
				lectureData: lectureData,
				lectureData2: lectureData2
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
