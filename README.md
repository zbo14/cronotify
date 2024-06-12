# cronotify

Easily write and schedule cron jobs with desktop notifications.

## Install

Clone the repository and `bun install`.

## Usage

### `bun start`

Adds your cron tab definitions to crontab.

### `bun dev`

Watches for changes in your cron job definitions and automatically adds them to crontab.

`bun start` and `bun dev` *won't* add duplicate cron job definitions nor remove cron jobs that aren't associated with `cronotify`.

### `bun format`

Formats all the TypeScript files in the root and `src` directories.

## Folder structure

Cron jobs are defined in `src/`.

Here's an example folder structure:

```
.
├── cron-job-1
│   ├── .env
│   ├── config.json
│   └── index.ts
├── cron-job-2
│   ├── config.json
│   └── index.ts
etc.
```

Each cron job folder contains:

### `config.json`

This file specifies when the cron job is run and includes several notification options.

```ts
export interface Config {
  schedule: string;         // when cron job runs (unix-cron string format)
  title?: string;           // notiifcation title, default: folder name
  subtitle?: string;        // notification subtitle
  sound?: boolean | string; // notification sound, default: true
  open?: string;            // notification opens URL on click
}
```

### `index.ts`

The bun script the cron job runs.

### `.env` (optional)

Contains environment variables consumed by `index.ts` in the same folder.
