import { readFileSync } from 'fs'

type List = import('../types/List').List

export function getListFromFile(fileName: string): List {
    const result: List = {}

    const fileAsString: string = readFileSync(fileName, {encoding: 'utf-8'})
    const lines: string[] = fileAsString.split(/\r?\n/)

    lines.forEach((line: string) => {    
        const lineParse: string[] = line.split(' >>> ')            
        if ((0 in lineParse) && (1 in lineParse)) {
            if (!(lineParse[0] in result)) {                    
                result[lineParse[0]] = []
            }
            result[lineParse[0]].push(lineParse[1])
        }
    })

    return result
}
