import { $ } from 'bun';
import { readdir } from 'node:fs/promises';
import path from 'path';

export const root_dir = import.meta.dir;
export const src_dir = path.join(root_dir, 'src');
export const notify_path = path.join(root_dir, 'notify.ts');

export interface Config {
	title?: string;
	icon?: string;
	subtitle?: string;
	sound?: boolean | string;
	schedule: string;
	open?: string;
}

export async function load_config(dir: string): Promise<Config> {
	const config: Config = await Bun.file(path.join(dir, 'config.json')).json();

	return config;
}

export async function sync_crontab(): Promise<void> {
	const [dir_names, bun_path] = await Promise.all([
		readdir(src_dir),
		$`which bun`.text(),
		// Remove cronotify jobs from crontab
		$`crontab -l 2> /dev/null | grep -v -F "/cronotify/" | crontab -`.catch(
			() => {},
		),
	]);

	const promises = dir_names.map(async (dir_name) => {
		const dir = path.join(src_dir, dir_name);
		const script_path = path.join(dir, 'index.ts');
		const env_path = path.join(dir, '.env');
		const cmd = `${bun_path} --env-file ${env_path} ${script_path} | ${bun_path} ${notify_path} ${dir_name} ${dir}`;
		const { schedule }: Config = await load_config(dir);

		return `${schedule} ${cmd}`;
	});

	const lines = await Promise.all(promises);

	// Add cronotify jobs to crontab
	await $`( crontab -l 2> /dev/null; echo "${lines.join('\n')}" ) | crontab -`;
}
