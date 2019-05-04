import { cpf } from "cpf-cnpj-validator";

export function isEmpty(value: string) {
    return value.trim().length === 0;
}

export function validateCpf(cpfString: string): boolean {
    return !cpf.isValid(onlyNumbersAndTrim(cpfString), undefined);
}

export function onlyNumbersAndTrim(value: string): string {
    return value.replace(/[^0-9]/g, "").trim();
}
