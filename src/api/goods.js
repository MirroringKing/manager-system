import request from '../utils/request'

const getGoodsList = (page, size, data) => {
    return request({
        url: `/goods/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}

const addGoods = (data) => {
    return request({
        url: `/goods`,
        method: "POST",
        data
    })
}

const deleteGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "DELETE",
    })
}

const editGoods = (id, data) => {
    return request({
        url: `/goods/${id}`,
        method: "PUT",
        data
    })
}

const findGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "GET",
    })
}

export default {
    getGoodsList,
    addGoods,
    findGoods,
    deleteGoods,
    editGoods
}