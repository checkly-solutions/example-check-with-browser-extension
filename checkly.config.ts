import { Frequency } from 'checkly/constructs'

const config = {
 projectName: 'Browser Extension Example',
 logicalId: 'browser-extension-example',
 checks: {
   activated: true,
   muted: false,
   runtimeId: '2025.04',
   frequency: Frequency.EVERY_5M,
   locations: ['us-east-1', 'eu-west-1'],
   tags: ['website', 'api'],
   checkMatch: '**/__checks__/**/*.check.ts',
   ignoreDirectoriesMatch: [],
   browserChecks: {
     frequency: Frequency.EVERY_10M,
     testMatch: '**/tests/**/*.spec.ts',
   },
 },
 cli: {
   runLocation: 'eu-west-1',
 }
}

module.exports = config;