import { css } from 'lit';

export const styles = css`
  :host {
    --bg-sidebar: #f8f9fa;
    --border-color: #e5e7eb;
    --accent-color: #111827;
    font-family: system-ui, sans-serif;
    display: block; height: 100vh; overflow: hidden; background: white; color: #333;
  }
  .layout { display: flex; height: 100%; }
  .sidebar { width: 280px; background: var(--bg-sidebar); border-right: 1px solid var(--border-color); padding: 20px; display: flex; flex-direction: column; gap: 15px; }
  .content { flex: 1; display: flex; flex-direction: column; }
  
  /* Tabs */
  .tabs { display: flex; border-bottom: 1px solid var(--border-color); padding: 0 20px; gap: 20px; }
  .tab-btn { background: none; border: none; padding: 15px 0; cursor: pointer; color: #666; border-bottom: 2px solid transparent; }
  .tab-btn.active { color: var(--accent-color); border-bottom-color: var(--accent-color); font-weight: bold; }
  
  /* Viewport */
  .viewport { flex: 1; position: relative; overflow: auto; }
  .preview-box { height: 100%; display: flex; align-items: center; justify-content: center; background-image: radial-gradient(#e5e7eb 1px, transparent 1px); background-size: 20px 20px; }
  
  /* Inputs */
  label { display: block; font-size: 0.8rem; font-weight: bold; margin-bottom: 5px; }
  input, select { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
  
  /* Code & Docs */
  .code-box { background: #1e1e1e; color: #d4d4d4; padding: 20px; min-height: 100%; margin: 0; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { text-align: left; padding: 10px; border-bottom: 1px solid #eee; }
  
  /* Toast */
  .toast-container { position: absolute; bottom: 20px; right: 20px; display: flex; flex-direction: column; gap: 10px; pointer-events: none; }
  .toast { background: #1f1f1f; color: white; padding: 10px 20px; border-radius: 4px; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
`;