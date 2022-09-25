import request from "../utils/request"

// 获取信息
const getSupplierList = (page, size, data) => {
    return request({
        url: `/supplier/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}

// 添加
const addSupplier = (data) => {
    return request({
        url: '/supplier',
        method: 'POST',
        data
    })
}
// 编辑
const editSupplier = (id, data) => {
    return request({
        url: `/supplier/${id}`,
        method: "PUT",
        data
    })
}
// 删除
const deleteSupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "DELETE",

    })
}

// 查询
const findSupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: 'GET'
    })
}


export default {
    getSupplierList,
    deleteSupplier,
    addSupplier,
    editSupplier,
    findSupplier
}