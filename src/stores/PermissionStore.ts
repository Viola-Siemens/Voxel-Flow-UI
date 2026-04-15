import { action, observable} from "mobx";

class PermissionStore {
	// ======== 用户操作权限 ========
    @observable
    userManage = false;

	// ======== 需求操作权限 ========
    @observable
    requirementCreate = false;
	@observable
	requirementCountersign = false;
	@observable
	requirementAnalyze = false;
	@observable
	requirementReview = false;
	@observable
	requirementDesign = false;
	@observable
	requirementSchedule = false;
	@observable
	requirementDevelop = false;
	@observable
	requirementTest = false;
	@observable
	requirementCheck = false;

	// ======== 故事操作权限 ========
	@observable
	storyCreate = false;
	@observable
	storyProgress = false;
	@observable
	storyTest = false;

	// ======== 问题操作权限 ========
	@observable
	issueCreate = false;
	@observable
	issueConfirm = false;
	@observable
	issueHandle = false;
	@observable
	issueTest = false;
	@observable
	issueCheck = false;

	// ======== 复盘单操作权限 ========
	@observable
	retrospectiveCreate = false;

	constructor() {
		this.userManage = localStorage.getItem('user_manage')?.toLowerCase() === 'true';
        this.requirementCreate = localStorage.getItem('requirement_create')?.toLowerCase() === 'true';
		this.requirementCountersign = localStorage.getItem('requirement_countersign')?.toLowerCase() === 'true';
		this.requirementAnalyze = localStorage.getItem('requirement_analyze')?.toLowerCase() === 'true';
		this.requirementReview = localStorage.getItem('requirement_review')?.toLowerCase() === 'true';
		this.requirementDesign = localStorage.getItem('requirement_design')?.toLowerCase() === 'true';
		this.requirementSchedule = localStorage.getItem('requirement_schedule')?.toLowerCase() === 'true';
		this.requirementDevelop = localStorage.getItem('requirement_develop')?.toLowerCase() === 'true';
		this.requirementTest = localStorage.getItem('requirement_test')?.toLowerCase() === 'true';
		this.requirementCheck = localStorage.getItem('requirement_check')?.toLowerCase() === 'true';
		this.storyCreate = localStorage.getItem('story_create')?.toLowerCase() === 'true';
		this.storyProgress = localStorage.getItem('story_progress')?.toLowerCase() === 'true';
		this.storyTest = localStorage.getItem('story_test')?.toLowerCase() === 'true';
		this.issueCreate = localStorage.getItem('issue_create')?.toLowerCase() === 'true';
		this.issueConfirm = localStorage.getItem('issue_confirm')?.toLowerCase() === 'true';
		this.issueHandle = localStorage.getItem('issue_handle')?.toLowerCase() === 'true';
		this.issueTest = localStorage.getItem('issue_test')?.toLowerCase() === 'true';
		this.issueCheck = localStorage.getItem('issue_check')?.toLowerCase() === 'true';
		this.retrospectiveCreate = localStorage.getItem('retrospective_create')?.toLowerCase() === 'true';
	}

	@action
	updatePermission() {
		localStorage.setItem('user_manage', String(this.userManage));
        localStorage.setItem('requirement_create', String(this.requirementCreate));
		localStorage.setItem('requirement_countersign', String(this.requirementCountersign));
		localStorage.setItem('requirement_analyze', String(this.requirementAnalyze));
		localStorage.setItem('requirement_review', String(this.requirementReview));
		localStorage.setItem('requirement_design', String(this.requirementDesign));
		localStorage.setItem('requirement_schedule', String(this.requirementSchedule));
		localStorage.setItem('requirement_develop', String(this.requirementDevelop));
		localStorage.setItem('requirement_test', String(this.requirementTest));
		localStorage.setItem('requirement_check', String(this.requirementCheck));
		localStorage.setItem('story_create', String(this.storyCreate));
		localStorage.setItem('story_progress', String(this.storyProgress));
		localStorage.setItem('story_test', String(this.storyTest));
		localStorage.setItem('issue_create', String(this.issueCreate));
		localStorage.setItem('issue_confirm', String(this.issueConfirm));
		localStorage.setItem('issue_handle', String(this.issueHandle));
		localStorage.setItem('issue_test', String(this.issueTest));
		localStorage.setItem('issue_check', String(this.issueCheck));
		localStorage.setItem('retrospective_create', String(this.retrospectiveCreate));
	}

