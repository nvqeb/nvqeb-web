// MARK: API
import * as api from "@startapp/nvqeb-user-api";

// MARK: Mobx
import { action, observable } from "mobx";

// MARK: Resources
import strings from "../../resources/strings";

// MARK: Stores
import { uiStore } from "../_rootStore";
import VariableChangeHandler from "../../resources/VariableChangeHandler";

export default class SchoolClassesStore extends VariableChangeHandler {
	@observable public selectedSchoolClass: api.SchoolClass | null = null;
	@observable public loading: boolean = false;

	@observable public id: string = "";
	@observable public name: string = "";
	@observable public description: string = "";

	@observable public selectedSchoolClassProfessores: api.Professor[] = [];

	@observable public commentary: string = "";
	@observable public commentaries: api.Commentary[] = [];

	@action
	public selectSchoolClass = async (schoolClassId: string) => {
		if (this.loading) {
			return;
		}

		this.loading = true;

		try {
			this.selectedSchoolClass = await api.getSchoolClass(schoolClassId);
		} catch (e) {
			uiStore.openErrorSnackbar(e);
		} finally {
			this.loading = false;
		}
	}

	@action
	public createSchoolClass = async () => {
		if (this.loading) {
			return;
		}

		this.loading = true;

		try {
			await api.createSchoolClass({
				id: this.id.trim(),
				name: this.name.trim(),
				description: this.description.trim(),
			});
		} catch (e) {
			uiStore.openErrorSnackbar(e);
		} finally {
			this.loading = false;
		}
	}

	@action
	public getProfessoresForSelectSchoolClass = async () => {
		if (this.loading) {
			return;
		}

		if (!this.selectedSchoolClass) {
			return;
		}

		this.loading = true;

		try {
			this.selectedSchoolClassProfessores = await api.getProfessorsFor(this.selectedSchoolClass.id);
		} catch (e) {
			uiStore.openErrorSnackbar(e);
		} finally {
			this.loading = false;
		}
	}

	@action
	public getCommentariesForSchoolClass = async () => {
		if (this.loading) {
            return;
		}

		if (!this.selectedSchoolClass) {
			return;
		}

		this.loading = true;

        try {
			this.commentaries = await api.getCommentariesForSchoolClass(this.selectedSchoolClass.id);
        } catch (e) {
            uiStore.openErrorSnackbar(e);
        } finally {
            this.loading = false;
        }
	}

	@action
	public sendCommentary = async () => {
		if (this.loading) {
            return;
		}

		if (!this.selectedSchoolClass) {
			return;
		}

		this.loading = true;

        try {
			const newCommentary = await api.createCommentary({
				text: this.commentary,
				professorId: null,
				schoolClassId: this.selectedSchoolClass.id,
			});

			this.commentaries = [newCommentary, ...this.commentaries];
        } catch (e) {
            uiStore.openErrorSnackbar(e);
        } finally {
            this.loading = false;
			this.commentary = "";
        }
	}

	@action
	public clear = async () => {
		this.selectedSchoolClass = null;
		this.selectedSchoolClassProfessores = [];
		this.commentaries = [];
	}
}
