import request from "../utils/request"

// 获取信息
const getMemberList = (page, size, data) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}

// 添加
const addMember = (data) => {
    return request({
        url: '/member',
        method: 'POST',
        data
    })
}
// 编辑
const editMember = (id, data) => {
    return request({
        url: `/member/${id}`,
        method: "PUT",
        data
    })
}
// 删除
const deleteMember = (id) => {
    return request({
        url: `/member/${id}`,
        method: "DELETE",

    })
}

// 查询
const findMember = (id) => {
    return request({
      url : `/member/${id}`,
      method : 'GET'
    })
  }


export default {
    getMemberList,
    deleteMember,
    addMember,
    editMember,
    findMember
}