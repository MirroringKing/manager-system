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


// 编辑


// 删除


// 查询



export default {
    getMemberList
}