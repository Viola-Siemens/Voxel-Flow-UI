import schema2component from "@/utils/schema2component";
import {API_HOST, UNAUTHORIZED_ADAPTOR} from "@/utils/adaptors";

const schema = {
    type: "crud",
    title: "需求列表",
}

export default schema2component(schema);