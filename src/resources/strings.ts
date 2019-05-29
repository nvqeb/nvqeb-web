// import * as api from "@startapp/nvqeb-user-api";
import LocalizedStrings from "localized-strings";

const strings = new LocalizedStrings({
    ptBR: {
        textFields: {
            commentary: "Comentário",
        },
        buttons: {
            next: "Próximo",
            previous: "Anteior",
            commentary: "Comentar",
        },
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
                subjectsInfo: {
                    professorsContainer: {
                        title: "Professores da matéria",
                        professorCard: {
                            avatarAlt: (name: string) => `Avatar de ${name}`,
                            hardness: (hardness: number) => `Dificuldade: ${hardness}`,
                        },
                    },
                    commentariesContainer: {
                        title: "Comentários sobre a matéria",
                    },
                },
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
                comments: {
                    name: ["Arthur Fernandes", "Filipe Arlindo", "Thiago Mariano"],
                    commentary: ["Excelente aula, finalmente entendi o assunto!",
                                 "Excelente aula, mas a prova é barril",
                                 "Barril, ném vá"],
                },
            },
            login: {
                email: "Email",
                password: "Password",
                loginButton: "Entrar",
                resetPasswordButton: "Recuperar Senha",
            },
        },
        error: {
            default: "Erro de conexão",
            noMoreResults: "Sem mais resultados",
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
},
);

// api.setStrings(strings);

export default strings;
