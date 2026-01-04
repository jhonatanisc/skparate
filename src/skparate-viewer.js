import { LitElement, html, css } from 'lit';
import { styles } from './skparate-viewer.styles.js';

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
    return styles;
  }

  constructor() {
    super();
    this.activeTab = 'preview';
    this.copyStatus = 'Copiar HTML';
    this.toasts = [];
    this._values = {};
  }

  updated(changed) {
    if (changed.has('config') && this.config) {
      const defaults = {};
      this.config.props.forEach(p => {
        let val = p.default;

        if (p.type === 'Boolean') val = val === true || val === 'true';
        if (typeof val === 'string' && val.startsWith("'")) {
          val = val.slice(1, -1);
        }

        defaults[p.name] = val;
      });

      if (Object.keys(this._values).length === 0) {
        this._values = defaults;
      }
    }

    if (
      changed.has('_values') ||
      changed.has('activeTab') ||
      changed.has('element')
    ) {
      if (this.activeTab === 'preview') {
        this.updateComplete.then(() => this.renderPreviewComponent());
      }
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
          <div class="${p.type === 'Boolean' ? 'checkbox-item' : ''}">
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

  renderPreviewComponent() {
    if (!this.element || !this.config) return;

    const host = this.renderRoot.querySelector('#preview-host');
    if (!host) return;

    // Limpia preview anterior
    host.innerHTML = '';

    // Crea el custom element real
    const el = document.createElement(this.element);

    this.config.props.forEach(p => {
      const val = this._values[p.name];

      if (p.type === 'Boolean') {
        if (val) el.setAttribute(p.name, '');
      } else if (val !== undefined && val !== '') {
        el.setAttribute(p.name, val);
      }
    });

    host.appendChild(el);
  }

  render() {
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
            ${this.activeTab === 'preview' ? html`
              <div class="preview-box">
                <div id="preview-host"></div>
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