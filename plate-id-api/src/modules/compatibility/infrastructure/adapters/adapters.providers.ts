import { OpeniaCompatibilityAIService } from './ai/openia-compatibility-ai.service';

export const CompatibilityAdaptersProviders = [
  {
    provide: 'CompatibilityAIService',
    useClass: OpeniaCompatibilityAIService,
  },
];
