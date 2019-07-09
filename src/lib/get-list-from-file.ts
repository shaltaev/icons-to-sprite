import { readFileSync } from 'fs'
import { List } from '../types/List';

export const getListFromFile = (fileName: string): List => {
    let result: List = {}

    const fileAsString = readFileSync(fileName, {encoding: 'utf-8'})
    const lines = fileAsString.split(/\r?\n/)

    lines.forEach((line) => {    
        const lineParse = line.split(' >>> ')            
        if ((0 in lineParse) && (1 in lineParse)) {
            if (!(lineParse[0] in result)) {                    
                result[lineParse[0]] = []
            }
            result[lineParse[0]].push(lineParse[1])
        }
    })

    return result
}