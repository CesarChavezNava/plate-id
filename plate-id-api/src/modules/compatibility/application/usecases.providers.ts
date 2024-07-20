import { CompatibilityCalculator } from './calculate-compatibility.usecase';

export const CompatibilityUseCasesProviders = [
  {
    provide: 'ForCalculatingCompatibility',
    useClass: CompatibilityCalculator,
  },
];
