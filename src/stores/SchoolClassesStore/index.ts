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

	@observable public selectedSchoolClassProfessores: api.Professor[] = [];

	@observable public commentary: string = "";
	@observable public commentaries = [
		{
			user: {
				name: "Arthur Fernandes",
				avatar: null as {url: string} | null,
			},
			commentary: "Excelente aula, finalmente entendi o assunto!",
		},
		{
			user: {
				name: "Filipe Arlindo",
				avatar: null as {url: string} | null,
			},
			commentary: "Excelente aula, mas a prova é barril",
		},
		{
			user: {
				name: "Thiago Mariano",
				avatar: null as {url: string} | null,
			},
			commentary: "Barril, ném vá",
		},
	];

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
	public getProfessoresForSelectSchoolClass = async () => {
		if (this.loading || !this.selectedSchoolClass) {
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
	public sendCommentary = async () => {
		this.commentaries = [
			{
				user: {
					name: "Arthur Fernandes",
					avatar: null as {url: string} | null,
				},
				commentary: this.commentary,
			},
			...this.commentaries,
		];

		this.commentary = "";
	}
}
