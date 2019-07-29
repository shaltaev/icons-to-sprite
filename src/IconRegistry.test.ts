const ITERATION: number = 4

// tslint:disable-next-line: no-implicit-dependencies
import { AtomicTestRegistry, iterate } from 'jest-atomic'

// TestScope :: START
import { IconRegistry } from './IconRegistry'
import { mockExtractorSync } from './mockExtractorSync'
import { mockExtractor } from './mockExtractor'

const reg: IconRegistry = new IconRegistry()
// TestScope :: END

const testRegistry: AtomicTestRegistry = new AtomicTestRegistry()

// ALL TESTS :: START

// ITERATION 0 :: Test 0 - 6 :: Added 2019-07-28
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
        expect(
            reg.addPlugin('test', {
                extractor: mockExtractor,
                extractorSync: mockExtractorSync
            })
        ).toStrictEqual(Error('No implemented yet'))
    })
    testRegistry.addTest(6, 'Remove plugin not implements', () => {
        expect(reg.removePlugin('test')).toStrictEqual(
            Error('No implemented yet')
        )
    })
}

// ITERATION 1 :: Test 7 :: Added 2019-07-28
{
    testRegistry.addTest(7, 'Implementation of Add Plugin', () => {
        expect(
            reg.addPlugin('test', {
                extractor: mockExtractor,
                extractorSync: mockExtractorSync
            })
        ).toBe(true)

        expect(
            reg.addPlugin('test', {
                extractor: mockExtractor,
                extractorSync: mockExtractorSync
            })
        ).toStrictEqual(Error('Plugin already registered'))

        expect('test' in reg.plugins).toBe(true)
    })
}

// ITERATION 2 :: Test 8 :: Added 2019-07-28
{
    testRegistry.addTest(8, 'Implementation of Remove Plugin', () => {
        if (!('test' in reg.plugins)) {
            reg.addPlugin('test', {
                extractor: mockExtractor,
                extractorSync: mockExtractorSync
            })
        }
        expect('test' in reg.plugins).toBe(true)
        expect(reg.removePlugin('test')).toBe(true)
        expect(reg.removePlugin('test')).toStrictEqual(
            Error('Plugin not exist in registry')
        )
        expect('test' in reg.plugins).toBe(false)
    })
}

// ITERATION 3 :: Test 9 - :: Added 2019-07-28
{
    testRegistry.addTest(9, 'Implementation of Add Icon Sync', () => {
        if (!('test' in reg.plugins)) {
            reg.addPlugin('test', {
                extractor: mockExtractor,
                extractorSync: mockExtractorSync
            })
        }
        expect(reg.addIconSync('never', 'some', 'alert')).toStrictEqual(
            Error('Incorrect Set')
        )
        expect('test' in reg.plugins).toBe(true)
        expect(reg.addIconSync('test', 'primary', 'alert')).toBe(true)
        expect('test__primary__alert' in reg.icons).toBe(true)
        expect(reg.addIconSync('test', 'primary', 'alert')).toStrictEqual(
            Error('Icon is already added')
        )
        expect(reg.addIconSync('test', 'never', 'alert')).toStrictEqual(
            Error('Icon not exist in this set and/or group')
        )
    })
}

// ITERATION 4 :: Test 10 - :: Added 2019-07-28
{
    testRegistry.addTest(10, 'Implementation of Remove Icon Sync', () => {
        if (!('test' in reg.plugins)) {
            reg.addPlugin('test', {
                extractor: mockExtractor,
                extractorSync: mockExtractorSync
            })
        }
        if (!('test__primary__alert' in reg.icons)) {
            reg.addIconSync('test', 'primary', 'alert')
        }

        expect(reg.removeIconSync('test', 'primary', 'alert')).toBe(true)
        expect(reg.removeIconSync('test', 'primary', 'alert')).toStrictEqual(
            Error('Icon not exist in registry')
        )
    })
}

// ALL TESTS :: END
if (ITERATION === undefined) {
    throw new Error('please set valid env ITERATION')
}

let toTest: number[] = []

toTest = iterate({
    testRegistryShadow: testRegistry,
    currentIterate: ITERATION,
    iterateID: 0,
    toTestShadow: toTest,
    outdateTest: [],
    newTest: [0, 1, 2, 3, 4, 5, 6],
    iterationDescription: '000 Nothing not implement'
})

toTest = iterate({
    testRegistryShadow: testRegistry,
    currentIterate: ITERATION,
    iterateID: 1,
    toTestShadow: toTest,
    outdateTest: [5, 6],
    newTest: [7],
    iterationDescription: '001 Nothing not implement, except Add plugin'
})

toTest = iterate({
    testRegistryShadow: testRegistry,
    currentIterate: ITERATION,
    iterateID: 2,
    toTestShadow: toTest,
    outdateTest: [],
    newTest: [8],
    iterationDescription:
        '002 Nothing not implement, except Remove & Add plugin'
})

toTest = iterate({
    testRegistryShadow: testRegistry,
    currentIterate: ITERATION,
    iterateID: 3,
    toTestShadow: toTest,
    outdateTest: [0],
    newTest: [9],
    iterationDescription: '003 Implementing Add icon'
})

toTest = iterate({
    testRegistryShadow: testRegistry,
    currentIterate: ITERATION,
    iterateID: 4,
    toTestShadow: toTest,
    outdateTest: [1],
    newTest: [10],
    iterationDescription: '003 Implementing Add icon'
})
