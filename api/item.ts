import { AxiosInstance } from 'axios'

export default ($axios: AxiosInstance) => ({
    index(params: any) {
        const queryString = Object.keys(params)
            .reduce(function (a: any[], k: string) {
                a.push(k + '=' + params[k].toString())
                return a
            }, [])
            .join('&')

        return $axios.get('/api/items?' + queryString)
    },

    create(payload: object) {
        return $axios.post(`/api/items`, payload)
    },

    get(id: number): Promise<object> {
        return $axios.get(`/api/items/${id}`)
    },

    update(payload: object, id: number) {
        return $axios.put(`/api/items/${id}`, payload)
    },

    delete(id: number) {
        return $axios.delete(`/api/items/${id}`)
    },
})
