import request from "../utils/request"

// 获取信息
const getStaffList = (page, size, data) => {
    return request({
        url: `/staff/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}

// 添加
const addStaff = (data) => {
    return request({
        url: '/staff',
        method: 'POST',
        data
    })
}
// 编辑
const editStaff = (id, data) => {
    return request({
        url: `/staff/${id}`,
        method: "PUT",
        data
    })
}
// 删除
const deleteStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "DELETE",

    })
}

// 查询
const findStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: 'GET'
    })
}


export default {
    getStaffList,
    deleteStaff,
    addStaff,
    editStaff,
    findStaff
}