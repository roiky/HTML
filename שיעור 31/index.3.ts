function wrapInArray<T>(value: T): [T] {
    return [value]
}


function getItemWithId<ParamType1, ParamType2>(value: ParamType1, a: number, b: ParamType2): { key1: ParamType1, key2: ParamType2 } | undefined {
    if (!a) return;
    return { key1: value, key2: b }
}


const t1 = document.querySelector<SVGElement>("aaa")
const t2 = document.querySelectorAll<SVGElement>("ccc")
const data = Array.from(t2)
const header = document.querySelector<HTMLHeadElement>("HTMLaaa")

function myQuerySelector<T extends Element = Element>(idValue: string): T | null {
    return document.querySelector(idValue)
 } // implement the following function using document.querySelector support Generic
