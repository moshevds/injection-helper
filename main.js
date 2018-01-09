import { InjectionHelper } from './injection-helper.js';
import InjectionManifest from './injection-manifest.js';

/*
 * Loading sequence:
 * 1. The HTML page should contain the loader screen with no external
 *    dependencies. (inline css and inline images)
 * 2. The loader waits until the interactive (DOMContentLoaded) stage to do
 *    anything at all. This makes sure the loading screen is visible as soon as
 *    possible. The loader can also be included in an async script tag for
 *    faster loading, but this does not work in all browsers.
 * 3. The injection helper creates a graph of promises for all modules,
 *    according to the definition in the manifest. This means code is getting
 *    executed in order or ready-ness of its dependencies.
 * 4. While the browser is loading all dependencies, the main application
 *    function is called with the currentScript and reactAnchor elements.
 * 5. When everything is ready, the loader removes the loader screen from the
 *    DOM, revealing the loaded application.
 */

const bootstrap = function (e) {
  if (e.target.readyState === "loading") {
    return; /* Not yet interactive. */
  }

  const element = document.getElementById("loader-screen");
  if (element === null) {
    return; /* We are already done. */
  }

  if (element.getAttribute("data-loading") == "true") {
    return; /* We are already bootstrapped. */
  }

  element.setAttribute("data-loading", "true");

  console.time('injection-to-loaded');
  console.time('injection-to-running');
  console.time('injection-to-starting');
  InjectionHelper(InjectionManifest).then(run);
}

const run = function (application) {
  /*
   * We find the current script by its ID for compatibility with IE11.
   * Modern browsers have a document.currentScript so we can use that
   * some time in the future.
  */
  const currentScript = document.getElementById('main-script-tag');
  const reactAnchor = document.getElementById('react-anchor');
  const bodyElement = document.getElementsByTagName('body')[0];
  console.info('Now starting the application.');
  console.timeEnd('injection-to-starting');
  console.time('starting-to-loaded');
  application(currentScript, reactAnchor, bodyElement).then(finalize_loading);
  console.timeEnd('injection-to-running');
}

const finalize_loading = function () {
  const element = document.getElementById("loader-screen");
  console.timeEnd('injection-to-loaded');
  console.timeEnd('starting-to-loaded');
  element.parentNode.removeChild(element);
}

document.addEventListener('readystatechange', bootstrap);
bootstrap({ target: document });
