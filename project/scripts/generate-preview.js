import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generatePreview() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to match OG image dimensions
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 2 // For better quality
    });

    // Read the HTML template
    const htmlPath = join(__dirname, '..', 'src', 'social-preview.html');
    const html = await fs.readFile(htmlPath, 'utf8');
    
    // Set content and wait for fonts to load
    await page.setContent(html, {
      waitUntil: ['networkidle0', 'load']
    });

    // Wait for fonts to be properly loaded
    await page.evaluateHandle('document.fonts.ready');

    // Create the public directory if it doesn't exist
    const publicDir = join(__dirname, '..', 'public');
    await fs.mkdir(publicDir, { recursive: true });

    // Take the screenshot
    await page.screenshot({
      path: join(publicDir, 'spider-ai-social.png'),
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 630
      }
    });

    console.log('Social preview image generated successfully!');
  } catch (error) {
    console.error('Error generating preview:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePreview();