export function containsNonEnglish(str: string): boolean {
  return /[^\u0000-\u007F]/gm.test(str);
}

// old function
export const isChinese = (input = "") => {
    let re1 = new RegExp("[\u4e00-\u9fff]+")
    let re2 = new RegExp("[，。？！]+")

    if (re1.test(input) || re2.test(input)) return true;
    return false;
}
