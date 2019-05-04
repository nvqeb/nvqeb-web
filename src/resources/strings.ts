// import * as api from "@startapp/nvqeb-user-api";
import LocalizedStrings from "localized-strings";

const strings = new LocalizedStrings({
    ptBR: {
        components: {
            image: {
                addImage: "Imagem",
                cropImage: "Recortar",
                cancel: "Cancelar",
                error: {
                    missingCrop: "Corte da imagem não foi definido.",
                },
            },
            dialogs: {
                logout: {
                    title: "Logout",
                    message: "Tem certeza que deseja sair?",
                },
                fieldValidation: {
                    title: "Validação",
                    message: (fieldName: string) => `O campo "${fieldName}" está incorreto.`,
                },
            },
            table: {
                create: "Criar",
                delete: "Deletar",
                edit: "Editar",
                editAndDelete: "Editar / Deletar",
            },
            filter: {
                addFilter: "Adicionar filtro",
                apply: "Aplicar",
            },
            datePicker: {
                invalidDate: "Data inválida",
            },
            quill: {
                create: "Criar",
                save: "Salvar",
            },
        },
        navbar: {
            title: "Não vá que é barril",
            home: "Home",
            logout: "Sair",
        },
        pages: {
            dashboard: {
                professors: {
                    title: "Lista de professores",
                    path: "/",
                    professorCard: {
                        avatarAlt: (name: string) => `Avatar de ${name}`,
                        hardness: (hardness: number) => `Dificuldade: ${hardness}`,
                    },
                },
                professor: {
                    title: "Página do professor",
                    path: (professorId: string) => `/professors/${professorId}`,
                    professorInfo: {
                        avatarAlt: (name: string) => `Avatar de ${name}`,
                        hardness: (hardness: number) => `Dificuldade: ${hardness}`,
                        classes: {
                            classCard: {
                                scores: {
                                    min: (score: number) => `Menor nota: ${score}`,
                                    mean: (score: number) => `Nota média: ${score}`,
                                    max: (score: number) => `Nota máxima: ${score}`,
                                },
                            },
                        },
                    },
                },
            },
        },
        error: {
            default: "Erro de conexão",
        },
        common: {
            yes: "Sim",
            no: "Não",
            noMoreResults: "Sem mais resultados",
        },
        format: {
            date: "dd/MM/yyyy",
        },
    },
});

// api.setStrings(strings);

export default strings;
