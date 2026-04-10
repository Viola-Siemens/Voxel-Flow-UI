import schema2component from "@/utils/schema2component";
import {API_HOST} from "@/utils/adaptors";

/**
 * 需求列表页组件喵~
 * @author liudongyu
 */
const schema = {
	type: "page",
	title: "需求列表",
	body: {
		type: "crud",
		syncLocation: false,
		api: {
			method: "get",
			url: `${API_HOST}/requirement/list`,
			adaptor: (payload: any) => {
				return {
					...payload,
					data: {
						items: payload.data.list,
						total: payload.data.total
					}
				};
			}
		},
		headerToolbar: [
			"filter-toggler",
			"reload",
			{
				type: "button",
				label: "创建需求",
				actionType: "dialog",
				level: "primary",
				dialog: {
					title: "创建需求",
					size: "lg",
					body: {
						type: "form",
						api: {
							method: "post",
							url: `${API_HOST}/requirement/create`,
							requestAdaptor: (api: any) => {
								return {
									...api,
									headers: {
										"Content-Type": "application/json"
									}
								};
							}
						},
						body: [
							{
								type: "input-text",
								name: "title",
								label: "需求标题",
								required: true
							},
							{
								type: "textarea",
								name: "description",
								label: "需求描述",
								required: true,
								minRows: 3,
								maxRows: 10
							},
							{
								type: "input-number",
								name: "priority",
								label: "优先级",
								required: true,
								min: 0,
								value: 0
							},
							{
								type: "select",
								name: "requirementType",
								label: "需求类型",
								required: true,
								options: [
									{label: "建筑", value: "BUILDING"},
									{label: "模组", value: "MOD"},
									{label: "数据包", value: "DATAPACK"},
									{label: "整合包", value: "MODPACK"},
                                    {label: "服务器", value: "SERVER"},
                                    {label: "工程效率", value: "EFFICIENCY"},
                                    {label: "技术改造", value: "RECONSTRUCTION"},
                                    {label: "其它", value: "OTHER"}
								]
							}
						]
					}
				}
			}
		],
		filter: {
			title: "筛选条件",
			body: [
				{
					type: "input-text",
					name: "title",
					label: "标题关键词",
					placeholder: "请输入标题关键词"
				},
				{
					type: "select",
					name: "status",
					label: "需求状态",
					placeholder: "请选择需求状态",
					clearable: true,
					options: [
						{label: "业务方评审中", value: "REVIEWING"},
						{label: "多方会签中", value: "COUNTERSIGNING"},
						{label: "产品分析中", value: "REQUIREMENT_ANALYSIS"},
						{label: "需求评审中", value: "REQUIREMENT_REVIEWING"},
						{label: "技术设计中", value: "DESIGNING"},
						{label: "排期中", value: "SCHEDULING"},
						{label: "开发中", value: "DEVELOPING"},
						{label: "测试中", value: "TESTING"},
						{label: "验收中", value: "CHECKING"},
						{label: "已发布", value: "RELEASED"},
						{label: "已拒绝", value: "REJECTED"},
						{label: "已取消", value: "CANCELED"}
					]
				},
				{
					type: "input-number",
					name: "priority",
					label: "优先级",
					placeholder: "请输入优先级",
					min: 0
				}
			]
		},
		columns: [
			{
				name: "code",
				label: "需求编号",
				sortable: true,
				width: 120
			},
			{
				name: "title",
				label: "需求标题",
				sortable: true,
				width: 200
			},
			{
				name: "description",
				label: "需求描述",
				type: "tpl",
				tpl: "${description|truncate:50}",
				popOver: {
					body: "${description}"
				},
				width: 250
			},
			{
				name: "status",
				label: "状态",
				type: "mapping",
				map: {
					"REVIEWING": "<span class='label label-info'>业务方评审中</span>",
					"COUNTERSIGNING": "<span class='label label-info'>多方会签中</span>",
					"REQUIREMENT_ANALYSIS": "<span class='label label-warning'>产品分析中</span>",
					"REQUIREMENT_REVIEWING": "<span class='label label-warning'>需求评审中</span>",
					"DESIGNING": "<span class='label label-primary'>技术设计中</span>",
					"SCHEDULING": "<span class='label label-primary'>排期中</span>",
					"DEVELOPING": "<span class='label label-primary'>开发中</span>",
					"TESTING": "<span class='label label-success'>测试中</span>",
					"CHECKING": "<span class='label label-success'>验收中</span>",
					"RELEASED": "<span class='label label-success'>已发布</span>",
					"REJECTED": "<span class='label label-danger'>已拒绝</span>",
					"CANCELED": "<span class='label label-default'>已取消</span>"
				},
				width: 120
			},
			{
				type: "mapping",
				name: "priority",
				label: "优先级",
				map: {
					"0": "<span class='label label-danger'>P0</span>",
					"1": "<span class='label label-warning'>P1</span>",
					"2": "<span class='label label-info'>P2</span>",
					"3": "<span class='label label-default'>P3</span>"
				},
				sortable: true,
				width: 80
			},
			{
				name: "requirementType",
				label: "需求类型",
				type: "mapping",
				map: {
					"BUILDING": "<span class='label label-brown'>建筑</span>",
					"MOD": "<span class='label label-orange'>模组</span>",
					"DATAPACK": "<span class='label label-success'>数据包</span>",
					"MODPACK": "<span class='label label-primary'>整合包</span>",
					"SERVER": "<span class='label label-teal'>服务器</span>",
					"EFFICIENCY": "<span class='label label-magenta'>工程效率</span>",
					"RECONSTRUCTION": "<span class = 'label label-cyan'>技术改造</span>",
					"OTHER": "<span class='label label-dark'>其它</span>"
				},
				width: 100
			},
			{
				name: "createdAt",
				label: "创建时间",
				type: "datetime",
				format: "YYYY-MM-DD HH:mm:ss",
				sortable: true,
				width: 160
			},
			{
				name: "updatedAt",
				label: "更新时间",
				type: "datetime",
				format: "YYYY-MM-DD HH:mm:ss",
				sortable: true,
				width: 160
			},
			{
				type: "operation",
				label: "操作",
				width: 150,
				buttons: [
					{
						type: "button",
						label: "查看",
						level: "link",
						actionType: "link",
						link: "/detail/req?code=${code}"
					},
					{
						type: "button",
						label: "编辑",
						level: "link",
						actionType: "dialog",
						dialog: {
							title: "编辑需求",
							size: "lg",
							body: {
								type: "form",
								api: {
									method: "post",
									url: `${API_HOST}/requirement/update`,
									requestAdaptor: (api: any) => {
										return {
											...api,
											headers: {
												"Content-Type": "application/json"
											}
										};
									}
								},
								body: [
									{
										type: "static",
										name: "code",
										label: "需求编号"
									},
									{
										type: "input-text",
										name: "title",
										label: "需求标题",
										required: true
									},
									{
										type: "textarea",
										name: "description",
										label: "需求描述",
										required: true,
										minRows: 3,
										maxRows: 10
									},
									{
										type: "input-number",
										name: "priority",
										label: "优先级",
										required: true,
										min: 0
									},
									{
										type: "select",
										name: "requirementType",
										label: "需求类型",
										required: true,
										options: [
                                            {label: "建筑", value: "BUILDING"},
                                            {label: "模组", value: "MOD"},
                                            {label: "数据包", value: "DATAPACK"},
                                            {label: "整合包", value: "MODPACK"},
                                            {label: "服务器", value: "SERVER"},
                                            {label: "工程效率", value: "EFFICIENCY"},
                                            {label: "技术改造", value: "RECONSTRUCTION"},
                                            {label: "其它", value: "OTHER"}
										]
									}
								]
							}
						}
					}
				]
			}
		],
		perPageAvailable: [10, 20, 50, 100],
		perPage: 20
	}
}

export default schema2component(schema);