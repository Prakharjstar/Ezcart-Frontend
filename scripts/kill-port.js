const { execSync } = require('child_process');
const os = require('os');

const port = 3000;

try {
  if (os.platform() === 'win32') {
    // Windows: Use netstat and taskkill
    try {
      const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, { encoding: 'utf8' });
      const lines = output.trim().split('\n');

      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[4];
          try {
            execSync(`taskkill /PID ${pid} /F`, { stdio: 'inherit' });
            console.log(`Killed process ${pid} on port ${port}`);
          } catch (error) {
            // Process might already be gone
          }
        }
      }
    } catch (error) {
      // No process found on port, which is fine
    }
  } else {
    // Unix-like systems: Use lsof and kill
    try {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'inherit' });
      console.log(`Killed processes on port ${port}`);
    } catch (error) {
      // No process found on port, which is fine
    }
  }
} catch (error) {
  console.log(`No process found on port ${port}, continuing...`);
}