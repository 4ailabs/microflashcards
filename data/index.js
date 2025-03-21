import { bacterias } from './bacterias';
import { virusADN } from './virusADN';
import { virusARN } from './virusARN';
import { parasitos } from './parasitos';
import { hongos } from './hongos';

export function getAllMicro() {
  return [
    ...bacterias,
    ...virusADN,
    ...virusARN,
    ...parasitos,
    ...hongos
  ];
}

export { bacterias, virusADN, virusARN, parasitos, hongos };