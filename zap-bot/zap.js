const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Initiating process...');

  const url = 'https://web.whatsapp.com/';
  await page.goto(url , {waitUntil: 'domcontentloaded'});
  await page.waitForSelector('._2I5ox');

  await page.waitForSelector('._21S-L');

  const searchBox = await page.$('._3sHED');
  if (searchBox) {
    await page.click('._2vDPL');
    await searchBox.type('Teste de Js', {delay: 100}); // Substitua pelo nome de contato desejado (não remova as aspas)
    await page.waitForTimeout(2500);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2500);
  }

  await page.waitForSelector('.lexical-rich-text-input');
  const textArea = await page.$('.lexical-rich-text-input');

  let richTextInputCount = await page.evaluate(() => document.querySelectorAll('.lexical-rich-text-input').length);

  while (richTextInputCount === 1) {
    await page.waitForTimeout(500);
    console.log('Aguardando a caixa de escrita ser liberada');
    richTextInputCount = await page.evaluate(() => document.querySelectorAll('.lexical-rich-text-input').length);
  }
  
  await page.waitForTimeout(5000);

  if (textArea) {
    await textArea.type('Teste de bot'); // Substitua pela mensagem desejada (não remova as aspas)
    await page.keyboard.press('Enter');
    console.log('Mensagem enviada');
    await page.keyboard.press('Escape');
  } else {
    console.error('Elemento de entrada de texto não encontrado.');
  }

  await page.waitForTimeout(1000);
  await page.click('[data-icon="menu"]');
  await page.waitForTimeout(500);
  await page.click('[aria-label="Configurações"]');
  await page.waitForTimeout(500);
  await page.click('[title="Desconectar"]');
  await page.waitForTimeout(500);
  await page.click('button:has-text("Desconectar")');
  console.log('Desconectado!');
  
  await page.waitForTimeout(5000);
  await browser.close();
})();