	@action
	setFromRoles(roles: string[]) {
		// 所有权限设为默认值 false 喵~
		this.userManage = false;
		this.requirementCreate = false;
		this.requirementCountersign = false;
		this.requirementAnalyze = false;
		this.requirementReview = false;
		this.requirementDesign = false;
		this.requirementSchedule = false;
		this.requirementDevelop = false;
		this.requirementTest = false;
		this.requirementCheck = false;
		this.storyCreate = false;
		this.storyProgress = false;
		this.storyTest = false;
		this.issueCreate = false;
		this.issueConfirm = false;
		this.issueHandle = false;
		this.issueTest = false;
		this.issueCheck = false;
		this.retrospectiveCreate = false;

		// 解析所有角色，并分配权限喵~
		for(let role of roles) {
			switch (role) {
				case "BUSINESS":
					// 需求权限：审核中(REVIEWING)、验收中(CHECKING)
					this.requirementCreate = true;
					this.requirementCheck = true;
					// 问题权限：审核中(REVIEWING)、验收中(CHECKING)
					this.issueCreate = true;
					this.issueCheck = true;
					break;
				case "PRODUCT":
					// 需求权限：三方会签中(COUNTERSIGNING)、需求分析中(REQUIREMENT_ANALYSIS)、排期中(SCHEDULING)、验收中(CHECKING)
					this.requirementCountersign = true;
					this.requirementAnalyze = true;
					this.requirementSchedule = true;
					this.requirementCheck = true;
					break;
				case "SECURITY":
					// 需求权限：三方会签中(COUNTERSIGNING)
					this.requirementCountersign = true;
					break;
				case "ARCHITECTURE":
					// 需求权限：需求评审中(REQUIREMENT_REVIEWING)、设计中(DESIGNING)
					this.requirementReview = true;
					this.requirementDesign = true;
					// 故事权限：草稿(DRAFT)
					this.storyCreate = true;
					break;
				case "DEVELOPMENT":
					// 需求权限：三方会签中(COUNTERSIGNING)、需求评审中(REQUIREMENT_REVIEWING)、开发中(DEVELOPING)
					this.requirementCountersign = true;
					this.requirementReview = true;
					this.requirementDevelop = true;
					// 故事权限：草稿(DRAFT)、进行中(PROGRESSING)
					this.storyCreate = true;
					this.storyProgress = true;
					// 问题权限：确认中(CONFIRMING)、处理中(HANDLING)
					this.issueConfirm = true;
					this.issueHandle = true;
					break;
				case "TEST":
					// 需求权限：需求评审中(REQUIREMENT_REVIEWING)、测试中(TESTING)
					this.requirementReview = true;
					this.requirementTest = true;
					// 故事权限：测试中(TESTING)
					this.storyTest = true;
					// 问题权限：审核中(REVIEWING)、确认中(CONFIRMING)、测试中(TESTING)
					this.issueCreate = true;
					this.issueConfirm = true;
					this.issueTest = true;
					break;
				case "ART":
				case "MODEL":
				case "BUILDING":
					// 需求权限：三方会签中(COUNTERSIGNING)、需求评审中(REQUIREMENT_REVIEWING)、开发中(DEVELOPING)
					this.requirementCountersign = true;
					this.requirementReview = true;
					this.requirementDevelop = true;
					// 故事权限：草稿(DRAFT)、进行中(PROGRESSING)
					this.storyCreate = true;
					this.storyProgress = true;
					// 问题权限：处理中(HANDLING)
					this.issueHandle = true;
					break;
				case "DIAGNOSIS":
					// 需求权限：审核中(REVIEWING)
					this.requirementCreate = true;
					// 问题权限：审核中(REVIEWING)、确认中(CONFIRMING)、验收中(CHECKING)
					this.issueCreate = true;
					this.issueConfirm = true;
					this.issueCheck = true;
					break;
				case "SUPER_ADMIN":
					// 超级管理员拥有所有权限喵~
					this.userManage = true;
					this.requirementCreate = true;
					this.requirementCountersign = true;
					this.requirementAnalyze = true;
					this.requirementReview = true;
					this.requirementDesign = true;
					this.requirementSchedule = true;
					this.requirementDevelop = true;
					this.requirementTest = true;
					this.requirementCheck = true;
					this.storyCreate = true;
					this.storyProgress = true;
					this.storyTest = true;
					this.issueCreate = true;
					this.issueConfirm = true;
					this.issueHandle = true;
					this.issueTest = true;
					this.issueCheck = true;
					this.retrospectiveCreate = true;
					break;
			}
		}
		// 更新到 localStorage 喵~
		this.updatePermission();
	}

	/**
	 * 判断需求是否可编辑
	 * @param status
	 */
	canEditRequirement(status: string) {
		switch(status) {
			case 'REVIEWING':
				return this.requirementCreate;
			case 'COUNTERSIGNING':
				return this.requirementCountersign;
			case 'REQUIREMENT_ANALYSIS':
				return this.requirementAnalyze;
			case 'REQUIREMENT_REVIEWING':
				return this.requirementReview;
			case 'DESIGNING':
				return this.requirementDesign;
			case 'SCHEDULING':
				return this.requirementSchedule;
			case 'DEVELOPING':
				return this.requirementDevelop;
			case 'TESTING':
				return this.requirementTest;
			case 'CHECKING':
				return this.requirementCheck;
		}
		return false;
	}
}
export default PermissionStore;