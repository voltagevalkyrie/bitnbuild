export function maybeShowApiKeyBanner(key, action = `enter it at the top of <code>main.js</code>`) {
    if (key === 'TODO') {
      let banner = document.createElement('div');
      banner.className = 'api-key-banner';
      banner.innerHTML = `
        To get started with the Gemini API,
        <a href="https://g.co/ai/idxGetGeminiKey" target="_blank">
        get an API key</a> (Ctrl+Click) and ${action}
        <button class="dismiss-banner" style="margin-left: auto;">Dismiss</button>
      `;
  
      // Append banner to body
      document.body.prepend(banner);
      
      // Add dismiss functionality
      banner.querySelector('.dismiss-banner').onclick = () => {
        banner.remove();
      };
    }
  }
  