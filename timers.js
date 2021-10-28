import fs from 'fs';
import { resolve } from 'path';

fs.open(resolve(__dirname, 'timer.txt'), 'w+', (err, fd) => {
  if (err) return;
  fs.write(fd, 'writinggggggggggggg');
});
