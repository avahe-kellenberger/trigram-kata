import { Trigram } from './trigram'

export class TrigramGenerator {
  public readonly trigramMap: Map<string, Trigram>

  constructor(input: string) {
    if (!this.isInputValid(input)) {
      throw new Error('Input cannot be empty')
    }
    this.trigramMap = TrigramGenerator.generateTrigramMap(input)
  }

  private isInputValid(input: string): boolean {
    return input != null && input.length > 0
  }

  public generateRandomText(): string {
    return TrigramGenerator.generateRandomText(this.trigramMap)
  }

  private static getRandomTrigramValue(trigram: Trigram): string {
    const length: number = trigram.values.length
    const randomIndex: number = Math.floor(Math.random() * length)
    return trigram.values[randomIndex]
  }

  public static generateTrigramMap(input: string): Map<string, Trigram> {
    const words: string[] = input.split(' ')
    if (words.length < 3) {
      throw new Error('Need at least three words to generate trigrams.')
    }
    const trigramMap: Map<string, Trigram> = new Map()
    // Length - 2 ensures we're grabbing the last available set of three words.
    for (let i = 0; i < words.length - 2; i++) {
      const trigram: Trigram = Trigram.create(words.slice(i, i + 3))
      const key: string = trigram.key
      const existingTrigram: Trigram | undefined = trigramMap.get(key)
      if (existingTrigram != null) {
        trigram.values.forEach(value => existingTrigram.values.push(value))
      } else {
        trigramMap.set(key, trigram)
      }
    }
    return trigramMap
  }

  public static generateRandomText(trigramMap: Map<string, Trigram>): string {
    const generated: string[] = []
    let trigram: Trigram | undefined = trigramMap.values().next().value
    while (trigram != undefined) {
      const nextWord: string = TrigramGenerator.getRandomTrigramValue(trigram)
      generated.push(nextWord)

      // Generate a new key used to find the following trigram.
      const nextKey: string = Trigram.createKeyFrom(trigram!.key, nextWord)
      trigram = trigramMap.get(nextKey)
    }
    return generated.join(' ')
  }
}
