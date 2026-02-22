import schema2component from "@/utils/schema2component";
import {API_HOST} from "@/utils/adaptors";

const schema = {
    type: "crud",
    title: "需求列表",
    api: {
        method: "get",
        url: `${API_HOST}/api/req/list`
    },
    body: {

    }
}

export default schema2component(schema);