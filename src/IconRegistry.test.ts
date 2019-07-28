const ITERATION: number = 2

// tslint:disable-next-line: no-implicit-dependencies
import { AtomicTestRegistry, iterate } from 'jest-atomic'

// TestScope :: START
import { IconRegistry, mockExtractor, mockExtractorSync } from './IconRegistry'

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
