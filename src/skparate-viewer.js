import { LitElement, html, css } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

export class SkparateViewer extends LitElement {
  static get properties() {
    return {
      element: { type: String },
      config: { type: Object },
      _values: { state: true },
      activeTab: { state: true },
      copyStatus: { state: true },
      toasts: { state: true }
    };
  }

  static get styles() {
    return css`
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
  }

  constructor() {
    super();
    this.activeTab = 'preview';
    this.copyStatus = 'Copiar HTML';
    this.toasts = [];
    this._values = {};
  }

  updated(changedProperties) {
    if (changedProperties.has('config') && this.config) {
      const defaults = {};
      this.config.props.forEach(p => {
        let val = p.default;
        if (p.type === 'String' && typeof val === 'string' && val.startsWith("'")) val = val.slice(1, -1);
        if (p.type === 'Boolean') val = val === 'true' || val === true;
        defaults[p.name] = val;
      });
      if (Object.keys(this._values).length === 0) this._values = defaults;
    }
  }

  handleInput(name, value) {
    this._values = { ...this._values, [name]: value };
  }

  get generatedHTML() {
    if (!this.element || !this.config) return '';
    const props = this.config.props.map(p => {
      const val = this._values[p.name];
      if (p.type === 'Boolean') return val ? ` ${p.name}` : '';
      return ` ${p.name}="${val}"`;
    }).join('');
    return `<${this.element}${props}></${this.element}>`;
  }

  renderSidebar() {
    if (!this.config) return html`<p>No config</p>`;
    return html`
      <aside class="sidebar">
        ${this.config.props.map(p => html`
          <div>
            <label>${p.name}</label>
            ${this.renderControl(p)}
          </div>
        `)}
      </aside>
    `;
  }

  renderControl(p) {
    const val = this._values[p.name];
    if (p.type === 'Boolean') {
      return html`<input type="checkbox" ?checked="${val}" @change="${e => this.handleInput(p.name, e.target.checked)}">`;
    }
    if (p.type.includes('|')) {
      const opts = p.type.split('|').map(s => s.trim().replace(/'/g, ''));
      return html`
        <select @change="${e => this.handleInput(p.name, e.target.value)}">
          ${opts.map(o => html`<option value="${o}" ?selected="${val === o}">${o}</option>`)}
        </select>`;
    }
    return html`<input type="text" .value="${val || ''}" @input="${e => this.handleInput(p.name, e.target.value)}">`;
  }

  async copyCode() {
    await navigator.clipboard.writeText(this.generatedHTML);
    this.toasts = [...this.toasts, { id: Date.now(), msg: 'Código copiado' }];
    setTimeout(() => this.toasts = this.toasts.slice(1), 3000);
  }

  render() {
    const tag = this.element ? unsafeStatic(this.element) : null;

    return html`
      <div class="layout">
        ${this.renderSidebar()}
        <div class="content">
          <nav class="tabs">
            <button class="tab-btn ${this.activeTab === 'preview' ? 'active' : ''}" @click="${() => this.activeTab = 'preview'}">Vista Previa</button>
            <button class="tab-btn ${this.activeTab === 'docs' ? 'active' : ''}" @click="${() => this.activeTab = 'docs'}">Docs</button>
            <button class="tab-btn ${this.activeTab === 'html' ? 'active' : ''}" @click="${() => this.activeTab = 'html'}">HTML</button>
          </nav>

          <div class="viewport">
            ${this.activeTab === 'preview' && tag ? html`
              <div class="preview-box">
                 <div .innerHTML="${this.generatedHTML}" @click="${() => this.toasts = [...this.toasts, { id: Date.now(), msg: 'Evento detectado' }]}"></div>
              </div>
            ` : ''}

            ${this.activeTab === 'docs' ? html`
              <div style="padding:40px">
                <table>
                  <tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
                  ${this.config?.props.map(p => html`<tr><td>${p.name}</td><td><code>${p.type}</code></td><td>${p.desc}</td></tr>`)}
                </table>
              </div>
            ` : ''}

            ${this.activeTab === 'html' ? html`
              <pre class="code-box"><button @click="${this.copyCode}">Copiar</button><br>${this.generatedHTML}</pre>
            ` : ''}
            
            <div class="toast-container">
              ${this.toasts.map(t => html`<div class="toast">${t.msg}</div>`)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('skparate-viewer', SkparateViewer);