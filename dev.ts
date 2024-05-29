import { watch } from 'node:fs/promises';
import { src_dir, sync_crontab } from './lib';

const watcher = watch(src_dir, { recursive: true });

for await (const event of watcher) {
	console.log(`Detected ${event.eventType} in ${event.filename}`);
	await sync_crontab();
}
