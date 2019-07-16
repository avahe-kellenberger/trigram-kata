import { TrigramGenerator } from '../../src/trigram-generator'
import { Trigram } from '../../src/trigram'

describe('TrigramGenerator', () => {
  it('throws when given invalid constructor params', () => {
    expect(() => new TrigramGenerator('')).toThrow()
    expect(() => new TrigramGenerator('Only two')).toThrow()
    expect(() => new TrigramGenerator('Three words now')).not.toThrow()
  })
  it('should generate the appropriate trigrams', () => {
    const input = 'I wish I may I wish I might'
    const trigramMap: Map<string, Trigram> = TrigramGenerator.generateTrigramMap(input)
    expect(trigramMap.get('i wish')!.values).toEqual(['i', 'i'])
    expect(trigramMap.get('wish i')!.values).toEqual(['may', 'might'])
    expect(trigramMap.get('may i')!.values).toEqual(['wish'])
    expect(trigramMap.get('i may')!.values).toEqual(['i'])
  })
})
