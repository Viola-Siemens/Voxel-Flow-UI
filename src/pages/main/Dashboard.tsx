import schema2component from "@/utils/schema2component";
import {API_HOST, UNAUTHORIZED_ADAPTOR} from "@/utils/adaptors";

const schema = {
    type: "page",
    title: "大盘",
    api: {
        method: "get",
        url: `${API_HOST}/index`,
        adaptor: UNAUTHORIZED_ADAPTOR,
        responseData: {
            assigned: "${data.data.assigned}",
            totalUnassigned: "${data.data.totalUnassigned}"
        }
    },
    body: [
        {
            "type": "tpl",
            "tpl": "<h1><img src='/logo.png' width='32px' alt='logo'/>VoxelFlow</h1>",
            "inline": false
        },
        {
            "type": "tpl",
            "tpl": "<%= data.assigned === 0 ? '您未被分配任何任务，请享受这一天！' : '您被分配了 ' + data.assigned + ' 个任务。' %>",
            "inline": false
        },
        {
            "type": "tpl",
            "tpl": "现在平台中有 ${data.totalUnassigned} 个任务未被分配。<a href='/list/req'>去看看！</a>"
        }
    ]
}

export default schema2component(schema);