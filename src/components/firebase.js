//     apiKey: "AIzaSyDpMLhoytaSinYxIgFvAHC_EtYenSRZcoI",
//     authDomain: "online-shop-6530d.firebaseapp.com",
//     databaseURL: "https://online-shop-6530d-default-rtdb.europe-west1.firebasedatabase.app",

    import axios from 'axios'

    export default class FairbaseDB {
    
        constructor() {
            this._apiAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
            this._key = 'AIzaSyBgXJhuOzg6o_O0jz2T3lVjuMgPi4F3Gfs';
            this._apiUrl = 'https://test-db-13a98.firebaseio.com/';
        }
        //server
        async AuthInFairbase(opt) {
            const res = await axios.post(`${this._apiAuth}${this._key}`, opt);
            if (res.status !== 200) throw new Error(`Could not fetch, received ${res.status}`);
            return res;
        }
        async getResource(url, end) {
            const token = this.getToken();
            const res = await axios.get(`${url}${end}?auth=${token}`);
            if (res.status !== 200) throw new Error(`Could not fetch, received ${res.status}`);
            return res;
        }
        async postResource(url, end, data) {
            const token = this.getToken();
            const res = await axios.post(`${url}${end}?auth=${token}`, data);
            if (res.status !== 200) throw new Error(`Could not fetch, received ${res.status}`);
            return res;
        }
        async delResource(url, end) {
            const token = this.getToken();
            const res = await axios.delete(`${url}${end}?auth=${token}`);
            if (res.status !== 200) throw new Error(`Could not fetch, received ${res.status}`);
            return res;
        }
        async patchResource(url, end, data) {
            const token = this.getToken();
            const res = await axios.patch(`${url}${end}?auth=${token}`, data)
            if (res.status !== 200) throw new Error(`Could not fetch, received ${res.status}`);
            return res;
        }
    
        //metods
        login = async (opt) => {
            let returnAnswer = null;
            const data = opt;
            data.returnSecureToken = true;
            await this.AuthInFairbase(data)
                .then(data => FairbaseDB.setToken(data.data))
                .then(data => returnAnswer = data)
                .catch(err => {
                    const error = FairbaseDB.handlError(err)
                    returnAnswer = [false, error]
                })
            return returnAnswer
        }
        isLogin = async () => {
            const res = await this.getToken();
            if(res) {
                return await true
            } else return await false;
        }
        logout = () => {
            return FairbaseDB.setToken();
        }
        delite = async (id) => {
            const res = await this.delResource(this._apiUrl, `keys/${id}.json`);
            return res;
        }
        edit = async (id, data) => {
            const res = await this.patchResource(this._apiUrl, `keys/${id}.json`, data);
            return res;
        }
        create = async (data) => {
            const res = await this.postResource(this._apiUrl, `keys.json`, data);
            return res;
        }
        getAllProject = async () => {
            const res = await this.getResource(this._apiUrl, 'keys.json');
            return FairbaseDB._transformKeys(res.data);
        }
        getElement = async (id) => {
            const res = await this.getResource(this._apiUrl, `keys/${id}.json`);
            return res;
        }
    
        //static metods
        getToken() {
            const expData = new Date(localStorage.getItem('fb-token-exp'))
            if (new Date() > expData) {
                this.logout()
                return null
            }
            return localStorage.getItem('fb-token')
        }
        static setToken(response) {
            if (response) {
                const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
                localStorage.setItem('fb-token', response.idToken)
                localStorage.setItem('fb-token-exp', expDate.toString())
                return true
            } else {
                localStorage.clear()
                return false
            }
        }
        //error processing
    static handlError(err) {
        console.log(err)
        let error = null;
        const errors = JSON.parse(err.request.response);
        const {message} = errors.error;
        switch (message) {
            case 'INVALID_EMAIL':
                error = 'Неверный email';
                break;
            case 'EMAIL_NOT_FOUND':
                error = 'Данный email не найден';
                break;
            case 'INVALID_PASSWORD':
                error = 'Неверный пароль';
                break;
            default:
                error = 'Что-пошло не так'
        }
        return error
    }
    handlError = (err) => {
        let error = null;

        const errors = JSON.parse(err.request.response);
        if(errors.error === 'Could not parse auth token.') {
            error = 'Время действия токена окончено, пожалуйста авторизируйтесь заново!'
        }
        return error
    }

    //data processing
    static _transformKeys(obj) {
        const mass = [];
        for (const key in obj) {
            const el = {
                id: key,
                projectName: obj[key].projectName,
                text: obj[key].text
            }
            mass.push(el)
        }
        return mass
    }
}    