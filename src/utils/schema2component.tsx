import { Schema } from "amis/lib/types";
import React, { useEffect } from "react";
import AMisRenderer from "../components/AMisRenderer";

export default function schema2component(schema:Schema) {
	return (props:any) => {
		useEffect(() => {
			if (schema.title) {
				document.title = `${schema.title} - Voxel Flow`;
			}
		}, []);

		return (
			<AMisRenderer schema={schema} {...props} />
		)
	}
}