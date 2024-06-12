import { $ } from 'bun';

const { DESKTOP_FOLDER, HARD_DRIVE_FOLDER } = process.env;

console.log('Starting backup...');

await $`
  rsync -r 
    --include='**.gitignore' 
    --exclude='**.git' 
    --filter=":- .gitignore" 
    ${DESKTOP_FOLDER} 
    ${HARD_DRIVE_FOLDER}
`;

console.log('Backup complete!');
