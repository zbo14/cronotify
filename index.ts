import { sync_crontab } from './lib';

await sync_crontab();

console.log('Synced crontab!');
