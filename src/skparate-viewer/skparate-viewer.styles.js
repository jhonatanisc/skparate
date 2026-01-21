import { css } from 'lit';

export const styles = css`
:host {
  --bg-main: #fdfaf6;
  --bg-dark: #2f2433;
  --bg-panel: #3a2e3f;
  --bg-accent: #9E2B25;

  --code-bg: #1e1b22;

  --text-main: #2b2b2b;
  --text-light: #ffffff;
  --text-muted: rgba(255,255,255,.65);

  --border-soft: rgba(0,0,0,.08);

  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  display: block;
  height: 100vh;
  background: var(--bg-main);
  pading: 0;
  margin: 0;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-dark);
  color: var(--text-light);
  border-bottom: 1px solid var(--border-soft);
}

.header h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.header button {
  background: var(--bg-accent);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.header button:hover {
  background: #7a1f1c;
}

/* Component Banner */
.component-banner {
  background: var(--bg-panel);
  color: var(--text-light);
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid var(--border-soft);
}

/* Layout */
.layout {
  display: flex;
  height: calc(100vh - 64px); /* Ajustar por header */
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: var(--bg-panel);
  color: var(--text-light);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Labels */
label {
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Inputs & selects */
input,
select {
  height: 38px;
  padding: 0 10px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  background: #ffffff;
  color: #000;
}

/* Checkbox */
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.checkbox-item input {
  width: 16px;
  height: 16px;
}

/* Content */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 32px;
  padding: 0 32px;
  background: var(--bg-dark);
}

.tab-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,.6);
  padding: 18px 0;
  font-size: 12px;
  letter-spacing: .12em;
  text-transform: uppercase;
  cursor: pointer;
}

.tab-btn.active {
  color: white;
  border-bottom: 2px solid var(--bg-accent);
}

/* Viewport */
.viewport {
  flex: 1;
  overflow: auto;
  background: var(--bg-main);
}

/* Preview */
.preview-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0);
  background-size: 20px 20px;
}

/* Code */
.code-box {
  background: var(--code-bg);
  color: #e6e6e6;
  padding: 32px;
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 13px;
  line-height: 1.6;
}

/* Docs */
.docs {
  padding: 32px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th {
  text-align: left;
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #6b6b6b;
  padding-bottom: 12px;
}

td {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-soft);
}

.type-tag {
  background: var(--bg-panel);
  color: var(--text-light);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Toast */
.toast-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.toast {
  background: var(--bg-dark);
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 13px;
}
`;
