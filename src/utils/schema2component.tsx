import { Schema } from "amis/lib/types";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AMisRenderer from "../components/AMisRenderer";

export default function schema2component(schema:Schema) {
	return (props:any) => {
		const navigate = useNavigate();
		const location = useLocation();

		useEffect(() => {
			if (schema.title) {
				document.title = `${schema.title} - Voxel Flow`;
			}
		}, []);

		// 构造一个兼容 React Router v5 的 history 对象喵~
		const history = useMemo(() => ({
			location,
			push: (path:string) => navigate(path),
			replace: (path:string) => navigate(path, { replace: true }),
			goBack: () => navigate(-1)
		}), [navigate, location]);

		return (
			<AMisRenderer schema={schema} history={history} {...props} />
		)
	}
}