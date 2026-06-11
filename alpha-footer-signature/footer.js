(async function () {

    // const CONFIG_URL =
    //     "https://akrimahuzaifa.github.io/html-design-templates/alpha-footer-signature/footer-config.json";
    // Capture the script element early — `document.currentScript` becomes null after `await`
    const scriptEl = document.currentScript || (function () {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            const s = scripts[i];
            if (s.src && s.src.indexOf('footer.js') !== -1) return s;
        }
        return scripts[scripts.length - 1] || null;
    })();

    const CONFIG_URL = new URL(
        "footer-config.json",
        (scriptEl && scriptEl.src) ? scriptEl.src : location.href
    ).href;

    let config = {
        company: "Alpha Xolution",
        url: "https://alphaxolution.com/",
        text: "Design and Developed by"
    };

    console.debug && console.debug("Footer: computed CONFIG_URL =", CONFIG_URL);

    try {
        const response = await fetch(CONFIG_URL + "?v=" + Date.now(), { cache: "no-store", mode: "cors" });
        if (!response.ok) {
            throw new Error("HTTP " + response.status + " " + response.statusText);
        }
        config = await response.json();
        console.debug && console.debug("Footer: loaded config", config);
    } catch (e) {
        console.warn("Footer config failed, using defaults. Tried:", CONFIG_URL, e);
        if (location.protocol === "file:") {
            console.info("Footer: page loaded via file:// — run a local HTTP server, e.g. `python -m http.server`, and open the page via http://localhost:8000/");
        }
    }

    const style = document.createElement("style");

    style.textContent = `
        :root{
            --footer-sign-font-size:8pt;
            --font-color:black;
        }

        .ax-minimal-footer{
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:
                Inter,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Roboto,
                sans-serif;
            font-size:var(--footer-sign-font-size);
            color:var(--font-color);
            letter-spacing:.03em;
            font-style:italic;
        }

        .ax-minimal-footer a{
            color:var(--font-color);
            text-decoration:none;
            transition:opacity .2s ease;
            display:inline-flex;
            align-items:center;
            font-size:var(--footer-sign-font-size);
        }

        .ax-minimal-footer a:hover{
            opacity:.7;
        }

        .ax-brand{
            font-weight:500;
            margin-left:4px;
        }

        .ax-logo{
            width:1em;
            height:1em;
            display:inline-block;
            vertical-align:middle;
            margin-left:.35em;
        }
        .ax-arrow{
            display:inline-flex;
            align-items:center;
            margin-left:.35em;
        }
        .ax-arrow svg, .ax-arrow img{
            width:0.9em;
            height:0.9em;
            vertical-align:middle;
        }
    `;

    document.head.appendChild(style);

    const footer = document.createElement("div");

    footer.className = "ax-minimal-footer";

    footer.innerHTML = `
        <span>
            ${config.text}:
            <span class="ax-brand">

                <a
                    href="${config.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="${config.company}"
                >
                    <u>${config.company}</u>

                    <svg
                        class="ax-logo"
                        viewBox="0 0 128 128"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0 C3.32971276 2.93540467 6.38648758 6.09098223 9.4375 9.3125 C10.9941897 10.93792334 12.55518858 12.55923404 14.12109375 14.17578125 C14.7958374 14.88645752 15.47058105 15.59713379 16.16577148 16.3293457 C17.99736257 18.22413723 17.99736257 18.22413723 21 19 C21.226875 18.443125 21.45375 17.88625 21.6875 17.3125 C23.36362843 14.35932134 25.59672417 12.40327583 28 10 C29.02026464 8.70318995 30.01929768 7.38948124 31 6.0625 C31.5053125 5.381875 32.010625 4.70125 32.53125 4 C33.45873558 2.73704092 34.37675718 1.46702643 35.28125 0.1875 C37.271852 -2.466636 38.63439711 -3.87813237 41.8125 -4.9375 C45.66354377 -5.01301066 49.19352946 -4.59065922 53 -4 C52.4037017 -0.96550418 51.52576174 0.94685928 49.625 3.375 C48.82642578 4.40367188 48.82642578 4.40367188 48.01171875 5.453125 C47.01591797 6.71382812 47.01591797 6.71382812 46 8 C45.11017158 9.14023069 44.22088917 10.28088761 43.33203125 11.421875 C41.45264759 13.82822434 39.57186561 16.23342946 37.68359375 18.6328125 C37.24515137 19.19774414 36.80670898 19.76267578 36.35498047 20.34472656 C35 22 35 22 33.47705078 23.55371094 C31.8189952 25.19959592 31.8189952 25.19959592 30 28 C30.66730144 33.22602391 34.05169877 37.30532009 37.0625 41.5 C38.05212244 42.91442715 39.0403791 44.32981076 40.02734375 45.74609375 C40.52347168 46.45491699 41.01959961 47.16374023 41.53076172 47.89404297 C43.76362525 51.09455491 45.96576559 54.31186751 48.125 57.5625 C49.21167969 59.17318359 49.21167969 59.17318359 50.3203125 60.81640625 C52.18568961 64.35194659 52.86216239 67.01221538 53 71 C50.37898103 74.25856413 48.12588187 76.68783519 43.8984375 77.30859375 C37.82048792 77.61907724 34.5628759 76.72597266 29.9296875 72.78125 C29.29289062 72.1934375 28.65609375 71.605625 28 71 C17.50704658 61.17346113 17.50704658 61.17346113 4 58 C-0.60507293 59.96141995 -3.91935603 62.7473107 -7.75 65.9375 C-18.79775948 74.95368061 -30.95372645 78.06616293 -45 77 C-54.66907421 75.36094041 -62.37919548 70.39093861 -68.7109375 63.00390625 C-72.68848488 56.82062805 -73.55383124 51.60633029 -73.5 44.375 C-73.49500488 43.49344238 -73.49000977 42.61188477 -73.48486328 41.70361328 C-73.12130649 27.98122495 -66.44466881 14.87397194 -57 5 C-39.63583927 -11.14449694 -19.34811469 -13.37047664 0 0 Z M-51 16 C-57.33311051 24.56688204 -60.18548563 31.26249798 -59 42 C-57.14936314 47.07887785 -53.67927784 51.12050008 -49.13671875 54.02734375 C-41.0415721 57.71233738 -32.36852591 57.59755124 -24 55 C-17.93672389 52.57819941 -12.68516204 49.5618683 -8 45 C-8 44.34 -8 43.68 -8 43 C-7.443125 42.731875 -6.88625 42.46375 -6.3125 42.1875 C-3.94475728 41.04051133 -3.94475728 41.04051133 -1.75 39.40625 C1.63918083 37.67314617 3.56759485 37.85981916 7.3125 38.3125 C8.38113281 38.43238281 9.44976562 38.55226562 10.55078125 38.67578125 C11.35902344 38.78277344 12.16726562 38.88976562 13 39 C10.13374875 33.60756121 6.84660579 29.13550855 2.8125 24.5625 C1.95084229 23.58071777 1.95084229 23.58071777 1.07177734 22.57910156 C-9.00067555 10.907792 -9.00067555 10.907792 -22.97265625 5.69140625 C-33.73013825 5.27620519 -43.30759492 8.21223453 -51 16 Z "
              fill="#D6010A"
              transform="translate(73,30)"
            />
            <path
              d="M0 0 C0.495 0.99 0.495 0.99 1 2 C0.31679688 1.83757813 -0.36640625 1.67515625 -1.0703125 1.5078125 C-7.89812256 0.32432542 -15.40675494 0.45083361 -22.25 1.5625 C-25 2 -25 2 -27 1 C-27 1.99 -27 2.98 -27 4 C-27.66 4 -28.32 4 -29 4 C-29 4.66 -29 5.32 -29 6 C-33.47058824 10 -33.47058824 10 -36 10 C-36 10.66 -36 11.32 -36 12 C-37.12728516 11.88011719 -37.12728516 11.88011719 -38.27734375 11.7578125 C-41.07875179 11.73359107 -41.07875179 11.73359107 -42.87890625 13.6796875 C-43.43449219 14.40414062 -43.99007812 15.12859375 -44.5625 15.875 C-47.61572156 19.80963656 -47.61572156 19.80963656 -50.11328125 21.046875 C-53.29918484 22.65631698 -53.78350754 25.79288353 -55 29 C-55.65288627 30.34013497 -56.31225595 31.67741528 -57 33 C-57.66 33 -58.32 33 -59 33 C-61.5035281 42.9470536 -61.18974296 52.82766893 -61 63 C-65.1268764 56.80968541 -63.70305566 47.20313764 -63 40 C-59.44331674 24.91844182 -49.7765893 11.57655028 -37 3 C-25.2466611 -2.93514377 -12.33597884 -6.05161226 0 0 Z "
              fill="#BC0203"
              transform="translate(63,24)"
            />
            <path
              d="M0 0 C1.09570312 0.10183594 2.19140625 0.20367188 3.3203125 0.30859375 C4.16335937 0.39238281 5.00640625 0.47617187 5.875 0.5625 C5.2787017 3.59699582 4.40076174 5.50935928 2.5 7.9375 C1.96890625 8.61941406 1.4378125 9.30132812 0.890625 10.00390625 C0.22546875 10.84824219 -0.4396875 11.69257812 -1.125 12.5625 C-2.02696587 13.73757243 -2.92793201 14.91341262 -3.828125 16.08984375 C-4.80156991 17.35195866 -5.77553162 18.61367513 -6.75 19.875 C-7.21712402 20.48585449 -7.68424805 21.09670898 -8.16552734 21.72607422 C-10.57630442 24.8190335 -12.79585557 27.39777463 -16.125 29.5625 C-15.795 27.5825 -15.465 25.6025 -15.125 23.5625 C-14.465 23.5625 -13.805 23.5625 -13.125 23.5625 C-13.125 22.5725 -13.125 21.5825 -13.125 20.5625 C-11.805 20.5625 -10.485 20.5625 -9.125 20.5625 C-8.8747843 17.64615871 -8.8747843 17.64615871 -9.125 14.5625 C-11.90614056 12.22858797 -11.90614056 12.22858797 -14.8125 12.9375 C-15.575625 13.14375 -16.33875 13.35 -17.125 13.5625 C-15.62165796 8.21728385 -11.95379909 4.42741984 -8.125 0.5625 C-5.28943413 -0.85528293 -3.1341294 -0.30007622 0 0 Z "
              fill="#C50305"
              transform="translate(120.125,25.4375)"
            />
            <path
              d="M0 0 C2.64 0.33 5.28 0.66 8 1 C8 1.66 8 2.32 8 3 C8.57234375 3.24492187 9.1446875 3.48984375 9.734375 3.7421875 C12.38024402 5.21110099 14.14853139 6.95348244 16.25 9.125 C16.95640625 9.84945312 17.6628125 10.57390625 18.390625 11.3203125 C19.18726563 12.15175781 19.18726563 12.15175781 20 13 C19.525625 13.78375 19.05125 14.5675 18.5625 15.375 C17.66101977 16.88948678 16.78820515 18.4235897 16 20 C8.63157895 19.63157895 8.63157895 19.63157895 5.5625 16.5625 C4 14 4 14 3 12 C1.68 12 0.36 12 -1 12 C-2.75 10.5 -2.75 10.5 -4 9 C-3 6 -3 6 -1.4375 4.5 C0.34595268 2.98527194 0.34595268 2.98527194 0 0 Z "
              fill="#E20206"
              transform="translate(61,27)"
            />
            <path
              d="M0 0 C0 3 0 3 -2 6.4375 C-4.76600377 11.82079767 -4.91532016 17.07827652 -4 23 C-1.87077689 28.58128271 1.57974312 32.43769675 7 35 C14.8096268 37.09554502 22.03876434 37.15970756 30 36 C27.4456574 38.46984781 26.10462173 38.99018075 22.50390625 39.328125 C21.20324219 39.30234375 19.90257812 39.2765625 18.5625 39.25 C16.61537109 39.22679688 16.61537109 39.22679688 14.62890625 39.203125 C11.62619092 39.03505051 8.91618194 38.69673711 6 38 C6 37.34 6 36.68 6 36 C4.68 36 3.36 36 2 36 C-0.625 33.5625 -0.625 33.5625 -3 31 C-3.66 30.67 -4.32 30.34 -5 30 C-7.99664693 21.54649601 -7.42345521 13.48209324 -5 5 C-4.34 5 -3.68 5 -3 5 C-3 4.01 -3 3.02 -3 2 C-2.01 1.34 -1.02 0.68 0 0 Z "
              fill="#8D0B0E"
              transform="translate(19,49)"
            />  
                    </svg>
                </a>         
            </span>
        </span>
    `;
    // //#region Optional: Load external arrow SVG and insert it after the inline logo SVG
    // // Load external arrow SVG and insert it after the inline logo SVG
    // try {
    //     const arrowUrl = new URL(
    //         'assets/arrow-up-right.svg',
    //         (scriptEl && scriptEl.src) ? scriptEl.src : location.href
    //     ).href;
    //     console.debug && console.debug('Footer: arrow SVG URL =', arrowUrl);

    //     const arrowResp = await fetch(arrowUrl, { cache: 'no-store', mode: 'cors' });
    //     if (arrowResp.ok) {
    //         const arrowText = await arrowResp.text();
    //         const arrowSpan = document.createElement('span');
    //         arrowSpan.className = 'ax-arrow';
    //         arrowSpan.innerHTML = arrowText;

    //         footer.appendChild(arrowSpan);

    //         // const logoSvg = footer.querySelector('svg.ax-logo');
    //         // if (logoSvg && logoSvg.parentNode) {
    //         //     logoSvg.parentNode.insertBefore(arrowSpan, logoSvg.nextSibling);
    //         // } else {
    //         //     footer.appendChild(arrowSpan);
    //         // }
    //     } else {
    //         console.warn('Footer: arrow SVG fetch failed:', arrowResp.status, arrowUrl);
    //     }
    // } catch (err) {
    //     console.warn('Footer: failed to load arrow SVG', err);
    // }
    // //#endregion

    if (scriptEl && scriptEl.parentNode && typeof scriptEl.replaceWith === 'function') {
        scriptEl.replaceWith(footer);
    } else if (document.currentScript && typeof document.currentScript.replaceWith === 'function') {
        document.currentScript.replaceWith(footer);
    } else {
        document.body.appendChild(footer);
        console.warn('Footer: script element not found; appended footer to body instead.');
    }

})();