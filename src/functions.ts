import { satisfies } from 'semver';
import { createHash } from 'crypto';

interface CustomFunctions {
  versionCheck: any;
  randomPerc: any;
  randomPercRange: any;
  after: any;
  before: any;
  match: any;
  concatString: any;
  stripWhitespaces: any;
  [key: string]: any;
}

export const customFunctions: CustomFunctions = {
  versionCheck: (versionStr: string, condition: string): boolean => {
    return satisfies(versionStr, condition);
  },
  randomPerc: (percent: number, reference: any, seed: number): boolean => {
    return customFunctions.randomPercRange(0, percent, reference, seed);
  },
  randomPercRange: (
    fromPercent: number,
    toPercent: number,
    reference: any,
    seed: number,
  ): boolean => {
    const fromPerc = Math.floor((fromPercent * 65535) / 100);
    const toPerc = Math.floor((toPercent * 65535) / 100);
    const refStr = `${seed}${String(reference)}`;
    const hash = createHash('md5').update(refStr).digest();
    // Pega os primeiros 2 bytes como uint16 (big endian)
    const hv = hash.readUInt16BE(0);
    console.log(`fromPerc: ${fromPerc}, toPerc: ${toPerc}, hv: ${hv}`);
    return hv >= fromPerc && hv < toPerc;
  },
  after: (datestr: string): boolean => {
    const time1: Date = new Date(datestr);
    if (isNaN(time1.getTime())) {
      throw new Error(`Date ${datestr} is invalid.`);
    }
    return new Date() > time1;
  },
  before: (datestr: string): boolean => {
    const time1: Date = new Date(datestr);
    if (isNaN(time1.getTime())) {
      throw new Error(`Date ${datestr} is invalid.`);
    }
    return new Date() < time1;
  },
  match: (value: string, regex: string): boolean => {
    const re: RegExp = new RegExp(regex);
    return re.test(value);
  },
  concatString: (...element: string[]): string => {
    return element.join('');
  },
  stripWhitespaces: (str: string): string => {
    return str.replace(/\s/g, '');
  },
};
