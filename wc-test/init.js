import { LitElement, html, css } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import * as acemodule from 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js';

ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/');

class DSJS extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {
    let editor = ace.edit(this.shadowRoot.querySelector('#editor'));
    editor.renderer.attachToShadowRoot();
    editor.setTheme('ace/theme/chrome');
    editor.getSession().setMode('ace/mode/javascript');
  }

  static get styles() {
    return css`
      #editor {
        width: 400px;
        height: 200px;
      }
    `;
  }

  render() {
    return html`
      <div id="editor"></div>
    `;
  }
}

window.customElements.define('dsjs-wc', DSJS);

document.querySelectorAll('table').forEach(t => {
  // let t = document.querySelector('table');
  let parent = t.parentNode;
  let e = document.createElement('dsjs-wc');
  parent.insertBefore(e, t.nextSibling);
});