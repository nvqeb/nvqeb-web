// MARK: Mobx
import { action, observable } from "mobx";

// MARK: Stores
import { uiStore } from "../_rootStore";

export interface IClass {
	name: string;
	id: string;
	scores: {
		min: number;
		mean: number;
		max: number;
	};
}

export interface IProfessor {
	id: string;
	name: string;
	avatar: string;
	hardness: number;
	tags: string[];
	classes: IClass[];
}

export default class ProfessorsStore {
    @observable public selectedProfessor: IProfessor | null = null;
    @observable public professors: IProfessor[] = [
        {
			id: "1",
			name: "Julio Guedes",
			avatar: "/thor.jpg",
			hardness: 10,
			tags: ["Carrasco", "Possível", "Carrasco", "Possível", "Carrasco", "Possível", "Carrasco", "Possível"],
			classes: [
				{
					name: "Física 1",
					id: "FIS121",
					scores: {
						min: 0,
						mean: 2,
						max: 6,
					},
				},
				{
					name: "Física 2",
					id: "FIS122",
					scores: {
						min: 0,
						mean: 1.5,
						max: 5,
					},
				},
				{
					name: "Física 3",
					id: "FIS123",
					scores: {
						min: 0,
						mean: 1.5,
						max: 4,
					},
				},
			],
        },
        {
			id: "2",
			name: "Vaninha",
            avatar: "/gamora.jpeg",
            hardness: 2,
			tags: ["Mãe", "Ajuda bastante", "Aulas legais"],
			classes: [
				{
					name: "Seminários de Introdução",
					id: "SIC001",
					scores: {
						min: 5,
						mean: 9,
						max: 10,
					},
				},
			],
		},
		{
			id: "3",
			name: "Mathieu",
            avatar: "/hulk.jpg",
            hardness: 10,
			tags: ["Desista"],
			classes: [
				{
					name: "Cálculo A",
					id: "MATA01",
					scores: {
						min: 0,
						mean: 3,
						max: 5,
					},
				},
			],
		},
		{
			id: "4",
			name: "George",
            avatar: "/miranha.jpg",
            hardness: 7,
			tags: ["Brother"],
			classes: [
				{
					name: "Projeto de Circuitos Lógicos",
					id: "MATA48",
					scores: {
						min: 4,
						mean: 7,
						max: 9,
					},
				},
			],
		},
    ];

    @action
    public selectProfessor = (professorId: string) => {
        this.selectedProfessor = this.professors.find((professor) => professor.id === professorId) || null;
    }
}
