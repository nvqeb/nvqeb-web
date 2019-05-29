// MARK: API
import * as api from "@startapp/nvqeb-user-api";

// MARK: Mobx
import { action, observable } from "mobx";

// MARK: Resources
import strings from "../../resources/strings";

// MARK: Stores
import { uiStore } from "../_rootStore";

export default class SchoolClassesStore {
    @observable public selectedSchoolClass: api.SchoolClass | null = null;
	@observable public loading: boolean = false;

	@observable public selectedSchoolClassProfessores: api.Professor[] = [];

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
}
