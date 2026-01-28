import schema2component from "@/utils/schema2component";
import {API_HOST, UNAUTHORIZED_ADAPTOR} from "@/utils/adaptors";

const schema = {
    type: "crud",
    title: "需求列表",
    api: {
        method: "get",
        url: `${API_HOST}/api/req/list`,
        adaptor: UNAUTHORIZED_ADAPTOR
    },
}

export default schema2component(schema);