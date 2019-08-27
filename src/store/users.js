import Vue from 'vue'
const SET_USER = 'SET_USER'
export default {
    state: {
        users: []
    },
    mutations: {
        [SET_USER] (state, payload) {
            state.users = payload
        }
    },
    actions: {
        getUsers ({commit}) {
            Vue.http.get('http://localhost:3000/users')
                .then(res => {
                    commit(SET_USER, res.body)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    getters: {
        users: state => state.users
    }
}