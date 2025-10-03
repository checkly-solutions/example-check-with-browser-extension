const div = document.createElement('div');
div.textContent = 'Hello, this is a browser extension!';
div.style.cssText = 'background: #4CAF50; color: white; padding: 10px; text-align: center; font-family: Arial, sans-serif; font-size: 16px; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999;';
document.body.style.marginTop = '40px';
document.body.insertBefore(div, document.body.firstChild);