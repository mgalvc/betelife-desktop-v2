import createPersistedState from 'vuex-persistedstate'

export const storeData = {
    state: {
        logged: false,
        name: '',
        access_token: ''
    },
    mutations: {
        login(state, user_data) {
            state.logged = true;
            state.name = user_data.name;
            state.access_token = user_data.access_token;
        },
        logout(state) {
            state.logged = false;
            state.name = '';
            state.access_token = '';
        }
    },
    actions: {
        login(context, name) {
            context.commit('login', name);
        },
        logout(context) {
            context.commit('logout');
        }
    },
    getters: {
        header(state) {
            return {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + state.access_token
                }
            }
        }
    },
    plugins: [createPersistedState()]
};