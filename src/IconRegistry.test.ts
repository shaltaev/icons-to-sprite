function setIteration(): number | undefined {
    if (process.env.ITERATION === undefined) {
        return undefined
    }
    const iteration: number = parseInt(process.env.ITERATION, 10)
    if (isNaN(iteration)) {
        return undefined
    }

    return iteration
}

const ITERATION: number | undefined = setIteration()

import { IconRegistry } from './IconRegistry'
import { log } from 'util'

// TestScope
const reg: IconRegistry = new IconRegistry()

type atomicTestRegistryType = {
    tests: {
        [testID: number]: {
            message: string
            handler: jest.ProvidesCallback
        }
    }
    count: number

    addTest(testID: number, message: string, handler: Function): true | Error
    runTests(...allTest: number[]): void
}

/**
 * Registry for all test
 */
class AtomicTestRegistry implements atomicTestRegistryType {
    count: number
    tests: atomicTestRegistryType['tests']
    constructor() {
        this.tests = {}
        this.count = 0
    }

    addTest(
        testID: number,
        message: string,
        handler: jest.ProvidesCallback
    ): true | Error {
        if (testID in this.tests) {
            return new Error('Test with this id exist')
        }

        this.tests = {
            ...this.tests,
            [testID]: {
                message,
                handler
            }
        }
        this.count += 1

        return true
    }

    runTests(...allTest: number[]): void {
        allTest.forEach((testID: number) => {
            if (!(testID in this.tests)) {
                throw new Error(`Test with ID ${testID} not found`)
            }

            test(this.tests[testID].message, this.tests[testID].handler)
        })
    }
}

const testRegistry: AtomicTestRegistry = new AtomicTestRegistry()

// ALL TESTS :: START

// Added 2019-07-28
{
    testRegistry.addTest(0, 'Add icon not implement', () => {
        expect(reg.addIconSync('', '', '')).toStrictEqual(
            Error('No implemented yet')
        )
    })
    testRegistry.addTest(1, 'Remove icon implement', () => {
        expect(reg.removeIconSync('', '', '')).toStrictEqual(
            Error('No implemented yet')
        )
    })
    testRegistry.addTest(2, 'Get Icon not implement', () => {
        expect(reg.getIconSync('', '', '')).toStrictEqual([
            Error('No implemented yet'),
            undefined
        ])
    })
    testRegistry.addTest(3, 'Get Symbol implement', () => {
        expect(reg.getSymbolSync('', '', '')).toStrictEqual([
            Error('No implemented yet'),
            undefined
        ])
    })
    testRegistry.addTest(4, 'Compile Sprite not implement', () => {
        expect(reg.compileSpriteSync()).toStrictEqual(
            Error('No implemented yet')
        )
    })
    testRegistry.addTest(5, 'Add plugin not implement', () => {
        expect(reg.addPlugin()).toStrictEqual(Error('No implemented yet'))
    })
    testRegistry.addTest(6, 'Remove plugin not implements', () => {
        expect(reg.removePlugin()).toStrictEqual(Error('No implemented yet'))
    })
}

// ALL TESTS :: END
if (ITERATION === undefined) {
    throw new Error('please set valid env ITERATION')
}

function filterArrayFromDeprecated(
    array: number[],
    deprecated: number[]
): number[] {
    function removeAllDeprecated(item: number): boolean {
        return !deprecated.includes(item)
    }

    return array.filter(removeAllDeprecated)
}

let toTest: number[] = []

if (ITERATION >= 0) {
    const deprecatedTest: number[] = []
    toTest = filterArrayFromDeprecated(toTest, deprecatedTest)
    const newTest: number[] = [0, 1, 2, 3, 4, 5, 6]
    toTest = [...toTest, ...newTest]

    if (ITERATION === 0) {
        describe('000 Nothing not implement', () => {
            testRegistry.runTests(...toTest)
        })
    }
}

if (ITERATION >= 1) {
    const deprecatedTest: number[] = [5]
    toTest = filterArrayFromDeprecated(toTest, deprecatedTest)
    const newTest: number[] = [8]
    toTest = [...toTest, ...newTest]

    if (ITERATION === 1) {
        describe('001 Nothing not implement, except Add plugin', () => {
            testRegistry.runTests(...toTest)
        })
    }
}
