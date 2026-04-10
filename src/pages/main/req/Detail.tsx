import schema2component from "@/utils/schema2component";
import {API_HOST} from "@/utils/adaptors";

/**
 * 需求详情页组件喵~
 * @author liudongyu
 */
const schema = {
	type: "page",
	title: "需求详情",
	body: {
		type: "service",
		api: {
			method: "get",
			url: `${API_HOST}/requirement/query`,
			data: {
				code: "${query.code}"
			}
		},
		body: [
			{
				type: "panel",
				title: "基本信息",
				body: {
					type: "form",
					mode: "horizontal",
					wrapWithPanel: false,
					body: [
						{
							type: "static",
							name: "code",
							label: "需求编号"
						},
						{
							type: "static",
							name: "title",
							label: "需求标题"
						},
						{
							type: "static",
							name: "description",
							label: "需求描述"
						},
						{
							type: "static-mapping",
							name: "status",
							label: "状态",
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
							}
						},
						{
							type: "static-mapping",
							name: "priority",
							label: "优先级",
							map: {
								"0": "<span class='label label-danger'>P0</span>",
								"1": "<span class='label label-warning'>P1</span>",
								"2": "<span class='label label-info'>P2</span>",
								"3": "<span class='label label-pale-blue'>P3</span>",
								"4": "<span class='label label-default'>P4</span>"
							}
						},
						{
							type: "static-mapping",
							name: "requirementType",
							label: "需求类型",
							map: {
								"BUILDING": "<span class='label label-brown'>建筑</span>",
								"MOD": "<span class='label label-orange'>模组</span>",
								"DATAPACK": "<span class='label label-success'>数据包</span>",
								"MODPACK": "<span class='label label-primary'>整合包</span>",
								"SERVER": "<span class='label label-teal'>服务器</span>",
								"EFFICIENCY": "<span class='label label-magenta'>工程效率</span>",
								"RECONSTRUCTION": "<span class = 'label label-cyan'>技术改造</span>",
								"OTHER": "<span class='label label-dark'>其它</span>"
							}
						},
						{
							type: "static-datetime",
							name: "createdAt",
							label: "创建时间",
							format: "YYYY-MM-DD HH:mm:ss"
						},
						{
							type: "static-datetime",
							name: "updatedAt",
							label: "更新时间",
							format: "YYYY-MM-DD HH:mm:ss"
						}
					]
				}
			},
			{
				type: "divider"
			},
			{
				type: "flex",
				justify: "center",
				items: [
					{
						type: "button",
						label: "返回列表",
						level: "default",
						actionType: "link",
						link: "/list/req"
					},
					{
						type: "button",
						label: "批准",
						level: "success",
						actionType: "ajax",
						confirmText: "确认批准该需求吗？",
						api: {
							method: "post",
							url: `${API_HOST}/requirement/approve`,
							data: {
								code: "${code}"
							},
							requestAdaptor: (api: any) => {
								return {
									...api,
									headers: {
										"Content-Type": "application/json"
									}
								};
							}
						},
						reload: "window",
						className: "m-l-sm"
					},
					{
						type: "button",
						label: "拒绝",
						level: "danger",
						actionType: "dialog",
						dialog: {
							title: "拒绝需求",
							body: {
								type: "form",
								api: {
									method: "post",
									url: `${API_HOST}/requirement/reject`,
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
										type: "hidden",
										name: "code",
										value: "${code}"
									},
									{
										type: "textarea",
										name: "description",
										label: "拒绝理由",
										placeholder: "请输入拒绝理由",
										minRows: 3,
										maxRows: 10
									}
								]
							},
							actions: [
								{
									type: "button",
									label: "取消",
									actionType: "cancel"
								},
								{
									type: "submit",
									label: "确认拒绝",
									level: "danger"
								}
							]
						},
						reload: "window",
						className: "m-l-sm"
					}
				]
			}
		]
	}
};

export default schema2component(schema);