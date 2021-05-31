import { AxiosInstance } from 'axios'

export default ($axios: AxiosInstance) => ({
    index(params: any) {
        const queryString = Object.keys(params)
            .reduce(function (a: any[], k: string) {
                a.push(k + '=' + params[k].toString())
                return a
            }, [])
            .join('&')

        return $axios.get('/api/item_types?' + queryString)
    },

    create(payload: object) {
        return $axios.post(`/api/item_types`, payload)
    },

    get(id: number): Promise<object> {
        return $axios.get(`/api/item_types/${id}`)
    },

    update(payload: object, id: number) {
        return $axios.put(`/api/item_types/${id}`, payload)
    },

    delete(id: number) {
        return $axios.delete(`/api/item_types/${id}`)
    },
})
