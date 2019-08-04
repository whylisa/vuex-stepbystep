import Vue from 'vue'//引入vue
import Vuex from 'vuex'//引入vuex

// 安装
Vue.use(Vuex)

// 初始化state
const state = {
	todos: [
		{
			id:1,name: "jj",done: false
		}
	]
}

// mutations
const mutations = {
	changeDone(state,payload) {
		const curTodo = state.todos.find(item => item.id === payload.id)
		curTodo.done = !curTodo.done
	},
	addTodo(state,payload) {
		const length = state.todos.length
		const id = length === 0?1:state.todos[length-1].id+1,
		
		state.todos.push({
			id,
			name: payload.name,
			done:false
		})
	},
	delTodo(state,payload) {
		state.todos.splice(payload.index,1)
	},
	updateTodo(state,payload) {
		const curTodo = state.todos.find(item => item.id === payload.id)
		curTodo.name = payload.name
	},
	clearAllDone(state) {
		state.todos = state.todos.filter(item => !item.done)
	}
}
const actions = {
	addTodoAsync ( context,payload){
		setTimeout(() => {
			context.commit("addTodo",{
				name: payload.name
			})
		},2000)
		
	}
}
 cosnt getters = {
	unDoneCount(state) {
		return state.todos.filter(item => !item.done).length
	},
	showClearDone(state) {
		return state.todos.some(item => item.done)
	}
}
const todoModule = {
	state,
	mutation,
	actions,
	getters
}
// 创建store把state和mutation 写入Vuex.store中
const store = new Vuex.Store({
	module: {
		a: todosModule
	}
})

export default store //导出store
