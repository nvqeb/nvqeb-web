// Libraries
import { toRegex } from "diacritic-regex";
const regex = toRegex();

export function getRegexSearchStringOptionsFromRawString(rawString: string): RegExp[] {
    return rawString.split(/\s+/).map((q) =>
        regex(q.toLowerCase().replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")),
    );
}
