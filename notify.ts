import notifier from 'node-notifier';
import { load_config } from './lib';

const script_name = process.argv[2];
const dir = process.argv[3];
const config = await load_config(dir);

for await (const line of console) {
	notifier.notify({
		title: config.title ?? script_name,
		subtitle: config.subtitle,
		open: config.open,
		sound: config.sound ?? true,
		message: line,
	});
}
