(() => {
    "use strict";
    const flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function getDigFormat(item, sepp = " ") {
        return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function ssr_window_esm_isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target, src) {
        if (target === void 0) target = {};
        if (src === void 0) src = {};
        Object.keys(src).forEach((key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay) {
        if (delay === void 0) delay = 0;
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis) {
        if (axis === void 0) axis = "x";
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend() {
        const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < arguments.length; i += 1) {
            const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll(_ref) {
        let {swiper, targetPosition, side} = _ref;
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function utils_getSlideTransformEl(slideEl) {
        return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
    }
    function utils_elementChildren(element, selector) {
        if (selector === void 0) selector = "";
        return [ ...element.children ].filter((el => el.matches(selector)));
    }
    function utils_createElement(tag, classes) {
        if (classes === void 0) classes = [];
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : [ classes ]);
        return el;
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function utils_elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function utils_elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function utils_elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice(_temp) {
        let {userAgent} = _temp === void 0 ? {} : _temp;
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides) {
        if (overrides === void 0) overrides = {};
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                needPerspectiveFix = major < 16 || major === 16 && minor < 2;
            }
        }
        return {
            isSafari: needPerspectiveFix || isSafari(),
            needPerspectiveFix,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize(_ref) {
        let {swiper, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((_ref2 => {
                        let {contentBoxSize, contentRect, target} = _ref2;
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = function(target, options) {
            if (options === void 0) options = {};
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (swiper.__preventObserver__) return;
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: typeof options.childList === "undefined" ? true : options.childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = utils_elementParents(swiper.hostEl);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.hostEl, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    var eventsEmitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler() {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit() {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionLabel(property) {
            if (swiper.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        swiper.virtualSize = -spaceBetween;
        slides.forEach((slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        }));
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slidesLength);
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            let slide;
            if (slides[i]) slide = slides[i];
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
            if (slides[i] && elementStyle(slide, "display") === "none") continue;
            if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? utils_elementOuterSize(slide, "width", true) : utils_elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).forEach((slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            }));
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap <= 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
            return swiper.slides[index];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
    function updateSlidesProgress(translate) {
        if (translate === void 0) translate = this && this.translate || 0;
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideVisibleClass);
        }));
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        let spaceBetween = params.spaceBetween;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides[i].classList.add(params.slideVisibleClass);
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
        }));
        let activeSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides[activeIndex];
        if (activeSlide) {
            activeSlide.classList.add(params.slideActiveClass);
            let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !nextSlide) nextSlide = slides[0];
            if (nextSlide) nextSlide.classList.add(params.slideNextClass);
            let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
            if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
        }
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame((() => {
                if (slideEl.shadowRoot) {
                    lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                    if (lazyEl) lazyEl.remove();
                }
            }));
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
            const activeColumn = activeIndex;
            const preloadColumns = [ activeColumn - amount ];
            preloadColumns.push(...Array.from({
                length: amount
            }).map(((_, i) => activeColumn + slidesPerView + i)));
            swiper.slides.forEach(((slideEl, i) => {
                if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
            }));
            return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (swiper.slides[activeIndex]) realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10); else realIndex = activeIndex;
        Object.assign(swiper, {
            previousSnapIndex,
            snapIndex,
            previousRealIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) {
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            swiper.emit("slideChange");
        }
    }
    function updateClickedSlide(el, path) {
        const swiper = this;
        const params = swiper.params;
        let slide = el.closest(`.${params.slideClass}, swiper-slide`);
        if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach((pathEl => {
            if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
        }));
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis) {
        if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate(wrapperEl, axis);
        currentTranslate += swiper.cssOverflowAdjustment();
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
            if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
            wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        }
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
        if (translate === void 0) translate = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (translateBounds === void 0) translateBounds = true;
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) {
            swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
            swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
        }
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit(_ref) {
        let {swiper, runCallbacks, direction, step} = _ref;
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === "reset") {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    var transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index, speed, runCallbacks, internal, initial) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame((() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    }));
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else newIndex = swiper.getSlideIndexByData(newIndex);
        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }
    function slideNext(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
            if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                requestAnimationFrame((() => {
                    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                }));
                return true;
            }
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled) return swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
            requestAnimationFrame((() => {
                swiper.slideTo(prevIndex, speed, runCallbacks, internal);
            }));
            return true;
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed, runCallbacks, internal, threshold) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (threshold === void 0) threshold = .5;
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        slides.forEach(((el, index) => {
            el.setAttribute("data-swiper-slide-index", index);
        }));
        swiper.loopFix({
            slideRealIndex,
            direction: params.centeredSlides ? void 0 : "next"
        });
    }
    function loopFix(_temp) {
        let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
        let loopedSlides = params.loopedSlides || slidesPerView;
        if (loopedSlides % params.slidesPerGroup !== 0) loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
        swiper.loopedSlides = loopedSlides;
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        let activeIndex = swiper.activeIndex;
        if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el => el.classList.contains(params.slideActiveClass)))[0]); else activeIndex = activeSlideIndex;
        const isNext = direction === "next" || !direction;
        const isPrev = direction === "prev" || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        if (activeSlideIndex < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                prependSlidesIndexes.push(slides.length - index - 1);
            }
        } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
            slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                appendSlidesIndexes.push(index);
            }
        }
        if (isPrev) prependSlidesIndexes.forEach((index => {
            swiper.slides[index].swiperLoopMoveDOM = true;
            slidesEl.prepend(swiper.slides[index]);
            swiper.slides[index].swiperLoopMoveDOM = false;
        }));
        if (isNext) appendSlidesIndexes.forEach((index => {
            swiper.slides[index].swiperLoopMoveDOM = true;
            slidesEl.append(swiper.slides[index]);
            swiper.slides[index].swiperLoopMoveDOM = false;
        }));
        swiper.recalcSlides();
        if (params.slidesPerView === "auto") swiper.updateSlides();
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
                    if (setTranslate) {
                        swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
                        swiper.touchEventsData.currentTranslate = swiper.translate;
                    }
                }
            } else if (setTranslate) {
                swiper.slideToLoop(slideRealIndex, 0, false, true);
                swiper.touchEventsData.currentTranslate = swiper.translate;
            }
        } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) {
                    swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
                    swiper.touchEventsData.currentTranslate = swiper.translate;
                }
            }
        } else swiper.slideToLoop(slideRealIndex, 0, false, true);
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                if (!c.destroyed && c.params.loop) c.loopFix({
                    ...loopParams,
                    slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                ...loopParams,
                slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
            });
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach((slideEl => {
            const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        }));
        swiper.slides.forEach((slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        }));
        newSlidesOrder.forEach((slideEl => {
            slidesEl.append(slideEl);
        }));
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    var loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base) {
        if (base === void 0) base = this;
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const window = ssr_window_esm_getWindow();
        const data = swiper.touchEventsData;
        data.evCache.push(event);
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetEl = e.target;
        if (params.touchEventsTarget === "wrapper") if (!swiper.wrapperEl.contains(targetEl)) return;
        if ("which" in e && e.which === 3) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = event.composedPath ? event.composedPath() : event.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if (edgeSwipeDetection === "prevent") event.preventDefault(); else return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if (targetEl.nodeName === "SELECT") data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pointerIndex = data.evCache.findIndex((cachedEv => cachedEv.pointerId === e.pointerId));
        if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
        const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    prevX: swiper.touches.currentX,
                    prevY: swiper.touches.currentY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        const allowLoopFix = swiper.swipeDirection === "next" && swiper.allowSlideNext || swiper.swipeDirection === "prev" && swiper.allowSlidePrev;
        if (!data.isMoved) {
            if (isLoop && allowLoopFix) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
            swiper.loopFix({
                direction: swiper.swipeDirection,
                setTranslate: true
            });
            loopFixed = true;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        const pointerIndex = data.evCache.findIndex((cachedEv => cachedEv.pointerId === event.pointerId));
        if (pointerIndex >= 0) data.evCache.splice(pointerIndex, 1);
        if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(event.type)) {
            const proceed = [ "pointercancel", "contextmenu" ].includes(event.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(swiper.autoplay.resizeTimeout);
            swiper.autoplay.resizeTimeout = setTimeout((() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }), 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
        swiper.update();
    }
    let dummyEventAttached = false;
    function dummyEventListener() {}
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("contextmenu", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        if (!dummyEventAttached) {
            document.addEventListener("touchstart", dummyEventListener);
            dummyEventAttached = true;
        }
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    var events$1 = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            if (typeof breakpointParams[prop] === "undefined") return;
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        const wasLoop = params.loop;
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        const hasLoop = swiper.params.loop;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (initialized) if (needsReLoop) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (!wasLoop && hasLoop) {
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (wasLoop && !hasLoop) swiper.loopDestroy();
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base, containerEl) {
        if (base === void 0) base = "window";
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    var breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if (typeof item === "object") Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if (typeof item === "string") resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function swiper_core_removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    var classes = {
        addClasses,
        removeClasses: swiper_core_removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    var checkOverflow$1 = {
        checkOverflow
    };
    var defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopedSlides: null,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj) {
            if (obj === void 0) obj = {};
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
            if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
    };
    const extendedDefaults = {};
    class swiper_core_Swiper {
        constructor() {
            let el;
            let params;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = ssr_window_esm_getDocument();
            if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new swiper_core_Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    evCache: []
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = utils_elementIndex(slides[0]);
            return utils_elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index))[0]);
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view, exact) {
            if (view === void 0) view = "current";
            if (exact === void 0) exact = false;
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (typeof params.slidesPerView === "number") return params.slidesPerView;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            }));
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                setTranslate();
                if (params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                    const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                    translated = swiper.slideTo(slides.length - 1, 0, false, true);
                } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate) {
            if (needUpdate === void 0) needUpdate = true;
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach((slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if (typeof el === "string") el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === "SWIPER-CONTAINER") swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return utils_elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                    wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                hostEl: swiper.isElement ? el.parentNode.host : el,
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate();
            swiper.attachEvents();
            const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
            if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
            lazyElements.forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                    processLazyPreloader(swiper, e.target);
                }));
            }));
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                el.removeAttribute("style");
                wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach((slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                }));
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (deleteInstance !== false) {
                swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!swiper_core_Swiper.prototype.__modules__) swiper_core_Swiper.prototype.__modules__ = [];
            const modules = swiper_core_Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => swiper_core_Swiper.installModule(m)));
                return swiper_core_Swiper;
            }
            swiper_core_Swiper.installModule(module);
            return swiper_core_Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            swiper_core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    swiper_core_Swiper.use([ Resize, Observer ]);
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && params.auto === true) {
                let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = utils_createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            prevEl: null
        };
        const makeElementsArray = el => (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
        function getEl(el) {
            let res;
            if (el && typeof el === "string" && swiper.isElement) {
                res = swiper.el.querySelector(el);
                if (res) return res;
            }
            if (el) {
                if (typeof el === "string") res = [ ...document.querySelectorAll(el) ];
                if (swiper.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el);
            }
            if (el && !res) return el;
            return res;
        }
        function toggleEl(el, disabled) {
            const params = swiper.params.navigation;
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if (subEl) {
                    subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                    if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                }
            }));
        }
        function update() {
            const {nextEl, prevEl} = swiper.navigation;
            if (swiper.params.loop) {
                toggleEl(prevEl, false);
                toggleEl(nextEl, false);
                return;
            }
            toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            let nextEl = getEl(params.nextEl);
            let prevEl = getEl(params.prevEl);
            Object.assign(swiper.navigation, {
                nextEl,
                prevEl
            });
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const initButton = (el, dir) => {
                if (el) el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
            };
            nextEl.forEach((el => initButton(el, "next")));
            prevEl.forEach((el => initButton(el, "prev")));
        }
        function destroy() {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const destroyButton = (el, dir) => {
                el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
            };
            nextEl.forEach((el => destroyButton(el, "next")));
            prevEl.forEach((el => destroyButton(el, "prev")));
        }
        on("init", (() => {
            if (swiper.params.navigation.enabled === false) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            if (swiper.enabled) {
                update();
                return;
            }
            [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.add(swiper.params.navigation.lockClass)));
        }));
        on("click", ((_s, e) => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
            init();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function effect_target_effectTarget(effectParams, slideEl) {
        const transformEl = utils_getSlideTransformEl(slideEl);
        if (transformEl !== slideEl) {
            transformEl.style.backfaceVisibility = "hidden";
            transformEl.style["-webkit-backface-visibility"] = "hidden";
        }
        return transformEl;
    }
    function create_shadow_createShadow(suffix, slideEl, side) {
        const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}${suffix ? ` swiper-slide-shadow-${suffix}` : ""}`;
        const shadowContainer = utils_getSlideTransformEl(slideEl);
        let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(" ").join(".")}`);
        if (!shadowEl) {
            shadowEl = utils_createElement("div", shadowClass.split(" "));
            shadowContainer.append(shadowEl);
        }
        return shadowEl;
    }
    function effect_init_effectInit(params) {
        const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
        on("beforeInit", (() => {
            if (swiper.params.effect !== effect) return;
            swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
            if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
            Object.assign(swiper.params, overwriteParamsResult);
            Object.assign(swiper.originalParams, overwriteParamsResult);
        }));
        on("setTranslate", (() => {
            if (swiper.params.effect !== effect) return;
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            if (swiper.params.effect !== effect) return;
            setTransition(duration);
        }));
        on("transitionEnd", (() => {
            if (swiper.params.effect !== effect) return;
            if (recreateShadows) {
                if (!getEffectParams || !getEffectParams().slideShadows) return;
                swiper.slides.forEach((slideEl => {
                    slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => shadowEl.remove()));
                }));
                recreateShadows();
            }
        }));
        let requireUpdateOnVirtual;
        on("virtualUpdate", (() => {
            if (swiper.params.effect !== effect) return;
            if (!swiper.slides.length) requireUpdateOnVirtual = true;
            requestAnimationFrame((() => {
                if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                    setTranslate();
                    requireUpdateOnVirtual = false;
                }
            }));
        }));
    }
    function EffectCoverflow(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: true
            }
        });
        const setTranslate = () => {
            const {width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid} = swiper;
            const params = swiper.params.coverflowEffect;
            const isHorizontal = swiper.isHorizontal();
            const transform = swiper.translate;
            const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
            const rotate = isHorizontal ? params.rotate : -params.rotate;
            const translate = params.depth;
            for (let i = 0, length = slides.length; i < length; i += 1) {
                const slideEl = slides[i];
                const slideSize = slidesSizesGrid[i];
                const slideOffset = slideEl.swiperSlideOffset;
                const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
                const offsetMultiplier = typeof params.modifier === "function" ? params.modifier(centerOffset) : centerOffset * params.modifier;
                let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
                let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
                let translateZ = -translate * Math.abs(offsetMultiplier);
                let stretch = params.stretch;
                if (typeof stretch === "string" && stretch.indexOf("%") !== -1) stretch = parseFloat(params.stretch) / 100 * slideSize;
                let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
                let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
                let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
                if (Math.abs(translateX) < .001) translateX = 0;
                if (Math.abs(translateY) < .001) translateY = 0;
                if (Math.abs(translateZ) < .001) translateZ = 0;
                if (Math.abs(rotateY) < .001) rotateY = 0;
                if (Math.abs(rotateX) < .001) rotateX = 0;
                if (Math.abs(scale) < .001) scale = 0;
                const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
                const targetEl = effect_target_effectTarget(params, slideEl);
                targetEl.style.transform = slideTransform;
                slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                if (params.slideShadows) {
                    let shadowBeforeEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
                    let shadowAfterEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
                    if (!shadowBeforeEl) shadowBeforeEl = create_shadow_createShadow("coverflow", slideEl, isHorizontal ? "left" : "top");
                    if (!shadowAfterEl) shadowAfterEl = create_shadow_createShadow("coverflow", slideEl, isHorizontal ? "right" : "bottom");
                    if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                    if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                }
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => utils_getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
                el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => {
                    shadowEl.style.transitionDuration = `${duration}ms`;
                }));
            }));
        };
        effect_init_effectInit({
            effect: "coverflow",
            swiper,
            on,
            setTranslate,
            setTransition,
            perspective: () => true,
            overwriteParams: () => ({
                watchSlidesProgress: true
            })
        });
    }
    function initSliders() {
        if (document.querySelector(".swiper")) new swiper_core_Swiper(".swiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 220,
                modifier: 1,
                slideShadows: true
            },
            modules: [ Navigation, EffectCoverflow ],
            initialSlide: 2,
            speed: 800,
            navigation: {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next"
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.3
                },
                768: {
                    slidesPerView: "auto"
                }
            },
            on: {}
        });
    }
    window.addEventListener("load", (function(e) {
        initSliders();
    }));
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if (paramsWatch.threshold === "prx") {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    flsModules.watcher = new ScrollWatcher({});
    let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                const headerElement = document.querySelector(headerItem);
                if (!headerElement.classList.contains("_header-scroll")) {
                    headerElement.style.cssText = `transition-duration: 0s;`;
                    headerElement.classList.add("_header-scroll");
                    headerItemHeight = headerElement.offsetHeight;
                    headerElement.classList.remove("_header-scroll");
                    setTimeout((() => {
                        headerElement.style.cssText = ``;
                    }), 0);
                } else headerItemHeight = headerElement.offsetHeight;
            }
            let options = {
                speedAsDuration: true,
                speed,
                header: headerItem,
                offset: offsetTop,
                easing: "easeOutQuad"
            };
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                window.scrollTo({
                    top: targetBlockElementPosition,
                    behavior: "smooth"
                });
            }
            FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
        } else FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
    };
    let addWindowScrollEvent = false;
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        document.addEventListener("watcherCallback", pageNavigationAction);
        function pageNavigationAction(e) {
            if (e.type === "click") {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    if (flsModules.fullpage) {
                        const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                        const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                        if (fullpageSectionId !== null) {
                            flsModules.fullpage.switchingSection(fullpageSectionId);
                            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                        }
                    } else gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            } else if (e.type === "watcherCallback" && e.detail) {
                const entry = e.detail.entry;
                const targetElement = entry.target;
                if (targetElement.dataset.watch === "navigator") {
                    document.querySelector(`[data-goto]._navigator-active`);
                    let navigatorCurrentItem;
                    if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                        const element = targetElement.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                    if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                }
            }
        }
        if (getHash()) {
            let goToHash;
            if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
            goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
        }
    }
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    function digitsCounter() {
        if (document.querySelectorAll("[data-digits-counter]").length) document.querySelectorAll("[data-digits-counter]").forEach((element => {
            element.dataset.digitsCounter = element.innerHTML;
            element.innerHTML = `0`;
        }));
        function digitsCountersInit(digitsCountersItems) {
            let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
            if (digitsCounters.length) digitsCounters.forEach((digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            }));
        }
        function digitsCountersAnimate(digitsCounter) {
            let startTimestamp = null;
            const duration = parseFloat(digitsCounter.dataset.digitsCounterSpeed) ? parseFloat(digitsCounter.dataset.digitsCounterSpeed) : 1e3;
            const startValue = parseFloat(digitsCounter.dataset.digitsCounter);
            const format = digitsCounter.dataset.digitsCounterFormat ? digitsCounter.dataset.digitsCounterFormat : " ";
            const startPosition = 0;
            const step = timestamp => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (startPosition + startValue));
                digitsCounter.innerHTML = typeof digitsCounter.dataset.digitsCounterFormat !== "undefined" ? getDigFormat(value, format) : value;
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }
        function digitsCounterAction(e) {
            const entry = e.detail.entry;
            const targetElement = entry.target;
            if (targetElement.querySelectorAll("[data-digits-counter]").length) digitsCountersInit(targetElement.querySelectorAll("[data-digits-counter]"));
        }
        document.addEventListener("watcherCallback", digitsCounterAction);
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    const t = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e), e = function(t) {
        if (!(t && t instanceof Element && t.offsetParent)) return !1;
        const e = t.scrollHeight > t.clientHeight, i = window.getComputedStyle(t).overflowY, n = -1 !== i.indexOf("hidden"), s = -1 !== i.indexOf("visible");
        return e && !n && !s;
    }, i = function(t, n = void 0) {
        return !(!t || t === document.body || n && t === n) && (e(t) ? t : i(t.parentElement, n));
    }, n = function(t) {
        var e = (new DOMParser).parseFromString(t, "text/html").body;
        if (e.childElementCount > 1) {
            for (var i = document.createElement("div"); e.firstChild; ) i.appendChild(e.firstChild);
            return i;
        }
        return e.firstChild;
    }, s = t => `${t || ""}`.split(" ").filter((t => !!t)), o = (t, e, i) => {
        s(e).forEach((e => {
            t && t.classList.toggle(e, i || !1);
        }));
    };
    class a {
        constructor(t) {
            Object.defineProperty(this, "pageX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "pageY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "time", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "nativePointer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, 
            this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, 
            this.time = Date.now();
        }
    }
    const r = {
        passive: !1
    };
    class l {
        constructor(t, {start: e = (() => !0), move: i = (() => {}), end: n = (() => {})}) {
            Object.defineProperty(this, "element", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "startCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "moveCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "endCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "currentPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "startPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = n;
            for (const t of [ "onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur" ]) this[t] = this[t].bind(this);
            this.element.addEventListener("mousedown", this.onPointerStart, r), this.element.addEventListener("touchstart", this.onTouchStart, r), 
            this.element.addEventListener("touchmove", this.onMove, r), this.element.addEventListener("touchend", this.onTouchEnd), 
            this.element.addEventListener("touchcancel", this.onTouchEnd);
        }
        onPointerStart(t) {
            if (!t.buttons || 0 !== t.button) return;
            const e = new a(t);
            this.currentPointers.some((t => t.id === e.id)) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), 
            window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur));
        }
        onTouchStart(t) {
            for (const e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new a(e), t);
            window.addEventListener("blur", this.onWindowBlur);
        }
        onMove(t) {
            const e = this.currentPointers.slice(), i = "changedTouches" in t ? Array.from(t.changedTouches || []).map((t => new a(t))) : [ new a(t) ], n = [];
            for (const t of i) {
                const e = this.currentPointers.findIndex((e => e.id === t.id));
                e < 0 || (n.push(t), this.currentPointers[e] = t);
            }
            n.length && this.moveCallback(t, this.currentPointers.slice(), e);
        }
        onPointerEnd(t) {
            t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new a(t)), window.removeEventListener("mousemove", this.onMove), 
            window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur));
        }
        onTouchEnd(t) {
            for (const e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new a(e));
        }
        triggerPointerStart(t, e) {
            return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), 
            this.startPointers.push(t), !0);
        }
        triggerPointerEnd(t, e) {
            const i = this.currentPointers.findIndex((t => t.id === e.id));
            i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()));
        }
        onWindowBlur() {
            this.clear();
        }
        clear() {
            for (;this.currentPointers.length; ) {
                const t = this.currentPointers[this.currentPointers.length - 1];
                this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), 
                this.endCallback(new Event("touchend", {
                    bubbles: !0,
                    cancelable: !0,
                    clientX: t.clientX,
                    clientY: t.clientY
                }), t, this.currentPointers.slice());
            }
        }
        stop() {
            this.element.removeEventListener("mousedown", this.onPointerStart, r), this.element.removeEventListener("touchstart", this.onTouchStart, r), 
            this.element.removeEventListener("touchmove", this.onMove, r), this.element.removeEventListener("touchend", this.onTouchEnd), 
            this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), 
            window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur);
        }
    }
    function c(t, e) {
        return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0;
    }
    function h(t, e) {
        return e ? {
            clientX: (t.clientX + e.clientX) / 2,
            clientY: (t.clientY + e.clientY) / 2
        } : t;
    }
    const d = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t), u = (t, ...e) => {
        const i = e.length;
        for (let n = 0; n < i; n++) {
            const i = e[n] || {};
            Object.entries(i).forEach((([e, i]) => {
                const n = Array.isArray(i) ? [] : {};
                t[e] || Object.assign(t, {
                    [e]: n
                }), d(i) ? Object.assign(t[e], u(n, i)) : Array.isArray(i) ? Object.assign(t, {
                    [e]: [ ...i ]
                }) : Object.assign(t, {
                    [e]: i
                });
            }));
        }
        return t;
    }, p = function(t, e) {
        return t.split(".").reduce(((t, e) => "object" == typeof t ? t[e] : void 0), e);
    };
    class f {
        constructor(t = {}) {
            Object.defineProperty(this, "options", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            }), Object.defineProperty(this, "events", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: new Map
            }), this.setOptions(t);
            for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this));
        }
        setOptions(t) {
            this.options = t ? u({}, this.constructor.defaults, t) : {};
            for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e);
        }
        option(t, ...e) {
            let i = p(t, this.options);
            return i && "function" == typeof i && (i = i.call(this, this, ...e)), i;
        }
        optionFor(t, e, i, ...n) {
            let s = p(e, t);
            var o;
            "string" != typeof (o = s) || isNaN(o) || isNaN(parseFloat(o)) || (s = parseFloat(s)), 
            "true" === s && (s = !0), "false" === s && (s = !1), s && "function" == typeof s && (s = s.call(this, this, t, ...n));
            let a = p(e, this.options);
            return a && "function" == typeof a ? s = a.call(this, this, t, ...n, s) : void 0 === s && (s = a), 
            void 0 === s ? i : s;
        }
        cn(t) {
            const e = this.options.classes;
            return e && e[t] || "";
        }
        localize(t, e = []) {
            t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, ((t, e, i) => {
                let n = "";
                return i ? n = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (n = this.option(`l10n.${e}`)), 
                n || (n = t), n;
            }));
            for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
            return t = t.replace(/\{\{(.*?)\}\}/g, ((t, e) => e));
        }
        on(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), 
            i.forEach((t => {
                let i = this.events.get(t);
                i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i);
            }));
        }
        off(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach((t => {
                const i = this.events.get(t);
                if (Array.isArray(i)) {
                    const t = i.indexOf(e);
                    t > -1 && i.splice(t, 1);
                }
            }));
        }
        emit(t, ...e) {
            [ ...this.events.get(t) || [] ].forEach((t => t(this, ...e))), "*" !== t && this.emit("*", t, ...e);
        }
    }
    Object.defineProperty(f, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.24"
    }), Object.defineProperty(f, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    class m extends f {
        constructor(t = {}) {
            super(t), Object.defineProperty(this, "plugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            });
        }
        attachPlugins(t = {}) {
            const e = new Map;
            for (const [i, n] of Object.entries(t)) {
                const t = this.option(i), s = this.plugins[i];
                s || !1 === t ? s && !1 === t && (s.detach(), delete this.plugins[i]) : e.set(i, new n(this, t || {}));
            }
            for (const [t, i] of e) this.plugins[t] = i, i.attach();
        }
        detachPlugins(t) {
            t = t || Object.keys(this.plugins);
            for (const e of t) {
                const t = this.plugins[e];
                t && t.detach(), delete this.plugins[e];
            }
            return this.emit("detachPlugins"), this;
        }
    }
    var g;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", 
        t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy";
    }(g || (g = {}));
    const b = [ "a", "b", "c", "d", "e", "f" ], v = {
        PANUP: "Move up",
        PANDOWN: "Move down",
        PANLEFT: "Move left",
        PANRIGHT: "Move right",
        ZOOMIN: "Zoom in",
        ZOOMOUT: "Zoom out",
        TOGGLEZOOM: "Toggle zoom level",
        TOGGLE1TO1: "Toggle zoom level",
        ITERATEZOOM: "Toggle zoom level",
        ROTATECCW: "Rotate counterclockwise",
        ROTATECW: "Rotate clockwise",
        FLIPX: "Flip horizontally",
        FLIPY: "Flip vertically",
        FITX: "Fit horizontally",
        FITY: "Fit vertically",
        RESET: "Reset",
        TOGGLEFS: "Toggle fullscreen"
    }, y = {
        content: null,
        width: "auto",
        height: "auto",
        panMode: "drag",
        touch: !0,
        dragMinThreshold: 3,
        lockAxis: !1,
        mouseMoveFactor: 1,
        mouseMoveFriction: .12,
        zoom: !0,
        pinchToZoom: !0,
        panOnlyZoomed: "auto",
        minScale: 1,
        maxScale: 2,
        friction: .25,
        dragFriction: .35,
        decelFriction: .05,
        click: "toggleZoom",
        dblClick: !1,
        wheel: "zoom",
        wheelLimit: 7,
        spinner: !0,
        bounds: "auto",
        infinite: !1,
        rubberband: !0,
        bounce: !0,
        maxVelocity: 75,
        transformParent: !1,
        classes: {
            content: "f-panzoom__content",
            isLoading: "is-loading",
            canZoomIn: "can-zoom_in",
            canZoomOut: "can-zoom_out",
            isDraggable: "is-draggable",
            isDragging: "is-dragging",
            inFullscreen: "in-fullscreen",
            htmlHasFullscreen: "with-panzoom-in-fullscreen"
        },
        l10n: v
    }, w = '<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>', x = t => t && null !== t && t instanceof Element && "nodeType" in t, E = (t, e) => {
        t && s(e).forEach((e => {
            t.classList.remove(e);
        }));
    }, S = (t, e) => {
        t && s(e).forEach((e => {
            t.classList.add(e);
        }));
    }, P = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    }, C = 1e5, M = 1e3, T = "mousemove", O = "drag", A = "content";
    let L = null, z = null;
    class R extends m {
        get isTouchDevice() {
            return null === z && (z = window.matchMedia("(hover: none)").matches), z;
        }
        get isMobile() {
            return null === L && (L = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), 
            L;
        }
        get panMode() {
            return this.options.panMode !== T || this.isTouchDevice ? O : T;
        }
        get panOnlyZoomed() {
            const t = this.options.panOnlyZoomed;
            return "auto" === t ? this.isTouchDevice : t;
        }
        get isInfinite() {
            return this.option("infinite");
        }
        get angle() {
            return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0;
        }
        get targetAngle() {
            return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0;
        }
        get scale() {
            const {a: t, b: e} = this.current;
            return Math.sqrt(t * t + e * e) || 1;
        }
        get targetScale() {
            const {a: t, b: e} = this.target;
            return Math.sqrt(t * t + e * e) || 1;
        }
        get minScale() {
            return this.option("minScale") || 1;
        }
        get fullScale() {
            const {contentRect: t} = this;
            return t.fullWidth / t.fitWidth || 1;
        }
        get maxScale() {
            return this.fullScale * (this.option("maxScale") || 1) || 1;
        }
        get coverScale() {
            const {containerRect: t, contentRect: e} = this, i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
            return Math.min(this.fullScale, i);
        }
        get isScaling() {
            return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
        }
        get isContentLoading() {
            const t = this.content;
            return !!(t && t instanceof HTMLImageElement) && !t.complete;
        }
        get isResting() {
            if (this.isBouncingX || this.isBouncingY) return !1;
            for (const t of b) {
                const e = "e" == t || "f" === t ? .001 : 1e-5;
                if (Math.abs(this.target[t] - this.current[t]) > e) return !1;
            }
            return !(!this.ignoreBounds && !this.checkBounds().inBounds);
        }
        constructor(t, e = {}, i = {}) {
            var s;
            if (super(e), Object.defineProperty(this, "pointerTracker", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "resizeObserver", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "updateTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "clickTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "rAF", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "isTicking", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "friction", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "ignoreBounds", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "isBouncingX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "isBouncingY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "clicks", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "trackingPoints", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "pwt", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "cwd", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "pmme", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: g.Init
            }), Object.defineProperty(this, "isDragging", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "content", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "spinner", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "containerRect", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0
                }
            }), Object.defineProperty(this, "contentRect", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    fullWidth: 0,
                    fullHeight: 0,
                    fitWidth: 0,
                    fitHeight: 0,
                    width: 0,
                    height: 0
                }
            }), Object.defineProperty(this, "dragStart", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0,
                    time: 0
                }
            }), Object.defineProperty(this, "dragOffset", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    x: 0,
                    y: 0,
                    time: 0
                }
            }), Object.defineProperty(this, "current", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Object.assign({}, P)
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Object.assign({}, P)
            }), Object.defineProperty(this, "velocity", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                    e: 0,
                    f: 0
                }
            }), Object.defineProperty(this, "lockedAxis", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), !t) throw new Error("Container Element Not Found");
            this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, R.Plugins), i)), 
            this.emit("attachPlugins"), this.emit("init");
            const o = this.content;
            if (o.addEventListener("load", this.onLoad), o.addEventListener("error", this.onError), 
            this.isContentLoading) {
                if (this.option("spinner")) {
                    t.classList.add(this.cn("isLoading"));
                    const e = n(w);
                    !t.contains(o) || o.parentElement instanceof HTMLPictureElement ? this.spinner = t.appendChild(e) : this.spinner = (null === (s = o.parentElement) || void 0 === s ? void 0 : s.insertBefore(e, o)) || null;
                }
                this.emit("beforeLoad");
            } else queueMicrotask((() => {
                this.enable();
            }));
        }
        initContent() {
            const {container: t} = this, e = this.cn(A);
            let i = this.option(A) || t.querySelector(`.${e}`);
            if (i || (i = t.querySelector("img,picture") || t.firstElementChild, i && S(i, e)), 
            i instanceof HTMLPictureElement && (i = i.querySelector("img")), !i) throw new Error("No content found");
            this.content = i;
        }
        onLoad() {
            const {spinner: t, container: e, state: i} = this;
            t && (t.remove(), this.spinner = null), this.option("spinner") && e.classList.remove(this.cn("isLoading")), 
            this.emit("afterLoad"), i === g.Init ? this.enable() : this.updateMetrics();
        }
        onError() {
            this.state !== g.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), 
            this.stop(), this.detachEvents(), this.state = g.Error, this.emit("error"));
        }
        attachObserver() {
            var t;
            const e = () => {
                const {container: t, containerRect: e} = this;
                return Math.abs(e.width - t.getBoundingClientRect().width) > .1 || Math.abs(e.height - t.getBoundingClientRect().height) > .1;
            };
            this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver((() => {
                this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout((() => {
                    e() && this.onResize(), this.updateTimer = null;
                }), 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null));
            }))), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container);
        }
        detachObserver() {
            var t;
            null === (t = this.resizeObserver) || void 0 === t || t.disconnect();
        }
        attachEvents() {
            const {container: t} = this;
            t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.pointerTracker = new l(t, {
                start: this.onPointerDown,
                move: this.onPointerMove,
                end: this.onPointerUp
            }), document.addEventListener(T, this.onMouseMove);
        }
        detachEvents() {
            var t;
            const {container: e} = this;
            e.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), e.removeEventListener("wheel", this.onWheel, {
                passive: !1
            }), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, 
            document.removeEventListener(T, this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), 
            this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), 
            this.updateTimer = null);
        }
        animate() {
            const t = this.friction;
            this.setTargetForce();
            const e = this.option("maxVelocity");
            for (const i of b) t ? (this.velocity[i] *= 1 - t, e && !this.isScaling && (this.velocity[i] = Math.max(Math.min(this.velocity[i], e), -1 * e)), 
            this.current[i] += this.velocity[i]) : this.current[i] = this.target[i];
            this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame((() => this.animate())) : this.stop("current");
        }
        setTargetForce() {
            for (const t of b) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]));
        }
        checkBounds(t = 0, e = 0) {
            const {current: i} = this, n = i.e + t, s = i.f + e, o = this.getBounds(), {x: a, y: r} = o, l = a.min, c = a.max, h = r.min, d = r.max;
            let u = 0, p = 0;
            return l !== 1 / 0 && n < l ? u = l - n : c !== 1 / 0 && n > c && (u = c - n), h !== 1 / 0 && s < h ? p = h - s : d !== 1 / 0 && s > d && (p = d - s), 
            Math.abs(u) < .001 && (u = 0), Math.abs(p) < .001 && (p = 0), Object.assign(Object.assign({}, o), {
                xDiff: u,
                yDiff: p,
                inBounds: !u && !p
            });
        }
        clampTargetBounds() {
            const {target: t} = this, {x: e, y: i} = this.getBounds();
            e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), 
            i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max));
        }
        calculateContentDim(t = this.current) {
            const {content: e, contentRect: i} = this, {fitWidth: n, fitHeight: s, fullWidth: o, fullHeight: a} = i;
            let r = o, l = a;
            if (this.option("zoom") || 0 !== this.angle) {
                const i = !(e instanceof HTMLImageElement) && ("none" === window.getComputedStyle(e).maxWidth || "none" === window.getComputedStyle(e).maxHeight), c = i ? o : n, h = i ? a : s, d = this.getMatrix(t), u = new DOMPoint(0, 0).matrixTransform(d), p = new DOMPoint(0 + c, 0).matrixTransform(d), f = new DOMPoint(0 + c, 0 + h).matrixTransform(d), m = new DOMPoint(0, 0 + h).matrixTransform(d), g = Math.abs(f.x - u.x), b = Math.abs(f.y - u.y), v = Math.abs(m.x - p.x), y = Math.abs(m.y - p.y);
                r = Math.max(g, v), l = Math.max(b, y);
            }
            return {
                contentWidth: r,
                contentHeight: l
            };
        }
        setEdgeForce() {
            if (this.ignoreBounds || this.isDragging || this.panMode === T || this.targetScale < this.scale) return this.isBouncingX = !1, 
            void (this.isBouncingY = !1);
            const {target: t} = this, {x: e, y: i, xDiff: n, yDiff: s} = this.checkBounds();
            const o = this.option("maxVelocity");
            let a = this.velocity.e, r = this.velocity.f;
            0 !== n ? (this.isBouncingX = !0, n * a <= 0 ? a += .14 * n : (a = .14 * n, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), 
            e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingX = !1, 
            0 !== s ? (this.isBouncingY = !0, s * r <= 0 ? r += .14 * s : (r = .14 * s, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), 
            i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingY = !1, 
            this.isBouncingX && (this.velocity.e = a), this.isBouncingY && (this.velocity.f = r);
        }
        enable() {
            const {content: t} = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
            for (const t of b) this.current[t] = this.target[t] = e[t];
            this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = g.Ready, 
            this.emit("ready");
        }
        onClick(t) {
            var e;
            this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), 
            this.trackingPoints = [], this.startDecelAnim());
            const i = t.target;
            if (!i || t.defaultPrevented) return;
            if (i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
            if ((() => {
                const t = window.getSelection();
                return t && "Range" === t.type;
            })() && !i.closest("button")) return;
            const n = i.closest("[data-panzoom-action]"), s = i.closest("[data-panzoom-change]"), o = n || s, a = o && x(o) ? o.dataset : null;
            if (a) {
                const e = a.panzoomChange, i = a.panzoomAction;
                if ((e || i) && t.preventDefault(), e) {
                    let t = {};
                    try {
                        t = JSON.parse(e);
                    } catch (t) {
                        console && console.warn("The given data was not valid JSON");
                    }
                    return void this.applyChange(t);
                }
                if (i) return void (this[i] && this[i]());
            }
            if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), 
            void t.stopPropagation();
            if (i.closest("[data-fancybox]")) return;
            const r = this.content.getBoundingClientRect(), l = this.dragStart;
            if (l.time && !this.canZoomOut() && (Math.abs(r.x - l.x) > 2 || Math.abs(r.y - l.y) > 2)) return;
            this.dragStart.time = 0;
            const c = e => {
                this.option("zoom", t) && e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), 
                this[e]({
                    event: t
                }));
            }, h = this.option("click", t), d = this.option("dblClick", t);
            d ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout((() => {
                1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && h && c(h)) : (this.emit("dblClick", t), 
                t.defaultPrevented || c(d)), this.clicks = 0, this.clickTimer = null;
            }), 350))) : (this.emit("click", t), !t.defaultPrevented && h && c(h));
        }
        addTrackingPoint(t) {
            const e = this.trackingPoints.filter((t => t.time > Date.now() - 100));
            e.push(t), this.trackingPoints = e;
        }
        onPointerDown(t, e, i) {
            var n;
            if (!1 === this.option("touch", t)) return !1;
            this.pwt = 0, this.dragOffset = {
                x: 0,
                y: 0,
                time: 0
            }, this.trackingPoints = [];
            const s = this.content.getBoundingClientRect();
            if (this.dragStart = {
                x: s.x,
                y: s.y,
                top: s.top,
                left: s.left,
                time: Date.now()
            }, this.clickTimer) return !1;
            if (this.panMode === T && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), 
            !1;
            const o = t.composedPath()[0];
            if (!i.length) {
                if ([ "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME" ].includes(o.nodeName) || o.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]")) return !1;
                null === (n = window.getSelection()) || void 0 === n || n.removeAllRanges();
            }
            if ("mousedown" === t.type) [ "A", "BUTTON" ].includes(o.nodeName) || t.preventDefault(); else if (Math.abs(this.velocity.a) > .3) return !1;
            return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), 
            this.isDragging || (this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t)), 
            !0;
        }
        onPointerMove(e, n, s) {
            if (!1 === this.option("touch", e)) return;
            if (!this.isDragging) return;
            if (n.length < 2 && this.panOnlyZoomed && t(this.targetScale) <= t(this.minScale)) return;
            if (this.emit("touchMove", e), e.defaultPrevented) return;
            this.addTrackingPoint(n[0]);
            const {content: o} = this, a = h(s[0], s[1]), r = h(n[0], n[1]);
            let l = 0, d = 0;
            if (n.length > 1) {
                const t = o.getBoundingClientRect();
                l = a.clientX - t.left - .5 * t.width, d = a.clientY - t.top - .5 * t.height;
            }
            const u = c(s[0], s[1]), p = c(n[0], n[1]);
            let f = u ? p / u : 1, m = r.clientX - a.clientX, g = r.clientY - a.clientY;
            this.dragOffset.x += m, this.dragOffset.y += g, this.dragOffset.time = Date.now() - this.dragStart.time;
            let b = t(this.targetScale) === t(this.minScale) && this.option("lockAxis");
            if (b && !this.lockedAxis) if ("xy" === b || "y" === b || "touchmove" === e.type) {
                if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void e.preventDefault();
                const t = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
                this.lockedAxis = t > 45 && t < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, 
                m = 0, g = 0;
            } else this.lockedAxis = b;
            if (i(e.target, this.content) && (b = "x", this.dragOffset.y = 0), b && "xy" !== b && this.lockedAxis !== b && t(this.targetScale) === t(this.minScale)) return;
            e.cancelable && e.preventDefault(), this.container.classList.add(this.cn("isDragging"));
            const v = this.checkBounds(m, g);
            this.option("rubberband") ? ("x" !== this.isInfinite && (v.xDiff > 0 && m < 0 || v.xDiff < 0 && m > 0) && (m *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * v.xDiff))), 
            "y" !== this.isInfinite && (v.yDiff > 0 && g < 0 || v.yDiff < 0 && g > 0) && (g *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * v.yDiff)))) : (v.xDiff && (m = 0), 
            v.yDiff && (g = 0));
            const y = this.targetScale, w = this.minScale, x = this.maxScale;
            y < .5 * w && (f = Math.max(f, w)), y > 1.5 * x && (f = Math.min(f, x)), "y" === this.lockedAxis && t(y) === t(w) && (m = 0), 
            "x" === this.lockedAxis && t(y) === t(w) && (g = 0), this.applyChange({
                originX: l,
                originY: d,
                panX: m,
                panY: g,
                scale: f,
                friction: this.option("dragFriction"),
                ignoreBounds: !0
            });
        }
        onPointerUp(t, e, n) {
            if (n.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
            this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), 
            this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), 
            i(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), 
            this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== g.Destroy && (t.defaultPrevented || this.startDecelAnim()));
        }
        startDecelAnim() {
            var e;
            const i = this.isScaling;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, 
            this.isBouncingY = !1;
            for (const t of b) this.velocity[t] = 0;
            this.target.e = this.current.e, this.target.f = this.current.f, E(this.container, "is-scaling"), 
            E(this.container, "is-animating"), this.isTicking = !1;
            const {trackingPoints: n} = this, s = n[0], o = n[n.length - 1];
            let a = 0, r = 0, l = 0;
            o && s && (a = o.clientX - s.clientX, r = o.clientY - s.clientY, l = o.time - s.time);
            const c = (null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1;
            1 !== c && (a *= c, r *= c);
            let h = 0, d = 0, u = 0, p = 0, f = this.option("decelFriction");
            const m = this.targetScale;
            if (l > 0) {
                u = Math.abs(a) > 3 ? a / (l / 30) : 0, p = Math.abs(r) > 3 ? r / (l / 30) : 0;
                const t = this.option("maxVelocity");
                t && (u = Math.max(Math.min(u, t), -1 * t), p = Math.max(Math.min(p, t), -1 * t));
            }
            u && (h = u / (1 / (1 - f) - 1)), p && (d = p / (1 / (1 - f) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && t(m) === this.minScale) && (h = u = 0), 
            ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && t(m) === this.minScale) && (d = p = 0);
            const g = this.dragOffset.x, v = this.dragOffset.y, y = this.option("dragMinThreshold") || 0;
            Math.abs(g) < y && Math.abs(v) < y && (h = d = 0, u = p = 0), (m < this.minScale - 1e-5 || m > this.maxScale + 1e-5 || i && !h && !d) && (f = .35), 
            this.applyChange({
                panX: h,
                panY: d,
                friction: f
            }), this.emit("decel", u, p, g, v);
        }
        onWheel(t) {
            var e = [ -t.deltaX || 0, -t.deltaY || 0, -t.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            }));
            const i = Math.max(-1, Math.min(1, e));
            if (this.emit("wheel", t, i), this.panMode === T) return;
            if (t.defaultPrevented) return;
            const n = this.option("wheel");
            "pan" === n ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
                panX: 2 * -t.deltaX,
                panY: 2 * -t.deltaY,
                bounce: !1
            })) : "zoom" === n && !1 !== this.option("zoom") && this.zoomWithWheel(t);
        }
        onMouseMove(t) {
            this.panWithMouse(t);
        }
        onKeydown(t) {
            "Escape" === t.key && this.toggleFS();
        }
        onResize() {
            this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
        }
        setTransform() {
            this.emit("beforeTransform");
            const {current: e, target: i, content: n, contentRect: s} = this, o = Object.assign({}, P);
            for (const n of b) {
                const s = "e" == n || "f" === n ? M : C;
                o[n] = t(e[n], s), Math.abs(i[n] - e[n]) < ("e" == n || "f" === n ? .51 : .001) && (e[n] = i[n]);
            }
            let {a, b: r, c: l, d: c, e: h, f: d} = o, u = `matrix(${a}, ${r}, ${l}, ${c}, ${h}, ${d})`, p = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
            if (this.option("transformParent") && (p = p.parentElement || p), p.style.transform === u) return;
            p.style.transform = u;
            const {contentWidth: f, contentHeight: m} = this.calculateContentDim();
            s.width = f, s.height = m, this.emit("afterTransform");
        }
        updateMetrics(e = !1) {
            var i;
            if (!this || this.state === g.Destroy) return;
            if (this.isContentLoading) return;
            const n = Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1), {container: s, content: o} = this, a = o instanceof HTMLImageElement, r = s.getBoundingClientRect(), l = getComputedStyle(this.container);
            let c = r.width * n, h = r.height * n;
            const d = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom), u = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)), p = h - d;
            this.containerRect = {
                width: c,
                height: h,
                innerWidth: u,
                innerHeight: p
            };
            let f = this.option("width") || "auto", m = this.option("height") || "auto";
            "auto" === f && (f = parseFloat(o.dataset.width || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : Math.max(t.offsetWidth, t.scrollWidth), 
                e || 0;
            })(o)), "auto" === m && (m = parseFloat(o.dataset.height || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : Math.max(t.offsetHeight, t.scrollHeight), 
                e || 0;
            })(o));
            let b = o.parentElement instanceof HTMLPictureElement ? o.parentElement : o;
            this.option("transformParent") && (b = b.parentElement || b);
            const v = b.getAttribute("style") || "";
            b.style.setProperty("transform", "none", "important"), a && (b.style.width = "", 
            b.style.height = ""), b.offsetHeight;
            const y = o.getBoundingClientRect();
            let w = y.width * n, x = y.height * n, E = 0, S = 0;
            a && (Math.abs(f - w) > 1 || Math.abs(m - x) > 1) && ({width: w, height: x, top: E, left: S} = ((t, e, i, n) => {
                const s = i / n;
                return s > t / e ? (i = t, n = t / s) : (i = e * s, n = e), {
                    width: i,
                    height: n,
                    top: .5 * (e - n),
                    left: .5 * (t - i)
                };
            })(w, x, f, m)), this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                top: y.top - r.top + E,
                bottom: r.bottom - y.bottom + E,
                left: y.left - r.left + S,
                right: r.right - y.right + S,
                fitWidth: w,
                fitHeight: x,
                width: w,
                height: x,
                fullWidth: f,
                fullHeight: m
            }), b.style.cssText = v, a && (b.style.width = `${w}px`, b.style.height = `${x}px`), 
            this.setTransform(), !0 !== e && this.emit("refresh"), this.ignoreBounds || (t(this.targetScale) < t(this.minScale) ? this.zoomTo(this.minScale, {
                friction: 0
            }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
                friction: 0
            }) : this.state === g.Init || this.checkBounds().inBounds || this.requestTick()), 
            this.updateControls();
        }
        getBounds() {
            const e = this.option("bounds");
            if ("auto" !== e) return e;
            const {contentWidth: i, contentHeight: n} = this.calculateContentDim(this.target);
            let s = 0, o = 0, a = 0, r = 0;
            const l = this.option("infinite");
            if (!0 === l || this.lockedAxis && l === this.lockedAxis) s = -1 / 0, a = 1 / 0, 
            o = -1 / 0, r = 1 / 0; else {
                let {containerRect: e, contentRect: l} = this, c = t(this.contentRect.fitWidth * this.targetScale, M), h = t(this.contentRect.fitHeight * this.targetScale, M), {innerWidth: d, innerHeight: u} = e;
                if (this.containerRect.width === c && (d = e.width), this.containerRect.width === h && (u = e.height), 
                i > d) {
                    a = .5 * (i - d), s = -1 * a;
                    let t = .5 * (l.right - l.left);
                    s += t, a += t;
                }
                if (this.contentRect.fitWidth > d && i < d && (s -= .5 * (this.contentRect.fitWidth - d), 
                a -= .5 * (this.contentRect.fitWidth - d)), n > u) {
                    r = .5 * (n - u), o = -1 * r;
                    let t = .5 * (l.bottom - l.top);
                    o += t, r += t;
                }
                this.contentRect.fitHeight > u && n < u && (s -= .5 * (this.contentRect.fitHeight - u), 
                a -= .5 * (this.contentRect.fitHeight - u));
            }
            return {
                x: {
                    min: s,
                    max: a
                },
                y: {
                    min: o,
                    max: r
                }
            };
        }
        updateControls() {
            const e = this, i = e.container, {panMode: n, contentRect: s, fullScale: a, targetScale: r, coverScale: l, maxScale: c, minScale: h} = e;
            let d = {
                toggleMax: r - h < .5 * (c - h) ? c : h,
                toggleCover: r - h < .5 * (l - h) ? l : h,
                toggleZoom: r - h < .5 * (a - h) ? a : h
            }[e.option("click") || ""] || h, u = e.canZoomIn(), p = e.canZoomOut(), f = n === O && !!this.option("touch"), m = p && f;
            if (f && (t(r) < t(h) && !this.panOnlyZoomed && (m = !0), (t(s.width, 1) > t(s.fitWidth, 1) || t(s.height, 1) > t(s.fitHeight, 1)) && (m = !0)), 
            t(s.width * r, 1) < t(s.fitWidth, 1) && (m = !1), n === T && (m = !1), o(i, this.cn("isDraggable"), m), 
            !this.option("zoom")) return;
            let g = u && t(d) > t(r), b = !g && !m && p && t(d) < t(r);
            o(i, this.cn("canZoomIn"), g), o(i, this.cn("canZoomOut"), b);
            for (const t of i.querySelectorAll('[data-panzoom-action="zoomIn"]')) u ? (t.removeAttribute("disabled"), 
            t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
            for (const t of i.querySelectorAll('[data-panzoom-action="zoomOut"]')) p ? (t.removeAttribute("disabled"), 
            t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
            for (const t of i.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                u || p ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), 
                t.setAttribute("tabindex", "-1"));
                const e = t.querySelector("g");
                e && (e.style.display = u ? "" : "none");
            }
        }
        panTo({x: t = this.target.e, y: e = this.target.f, scale: i = this.targetScale, friction: n = this.option("friction"), angle: s = 0, originX: o = 0, originY: a = 0, flipX: r = !1, flipY: l = !1, ignoreBounds: c = !1}) {
            this.state !== g.Destroy && this.applyChange({
                panX: t - this.target.e,
                panY: e - this.target.f,
                scale: i / this.targetScale,
                angle: s,
                originX: o,
                originY: a,
                friction: n,
                flipX: r,
                flipY: l,
                ignoreBounds: c
            });
        }
        applyChange({panX: e = 0, panY: i = 0, scale: n = 1, angle: s = 0, originX: o = -this.current.e, originY: a = -this.current.f, friction: r = this.option("friction"), flipX: l = !1, flipY: c = !1, ignoreBounds: h = !1, bounce: d = this.option("bounce")}) {
            const u = this.state;
            if (u === g.Destroy) return;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = r || 0, 
            this.ignoreBounds = h;
            const {current: p} = this, f = p.e, m = p.f, v = this.getMatrix(this.target);
            let y = (new DOMMatrix).translate(f, m).translate(o, a).translate(e, i);
            if (this.option("zoom")) {
                if (!h) {
                    const t = this.targetScale, e = this.minScale, i = this.maxScale;
                    t * n < e && (n = e / t), t * n > i && (n = i / t);
                }
                y = y.scale(n);
            }
            y = y.translate(-o, -a).translate(-f, -m).multiply(v), s && (y = y.rotate(s)), l && (y = y.scale(-1, 1)), 
            c && (y = y.scale(1, -1));
            for (const e of b) "e" !== e && "f" !== e && (y[e] > this.minScale + 1e-5 || y[e] < this.minScale - 1e-5) ? this.target[e] = y[e] : this.target[e] = t(y[e], M);
            (this.targetScale < this.scale || Math.abs(n - 1) > .1 || this.panMode === T || !1 === d) && !h && this.clampTargetBounds(), 
            u === g.Init ? this.animate() : this.isResting || (this.state = g.Panning, this.requestTick());
        }
        stop(t = !1) {
            if (this.state === g.Init || this.state === g.Destroy) return;
            const e = this.isTicking;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, 
            this.isBouncingY = !1;
            for (const e of b) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
            this.setTransform(), E(this.container, "is-scaling"), E(this.container, "is-animating"), 
            this.isTicking = !1, this.state = g.Ready, e && (this.emit("endAnimation"), this.updateControls());
        }
        requestTick() {
            this.isTicking || (this.emit("startAnimation"), this.updateControls(), S(this.container, "is-animating"), 
            this.isScaling && S(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame((() => this.animate())));
        }
        panWithMouse(e, i = this.option("mouseMoveFriction")) {
            if (this.pmme = e, this.panMode !== T || !e) return;
            if (t(this.targetScale) <= t(this.minScale)) return;
            this.emit("mouseMove", e);
            const {container: n, containerRect: s, contentRect: o} = this, a = s.width, r = s.height, l = n.getBoundingClientRect(), c = (e.clientX || 0) - l.left, h = (e.clientY || 0) - l.top;
            let {contentWidth: d, contentHeight: u} = this.calculateContentDim(this.target);
            const p = this.option("mouseMoveFactor");
            p > 1 && (d !== a && (d *= p), u !== r && (u *= p));
            let f = .5 * (d - a) - c / a * 100 / 100 * (d - a);
            f += .5 * (o.right - o.left);
            let m = .5 * (u - r) - h / r * 100 / 100 * (u - r);
            m += .5 * (o.bottom - o.top), this.applyChange({
                panX: f - this.target.e,
                panY: m - this.target.f,
                friction: i
            });
        }
        zoomWithWheel(e) {
            if (this.state === g.Destroy || this.state === g.Init) return;
            const i = Date.now();
            if (i - this.pwt < 45) return void e.preventDefault();
            this.pwt = i;
            var n = [ -e.deltaX || 0, -e.deltaY || 0, -e.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            }));
            const s = Math.max(-1, Math.min(1, n)), {targetScale: o, maxScale: a, minScale: r} = this;
            let l = o * (100 + 45 * s) / 100;
            t(l) < t(r) && t(o) <= t(r) ? (this.cwd += Math.abs(s), l = r) : t(l) > t(a) && t(o) >= t(a) ? (this.cwd += Math.abs(s), 
            l = a) : (this.cwd = 0, l = Math.max(Math.min(l, a), r)), this.cwd > this.option("wheelLimit") || (e.preventDefault(), 
            t(l) !== t(o) && this.zoomTo(l, {
                event: e
            }));
        }
        canZoomIn() {
            return this.option("zoom") && (t(this.contentRect.width, 1) < t(this.contentRect.fitWidth, 1) || t(this.targetScale) < t(this.maxScale));
        }
        canZoomOut() {
            return this.option("zoom") && t(this.targetScale) > t(this.minScale);
        }
        zoomIn(t = 1.25, e) {
            this.zoomTo(this.targetScale * t, e);
        }
        zoomOut(t = .8, e) {
            this.zoomTo(this.targetScale * t, e);
        }
        zoomToFit(t) {
            this.zoomTo("fit", t);
        }
        zoomToCover(t) {
            this.zoomTo("cover", t);
        }
        zoomToFull(t) {
            this.zoomTo("full", t);
        }
        zoomToMax(t) {
            this.zoomTo("max", t);
        }
        toggleZoom(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? "full" : "fit", t);
        }
        toggleMax(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? "max" : "fit", t);
        }
        toggleCover(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? "cover" : "fit", t);
        }
        iterateZoom(t) {
            this.zoomTo("next", t);
        }
        zoomTo(t = 1, {friction: e = "auto", originX: i = "auto", originY: n = "auto", event: s} = {}) {
            if (this.isContentLoading || this.state === g.Destroy) return;
            const {targetScale: o} = this;
            this.stop();
            let a = 1;
            if (this.panMode === T && (s = this.pmme || s), s || "auto" === i || "auto" === n) {
                const t = this.content.getBoundingClientRect(), e = this.container.getBoundingClientRect(), o = s ? s.clientX : e.left + .5 * e.width, a = s ? s.clientY : e.top + .5 * e.height;
                i = o - t.left - .5 * t.width, n = a - t.top - .5 * t.height;
            }
            const r = this.fullScale, l = this.maxScale;
            let c = this.coverScale;
            "number" == typeof t ? a = t / o : ("next" === t && (r - c < .2 && (c = r), t = o < r - 1e-5 ? "full" : o < l - 1e-5 ? "max" : "fit"), 
            a = "full" === t ? r / o || 1 : "cover" === t ? c / o || 1 : "max" === t ? l / o || 1 : 1 / o || 1), 
            e = "auto" === e ? a > 1 ? .15 : .25 : e, this.applyChange({
                scale: a,
                originX: i,
                originY: n,
                friction: e
            }), s && this.panMode === T && this.panWithMouse(s, e);
        }
        rotateCCW() {
            this.applyChange({
                angle: -90
            });
        }
        rotateCW() {
            this.applyChange({
                angle: 90
            });
        }
        flipX() {
            this.applyChange({
                flipX: !0
            });
        }
        flipY() {
            this.applyChange({
                flipY: !0
            });
        }
        fitX() {
            this.stop("target");
            const {containerRect: t, contentRect: e, target: i} = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.width / e.fitWidth / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            });
        }
        fitY() {
            this.stop("target");
            const {containerRect: t, contentRect: e, target: i} = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.innerHeight - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.height / e.fitHeight / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            });
        }
        toggleFS() {
            const {container: t} = this, e = this.cn("inFullscreen"), i = this.cn("htmlHasFullscreen");
            t.classList.toggle(e);
            const n = t.classList.contains(e);
            n ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), 
            document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), 
            this.emit(n ? "enterFS" : "exitFS");
        }
        getMatrix(t = this.current) {
            const {a: e, b: i, c: n, d: s, e: o, f: a} = t;
            return new DOMMatrix([ e, i, n, s, o, a ]);
        }
        reset(t) {
            if (this.state !== g.Init && this.state !== g.Destroy) {
                this.stop("current");
                for (const t of b) this.target[t] = P[t];
                this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), 
                this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = g.Panning, 
                this.requestTick());
            }
        }
        destroy() {
            this.stop(), this.state = g.Destroy, this.detachEvents(), this.detachObserver();
            const {container: t, content: e} = this, i = this.option("classes") || {};
            for (const e of Object.values(i)) t.classList.remove(e + "");
            e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), 
            this.detachPlugins();
        }
    }
    Object.defineProperty(R, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: y
    }), Object.defineProperty(R, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    const k = function(t, e) {
        let i = !0;
        return (...n) => {
            i && (i = !1, t(...n), setTimeout((() => {
                i = !0;
            }), e));
        };
    }, I = (t, e) => {
        let i = [];
        return t.childNodes.forEach((t => {
            t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t);
        })), i;
    }, F = {
        viewport: null,
        track: null,
        enabled: !0,
        slides: [],
        axis: "x",
        transition: "fade",
        preload: 1,
        slidesPerPage: "auto",
        initialPage: 0,
        friction: .12,
        Panzoom: {
            decelFriction: .12
        },
        center: !0,
        infinite: !0,
        fill: !0,
        dragFree: !1,
        adaptiveHeight: !1,
        direction: "ltr",
        classes: {
            container: "f-carousel",
            viewport: "f-carousel__viewport",
            track: "f-carousel__track",
            slide: "f-carousel__slide",
            isLTR: "is-ltr",
            isRTL: "is-rtl",
            isHorizontal: "is-horizontal",
            isVertical: "is-vertical",
            inTransition: "in-transition",
            isSelected: "is-selected"
        },
        l10n: {
            NEXT: "Next slide",
            PREV: "Previous slide",
            GOTO: "Go to slide #%d"
        }
    };
    var D;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy";
    }(D || (D = {}));
    const j = t => {
        if ("string" == typeof t || t instanceof HTMLElement) t = {
            html: t
        }; else {
            const e = t.thumb;
            void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, 
            t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb);
        }
        return Object.assign({
            html: "",
            el: null,
            isDom: !1,
            class: "",
            customClass: "",
            index: -1,
            dim: 0,
            gap: 0,
            pos: 0,
            transition: !1
        }, t);
    }, H = (t = {}) => Object.assign({
        index: -1,
        slides: [],
        dim: 0,
        pos: -1
    }, t);
    class B extends f {
        constructor(t, e) {
            super(e), Object.defineProperty(this, "instance", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            });
        }
        attach() {}
        detach() {}
    }
    const N = {
        classes: {
            list: "f-carousel__dots",
            isDynamic: "is-dynamic",
            hasDots: "has-dots",
            dot: "f-carousel__dot",
            isBeforePrev: "is-before-prev",
            isPrev: "is-prev",
            isCurrent: "is-current",
            isNext: "is-next",
            isAfterNext: "is-after-next"
        },
        dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
        dynamicFrom: 11,
        maxCount: 1 / 0,
        minCount: 2
    };
    class _ extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "isDynamic", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "list", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onRefresh() {
            this.refresh();
        }
        build() {
            let t = this.list;
            return t || (t = document.createElement("ul"), S(t, this.cn("list")), t.setAttribute("role", "tablist"), 
            this.instance.container.appendChild(t), S(this.instance.container, this.cn("hasDots")), 
            this.list = t), t;
        }
        refresh() {
            var t;
            const e = this.instance.pages.length, i = Math.min(2, this.option("minCount")), n = Math.max(2e3, this.option("maxCount")), s = this.option("dynamicFrom");
            if (e < i || e > n) return void this.cleanup();
            const a = "number" == typeof s && e > 5 && e >= s, r = !this.list || this.isDynamic !== a || this.list.children.length !== e;
            r && this.cleanup();
            const l = this.build();
            if (o(l, this.cn("isDynamic"), !!a), r) for (let t = 0; t < e; t++) l.append(this.createItem(t));
            let c, h = 0;
            for (const e of [ ...l.children ]) {
                const i = h === this.instance.page;
                i && (c = e), o(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
                for (const t of [ "isBeforePrev", "isPrev", "isNext", "isAfterNext" ]) E(e, this.cn(t));
                h++;
            }
            if (c = c || l.firstChild, a && c) {
                const t = c.previousElementSibling, e = t && t.previousElementSibling;
                S(t, this.cn("isPrev")), S(e, this.cn("isBeforePrev"));
                const i = c.nextElementSibling, n = i && i.nextElementSibling;
                S(i, this.cn("isNext")), S(n, this.cn("isAfterNext"));
            }
            this.isDynamic = a;
        }
        createItem(t = 0) {
            var e;
            const i = document.createElement("li");
            i.setAttribute("role", "presentation");
            const s = n(this.instance.localize(this.option("dotTpl"), [ [ "%d", t + 1 ] ]).replace(/\%i/g, t + ""));
            return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), 
            i;
        }
        cleanup() {
            this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, E(this.instance.container, this.cn("hasDots"));
        }
        attach() {
            this.instance.on([ "refresh", "change" ], this.onRefresh);
        }
        detach() {
            this.instance.off([ "refresh", "change" ], this.onRefresh), this.cleanup();
        }
    }
    Object.defineProperty(_, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: N
    });
    const W = "disabled", $ = "next", X = "prev";
    class Y extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prev", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "next", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onRefresh() {
            const t = this.instance, e = t.pages.length, i = t.page;
            if (e < 2) return void this.cleanup();
            this.build();
            let n = this.prev, s = this.next;
            n && s && (n.removeAttribute(W), s.removeAttribute(W), t.isInfinite || (i <= 0 && n.setAttribute(W, ""), 
            i >= e - 1 && s.setAttribute(W, "")));
        }
        createButton(t) {
            const e = this.instance, i = document.createElement("button");
            i.setAttribute("tabindex", "0"), i.setAttribute("title", e.localize(`{{${t.toUpperCase()}}}`)), 
            S(i, this.cn("button") + " " + this.cn(t === $ ? "isNext" : "isPrev"));
            const n = e.isRTL ? t === $ ? X : $ : t;
            var s;
            return i.innerHTML = e.localize(this.option(`${n}Tpl`)), i.dataset[`carousel${s = t, 
            s ? s.match("^[a-z]") ? s.charAt(0).toUpperCase() + s.substring(1) : s : ""}`] = "true", 
            i;
        }
        build() {
            let t = this.container;
            t || (this.container = t = document.createElement("div"), S(t, this.cn("container")), 
            this.instance.container.appendChild(t)), this.next || (this.next = t.appendChild(this.createButton($))), 
            this.prev || (this.prev = t.appendChild(this.createButton(X)));
        }
        cleanup() {
            this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove(), 
            this.prev = null, this.next = null, this.container = null;
        }
        attach() {
            this.instance.on([ "refresh", "change" ], this.onRefresh);
        }
        detach() {
            this.instance.off([ "refresh", "change" ], this.onRefresh), this.cleanup();
        }
    }
    Object.defineProperty(Y, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            classes: {
                container: "f-carousel__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev"
            },
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
        }
    });
    class q extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "selectedIndex", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "nav", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        addAsTargetFor(t) {
            this.target = this.instance, this.nav = t, this.attachEvents();
        }
        addAsNavFor(t) {
            this.nav = this.instance, this.target = t, this.attachEvents();
        }
        attachEvents() {
            this.nav && this.target && (this.nav.options.initialSlide = this.target.options.initialPage, 
            this.nav.state === D.Ready ? this.onNavReady(this.nav) : this.nav.on("ready", this.onNavReady), 
            this.target.state === D.Ready ? this.onTargetReady(this.target) : this.target.on("ready", this.onTargetReady));
        }
        onNavReady(t) {
            t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), 
            t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange();
        }
        onTargetReady(t) {
            t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), 
            this.onTargetChange();
        }
        onNavClick(t, e, i) {
            this.onNavTouch(t, t.panzoom, i);
        }
        onNavTouch(t, e, i) {
            var n, s;
            if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
            const o = i.target, {nav: a, target: r} = this;
            if (!a || !r || !o) return;
            const l = o.closest("[data-index]");
            if (i.stopPropagation(), i.preventDefault(), !l) return;
            const c = parseInt(l.dataset.index || "", 10) || 0, h = r.getPageForSlide(c), d = a.getPageForSlide(c);
            a.slideTo(d), r.slideTo(h, {
                friction: (null === (s = null === (n = this.nav) || void 0 === n ? void 0 : n.plugins) || void 0 === s ? void 0 : s.Sync.option("friction")) || 0
            }), this.markSelectedSlide(c);
        }
        onNavCreateSlide(t, e) {
            e.index === this.selectedIndex && this.markSelectedSlide(e.index);
        }
        onTargetChange() {
            const {target: t, nav: e} = this;
            if (!t || !e) return;
            if (e.state !== D.Ready || t.state !== D.Ready) return;
            const i = t.pages[t.page].slides[0].index, n = e.getPageForSlide(i);
            this.markSelectedSlide(i), e.slideTo(n, null === e.prevPage ? {
                friction: 0
            } : void 0);
        }
        markSelectedSlide(t) {
            const e = this.nav;
            e && e.state === D.Ready && (this.selectedIndex = t, [ ...e.slides ].map((e => {
                e.el && e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected");
            })));
        }
        attach() {
            const t = this;
            let e = t.options.target, i = t.options.nav;
            e ? t.addAsNavFor(e) : i && t.addAsTargetFor(i);
        }
        detach() {
            const t = this, e = t.nav, i = t.target;
            e && (e.off("ready", t.onNavReady), e.off("createSlide", t.onNavCreateSlide), e.off("Panzoom.click", t.onNavClick), 
            e.off("Panzoom.touchEnd", t.onNavTouch)), t.nav = null, i && (i.off("ready", t.onTargetReady), 
            i.off("refresh", t.onTargetChange), i.off("change", t.onTargetChange)), t.target = null;
        }
    }
    Object.defineProperty(q, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            friction: .35
        }
    });
    const V = {
        Navigation: Y,
        Dots: _,
        Sync: q
    };
    class Z extends m {
        get axis() {
            return this.isHorizontal ? "e" : "f";
        }
        get isEnabled() {
            return this.state === D.Ready;
        }
        get isInfinite() {
            let t = !1;
            const {contentDim: e, viewportDim: i, pages: n, slides: s} = this;
            return n.length >= 2 && e + s[0].dim >= i && (t = this.option("infinite")), t;
        }
        get isRTL() {
            return "rtl" === this.option("direction");
        }
        get isHorizontal() {
            return "x" === this.option("axis");
        }
        constructor(t, e = {}, i = {}) {
            if (super(), Object.defineProperty(this, "bp", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: ""
            }), Object.defineProperty(this, "lp", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "userOptions", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "userPlugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: D.Init
            }), Object.defineProperty(this, "page", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "prevPage", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "viewport", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "track", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "slides", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "pages", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "panzoom", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "inTransition", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: new Set
            }), Object.defineProperty(this, "contentDim", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "viewportDim", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), "string" == typeof t && (t = document.querySelector(t)), !t || !x(t)) throw new Error("No Element found");
            this.container = t, this.slideNext = k(this.slideNext.bind(this), 150), this.slidePrev = k(this.slidePrev.bind(this), 150), 
            this.userOptions = e, this.userPlugins = i, queueMicrotask((() => {
                this.processOptions();
            }));
        }
        processOptions() {
            const t = u({}, Z.defaults, this.userOptions);
            let e = "";
            const i = t.breakpoints;
            if (i && d(i)) for (const [n, s] of Object.entries(i)) window.matchMedia(n).matches && d(s) && (e += n, 
            u(t, s));
            e === this.bp && this.state !== D.Init || (this.bp = e, this.state === D.Ready && (t.initialSlide = this.pages[this.page].slides[0].index), 
            this.state !== D.Init && this.destroy(), super.setOptions(t), !1 === this.option("enabled") ? this.attachEvents() : setTimeout((() => {
                this.init();
            }), 0));
        }
        init() {
            this.state = D.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, Z.Plugins), this.userPlugins)), 
            this.emit("attachPlugins"), this.initLayout(), this.initSlides(), this.updateMetrics(), 
            this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = D.Ready, 
            this.emit("ready");
        }
        initLayout() {
            const {container: t} = this, e = this.option("classes");
            S(t, this.cn("container")), o(t, e.isLTR, !this.isRTL), o(t, e.isRTL, this.isRTL), 
            o(t, e.isVertical, !this.isHorizontal), o(t, e.isHorizontal, this.isHorizontal);
            let i = this.option("viewport") || t.querySelector(`.${e.viewport}`);
            i || (i = document.createElement("div"), S(i, e.viewport), i.append(...I(t, `.${e.slide}`)), 
            t.prepend(i));
            let n = this.option("track") || t.querySelector(`.${e.track}`);
            n || (n = document.createElement("div"), S(n, e.track), n.append(...Array.from(i.childNodes))), 
            n.setAttribute("aria-live", "polite"), i.contains(n) || i.prepend(n), this.viewport = i, 
            this.track = n, this.emit("initLayout");
        }
        initSlides() {
            const {track: t} = this;
            if (t) {
                this.slides = [], [ ...I(t, `.${this.cn("slide")}`) ].forEach((t => {
                    if (x(t)) {
                        const e = j({
                            el: t,
                            isDom: !0,
                            index: this.slides.length
                        });
                        this.slides.push(e), this.emit("initSlide", e, this.slides.length);
                    }
                }));
                for (let t of this.option("slides", [])) {
                    const e = j(t);
                    e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", e, this.slides.length);
                }
                this.emit("initSlides");
            }
        }
        setInitialPage() {
            let t = 0;
            const e = this.option("initialSlide");
            t = "number" == typeof e ? this.getPageForSlide(e) : parseInt(this.option("initialPage", 0) + "", 10) || 0, 
            this.page = t;
        }
        setInitialPosition() {
            if (!this.track || !this.pages.length) return;
            const t = this.isHorizontal;
            let e = this.page;
            this.pages[e] || (this.page = e = 0);
            const i = this.pages[e].pos * (this.isRTL && t ? 1 : -1), n = t ? `${i}px` : "0", s = t ? "0" : `${i}px`;
            this.track.style.transform = `translate3d(${n}, ${s}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight();
        }
        initPanzoom() {
            this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
            const t = this.option("Panzoom") || {};
            this.panzoom = new R(this.viewport, u({}, {
                content: this.track,
                zoom: !1,
                panOnlyZoomed: !1,
                lockAxis: this.isHorizontal ? "x" : "y",
                infinite: this.isInfinite,
                click: !1,
                dblClick: !1,
                touch: t => !(this.pages.length < 2 && !t.options.infinite),
                bounds: () => this.getBounds(),
                maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
            }, t)), this.panzoom.on("*", ((t, e, ...i) => {
                this.emit(`Panzoom.${e}`, t, ...i);
            })), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), 
            this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation);
        }
        attachEvents() {
            const t = this.container;
            t && (t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize);
        }
        createPages() {
            let t = [];
            const {contentDim: e, viewportDim: i} = this;
            let n = this.option("slidesPerPage");
            ("number" != typeof n || e <= i) && (n = 1 / 0);
            let s = 0, o = 0, a = 0;
            for (const e of this.slides) (!t.length || o + e.dim - i > .05 || a === n) && (t.push(H()), 
            s = t.length - 1, o = 0, a = 0), t[s].slides.push(e), o += e.dim + e.gap, a++;
            return t;
        }
        processPages() {
            const e = this.pages, {contentDim: i, viewportDim: n} = this, s = this.option("center"), o = this.option("fill"), a = o && s && i > n && !this.isInfinite;
            if (e.forEach(((t, e) => {
                t.index = e, t.pos = t.slides[0].pos, t.dim = 0;
                for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
                a && t.pos + .5 * t.dim < .5 * n ? t.pos = 0 : a && t.pos + .5 * t.dim >= i - .5 * n ? t.pos = i - n : s && (t.pos += -.5 * (n - t.dim));
            })), e.forEach(((e, s) => {
                o && !this.isInfinite && i > n && (e.pos = Math.max(e.pos, 0), e.pos = Math.min(e.pos, i - n)), 
                e.pos = t(e.pos, 1e3), e.dim = t(e.dim, 1e3), Math.abs(e.pos) <= .1 && (e.pos = 0);
            })), this.isInfinite) return e;
            const r = [];
            let l;
            return e.forEach((t => {
                const e = Object.assign({}, t);
                l && e.pos === l.pos ? (l.dim += e.dim, l.slides = [ ...l.slides, ...e.slides ]) : (e.index = r.length, 
                l = e, r.push(e));
            })), r;
        }
        getPageFromIndex(t = 0) {
            const e = this.pages.length;
            let i;
            return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, e - 1), 0), 
            i;
        }
        getSlideMetrics(e) {
            var i, n;
            const s = this.isHorizontal ? "width" : "height";
            let o = 0, a = 0, r = e.el;
            const l = r && !r.parentNode;
            if (r ? o = parseFloat(r.dataset[s] || "") || 0 : (r = document.createElement("div"), 
            r.style.visibility = "hidden", (this.track || document.body).prepend(r)), S(r, this.cn("slide") + " " + e.class + " " + e.customClass), 
            o) r.style[s] = `${o}px`, r.style["width" === s ? "height" : "width"] = ""; else {
                l && (this.track || document.body).prepend(r);
                const t = Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1);
                o = r.getBoundingClientRect()[s] * t;
            }
            const c = getComputedStyle(r);
            return "content-box" === c.boxSizing && (this.isHorizontal ? (o += parseFloat(c.paddingLeft) || 0, 
            o += parseFloat(c.paddingRight) || 0) : (o += parseFloat(c.paddingTop) || 0, o += parseFloat(c.paddingBottom) || 0)), 
            a = parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, l ? null === (n = r.parentElement) || void 0 === n || n.removeChild(r) : e.el || r.remove(), 
            {
                dim: t(o, 1e3),
                gap: t(a, 1e3)
            };
        }
        getBounds() {
            const {isInfinite: t, isRTL: e, isHorizontal: i, pages: n} = this;
            let s = {
                min: 0,
                max: 0
            };
            if (t) s = {
                min: -1 / 0,
                max: 1 / 0
            }; else if (n.length) {
                const t = n[0].pos, o = n[n.length - 1].pos;
                s = e && i ? {
                    min: t,
                    max: o
                } : {
                    min: -1 * o,
                    max: -1 * t
                };
            }
            return {
                x: i ? s : {
                    min: 0,
                    max: 0
                },
                y: i ? {
                    min: 0,
                    max: 0
                } : s
            };
        }
        repositionSlides() {
            let e, {isHorizontal: i, isRTL: n, isInfinite: s, viewport: o, viewportDim: a, contentDim: r, page: l, pages: c, slides: h, panzoom: d} = this, u = 0, p = 0, f = 0, m = 0;
            d ? m = -1 * d.current[this.axis] : c[l] && (m = c[l].pos || 0), e = i ? n ? "right" : "left" : "top", 
            n && i && (m *= -1);
            for (const i of h) i.el ? ("top" === e ? (i.el.style.right = "", i.el.style.left = "") : i.el.style.top = "", 
            i.index !== u ? i.el.style[e] = 0 === p ? "" : `${t(p, 1e3)}px` : i.el.style[e] = "", 
            f += i.dim + i.gap, u++) : p += i.dim + i.gap;
            if (s && f && o) {
                let n = getComputedStyle(o), s = "padding", l = i ? "Right" : "Bottom", c = parseFloat(n[s + (i ? "Left" : "Top")]);
                m -= c, a += c, a += parseFloat(n[s + l]);
                for (const i of h) i.el && (t(i.pos) < t(a) && t(i.pos + i.dim + i.gap) < t(m) && t(m) > t(r - a) && (i.el.style[e] = `${t(p + f, 1e3)}px`), 
                t(i.pos + i.gap) >= t(r - a) && t(i.pos) > t(m + a) && t(m) < t(a) && (i.el.style[e] = `-${t(f, 1e3)}px`));
            }
            let g, b, v = [ ...this.inTransition ];
            if (v.length > 1 && (g = c[v[0]], b = c[v[1]]), g && b) {
                let i = 0;
                for (const n of h) n.el ? this.inTransition.has(n.index) && g.slides.indexOf(n) < 0 && (n.el.style[e] = `${t(i + (g.pos - b.pos), 1e3)}px`) : i += n.dim + n.gap;
            }
        }
        createSlideEl(t) {
            const {track: e, slides: i} = this;
            if (!e || !t) return;
            if (t.el && t.el.parentNode) return;
            const n = t.el || document.createElement("div");
            S(n, this.cn("slide")), S(n, t.class), S(n, t.customClass);
            const s = t.html;
            s && (s instanceof HTMLElement ? n.appendChild(s) : n.innerHTML = t.html + "");
            const o = [];
            i.forEach(((t, e) => {
                t.el && o.push(e);
            }));
            const a = t.index;
            let r = null;
            if (o.length) r = i[o.reduce(((t, e) => Math.abs(e - a) < Math.abs(t - a) ? e : t))];
            const l = r && r.el && r.el.parentNode ? r.index < t.index ? r.el.nextSibling : r.el : null;
            e.insertBefore(n, e.contains(l) ? l : null), t.el = n, this.emit("createSlide", t);
        }
        removeSlideEl(t, e = !1) {
            const i = t.el;
            if (!i || !i.parentNode) return;
            const n = this.cn("isSelected");
            if (i.classList.contains(n) && (E(i, n), this.emit("unselectSlide", t)), t.isDom && !e) return i.removeAttribute("aria-hidden"), 
            i.removeAttribute("data-index"), void (i.style.left = "");
            this.emit("removeSlide", t);
            const s = new CustomEvent("animationend");
            i.dispatchEvent(s), t.el && (t.el.remove(), t.el = null);
        }
        transitionTo(t = 0, e = this.option("transition")) {
            if (!e) return !1;
            const {pages: i, panzoom: n} = this;
            t = parseInt((t || 0).toString()) || 0;
            const s = this.getPageFromIndex(t);
            if (!n || !i[s] || i.length < 2 || Math.abs(i[this.page].slides[0].dim - this.viewportDim) > 1) return !1;
            const o = t > this.page ? 1 : -1, a = this.pages[s].pos * (this.isRTL ? 1 : -1);
            if (this.page === s && Math.abs(a - n.target[this.axis]) < 1) return !1;
            this.clearTransitions();
            const r = n.isResting;
            S(this.container, this.cn("inTransition"));
            const l = this.pages[this.page].slides[0], c = this.pages[s].slides[0];
            this.inTransition.add(c.index), this.createSlideEl(c);
            let h = l.el, d = c.el;
            r || "slide" === e || (e = "fadeFast", h = null);
            const u = this.isRTL ? "next" : "prev", p = this.isRTL ? "prev" : "next";
            return h && (this.inTransition.add(l.index), l.transition = e, h.addEventListener("animationend", this.onAnimationEnd), 
            h.classList.add(`f-${e}Out`, `to-${o > 0 ? p : u}`)), d && (c.transition = e, d.addEventListener("animationend", this.onAnimationEnd), 
            d.classList.add(`f-${e}In`, `from-${o > 0 ? u : p}`)), n.panTo({
                x: this.isHorizontal ? a : 0,
                y: this.isHorizontal ? 0 : a,
                friction: 0
            }), this.onChange(s), !0;
        }
        manageSlideVisiblity() {
            const t = new Set, e = new Set, i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
            for (const n of this.slides) i.has(n) ? t.add(n) : e.add(n);
            for (const e of this.inTransition) t.add(this.slides[e]);
            for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
            for (const i of e) t.has(i) || this.removeSlideEl(i);
            this.markSelectedSlides(), this.repositionSlides();
        }
        markSelectedSlides() {
            if (!this.pages[this.page] || !this.pages[this.page].slides) return;
            const t = "aria-hidden";
            let e = this.cn("isSelected");
            if (e) for (const i of this.slides) {
                const n = i.el;
                n && (n.dataset.index = `${i.index}`, this.pages[this.page].slides.includes(i) ? (n.classList.contains(e) || (S(n, e), 
                this.emit("selectSlide", i)), n.removeAttribute(t)) : (n.classList.contains(e) && (E(n, e), 
                this.emit("unselectSlide", i)), n.setAttribute(t, "true")));
            }
        }
        flipInfiniteTrack() {
            const t = this.panzoom;
            if (!t || !this.isInfinite) return;
            const e = "x" === this.option("axis") ? "e" : "f", {viewportDim: i, contentDim: n} = this;
            let s = t.current[e], o = t.target[e] - s, a = 0, r = .5 * i, l = n;
            this.isRTL && this.isHorizontal ? (s < -r && (a = -1, s += l), s > l - r && (a = 1, 
            s -= l)) : (s > r && (a = 1, s -= l), s < -l + r && (a = -1, s += l)), a && (t.current[e] = s, 
            t.target[e] = s + o);
        }
        lazyLoadSlide(t) {
            const e = this, i = t && t.el;
            if (!i) return;
            const s = new Set, o = "f-fadeIn";
            i.querySelectorAll("[data-lazy-srcset]").forEach((t => {
                t instanceof HTMLImageElement && s.add(t);
            }));
            let a = Array.from(i.querySelectorAll("[data-lazy-src]"));
            i.dataset.lazySrc && a.push(i), a.map((t => {
                t instanceof HTMLImageElement ? s.add(t) : x(t) && (t.style.backgroundImage = `url('${t.dataset.lazySrc || ""}')`, 
                delete t.dataset.lazySrc);
            }));
            const r = (t, i, n) => {
                n && (n.remove(), n = null), i.complete && (i.classList.add(o), setTimeout((() => {
                    i.classList.remove(o);
                }), 350), i.style.visibility = ""), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && (e.updateMetrics(), 
                e.setViewportHeight()), this.emit("load", t);
            };
            for (const e of s) {
                let i = null;
                e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, 
                delete e.dataset.lazySrcset, e.style.visibility = "hidden", e.addEventListener("error", (() => {
                    r(t, e, i);
                })), e.addEventListener("load", (() => {
                    r(t, e, i);
                })), setTimeout((() => {
                    e.parentNode && t.el && (e.complete ? r(t, e, i) : (i = n(w), e.parentNode.insertBefore(i, e)));
                }), 300);
            }
        }
        onAnimationEnd(t) {
            var e;
            const i = t.target, n = i ? parseInt(i.dataset.index || "", 10) || 0 : -1, s = this.slides[n], o = t.animationName;
            if (!i || !s || !o) return;
            const a = !!this.inTransition.has(n) && s.transition;
            a && o.substring(0, a.length + 2) === `f-${a}` && this.inTransition.delete(n), this.inTransition.size || this.clearTransitions(), 
            n === this.page && (null === (e = this.panzoom) || void 0 === e ? void 0 : e.isResting) && this.emit("settle");
        }
        onDecel(t, e = 0, i = 0, n = 0, s = 0) {
            const {isRTL: o, isHorizontal: a, axis: r, pages: l} = this, c = l.length, h = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
            let d = 0;
            if (d = h > 45 && h < 135 ? a ? 0 : i : a ? e : 0, !c) return;
            const u = this.option("dragFree");
            let p = this.page, f = o && a ? 1 : -1;
            const m = t.target[r] * f, g = t.current[r] * f;
            let {pageIndex: b} = this.getPageFromPosition(m), {pageIndex: v} = this.getPageFromPosition(g);
            u ? this.onChange(b) : (Math.abs(d) > 5 ? (l[p].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (p = v), 
            p = o && a ? d < 0 ? p - 1 : p + 1 : d < 0 ? p + 1 : p - 1) : p = 0 === n && 0 === s ? p : v, 
            this.slideTo(p, {
                transition: !1,
                friction: t.option("decelFriction")
            }));
        }
        onClick(t) {
            const e = t.target, i = e && x(e) ? e.dataset : null;
            let n, s;
            i && (void 0 !== i.carouselPage ? (s = "slideTo", n = i.carouselPage) : void 0 !== i.carouselNext ? s = "slideNext" : void 0 !== i.carouselPrev && (s = "slidePrev")), 
            s ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[s](n)) : this.emit("click", t);
        }
        onSlideTo(t) {
            const e = t.detail || 0;
            this.slideTo(this.getPageForSlide(e), {
                friction: 0
            });
        }
        onChange(t, e = 0) {
            const i = this.page;
            this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), 
            t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e));
        }
        onRefresh() {
            let t = this.contentDim, e = this.viewportDim;
            this.updateMetrics(), this.contentDim === t && this.viewportDim === e || this.slideTo(this.page, {
                friction: 0,
                transition: !1
            });
        }
        onResize() {
            this.option("breakpoints") && this.processOptions();
        }
        onBeforeTransform(t) {
            this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), 
            this.lp = t.current.e;
        }
        onEndAnimation() {
            this.inTransition.size || this.emit("settle");
        }
        reInit(t = null, e = null) {
            this.destroy(), this.state = D.Init, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, 
            this.processOptions();
        }
        slideTo(t = 0, {friction: e = this.option("friction"), transition: i = this.option("transition")} = {}) {
            if (this.state === D.Destroy) return;
            t = parseInt((t || 0).toString()) || 0;
            const n = this.getPageFromIndex(t);
            if (this.page !== n) {
                const e = new Event("beforeChange", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (this.emit("beforeChange", e, t), e.defaultPrevented) return;
            }
            const {axis: s, isHorizontal: o, isRTL: a, pages: r, panzoom: l} = this, c = r.length, h = a && o ? 1 : -1;
            if (!l || !c) return;
            if (this.transitionTo(t, i)) return;
            let d = r[n].pos;
            if (this.isInfinite) {
                const e = this.contentDim, i = l.target[s] * h;
                if (2 === c) d += e * Math.floor(parseFloat(t + "") / 2); else {
                    const t = i;
                    d = [ d, d - e, d + e ].reduce((function(e, i) {
                        return Math.abs(i - t) < Math.abs(e - t) ? i : e;
                    }));
                }
            }
            d *= h, Math.abs(l.target[s] - d) < .1 || (l.panTo({
                x: o ? d : 0,
                y: o ? 0 : d,
                friction: e
            }), this.onChange(n));
        }
        slideToClosest(t) {
            if (this.panzoom) {
                const {pageIndex: e} = this.getPageFromPosition(this.panzoom.current[this.isHorizontal ? "e" : "f"]);
                this.slideTo(e, t);
            }
        }
        slideNext() {
            this.slideTo(this.page + 1);
        }
        slidePrev() {
            this.slideTo(this.page - 1);
        }
        clearTransitions() {
            this.inTransition.clear(), E(this.container, this.cn("inTransition"));
            const t = [ "to-prev", "to-next", "from-prev", "from-next" ];
            for (const e of this.slides) {
                const i = e.el;
                if (i) {
                    i.removeEventListener("animationend", this.onAnimationEnd), i.classList.remove(...t);
                    const n = e.transition;
                    n && i.classList.remove(`f-${n}Out`, `f-${n}In`);
                }
            }
            this.manageSlideVisiblity();
        }
        prependSlide(t) {
            var e, i;
            let n = Array.isArray(t) ? t : [ t ];
            for (const t of n.reverse()) this.slides.unshift(j(t));
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            const s = (null === (e = this.pages[this.page]) || void 0 === e ? void 0 : e.pos) || 0;
            this.page += n.length, this.updateMetrics();
            const o = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0;
            if (this.panzoom) {
                const t = this.isRTL ? s - o : o - s;
                this.panzoom.target.e -= t, this.panzoom.current.e -= t, this.panzoom.requestTick();
            }
        }
        appendSlide(t) {
            let e = Array.isArray(t) ? t : [ t ];
            for (const t of e) {
                const e = j(t);
                e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", e, this.slides.length);
            }
            this.updateMetrics();
        }
        removeSlide(t) {
            const e = this.slides.length;
            t = (t % e + e) % e, this.removeSlideEl(this.slides[t], !0), this.slides.splice(t, 1);
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            this.updateMetrics(), this.slideTo(this.page, {
                friction: 0,
                transition: !1
            });
        }
        updateMetrics() {
            const {panzoom: e, viewport: i, track: n, isHorizontal: s} = this;
            if (!n) return;
            const o = s ? "width" : "height", a = s ? "offsetWidth" : "offsetHeight";
            if (i) {
                let e = Math.max(i[a], t(i.getBoundingClientRect()[o], 1e3)), n = getComputedStyle(i), r = "padding", l = s ? "Right" : "Bottom";
                e -= parseFloat(n[r + (s ? "Left" : "Top")]) + parseFloat(n[r + l]), this.viewportDim = e;
            }
            let r, l = this.pages.length, c = 0;
            for (const [e, i] of this.slides.entries()) {
                let n = 0, s = 0;
                !i.el && r ? (n = r.dim, s = r.gap) : (({dim: n, gap: s} = this.getSlideMetrics(i)), 
                r = i), n = t(n, 1e3), s = t(s, 1e3), i.dim = n, i.gap = s, i.pos = c, c += n, (this.isInfinite || e < this.slides.length - 1) && (c += s);
            }
            const h = this.contentDim;
            c = t(c, 1e3), this.contentDim = c, e && (e.contentRect[o] = c, e.contentRect["e" === this.axis ? "fullWidth" : "fullHeight"] = c), 
            this.pages = this.createPages(), this.pages = this.processPages(), this.state === D.Init && this.setInitialPage(), 
            this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), e && l === this.pages.length && Math.abs(c - h) > .5 && (e.target[this.axis] = -1 * this.pages[this.page].pos, 
            e.current[this.axis] = -1 * this.pages[this.page].pos, e.stop()), this.manageSlideVisiblity(), 
            this.emit("refresh");
        }
        getProgress(e, i = !1) {
            void 0 === e && (e = this.page);
            const n = this, s = n.panzoom, o = n.pages[e] || 0;
            if (!o || !s) return 0;
            let a = -1 * s.current.e, r = n.contentDim;
            var l = [ t((a - o.pos) / (1 * o.dim), 1e3), t((a + r - o.pos) / (1 * o.dim), 1e3), t((a - r - o.pos) / (1 * o.dim), 1e3) ].reduce((function(t, e) {
                return Math.abs(e) < Math.abs(t) ? e : t;
            }));
            return i ? l : Math.max(-1, Math.min(1, l));
        }
        setViewportHeight() {
            const {page: t, pages: e, viewport: i, isHorizontal: n} = this;
            if (!i || !e[t]) return;
            let s = 0;
            n && this.track && (this.track.style.height = "auto", e[t].slides.forEach((t => {
                t.el && (s = Math.max(s, t.el.offsetHeight));
            }))), i.style.height = s ? `${s}px` : "";
        }
        getPageForSlide(t) {
            for (const e of this.pages) for (const i of e.slides) if (i.index === t) return e.index;
            return -1;
        }
        getVisibleSlides(t = 0) {
            var e;
            const i = new Set;
            let {contentDim: n, viewportDim: s, pages: o, page: a} = this;
            n = n + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
            let r = 0;
            r = this.panzoom ? -1 * this.panzoom.current[this.axis] : o[a] && o[a].pos || 0, 
            this.isInfinite && (r -= Math.floor(r / n) * n), this.isRTL && this.isHorizontal && (r *= -1);
            const l = r - s * t, c = r + s * (t + 1), h = this.isInfinite ? [ -1, 0, 1 ] : [ 0 ];
            for (const t of this.slides) for (const e of h) {
                const s = t.pos + e * n, o = t.pos + t.dim + t.gap + e * n;
                s < c && o > l && i.add(t);
            }
            return i;
        }
        getPageFromPosition(t) {
            const {viewportDim: e, contentDim: i} = this, n = this.pages.length, s = this.slides.length, o = this.slides[s - 1];
            let a = 0, r = 0, l = 0;
            const c = this.option("center");
            c && (t += .5 * e), this.isInfinite || (t = Math.max(this.slides[0].pos, Math.min(t, o.pos)));
            const h = i + o.gap;
            l = Math.floor(t / h) || 0, t -= l * h;
            let d = o, u = this.slides.find((e => {
                const i = t + (d && !c ? .5 * d.dim : 0);
                return d = e, e.pos <= i && e.pos + e.dim + e.gap > i;
            }));
            return u || (u = o), r = this.getPageForSlide(u.index), a = r + l * n, {
                page: a,
                pageIndex: r
            };
        }
        destroy() {
            if ([ D.Destroy ].includes(this.state)) return;
            this.state = D.Destroy;
            const {container: t, viewport: e, track: i, slides: n, panzoom: s} = this, o = this.option("classes");
            t.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), 
            s && (s.destroy(), this.panzoom = null), n && n.forEach((t => {
                this.removeSlideEl(t);
            })), this.detachPlugins(), e && e.offsetParent && i && i.offsetParent && e.replaceWith(...i.childNodes);
            for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
            this.track = null, this.viewport = null, this.page = 0, this.slides = [];
            const a = this.events.get("ready");
            this.events = new Map, a && this.events.set("ready", a);
        }
    }
    Object.defineProperty(Z, "Panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: R
    }), Object.defineProperty(Z, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: F
    }), Object.defineProperty(Z, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: V
    });
    const U = function(t) {
        const e = window.pageYOffset, i = window.pageYOffset + window.innerHeight;
        if (!x(t)) return 0;
        const n = t.getBoundingClientRect(), s = n.y + window.pageYOffset, o = n.y + n.height + window.pageYOffset;
        if (e > o || i < s) return 0;
        if (e < s && i > o) return 100;
        if (s < e && o > i) return 100;
        let a = n.height;
        s < e && (a -= window.pageYOffset - s), o > i && (a -= o - i);
        const r = a / window.innerHeight * 100;
        return Math.round(r);
    }, G = !("undefined" == typeof window || !window.document || !window.document.createElement);
    let K;
    const J = [ "a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])' ].join(","), Q = t => {
        if (t && G) {
            void 0 === K && document.createElement("div").focus({
                get preventScroll() {
                    return K = !0, !1;
                }
            });
            try {
                if (K) t.focus({
                    preventScroll: !0
                }); else {
                    const e = window.pageXOffset || document.body.scrollTop, i = window.pageYOffset || document.body.scrollLeft;
                    t.focus(), document.body.scrollTo({
                        top: e,
                        left: i,
                        behavior: "auto"
                    });
                }
            } catch (t) {}
        }
    }, tt = {
        dragToClose: !0,
        hideScrollbar: !0,
        Carousel: {
            classes: {
                container: "fancybox__carousel",
                viewport: "fancybox__viewport",
                track: "fancybox__track",
                slide: "fancybox__slide"
            }
        },
        contentClick: "toggleZoom",
        contentDblClick: !1,
        backdropClick: "close",
        animated: !0,
        idle: 3500,
        showClass: "f-zoomInUp",
        hideClass: "f-fadeOut",
        commonCaption: !1,
        parentEl: null,
        startIndex: 0,
        l10n: Object.assign(Object.assign({}, v), {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            MODAL: "You can close this modal content with the ESC key",
            ERROR: "Something Went Wrong, Please Try Again Later",
            IMAGE_ERROR: "Image Not Found",
            ELEMENT_NOT_FOUND: "HTML Element Not Found",
            AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
            AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
            IFRAME_ERROR: "Error Loading Page",
            TOGGLE_ZOOM: "Toggle zoom level",
            TOGGLE_THUMBS: "Toggle thumbnails",
            TOGGLE_SLIDESHOW: "Toggle slideshow",
            TOGGLE_FULLSCREEN: "Toggle full-screen mode",
            DOWNLOAD: "Download"
        }),
        tpl: {
            closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
            main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'
        },
        groupAll: !1,
        groupAttr: "data-fancybox",
        defaultType: "image",
        defaultDisplay: "block",
        autoFocus: !0,
        trapFocus: !0,
        placeFocusBack: !0,
        closeButton: "auto",
        keyboard: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev"
        },
        Fullscreen: {
            autoStart: !1
        },
        compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
        wheel: "zoom"
    };
    var et, it;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Closing = 2] = "Closing", 
        t[t.CustomClosing = 3] = "CustomClosing", t[t.Destroy = 4] = "Destroy";
    }(et || (et = {})), function(t) {
        t[t.Loading = 0] = "Loading", t[t.Opening = 1] = "Opening", t[t.Ready = 2] = "Ready", 
        t[t.Closing = 3] = "Closing";
    }(it || (it = {}));
    const nt = () => {
        queueMicrotask((() => {
            (() => {
                const {slug: t, index: e} = st.parseURL(), i = Jt.getInstance();
                if (i && !1 !== i.option("Hash")) {
                    const n = i.carousel;
                    if (t && n) {
                        for (let e of n.slides) if (e.slug && e.slug === t) return n.slideTo(e.index);
                        if (t === i.option("slug")) return n.slideTo(e - 1);
                        const s = i.getSlide(), o = s && s.triggerEl && s.triggerEl.dataset;
                        if (o && o.fancybox === t) return n.slideTo(e - 1);
                    }
                    st.hasSilentClose = !0, i.close();
                }
                st.startFromUrl();
            })();
        }));
    };
    class st extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "origHash", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: ""
            }), Object.defineProperty(this, "timer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onChange() {
            const t = this.instance, e = t.carousel;
            this.timer && clearTimeout(this.timer);
            const i = t.getSlide();
            if (!e || !i) return;
            const n = t.isOpeningSlide(i), s = new URL(document.URL).hash;
            let o, a = i.slug || void 0, r = i.triggerEl || void 0;
            o = a || this.instance.option("slug"), !o && r && r.dataset && (o = r.dataset.fancybox);
            let l = "";
            o && "true" !== o && (l = "#" + o + (!a && e.slides.length > 1 ? "-" + (i.index + 1) : "")), 
            n && (this.origHash = s !== l ? s : ""), l && s !== l && (this.timer = setTimeout((() => {
                try {
                    t.state === et.Ready && window.history[n ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + l);
                } catch (t) {}
            }), 300));
        }
        onClose() {
            if (this.timer && clearTimeout(this.timer), !0 !== st.hasSilentClose) try {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash || ""));
            } catch (t) {}
        }
        attach() {
            const t = this.instance;
            t.on("Carousel.ready", this.onChange), t.on("Carousel.change", this.onChange), t.on("close", this.onClose);
        }
        detach() {
            const t = this.instance;
            t.off("Carousel.ready", this.onChange), t.off("Carousel.change", this.onChange), 
            t.off("close", this.onClose);
        }
        static parseURL() {
            const t = window.location.hash.slice(1), e = t.split("-"), i = e[e.length - 1], n = i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10) || 1;
            return {
                hash: t,
                slug: e.join("-"),
                index: n
            };
        }
        static startFromUrl() {
            if (st.hasSilentClose = !1, Jt.getInstance() || !1 === Jt.defaults.Hash) return;
            const {hash: t, slug: e, index: i} = st.parseURL();
            if (!e) return;
            let n = document.querySelector(`[data-slug="${t}"]`);
            if (n && n.dispatchEvent(new CustomEvent("click", {
                bubbles: !0,
                cancelable: !0
            })), Jt.getInstance()) return;
            const s = document.querySelectorAll(`[data-fancybox="${e}"]`);
            s.length && (n = s[i - 1], n && n.dispatchEvent(new CustomEvent("click", {
                bubbles: !0,
                cancelable: !0
            })));
        }
        static destroy() {
            window.removeEventListener("hashchange", nt, !1);
        }
    }
    function ot() {
        window.addEventListener("hashchange", nt, !1), setTimeout((() => {
            st.startFromUrl();
        }), 500);
    }
    Object.defineProperty(st, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    }), Object.defineProperty(st, "hasSilentClose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
    }), G && (/complete|interactive|loaded/.test(document.readyState) ? ot() : document.addEventListener("DOMContentLoaded", ot));
    class at extends B {
        onCreateSlide(t, e, i) {
            const n = this.instance.optionFor(i, "src") || "";
            i.el && "image" === i.type && "string" == typeof n && this.setImage(i, n);
        }
        onRemoveSlide(t, e, i) {
            i.panzoom && i.panzoom.destroy(), i.panzoom = void 0, i.imageEl = void 0;
        }
        onChange(t, e, i, n) {
            for (const t of e.slides) {
                const e = t.panzoom;
                e && t.index !== i && e.reset(.35);
            }
        }
        onClose() {
            var t;
            const e = this.instance, i = e.container, n = e.getSlide();
            if (!i || !i.parentElement || !n) return;
            const {el: s, contentEl: o, panzoom: a} = n, r = n.thumbElSrc;
            if (!s || !r || !o || !a || a.isContentLoading || a.state === g.Init || a.state === g.Destroy) return;
            a.updateMetrics();
            let l = this.getZoomInfo(n);
            if (!l) return;
            this.instance.state = et.CustomClosing, i.classList.remove("is-zooming-in"), i.classList.add("is-zooming-out"), 
            o.style.backgroundImage = `url('${r}')`;
            const c = i.getBoundingClientRect();
            1 === ((null === (t = window.visualViewport) || void 0 === t ? void 0 : t.scale) || 1) && Object.assign(i.style, {
                position: "absolute",
                top: `${window.pageYOffset}px`,
                left: `${window.pageXOffset}px`,
                bottom: "auto",
                right: "auto",
                width: `${c.width}px`,
                height: `${c.height}px`,
                overflow: "hidden"
            });
            const {x: h, y: d, scale: u, opacity: p} = l;
            if (p) {
                const t = ((t, e, i, n) => {
                    const s = e - t, o = n - i;
                    return e => i + ((e - t) / s * o || 0);
                })(a.scale, u, 1, 0);
                a.on("afterTransform", (() => {
                    o.style.opacity = t(a.scale) + "";
                }));
            }
            a.on("endAnimation", (() => {
                e.destroy();
            })), a.target.a = u, a.target.b = 0, a.target.c = 0, a.target.d = u, a.panTo({
                x: h,
                y: d,
                scale: u,
                friction: p ? .2 : .33,
                ignoreBounds: !0
            }), a.isResting && e.destroy();
        }
        setImage(t, e) {
            const i = this.instance;
            t.src = e, this.process(t, e).then((e => {
                var n;
                const s = t.contentEl, o = t.imageEl, a = t.thumbElSrc;
                if (i.isClosing() || !s || !o) return;
                s.offsetHeight;
                const r = !!i.isOpeningSlide(t) && this.getZoomInfo(t);
                if (this.option("protected")) {
                    null === (n = t.el) || void 0 === n || n.addEventListener("contextmenu", (t => {
                        t.preventDefault();
                    }));
                    const e = document.createElement("div");
                    S(e, "fancybox-protected"), s.appendChild(e);
                }
                if (a && r) {
                    const n = e.contentRect, o = Math.max(n.fullWidth, n.fullHeight);
                    let c = null;
                    !r.opacity && o > 1200 && (c = document.createElement("img"), S(c, "fancybox-ghost"), 
                    c.src = a, s.appendChild(c));
                    const h = () => {
                        c && (S(c, "f-fadeFastOut"), setTimeout((() => {
                            c && (c.remove(), c = null);
                        }), 200));
                    };
                    (l = a, new Promise(((t, e) => {
                        const i = new Image;
                        i.onload = t, i.onerror = e, i.src = l;
                    }))).then((() => {
                        i.hideLoading(t), t.state = it.Opening, this.instance.emit("reveal", t), this.zoomIn(t).then((() => {
                            h(), this.instance.done(t);
                        }), (() => {})), c && setTimeout((() => {
                            h();
                        }), o > 2500 ? 800 : 200);
                    }), (() => {
                        i.hideLoading(t), i.revealContent(t);
                    }));
                } else {
                    const n = this.optionFor(t, "initialSize"), s = this.optionFor(t, "zoom"), o = {
                        event: i.prevMouseMoveEvent || i.options.event,
                        friction: s ? .12 : 0
                    };
                    let a = i.optionFor(t, "showClass") || void 0, r = !0;
                    i.isOpeningSlide(t) && ("full" === n ? e.zoomToFull(o) : "cover" === n ? e.zoomToCover(o) : "max" === n ? e.zoomToMax(o) : r = !1, 
                    e.stop("current")), r && a && (a = e.isDragging ? "f-fadeIn" : ""), i.hideLoading(t), 
                    i.revealContent(t, a);
                }
                var l;
            }), (() => {
                i.setError(t, "{{IMAGE_ERROR}}");
            }));
        }
        process(t, e) {
            return new Promise(((i, s) => {
                var o;
                const a = this.instance, r = t.el;
                a.clearContent(t), a.showLoading(t);
                let l = this.optionFor(t, "content");
                if ("string" == typeof l && (l = n(l)), !l || !x(l)) {
                    if (l = document.createElement("img"), l instanceof HTMLImageElement) {
                        let i = "", n = t.caption;
                        i = "string" == typeof n && n ? n.replace(/<[^>]+>/gi, "").substring(0, 1e3) : `Image ${t.index + 1} of ${null === (o = a.carousel) || void 0 === o ? void 0 : o.pages.length}`, 
                        l.src = e || "", l.alt = i, l.draggable = !1, t.srcset && l.setAttribute("srcset", t.srcset);
                    }
                    t.sizes && l.setAttribute("sizes", t.sizes);
                }
                l.classList.add("fancybox-image"), t.imageEl = l, a.setContent(t, l, !1);
                t.panzoom = new R(r, u({
                    transformParent: !0
                }, this.option("Panzoom") || {}, {
                    content: l,
                    width: a.optionFor(t, "width", "auto"),
                    height: a.optionFor(t, "height", "auto"),
                    wheel: () => {
                        const t = a.option("wheel");
                        return ("zoom" === t || "pan" == t) && t;
                    },
                    click: (e, i) => {
                        var n, s;
                        if (a.isCompact || a.isClosing()) return !1;
                        if (t.index !== (null === (n = a.getSlide()) || void 0 === n ? void 0 : n.index)) return !1;
                        if (i) {
                            const t = i.composedPath()[0];
                            if ([ "A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO" ].includes(t.nodeName)) return !1;
                        }
                        let o = !i || i.target && (null === (s = t.contentEl) || void 0 === s ? void 0 : s.contains(i.target));
                        return a.option(o ? "contentClick" : "backdropClick") || !1;
                    },
                    dblClick: () => a.isCompact ? "toggleZoom" : a.option("contentDblClick") || !1,
                    spinner: !1,
                    panOnlyZoomed: !0,
                    wheelLimit: 1 / 0,
                    on: {
                        ready: t => {
                            i(t);
                        },
                        error: () => {
                            s();
                        },
                        destroy: () => {
                            s();
                        }
                    }
                }));
            }));
        }
        zoomIn(t) {
            return new Promise(((e, i) => {
                const n = this.instance, s = n.container, {panzoom: o, contentEl: a, el: r} = t;
                o && o.updateMetrics();
                const l = this.getZoomInfo(t);
                if (!(l && r && a && o && s)) return void i();
                const {x: c, y: h, scale: d, opacity: u} = l, p = () => {
                    t.state !== it.Closing && (u && (a.style.opacity = Math.max(Math.min(1, 1 - (1 - o.scale) / (1 - d)), 0) + ""), 
                    o.scale >= 1 && o.scale > o.targetScale - .1 && e(o));
                }, f = t => {
                    E(s, "is-zooming-in"), t.scale < .99 || t.scale > 1.01 || (a.style.opacity = "", 
                    t.off("endAnimation", f), t.off("touchStart", f), t.off("afterTransform", p), e(t));
                };
                o.on("endAnimation", f), o.on("touchStart", f), o.on("afterTransform", p), o.on([ "error", "destroy" ], (() => {
                    i();
                })), o.panTo({
                    x: c,
                    y: h,
                    scale: d,
                    friction: 0,
                    ignoreBounds: !0
                }), o.stop("current");
                const m = {
                    event: "mousemove" === o.panMode ? n.prevMouseMoveEvent || n.options.event : void 0
                }, g = this.optionFor(t, "initialSize");
                S(s, "is-zooming-in"), n.hideLoading(t), "full" === g ? o.zoomToFull(m) : "cover" === g ? o.zoomToCover(m) : "max" === g ? o.zoomToMax(m) : o.reset(.172);
            }));
        }
        getZoomInfo(t) {
            var e;
            const {el: i, imageEl: n, thumbEl: s, panzoom: o} = t;
            if (!i || !n || !s || !o || U(s) < 3 || !this.optionFor(t, "zoom") || this.instance.state === et.Destroy) return !1;
            if (1 !== ((null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1)) return !1;
            let {top: a, left: r, width: l, height: c} = s.getBoundingClientRect(), {top: h, left: d, fitWidth: u, fitHeight: p} = o.contentRect;
            if (!(l && c && u && p)) return !1;
            const f = o.container.getBoundingClientRect();
            d += f.left, h += f.top;
            const m = -1 * (d + .5 * u - (r + .5 * l)), g = -1 * (h + .5 * p - (a + .5 * c)), b = l / u;
            let v = this.option("zoomOpacity") || !1;
            return "auto" === v && (v = Math.abs(l / c - u / p) > .1), {
                x: m,
                y: g,
                scale: b,
                opacity: v
            };
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.change", t.onChange), e.on("Carousel.createSlide", t.onCreateSlide), 
            e.on("Carousel.removeSlide", t.onRemoveSlide), e.on("close", t.onClose);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.change", t.onChange), e.off("Carousel.createSlide", t.onCreateSlide), 
            e.off("Carousel.removeSlide", t.onRemoveSlide), e.off("close", t.onClose);
        }
    }
    Object.defineProperty(at, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            initialSize: "fit",
            Panzoom: {
                maxScale: 1
            },
            protected: !1,
            zoom: !0,
            zoomOpacity: "auto"
        }
    }), "function" == typeof SuppressedError && SuppressedError;
    const rt = "html", lt = "image", ct = "map", ht = "youtube", dt = "vimeo", ut = "html5video", pt = (t, e = {}) => {
        const i = new URL(t), n = new URLSearchParams(i.search), s = new URLSearchParams;
        for (const [t, i] of [ ...n, ...Object.entries(e) ]) {
            let e = i.toString();
            "t" === t ? s.set("start", parseInt(e).toString()) : s.set(t, e);
        }
        let o = s.toString(), a = t.match(/#t=((.*)?\d+s)/);
        return a && (o += `#t=${a[1]}`), o;
    }, ft = {
        ajax: null,
        autoSize: !0,
        iframeAttr: {
            allow: "autoplay; fullscreen",
            scrolling: "auto"
        },
        preload: !0,
        videoAutoplay: !0,
        videoRatio: 16 / 9,
        videoTpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
        videoFormat: "",
        vimeo: {
            byline: 1,
            color: "00adef",
            controls: 1,
            dnt: 1,
            muted: 0
        },
        youtube: {
            controls: 1,
            enablejsapi: 1,
            nocookie: 1,
            rel: 0,
            fs: 1
        }
    }, mt = [ "image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo" ];
    class gt extends B {
        onInitSlide(t, e, i) {
            this.processType(i);
        }
        onCreateSlide(t, e, i) {
            this.setContent(i);
        }
        onClearContent(t, e) {
            e.xhr && (e.xhr.abort(), e.xhr = null);
            const i = e.iframeEl;
            i && (i.onload = i.onerror = null, i.src = "//about:blank", e.iframeEl = null);
            const n = e.contentEl, s = e.placeholderEl;
            if ("inline" === e.type && n && s) n.classList.remove("fancybox__content"), "none" !== n.style.display && (n.style.display = "none"), 
            s.parentNode && s.parentNode.insertBefore(n, s), s.remove(), e.contentEl = void 0, 
            e.placeholderEl = void 0; else for (;e.el && e.el.firstChild; ) e.el.removeChild(e.el.firstChild);
        }
        onSelectSlide(t, e, i) {
            i.state === it.Ready && this.playVideo();
        }
        onUnselectSlide(t, e, i) {
            var n, s;
            if (i.type === ut) {
                try {
                    null === (s = null === (n = i.el) || void 0 === n ? void 0 : n.querySelector("video")) || void 0 === s || s.pause();
                } catch (t) {}
                return;
            }
            let o;
            i.type === dt ? o = {
                method: "pause",
                value: "true"
            } : i.type === ht && (o = {
                event: "command",
                func: "pauseVideo"
            }), o && i.iframeEl && i.iframeEl.contentWindow && i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"), 
            i.poller && clearTimeout(i.poller);
        }
        onDone(t, e) {
            t.isCurrentSlide(e) && !t.isClosing() && this.playVideo();
        }
        onRefresh(t, e) {
            e.slides.forEach((t => {
                t.el && (this.resizeIframe(t), this.setAspectRatio(t));
            }));
        }
        onMessage(t) {
            try {
                let e = JSON.parse(t.data);
                if ("https://player.vimeo.com" === t.origin) {
                    if ("ready" === e.event) for (let e of Array.from(document.getElementsByClassName("fancybox__iframe"))) e instanceof HTMLIFrameElement && e.contentWindow === t.source && (e.dataset.ready = "true");
                } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === e.event) {
                    const t = document.getElementById(e.id);
                    t && (t.dataset.ready = "true");
                }
            } catch (t) {}
        }
        loadAjaxContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            this.instance.showLoading(t);
            const i = this.instance, n = new XMLHttpRequest;
            i.showLoading(t), n.onreadystatechange = function() {
                n.readyState === XMLHttpRequest.DONE && i.state === et.Ready && (i.hideLoading(t), 
                200 === n.status ? i.setContent(t, n.responseText) : i.setError(t, 404 === n.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"));
            };
            const s = t.ajax || null;
            n.open(s ? "POST" : "GET", e + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
            n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(s), t.xhr = n;
        }
        setInlineContent(t) {
            let e = null;
            if (x(t.src)) e = t.src; else if ("string" == typeof t.src) {
                const i = t.src.split("#", 2).pop();
                e = i ? document.getElementById(i) : null;
            }
            if (e) {
                if ("clone" === t.type || e.closest(".fancybox__slide")) {
                    e = e.cloneNode(!0);
                    const i = e.dataset.animationName;
                    i && (e.classList.remove(i), delete e.dataset.animationName);
                    let n = e.getAttribute("id");
                    n = n ? `${n}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", n);
                } else if (e.parentNode) {
                    const i = document.createElement("div");
                    i.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(i, e), t.placeholderEl = i;
                }
                this.instance.setContent(t, e);
            } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}");
        }
        setIframeContent(t) {
            const {src: e, el: i} = t;
            if (!e || "string" != typeof e || !i) return;
            i.classList.add("is-loading");
            const n = this.instance, s = document.createElement("iframe");
            s.className = "fancybox__iframe", s.setAttribute("id", `fancybox__iframe_${n.id}_${t.index}`);
            for (const [e, i] of Object.entries(this.optionFor(t, "iframeAttr") || {})) s.setAttribute(e, i);
            s.onerror = () => {
                n.setError(t, "{{IFRAME_ERROR}}");
            }, t.iframeEl = s;
            const o = this.optionFor(t, "preload");
            if ("iframe" !== t.type || !1 === o) return s.setAttribute("src", t.src + ""), n.setContent(t, s, !1), 
            this.resizeIframe(t), void n.revealContent(t);
            n.showLoading(t), s.onload = () => {
                if (!s.src.length) return;
                const e = "true" !== s.dataset.ready;
                s.dataset.ready = "true", this.resizeIframe(t), e ? n.revealContent(t) : n.hideLoading(t);
            }, s.setAttribute("src", e), n.setContent(t, s, !1);
        }
        resizeIframe(t) {
            const {type: e, iframeEl: i} = t;
            if (e === ht || e === dt) return;
            const n = null == i ? void 0 : i.parentElement;
            if (!i || !n) return;
            let s = !1 !== t.autoSize, o = t.width || 0, a = t.height || 0;
            o && a && (s = !1);
            const r = n && n.style;
            if (!1 !== t.preload && !1 !== s && r) try {
                const t = window.getComputedStyle(n), e = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight), s = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), l = i.contentWindow;
                if (l) {
                    const t = l.document, i = t.getElementsByTagName(rt)[0], n = t.body;
                    r.width = "", n.style.overflow = "hidden", o = o || i.scrollWidth + e, r.width = `${o}px`, 
                    n.style.overflow = "", r.flex = "0 0 auto", r.height = `${n.scrollHeight}px`, a = i.scrollHeight + s;
                }
            } catch (t) {}
            if (o || a) {
                const t = {
                    flex: "0 1 auto",
                    width: "",
                    height: ""
                };
                o && "auto" !== o && (t.width = `${o}px`), a && "auto" !== a && (t.height = `${a}px`), 
                Object.assign(r, t);
            }
        }
        playVideo() {
            const t = this.instance.getSlide();
            if (!t) return;
            const {el: e} = t;
            if (!e || !e.offsetParent) return;
            if (!this.optionFor(t, "videoAutoplay")) return;
            if (t.type === ut) try {
                const t = e.querySelector("video");
                if (t) {
                    const e = t.play();
                    void 0 !== e && e.then((() => {})).catch((e => {
                        t.muted = !0, t.play();
                    }));
                }
            } catch (t) {}
            if (t.type !== ht && t.type !== dt) return;
            const i = () => {
                if (t.iframeEl && t.iframeEl.contentWindow) {
                    let e;
                    if ("true" === t.iframeEl.dataset.ready) return e = t.type === ht ? {
                        event: "command",
                        func: "playVideo"
                    } : {
                        method: "play",
                        value: "true"
                    }, e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
                    t.type === ht && (e = {
                        event: "listening",
                        id: t.iframeEl.getAttribute("id")
                    }, t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"));
                }
                t.poller = setTimeout(i, 250);
            };
            i();
        }
        processType(t) {
            if (t.html) return t.type = rt, t.src = t.html, void (t.html = "");
            const e = this.instance.optionFor(t, "src", "");
            if (!e || "string" != typeof e) return;
            let i = t.type, n = null;
            if (n = e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
                const s = this.optionFor(t, ht), {nocookie: o} = s, a = function(t, e) {
                    var i = {};
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
                    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                        var s = 0;
                        for (n = Object.getOwnPropertySymbols(t); s < n.length; s++) e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[s]) && (i[n[s]] = t[n[s]]);
                    }
                    return i;
                }(s, [ "nocookie" ]), r = `www.youtube${o ? "-nocookie" : ""}.com`, l = pt(e, a), c = encodeURIComponent(n[2]);
                t.videoId = c, t.src = `https://${r}/embed/${c}?${l}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`, 
                i = ht;
            } else if (n = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
                const s = pt(e, this.optionFor(t, dt)), o = encodeURIComponent(n[1]), a = n[4] || "";
                t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${a ? `h=${a}${s ? "&" : ""}` : ""}${s}`, 
                i = dt;
            }
            if (!i && t.triggerEl) {
                const e = t.triggerEl.dataset.type;
                mt.includes(e) && (i = e);
            }
            i || "string" == typeof e && ("#" === e.charAt(0) ? i = "inline" : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = ut, 
            t.videoFormat = t.videoFormat || "video/" + ("ogv" === n[1] ? "ogg" : n[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = lt : e.match(/\.(pdf)((\?|#).*)?$/i) ? i = "pdf" : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${n[1]}/?ll=${(n[2] ? n[2] + "&z=" + Math.floor(parseFloat(n[3])) + (n[4] ? n[4].replace(/^\//, "&") : "") : n[4] + "").replace(/\?/, "&")}&output=${n[4] && n[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, 
            i = ct) : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${n[1]}/maps?q=${n[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, 
            i = ct)), i = i || this.instance.option("defaultType"), t.type = i, i === lt && (t.thumbSrc = t.thumbSrc || t.src);
        }
        setContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            if (t && t.type && e) {
                switch (t.type) {
                  case rt:
                    this.instance.setContent(t, e);
                    break;

                  case ut:
                    const i = this.option("videoTpl");
                    i && this.instance.setContent(t, i.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
                    break;

                  case "inline":
                  case "clone":
                    this.setInlineContent(t);
                    break;

                  case "ajax":
                    this.loadAjaxContent(t);
                    break;

                  case "pdf":
                  case ct:
                  case ht:
                  case dt:
                    t.preload = !1;

                  case "iframe":
                    this.setIframeContent(t);
                }
                this.setAspectRatio(t);
            }
        }
        setAspectRatio(t) {
            const e = t.contentEl;
            if (!(t.el && e && t.type && [ ht, dt, ut ].includes(t.type))) return;
            let i, n = t.width || "auto", s = t.height || "auto";
            if ("auto" === n || "auto" === s) {
                i = this.optionFor(t, "videoRatio");
                const e = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
                i = e && e.length > 2 ? parseFloat(e[1]) / parseFloat(e[2]) : parseFloat(i + "");
            } else n && s && (i = n / s);
            if (!i) return;
            e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.offsetHeight;
            const o = e.getBoundingClientRect(), a = o.width || 1, r = o.height || 1;
            e.style.aspectRatio = i + "", i < a / r ? (s = "auto" === s ? r : Math.min(r, s), 
            e.style.width = "auto", e.style.height = `${s}px`) : (n = "auto" === n ? a : Math.min(a, n), 
            e.style.width = `${n}px`, e.style.height = "auto");
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.initSlide", t.onInitSlide), e.on("Carousel.createSlide", t.onCreateSlide), 
            e.on("Carousel.selectSlide", t.onSelectSlide), e.on("Carousel.unselectSlide", t.onUnselectSlide), 
            e.on("Carousel.Panzoom.refresh", t.onRefresh), e.on("done", t.onDone), e.on("clearContent", t.onClearContent), 
            window.addEventListener("message", t.onMessage);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.initSlide", t.onInitSlide), e.off("Carousel.createSlide", t.onCreateSlide), 
            e.off("Carousel.selectSlide", t.onSelectSlide), e.off("Carousel.unselectSlide", t.onUnselectSlide), 
            e.off("Carousel.Panzoom.refresh", t.onRefresh), e.off("done", t.onDone), e.off("clearContent", t.onClearContent), 
            window.removeEventListener("message", t.onMessage);
        }
    }
    Object.defineProperty(gt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ft
    });
    const bt = "play", vt = "pause", yt = "ready";
    class wt extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: yt
            }), Object.defineProperty(this, "inHover", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "timer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "progressBar", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        get isActive() {
            return this.state !== yt;
        }
        onReady(t) {
            this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start();
        }
        onChange() {
            var t;
            (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) || (this.removeProgressBar(), 
            this.pause());
        }
        onSettle() {
            this.resume();
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.resume() : this.pause();
        }
        onMouseEnter() {
            this.inHover = !0, this.pause();
        }
        onMouseLeave() {
            var t;
            this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume();
        }
        onTimerEnd() {
            const t = this.instance;
            "play" === this.state && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0));
        }
        removeProgressBar() {
            this.progressBar && (this.progressBar.remove(), this.progressBar = null);
        }
        createProgressBar() {
            var t;
            if (!this.option("showProgress")) return null;
            this.removeProgressBar();
            const e = this.instance, i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
            let n = this.option("progressParentEl");
            if (n || (n = (1 === i.length ? i[0].el : null) || e.viewport), !n) return null;
            const s = document.createElement("div");
            return S(s, "f-progress"), n.prepend(s), this.progressBar = s, s.offsetHeight, s;
        }
        set() {
            const t = this, e = t.instance;
            if (e.pages.length < 2) return;
            if (t.timer) return;
            const i = t.option("timeout");
            t.state = bt, S(e.container, "has-autoplay");
            let n = t.createProgressBar();
            n && (n.style.transitionDuration = `${i}ms`, n.style.transform = "scaleX(1)"), t.timer = setTimeout((() => {
                t.timer = null, t.inHover || t.onTimerEnd();
            }), i), t.emit("set");
        }
        clear() {
            const t = this;
            t.timer && (clearTimeout(t.timer), t.timer = null), t.removeProgressBar();
        }
        start() {
            const t = this;
            if (t.set(), t.state !== yt) {
                if (t.option("pauseOnHover")) {
                    const e = t.instance.container;
                    e.addEventListener("mouseenter", t.onMouseEnter, !1), e.addEventListener("mouseleave", t.onMouseLeave, !1);
                }
                document.addEventListener("visibilitychange", t.onVisibilityChange, !1), t.emit("start");
            }
        }
        stop() {
            const t = this, e = t.state, i = t.instance.container;
            t.clear(), t.state = yt, i.removeEventListener("mouseenter", t.onMouseEnter, !1), 
            i.removeEventListener("mouseleave", t.onMouseLeave, !1), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), 
            E(i, "has-autoplay"), e !== yt && t.emit("stop");
        }
        pause() {
            const t = this;
            t.state === bt && (t.state = vt, t.clear(), t.emit(vt));
        }
        resume() {
            const t = this, e = t.instance;
            if (e.isInfinite || e.page !== e.pages.length - 1) if (t.state !== bt) {
                if (t.state === vt && !t.inHover) {
                    const e = new Event("resume", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    t.emit("resume", e), e.defaultPrevented || t.set();
                }
            } else t.set(); else t.stop();
        }
        toggle() {
            this.state === bt || this.state === vt ? this.stop() : this.start();
        }
        attach() {
            const t = this, e = t.instance;
            e.on("ready", t.onReady), e.on("Panzoom.startAnimation", t.onChange), e.on("Panzoom.endAnimation", t.onSettle), 
            e.on("Panzoom.touchMove", t.onChange);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("ready", t.onReady), e.off("Panzoom.startAnimation", t.onChange), e.off("Panzoom.endAnimation", t.onSettle), 
            e.off("Panzoom.touchMove", t.onChange), t.stop();
        }
    }
    Object.defineProperty(wt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            autoStart: !0,
            pauseOnHover: !0,
            progressParentEl: null,
            showProgress: !0,
            timeout: 3e3
        }
    });
    class xt extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onPrepare(t) {
            const e = t.carousel;
            if (!e) return;
            const i = t.container;
            i && (e.options.Autoplay = u({
                autoStart: !1
            }, this.option("Autoplay") || {}, {
                pauseOnHover: !1,
                timeout: this.option("timeout"),
                progressParentEl: () => this.option("progressParentEl") || null,
                on: {
                    start: () => {
                        t.emit("startSlideshow");
                    },
                    set: e => {
                        var n;
                        i.classList.add("has-slideshow"), (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) !== it.Ready && e.pause();
                    },
                    stop: () => {
                        i.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow");
                    },
                    resume: (e, i) => {
                        var n, s, o;
                        !i || !i.cancelable || (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) === it.Ready && (null === (o = null === (s = t.carousel) || void 0 === s ? void 0 : s.panzoom) || void 0 === o ? void 0 : o.isResting) || i.preventDefault();
                    }
                }
            }), e.attachPlugins({
                Autoplay: wt
            }), this.ref = e.plugins.Autoplay);
        }
        onReady(t) {
            const e = t.carousel, i = this.ref;
            i && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && i.start();
        }
        onDone(t, e) {
            const i = this.ref, n = t.carousel;
            if (!i || !n) return;
            const s = e.panzoom;
            s && s.on("startAnimation", (() => {
                t.isCurrentSlide(e) && i.stop();
            })), t.isCurrentSlide(e) && i.resume();
        }
        onKeydown(t, e) {
            var i;
            const n = this.ref;
            n && e === this.option("key") && "BUTTON" !== (null === (i = document.activeElement) || void 0 === i ? void 0 : i.nodeName) && n.toggle();
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.init", t.onPrepare), e.on("Carousel.ready", t.onReady), e.on("done", t.onDone), 
            e.on("keydown", t.onKeydown);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.init", t.onPrepare), e.off("Carousel.ready", t.onReady), e.off("done", t.onDone), 
            e.off("keydown", t.onKeydown);
        }
    }
    Object.defineProperty(xt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            key: " ",
            playOnStart: !1,
            progressParentEl: t => {
                var e;
                return (null === (e = t.instance.container) || void 0 === e ? void 0 : e.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || t.instance.container;
            },
            timeout: 3e3
        }
    });
    const Et = {
        classes: {
            container: "f-thumbs f-carousel__thumbs",
            viewport: "f-thumbs__viewport",
            track: "f-thumbs__track",
            slide: "f-thumbs__slide",
            isResting: "is-resting",
            isSelected: "is-selected",
            isLoading: "is-loading",
            hasThumbs: "has-thumbs"
        },
        minCount: 2,
        parentEl: null,
        thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
        type: "modern"
    };
    var St;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Hidden = 2] = "Hidden";
    }(St || (St = {}));
    let Pt = class extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "type", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: "modern"
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "track", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "panzoom", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "thumbWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbClipWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbHeight", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbExtraGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "shouldCenter", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !0
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: St.Init
            });
        }
        formatThumb(t, e) {
            return this.instance.localize(e, [ [ "%i", t.index ], [ "%d", t.index + 1 ], [ "%s", t.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ] ]);
        }
        getSlides() {
            const t = [], e = this.option("thumbTpl") || "";
            if (e) for (const i of this.instance.slides || []) {
                let n = "";
                i.type && (n = `for-${i.type}`, i.type && [ "video", "youtube", "vimeo", "html5video" ].includes(i.type) && (n += " for-video")), 
                t.push({
                    html: this.formatThumb(i, e),
                    customClass: n
                });
            }
            return t;
        }
        onInitSlide(t, e) {
            const i = e.el;
            i && (e.thumbSrc = i.dataset.thumbSrc || e.thumbSrc || "", e.thumbClipWidth = parseFloat(i.dataset.thumbClipWidth || "") || e.thumbClipWidth || 0, 
            e.thumbHeight = parseFloat(i.dataset.thumbHeight || "") || e.thumbHeight || 0);
        }
        onInitSlides() {
            this.build();
        }
        onRefreshM() {
            this.refreshModern();
        }
        onChangeM() {
            "modern" === this.type && (this.shouldCenter = !0, this.centerModern());
        }
        onClickModern(t) {
            t.preventDefault(), t.stopPropagation();
            const e = this.instance, i = e.page, n = t => {
                if (t) {
                    const e = t.closest("[data-carousel-index]");
                    if (e) return parseInt(e.dataset.carouselIndex || "", 10) || 0;
                }
                return -1;
            }, s = (t, e) => {
                const i = document.elementFromPoint(t, e);
                return i ? n(i) : -1;
            };
            let o = n(t.target);
            o < 0 && (o = s(t.clientX + this.thumbGap, t.clientY), o === i && (o = i - 1)), 
            o < 0 && (o = s(t.clientX - this.thumbGap, t.clientY), o === i && (o = i + 1)), 
            o < 0 && (o = (e => {
                let n = s(t.clientX - e, t.clientY), a = s(t.clientX + e, t.clientY);
                return o < 0 && n === i && (o = i + 1), o < 0 && a === i && (o = i - 1), o;
            })(this.thumbExtraGap)), o === i ? this.centerModern() : o > -1 && o < e.pages.length && e.slideTo(o);
        }
        onTransformM() {
            if ("modern" !== this.type) return;
            const {instance: t, container: e, track: i} = this, n = t.panzoom;
            if (!(e && i && n && this.panzoom)) return;
            o(e, this.cn("isResting"), n.state !== g.Init && n.isResting);
            const s = this.thumbGap, a = this.thumbExtraGap, r = this.thumbClipWidth;
            let l = 0, c = 0, h = 0;
            for (const e of t.slides) {
                let i = e.index, n = e.thumbSlideEl;
                if (!n) continue;
                o(n, this.cn("isSelected"), i === t.page), c = 1 - Math.abs(t.getProgress(i)), n.style.setProperty("--progress", c ? c + "" : "");
                const d = .5 * ((e.thumbWidth || 0) - r);
                l += s, l += d, c && (l -= c * (d + a)), n.style.setProperty("--shift", l - s + ""), 
                l += d, c && (l -= c * (d + a)), l -= s, 0 === i && (h = a * c);
            }
            i && (i.style.setProperty("--left", h + ""), i.style.setProperty("--width", l + h + s + a * c + "")), 
            this.shouldCenter && this.centerModern();
        }
        buildClassic() {
            const {container: t, track: e} = this, i = this.getSlides();
            if (!t || !e || !i) return;
            const n = new this.instance.constructor(t, u({
                track: e,
                infinite: !1,
                center: !0,
                fill: !0,
                dragFree: !0,
                slidesPerPage: 1,
                transition: !1,
                Dots: !1,
                Navigation: !1,
                classes: {
                    container: "f-thumbs",
                    viewport: "f-thumbs__viewport",
                    track: "f-thumbs__track",
                    slide: "f-thumbs__slide"
                }
            }, this.option("Carousel") || {}, {
                Sync: {
                    target: this.instance
                },
                slides: i
            }));
            this.carousel = n, this.track = e, n.on("ready", (() => {
                this.emit("ready");
            })), n.on("createSlide", ((t, e) => {
                this.emit("createSlide", e, e.el);
            }));
        }
        buildModern() {
            if ("modern" !== this.type) return;
            const {container: t, track: e, instance: i} = this, s = this.option("thumbTpl") || "";
            if (!t || !e || !s) return;
            t.addEventListener("keydown", (() => {
                E(t, "is-using-mouse");
            })), S(t, "is-horizontal"), this.updateModern();
            for (const t of i.slides || []) {
                const i = document.createElement("div");
                if (S(i, this.cn("slide")), t.type) {
                    let e = `for-${t.type}`;
                    [ "video", "youtube", "vimeo", "html5video" ].includes(t.type) && (e += " for-video"), 
                    S(i, e);
                }
                i.appendChild(n(this.formatThumb(t, s))), this.emit("createSlide", t, i), t.thumbSlideEl = i, 
                e.appendChild(i), this.resizeModernSlide(t);
            }
            const o = new i.constructor.Panzoom(t, {
                content: e,
                lockAxis: "x",
                zoom: !1,
                panOnlyZoomed: !1,
                bounds: () => {
                    let t = 0, e = 0, n = i.slides[0], s = i.slides[i.slides.length - 1], o = i.slides[i.page];
                    return n && s && o && (e = -1 * this.getModernThumbPos(0), 0 !== i.page && (e += .5 * (n.thumbWidth || 0)), 
                    t = -1 * this.getModernThumbPos(i.slides.length - 1), i.page !== i.slides.length - 1 && (t += (s.thumbWidth || 0) - (o.thumbWidth || 0) - .5 * (s.thumbWidth || 0))), 
                    {
                        x: {
                            min: t,
                            max: e
                        },
                        y: {
                            min: 0,
                            max: 0
                        }
                    };
                }
            });
            o.on("touchStart", ((t, e) => {
                this.shouldCenter = !1, S(this.container, "is-using-mouse");
            })), o.on("click", ((t, e) => this.onClickModern(e))), o.on("ready", (() => {
                this.centerModern(), this.emit("ready");
            })), o.on([ "afterTransform", "refresh" ], (t => {
                this.lazyLoadModern();
            })), this.panzoom = o, this.refreshModern();
        }
        updateModern() {
            if ("modern" !== this.type) return;
            const {container: t} = this;
            t && (this.thumbGap = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-gap")) || 0, 
            this.thumbExtraGap = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-extra-gap")) || 0, 
            this.thumbWidth = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-width")) || 40, 
            this.thumbClipWidth = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-clip-width")) || 40, 
            this.thumbHeight = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-height")) || 40);
        }
        refreshModern() {
            var t;
            if ("modern" === this.type) {
                this.updateModern();
                for (const t of this.instance.slides || []) this.resizeModernSlide(t);
                this.onTransformM(), null === (t = this.panzoom) || void 0 === t || t.updateMetrics(!0), 
                this.centerModern(0);
            }
        }
        centerModern(e) {
            const i = this.instance, {container: n, panzoom: s} = this;
            if (!n || !s || s.state === g.Init) return;
            const o = i.page;
            let a = this.getModernThumbPos(o), r = a;
            for (let t = i.page - 3; t < i.page + 3; t++) {
                if (t < 0 || t > i.pages.length - 1 || t === i.page) continue;
                const e = 1 - Math.abs(i.getProgress(t));
                e > 0 && e < 1 && (r += e * (this.getModernThumbPos(t) - a));
            }
            let l = 100;
            void 0 === e && (e = .2, i.inTransition.size > 0 && (e = .12), Math.abs(-1 * s.current.e - r) > s.containerRect.width && (e = .5, 
            l = 0)), s.options.maxVelocity = l, s.applyChange({
                panX: t(-1 * r - s.target.e, 1e3),
                friction: null === i.prevPage ? 0 : e
            });
        }
        lazyLoadModern() {
            const {instance: t, panzoom: e} = this;
            if (!e) return;
            const i = -1 * e.current.e || 0;
            let s = this.getModernThumbPos(t.page);
            if (e.state !== g.Init || 0 === s) for (const s of t.slides || []) {
                const t = s.thumbSlideEl;
                if (!t) continue;
                const o = t.querySelector("img[data-lazy-src]"), a = s.index, r = this.getModernThumbPos(a), l = i - .5 * e.containerRect.innerWidth, c = l + e.containerRect.innerWidth;
                if (!o || r < l || r > c) continue;
                let h = o.dataset.lazySrc;
                if (!h || !h.length) continue;
                if (delete o.dataset.lazySrc, o.src = h, o.complete) continue;
                S(t, this.cn("isLoading"));
                const d = n(w);
                t.appendChild(d), o.addEventListener("load", (() => {
                    t.offsetParent && (t.classList.remove(this.cn("isLoading")), d.remove());
                }), !1);
            }
        }
        resizeModernSlide(t) {
            if ("modern" !== this.type) return;
            if (!t.thumbSlideEl) return;
            const e = t.thumbClipWidth && t.thumbHeight ? Math.round(this.thumbHeight * (t.thumbClipWidth / t.thumbHeight)) : this.thumbWidth;
            t.thumbWidth = e;
        }
        getModernThumbPos(e) {
            const i = this.instance.slides[e], n = this.panzoom;
            if (!n || !n.contentRect.fitWidth) return 0;
            let s = n.containerRect.innerWidth, o = n.contentRect.width;
            2 === this.instance.slides.length && (e -= 1, o = 2 * this.thumbClipWidth);
            let a = e * (this.thumbClipWidth + this.thumbGap) + this.thumbExtraGap + .5 * (i.thumbWidth || 0);
            return a -= o > s ? .5 * s : .5 * o, t(a || 0, 1);
        }
        isDisabled() {
            const t = this.option("minCount") || 0;
            if (t) {
                const e = this.instance;
                let i = 0;
                for (const t of e.slides || []) t.thumbSrc && i++;
                if (i < t) return !0;
            }
            const e = this.option("type");
            return [ "modern", "classic" ].indexOf(e) < 0;
        }
        build() {
            if (this.state !== St.Init) return;
            if (this.isDisabled()) return;
            const t = this.instance.container, e = this.option("type");
            this.type = e;
            const i = document.createElement("div");
            S(i, this.cn("container")), S(i, `is-${e}`);
            const n = this.option("parentEl");
            n ? n.appendChild(i) : t.after(i), this.container = i, S(t, this.cn("hasThumbs"));
            const s = document.createElement("div");
            S(s, this.cn("track")), i.appendChild(s), this.track = s, "classic" === e ? this.buildClassic() : this.buildModern(), 
            this.state = St.Ready;
        }
        cleanup() {
            this.carousel && this.carousel.destroy(), this.carousel = null, this.panzoom && this.panzoom.destroy(), 
            this.panzoom = null, this.container && this.container.remove(), this.container = null, 
            this.track = null, this.state = St.Init, E(this.instance.container, this.cn("hasThumbs"));
        }
        attach() {
            const t = this, e = t.instance;
            e.on("initSlide", t.onInitSlide), e.state === D.Init ? e.on("initSlides", t.onInitSlides) : t.onInitSlides(), 
            e.on("Panzoom.afterTransform", t.onTransformM), e.on("Panzoom.refresh", t.onRefreshM), 
            e.on("change", t.onChangeM);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("initSlide", t.onInitSlide), e.off("initSlides", t.onInitSlides), e.off("Panzoom.afterTransform", t.onTransformM), 
            e.off("Panzoom.refresh", t.onRefreshM), e.off("change", t.onChangeM), t.cleanup();
        }
    };
    Object.defineProperty(Pt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Et
    });
    const Ct = Object.assign(Object.assign({}, Et), {
        key: "t",
        showOnStart: !0,
        parentEl: null
    }), Mt = "is-masked", Tt = "aria-hidden";
    class Ot extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "hidden", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            });
        }
        get isEnabled() {
            const t = this.ref;
            return t && !t.isDisabled();
        }
        get isHidden() {
            return this.hidden;
        }
        onInit() {
            var t;
            const e = this, i = e.instance, n = i.carousel;
            if (e.ref || !n) return;
            const s = e.option("parentEl") || i.footer || i.container;
            if (!s) return;
            const o = u({}, e.options, {
                parentEl: s,
                classes: {
                    container: "f-thumbs fancybox__thumbs"
                },
                Carousel: {
                    Sync: {
                        friction: i.option("Carousel.friction") || 0
                    }
                },
                on: {
                    ready: t => {
                        const i = t.container;
                        i && this.hidden && (e.refresh(), i.style.transition = "none", e.hide(), i.offsetHeight, 
                        queueMicrotask((() => {
                            i.style.transition = "", e.show();
                        })));
                    }
                }
            });
            o.Carousel = o.Carousel || {}, o.Carousel.on = u((null === (t = e.options.Carousel) || void 0 === t ? void 0 : t.on) || {}, {
                click: (t, e) => {
                    e.stopPropagation();
                }
            }), n.options.Thumbs = o, n.attachPlugins({
                Thumbs: Pt
            }), e.ref = n.plugins.Thumbs, e.option("showOnStart") || (e.ref.state = St.Hidden, 
            e.hidden = !0);
        }
        onResize() {
            var t;
            const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
            e && (e.style.maxHeight = "");
        }
        onKeydown(t, e) {
            const i = this.option("key");
            i && i === e && this.toggle();
        }
        toggle() {
            const t = this.ref;
            if (t && !t.isDisabled()) return t.state === St.Hidden ? (t.state = St.Init, void t.build()) : void (this.hidden ? this.show() : this.hide());
        }
        show() {
            const t = this.ref;
            if (!t || t.isDisabled()) return;
            const e = t.container;
            e && (this.refresh(), e.offsetHeight, e.removeAttribute(Tt), e.classList.remove(Mt), 
            this.hidden = !1);
        }
        hide() {
            const t = this.ref, e = t && t.container;
            e && (this.refresh(), e.offsetHeight, e.classList.add(Mt), e.setAttribute(Tt, "true")), 
            this.hidden = !0;
        }
        refresh() {
            const t = this.ref;
            if (!t || !t.state) return;
            const e = t.container, i = (null == e ? void 0 : e.firstChild) || null;
            e && i && i.childNodes.length && (e.style.maxHeight = `${i.getBoundingClientRect().height}px`);
        }
        attach() {
            const t = this, e = t.instance;
            e.state === et.Init ? e.on("Carousel.init", t.onInit) : t.onInit(), e.on("resize", t.onResize), 
            e.on("keydown", t.onKeydown);
        }
        detach() {
            var t;
            const e = this, i = e.instance;
            i.off("Carousel.init", e.onInit), i.off("resize", e.onResize), i.off("keydown", e.onKeydown), 
            null === (t = i.carousel) || void 0 === t || t.detachPlugins([ "Thumbs" ]), e.ref = null;
        }
    }
    Object.defineProperty(Ot, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Ct
    });
    const At = {
        panLeft: {
            icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
            change: {
                panX: -100
            }
        },
        panRight: {
            icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
            change: {
                panX: 100
            }
        },
        panUp: {
            icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
            change: {
                panY: -100
            }
        },
        panDown: {
            icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
            change: {
                panY: 100
            }
        },
        zoomIn: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
            action: "zoomIn"
        },
        zoomOut: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "zoomOut"
        },
        toggle1to1: {
            icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
            action: "toggleZoom"
        },
        toggleZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "toggleZoom"
        },
        iterateZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "iterateZoom"
        },
        rotateCCW: {
            icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
            action: "rotateCCW"
        },
        rotateCW: {
            icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
            action: "rotateCW"
        },
        flipX: {
            icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
            action: "flipX"
        },
        flipY: {
            icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
            action: "flipY"
        },
        fitX: {
            icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
            action: "fitX"
        },
        fitY: {
            icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
            action: "fitY"
        },
        reset: {
            icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
            action: "reset"
        },
        toggleFS: {
            icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
            action: "toggleFS"
        }
    };
    var Lt;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Disabled = 2] = "Disabled";
    }(Lt || (Lt = {}));
    const zt = {
        absolute: "auto",
        display: {
            left: [ "infobar" ],
            middle: [],
            right: [ "iterateZoom", "slideshow", "fullscreen", "thumbs", "close" ]
        },
        enabled: "auto",
        items: {
            infobar: {
                tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
            },
            download: {
                tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
            },
            prev: {
                tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
            },
            next: {
                tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
            },
            slideshow: {
                tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
            },
            fullscreen: {
                tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
            },
            thumbs: {
                tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
            },
            close: {
                tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
            }
        },
        parentEl: null
    }, Rt = {
        tabindex: "-1",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    };
    class kt extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Lt.Init
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onReady(t) {
            var e;
            if (!t.carousel) return;
            let i = this.option("display"), n = this.option("absolute"), s = this.option("enabled");
            if ("auto" === s) {
                const t = this.instance.carousel;
                let e = 0;
                if (t) for (const i of t.slides) (i.panzoom || "image" === i.type) && e++;
                e || (s = !1);
            }
            s || (i = void 0);
            let o = 0;
            const a = {
                left: [],
                middle: [],
                right: []
            };
            if (i) for (const t of [ "left", "middle", "right" ]) for (const n of i[t]) {
                const i = this.createEl(n);
                i && (null === (e = a[t]) || void 0 === e || e.push(i), o++);
            }
            let r = null;
            if (o && (r = this.createContainer()), r) {
                for (const [t, e] of Object.entries(a)) {
                    const i = document.createElement("div");
                    S(i, "fancybox__toolbar__column is-" + t);
                    for (const t of e) i.appendChild(t);
                    "auto" !== n || "middle" !== t || e.length || (n = !0), r.appendChild(i);
                }
                !0 === n && S(r, "is-absolute"), this.state = Lt.Ready, this.onRefresh();
            } else this.state = Lt.Disabled;
        }
        onClick(t) {
            var e, i;
            const n = this.instance, s = n.getSlide(), o = null == s ? void 0 : s.panzoom, a = t.target, r = a && x(a) ? a.dataset : null;
            if (!r) return;
            if (void 0 !== r.fancyboxToggleThumbs) return t.preventDefault(), t.stopPropagation(), 
            void (null === (e = n.plugins.Thumbs) || void 0 === e || e.toggle());
            if (void 0 !== r.fancyboxToggleFullscreen) return t.preventDefault(), t.stopPropagation(), 
            void this.instance.toggleFullscreen();
            if (void 0 !== r.fancyboxToggleSlideshow) {
                t.preventDefault(), t.stopPropagation();
                const e = null === (i = n.carousel) || void 0 === i ? void 0 : i.plugins.Autoplay;
                let s = e.isActive;
                return o && "mousemove" === o.panMode && !s && o.reset(), void (s ? e.stop() : e.start());
            }
            const l = r.panzoomAction, c = r.panzoomChange;
            if ((c || l) && (t.preventDefault(), t.stopPropagation()), c) {
                let t = {};
                try {
                    t = JSON.parse(c);
                } catch (t) {}
                o && o.applyChange(t);
            } else l && o && o[l] && o[l]();
        }
        onChange() {
            this.onRefresh();
        }
        onRefresh() {
            if (this.instance.isClosing()) return;
            const t = this.container;
            if (!t) return;
            const e = this.instance.getSlide();
            if (!e || e.state !== it.Ready) return;
            const i = e && !e.error && e.panzoom;
            for (const e of t.querySelectorAll("[data-panzoom-action]")) i ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            let n = i && i.canZoomIn(), s = i && i.canZoomOut();
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) n ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) s ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                s || n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), 
                e.setAttribute("tabindex", "-1"));
                const t = e.querySelector("g");
                t && (t.style.display = n ? "" : "none");
            }
        }
        onDone(t, e) {
            var i;
            null === (i = e.panzoom) || void 0 === i || i.on("afterTransform", (() => {
                this.instance.isCurrentSlide(e) && this.onRefresh();
            })), this.instance.isCurrentSlide(e) && this.onRefresh();
        }
        createContainer() {
            const t = this.instance.container;
            if (!t) return null;
            const e = this.option("parentEl") || t, i = document.createElement("div");
            return S(i, "fancybox__toolbar"), e.prepend(i), i.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !0
            }), t && S(t, "has-toolbar"), this.container = i, i;
        }
        createEl(t) {
            const e = this.instance, i = e.carousel;
            if (!i) return null;
            if ("toggleFS" === t) return null;
            if ("fullscreen" === t && !e.fsAPI) return null;
            let s = null;
            const o = i.slides.length || 0;
            let a = 0, r = 0;
            for (const t of i.slides) (t.panzoom || "image" === t.type) && a++, ("image" === t.type || t.downloadSrc) && r++;
            if (o < 2 && [ "infobar", "prev", "next" ].includes(t)) return s;
            if (void 0 !== At[t] && !a) return null;
            if ("download" === t && !r) return null;
            if ("thumbs" === t) {
                const t = e.plugins.Thumbs;
                if (!t || !t.isEnabled) return null;
            }
            if ("slideshow" === t) if (!i.plugins.Autoplay || o < 2) return null;
            if (void 0 !== At[t]) {
                const e = At[t];
                s = document.createElement("button"), s.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), 
                S(s, "f-button"), e.action && (s.dataset.panzoomAction = e.action), e.change && (s.dataset.panzoomChange = JSON.stringify(e.change)), 
                s.appendChild(n(this.instance.localize(e.icon)));
            } else {
                const e = (this.option("items") || [])[t];
                e && (s = n(this.instance.localize(e.tpl)), "function" == typeof e.click && s.addEventListener("click", (t => {
                    t.preventDefault(), t.stopPropagation(), "function" == typeof e.click && e.click.call(this, this, t);
                })));
            }
            const l = null == s ? void 0 : s.querySelector("svg");
            if (l) for (const [t, e] of Object.entries(Rt)) l.getAttribute(t) || l.setAttribute(t, String(e));
            return s;
        }
        removeContainer() {
            const t = this.container;
            t && t.remove(), this.container = null, this.state = Lt.Disabled;
            const e = this.instance.container;
            e && E(e, "has-toolbar");
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.initSlides", t.onReady), e.on("done", t.onDone), e.on("reveal", t.onChange), 
            e.on("Carousel.change", t.onChange), t.onReady(t.instance);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.initSlides", t.onReady), e.off("done", t.onDone), e.off("reveal", t.onChange), 
            e.off("Carousel.change", t.onChange), t.removeContainer();
        }
    }
    Object.defineProperty(kt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: zt
    });
    const It = {
        Hash: st,
        Html: gt,
        Images: at,
        Slideshow: xt,
        Thumbs: Ot,
        Toolbar: kt
    }, Ft = "with-fancybox", Dt = "hide-scrollbar", jt = "--fancybox-scrollbar-compensate", Ht = "--fancybox-body-margin", Bt = "is-animated", Nt = "is-compact", _t = "is-loading", Wt = "disabled", $t = "tabindex", Xt = "download", Yt = "href", qt = "src", Vt = function() {
        var t = window.getSelection();
        return t && "Range" === t.type;
    };
    let Zt = null, Ut = null;
    const Gt = new Map;
    let Kt = 0;
    class Jt extends m {
        get isIdle() {
            return this.idle;
        }
        get isCompact() {
            return this.option("compact");
        }
        constructor(t = [], e = {}, i = {}) {
            super(e), Object.defineProperty(this, "userSlides", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "userPlugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "idle", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "idleTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "clickTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "pwt", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "ignoreFocusChange", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: et.Init
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "footer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "caption", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "lastFocus", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prevMouseMoveEvent", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "fsAPI", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this.fsAPI = (() => {
                let t, e = "", i = "", n = "";
                return document.fullscreenEnabled ? (e = "requestFullscreen", i = "exitFullscreen", 
                n = "fullscreenElement") : document.webkitFullscreenEnabled && (e = "webkitRequestFullscreen", 
                i = "webkitExitFullscreen", n = "webkitFullscreenElement"), e && (t = {
                    request: function(t) {
                        return "webkitRequestFullscreen" === e ? t[e](Element.ALLOW_KEYBOARD_INPUT) : t[e]();
                    },
                    exit: function() {
                        return document[n] && document[i]();
                    },
                    isFullscreen: function() {
                        return document[n];
                    }
                }), t;
            })(), this.id = e.id || ++Kt, Gt.set(this.id, this), this.userSlides = t, this.userPlugins = i, 
            queueMicrotask((() => {
                this.init();
            }));
        }
        init() {
            if (this.state === et.Destroy) return;
            this.state = et.Init, this.attachPlugins(Object.assign(Object.assign({}, Jt.Plugins), this.userPlugins)), 
            this.emit("init"), this.emit("attachPlugins"), !0 === this.option("hideScrollbar") && (() => {
                if (!G) return;
                const t = document.body;
                if (t.classList.contains(Dt)) return;
                let e = window.innerWidth - document.documentElement.getBoundingClientRect().width;
                e < 0 && (e = 0);
                const i = t.currentStyle || window.getComputedStyle(t), n = parseFloat(i.marginRight);
                document.documentElement.style.setProperty(jt, `${e}px`), n && t.style.setProperty(Ht, `${n}px`), 
                t.classList.add(Dt);
            })(), this.initLayout(), this.scale();
            const t = () => {
                this.initCarousel(this.userSlides), this.state = et.Ready, this.attachEvents(), 
                this.emit("ready"), setTimeout((() => {
                    this.container && this.container.setAttribute("aria-hidden", "false");
                }), 16);
            }, e = this.fsAPI;
            this.option("Fullscreen.autoStart") && e && !e.isFullscreen() ? e.request(this.container).then((() => t())).catch((() => t())) : t();
        }
        initLayout() {
            var t, e;
            const i = this.option("parentEl") || document.body, s = n(this.localize(this.option("tpl.main") || ""));
            s && (s.setAttribute("id", `fancybox-${this.id}`), s.setAttribute("aria-label", this.localize("{{MODAL}}")), 
            s.classList.toggle(Nt, this.isCompact), S(s, this.option("mainClass") || ""), this.container = s, 
            this.footer = s.querySelector(".fancybox__footer"), i.appendChild(s), S(document.documentElement, Ft), 
            Zt && Ut || (Zt = document.createElement("span"), S(Zt, "fancybox-focus-guard"), 
            Zt.setAttribute($t, "0"), Zt.setAttribute("aria-hidden", "true"), Zt.setAttribute("aria-label", "Focus guard"), 
            Ut = Zt.cloneNode(), null === (t = s.parentElement) || void 0 === t || t.insertBefore(Zt, s), 
            null === (e = s.parentElement) || void 0 === e || e.append(Ut)), this.option("animated") && (S(s, Bt), 
            setTimeout((() => {
                this.isClosing() || E(s, Bt);
            }), 350)), this.emit("initLayout"));
        }
        initCarousel(t) {
            const i = this.container;
            if (!i) return;
            const n = i.querySelector(".fancybox__carousel");
            if (!n) return;
            const s = this.carousel = new Z(n, u({}, {
                slides: t,
                transition: "fade",
                Panzoom: {
                    lockAxis: this.option("dragToClose") ? "xy" : "x",
                    infinite: !!this.option("dragToClose") && "y"
                },
                Dots: !1,
                Navigation: {
                    classes: {
                        container: "fancybox__nav",
                        button: "f-button",
                        isNext: "is-next",
                        isPrev: "is-prev"
                    }
                },
                initialPage: this.option("startIndex"),
                l10n: this.option("l10n")
            }, this.option("Carousel") || {}));
            s.on("*", ((t, e, ...i) => {
                this.emit(`Carousel.${e}`, t, ...i);
            })), s.on([ "ready", "change" ], (() => {
                this.manageCaption();
            })), this.on("Carousel.removeSlide", ((t, e, i) => {
                this.clearContent(i), i.state = void 0;
            })), s.on("Panzoom.touchStart", (() => {
                var t, e;
                this.isCompact || this.endIdle(), (null === (t = document.activeElement) || void 0 === t ? void 0 : t.closest(".f-thumbs")) && (null === (e = this.container) || void 0 === e || e.focus());
            })), s.on("settle", (() => {
                this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && !this.isClosing && this.checkFocus();
            })), this.option("dragToClose") && (s.on("Panzoom.afterTransform", ((t, i) => {
                const n = this.getSlide();
                if (n && e(n.el)) return;
                const s = this.container;
                if (s) {
                    const t = Math.abs(i.current.f), e = t < 1 ? "" : Math.max(.5, Math.min(1, 1 - t / i.contentRect.fitHeight * 1.5));
                    s.style.setProperty("--fancybox-ts", e ? "0s" : ""), s.style.setProperty("--fancybox-opacity", e + "");
                }
            })), s.on("Panzoom.touchEnd", ((t, i, n) => {
                var s;
                const o = this.getSlide();
                if (o && e(o.el)) return;
                if (i.isMobile && document.activeElement && -1 !== [ "TEXTAREA", "INPUT" ].indexOf(null === (s = document.activeElement) || void 0 === s ? void 0 : s.nodeName)) return;
                const a = Math.abs(i.dragOffset.y);
                "y" === i.lockedAxis && (a >= 200 || a >= 50 && i.dragOffset.time < 300) && (n && n.cancelable && n.preventDefault(), 
                this.close(n, "f-throwOut" + (i.current.f < 0 ? "Up" : "Down")));
            }))), s.on("change", (t => {
                var e;
                let i = null === (e = this.getSlide()) || void 0 === e ? void 0 : e.triggerEl;
                if (i) {
                    const e = new CustomEvent("slideTo", {
                        bubbles: !0,
                        cancelable: !0,
                        detail: t.page
                    });
                    i.dispatchEvent(e);
                }
            })), s.on([ "refresh", "change" ], (t => {
                const e = this.container;
                if (!e) return;
                for (const i of e.querySelectorAll("[data-fancybox-current-index]")) i.innerHTML = t.page + 1;
                for (const i of e.querySelectorAll("[data-fancybox-count]")) i.innerHTML = t.pages.length;
                if (!t.isInfinite) {
                    for (const i of e.querySelectorAll("[data-fancybox-next]")) t.page < t.pages.length - 1 ? (i.removeAttribute(Wt), 
                    i.removeAttribute($t)) : (i.setAttribute(Wt, ""), i.setAttribute($t, "-1"));
                    for (const i of e.querySelectorAll("[data-fancybox-prev]")) t.page > 0 ? (i.removeAttribute(Wt), 
                    i.removeAttribute($t)) : (i.setAttribute(Wt, ""), i.setAttribute($t, "-1"));
                }
                const i = this.getSlide();
                if (!i) return;
                let n = i.downloadSrc || "";
                n || "image" !== i.type || i.error || "string" != typeof i[qt] || (n = i[qt]);
                for (const t of e.querySelectorAll("[data-fancybox-download]")) {
                    const e = i.downloadFilename;
                    n ? (t.removeAttribute(Wt), t.removeAttribute($t), t.setAttribute(Yt, n), t.setAttribute(Xt, e || n), 
                    t.setAttribute("target", "_blank")) : (t.setAttribute(Wt, ""), t.setAttribute($t, "-1"), 
                    t.removeAttribute(Yt), t.removeAttribute(Xt));
                }
            })), this.emit("initCarousel");
        }
        attachEvents() {
            const t = this, e = t.container;
            if (!e) return;
            e.addEventListener("click", t.onClick, {
                passive: !1,
                capture: !1
            }), e.addEventListener("wheel", t.onWheel, {
                passive: !1,
                capture: !1
            }), document.addEventListener("keydown", t.onKeydown, {
                passive: !1,
                capture: !0
            }), document.addEventListener("visibilitychange", t.onVisibilityChange, !1), document.addEventListener("mousemove", t.onMousemove), 
            t.option("trapFocus") && document.addEventListener("focus", t.onFocus, !0), window.addEventListener("resize", t.onResize);
            const i = window.visualViewport;
            i && (i.addEventListener("scroll", t.onResize), i.addEventListener("resize", t.onResize));
        }
        detachEvents() {
            const t = this, e = t.container;
            if (!e) return;
            document.removeEventListener("keydown", t.onKeydown, {
                passive: !1,
                capture: !0
            }), e.removeEventListener("wheel", t.onWheel, {
                passive: !1,
                capture: !1
            }), e.removeEventListener("click", t.onClick, {
                passive: !1,
                capture: !1
            }), document.removeEventListener("mousemove", t.onMousemove), window.removeEventListener("resize", t.onResize);
            const i = window.visualViewport;
            i && (i.removeEventListener("resize", t.onResize), i.removeEventListener("scroll", t.onResize)), 
            document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), document.removeEventListener("focus", t.onFocus, !0);
        }
        scale() {
            const t = this.container;
            if (!t) return;
            const e = window.visualViewport, i = Math.max(1, (null == e ? void 0 : e.scale) || 1);
            let n = "", s = "", o = "";
            if (e && i > 1) {
                let t = `${e.offsetLeft}px`, a = `${e.offsetTop}px`;
                n = e.width * i + "px", s = e.height * i + "px", o = `translate3d(${t}, ${a}, 0) scale(${1 / i})`;
            }
            t.style.transform = o, t.style.width = n, t.style.height = s;
        }
        onClick(t) {
            var e, i;
            const {container: n, isCompact: s} = this;
            if (!n || this.isClosing()) return;
            !s && this.option("idle") && this.resetIdle();
            const o = t.composedPath()[0];
            if (o.closest(".f-spinner") || o.closest("[data-fancybox-close]")) return t.preventDefault(), 
            void this.close(t);
            if (o.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
            if (o.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
            const a = document.activeElement;
            if (Vt() && a && n.contains(a)) return;
            if (o === (null === (e = this.carousel) || void 0 === e ? void 0 : e.container)) return;
            if (s && "image" === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.type)) return void (this.clickTimer ? (clearTimeout(this.clickTimer), 
            this.clickTimer = null) : this.clickTimer = setTimeout((() => {
                this.toggleIdle(), this.clickTimer = null;
            }), 350));
            if (this.emit("click", t), t.defaultPrevented) return;
            let r = !1;
            if (o.closest(".fancybox__content")) {
                if (a) {
                    if (a.closest("[contenteditable]")) return;
                    o.matches(J) || a.blur();
                }
                if (Vt()) return;
                r = this.option("contentClick");
            } else o.closest(".fancybox__carousel") && !o.matches(J) && (r = this.option("backdropClick"));
            "close" === r ? (t.preventDefault(), this.close(t)) : "next" === r ? (t.preventDefault(), 
            this.next()) : "prev" === r && (t.preventDefault(), this.prev());
        }
        onWheel(t) {
            var e;
            let i = this.option("wheel", t);
            (null === (e = t.target) || void 0 === e ? void 0 : e.closest(".fancybox__thumbs")) && (i = "slide");
            const n = "slide" === i, s = [ -t.deltaX || 0, -t.deltaY || 0, -t.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            })), o = Math.max(-1, Math.min(1, s)), a = Date.now();
            this.pwt && a - this.pwt < 300 ? n && t.preventDefault() : (this.pwt = a, this.emit("wheel", t), 
            t.defaultPrevented || ("close" === i ? (t.preventDefault(), this.close(t)) : "slide" === i && (t.preventDefault(), 
            this[o > 0 ? "prev" : "next"]())));
        }
        onKeydown(t) {
            if (!this.isTopmost()) return;
            this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
            const e = t.key, i = this.option("keyboard");
            if (!i || t.ctrlKey || t.altKey || t.shiftKey) return;
            const n = t.composedPath()[0], s = document.activeElement && document.activeElement.classList, o = s && s.contains("f-button") || n.dataset.carouselPage || n.dataset.carouselIndex;
            if ("Escape" !== e && !o && x(n)) if (n.isContentEditable || -1 !== [ "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO" ].indexOf(n.nodeName)) return;
            this.emit("keydown", e, t);
            const a = i[e];
            "function" == typeof this[a] && (t.preventDefault(), this[a]());
        }
        onResize() {
            const t = Nt, e = this.container;
            if (!e) return;
            const i = this.isCompact;
            e.classList.toggle(t, i), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), 
            this.scale(), this.emit("resize");
        }
        onFocus(t) {
            this.isTopmost() && this.checkFocus(t);
        }
        onMousemove(t) {
            this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle();
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.checkFocus() : this.endIdle();
        }
        manageCloseBtn(t) {
            const e = this.optionFor(t, "closeButton") || !1;
            if ("auto" === e) {
                const t = this.plugins.Toolbar;
                if (t && t.state === Lt.Ready) return;
            }
            if (!e) return;
            if (!t.contentEl || t.closeBtnEl) return;
            const i = this.option("tpl.closeButton");
            if (i) {
                const e = n(this.localize(i));
                t.closeBtnEl = t.contentEl.appendChild(e), t.el && S(t.el, "has-close-btn");
            }
        }
        manageCaption(t = void 0) {
            var e, i;
            const n = "fancybox__caption", s = "has-caption", o = this.container;
            if (!o) return;
            E(o, s);
            const a = this.isCompact || this.option("commonCaption"), r = !a;
            if (this.caption && this.stop(this.caption), r && this.caption && (this.caption.remove(), 
            this.caption = null), a && !this.caption) for (const t of (null === (e = this.carousel) || void 0 === e ? void 0 : e.slides) || []) t.captionEl && (t.captionEl.remove(), 
            t.captionEl = void 0, E(t.el, s), null === (i = t.el) || void 0 === i || i.removeAttribute("aria-labelledby"));
            if (t || (t = this.getSlide()), !t || a && !this.isCurrentSlide(t)) return;
            const l = t.el;
            let c = this.optionFor(t, "caption", "");
            if (!c) return void (a && this.caption && this.animate(this.caption, "f-fadeOut", (() => {
                this.caption && (this.caption.innerHTML = "");
            })));
            let h = null;
            if (r) {
                if (h = t.captionEl || null, l && !h) {
                    const e = n + `_${this.id}_${t.index}`;
                    h = document.createElement("div"), S(h, n), h.setAttribute("id", e), t.captionEl = l.appendChild(h), 
                    S(l, s), l.setAttribute("aria-labelledby", e);
                }
            } else {
                if (h = this.caption, h || (h = o.querySelector("." + n)), !h) {
                    h = document.createElement("div"), h.dataset.fancyboxCaption = "", S(h, n);
                    (this.footer || o).prepend(h);
                }
                S(o, s), this.caption = h;
            }
            h && (h.innerHTML = "", "string" == typeof c || "number" == typeof c ? h.innerHTML = c + "" : c instanceof HTMLElement && h.appendChild(c));
        }
        checkFocus(t) {
            var e;
            const i = document.activeElement || null;
            i && (null === (e = this.container) || void 0 === e ? void 0 : e.contains(i)) || this.focus(t);
        }
        focus(t) {
            var e;
            if (this.ignoreFocusChange) return;
            const i = document.activeElement || null, n = (null == t ? void 0 : t.target) || null, s = this.container, o = this.getSlide();
            if (!s || !(null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport)) return;
            if (!t && i && s.contains(i)) return;
            const a = o && o.state === it.Ready ? o.el : null;
            if (!a || a.contains(i) || s === i) return;
            t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
            const r = Array.from(s.querySelectorAll(J));
            let l = [], c = null;
            for (let t of r) {
                const e = !t.offsetParent || t.closest('[aria-hidden="true"]'), i = a && a.contains(t), n = !this.carousel.viewport.contains(t);
                if (t === s || (i || n) && !e) {
                    l.push(t);
                    const e = t.dataset.origTabindex;
                    void 0 !== e && e && (t.tabIndex = parseFloat(e)), t.removeAttribute("data-orig-tabindex"), 
                    !t.hasAttribute("autoFocus") && c || (c = t);
                } else {
                    const e = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") || "" : t.dataset.origTabindex;
                    e && (t.dataset.origTabindex = e), t.tabIndex = -1;
                }
            }
            let h = null;
            t ? (!n || l.indexOf(n) < 0) && (h = c || s, l.length && (i === Ut ? h = l[0] : this.lastFocus !== s && i !== Zt || (h = l[l.length - 1]))) : h = o && "image" === o.type ? s : c || s, 
            h && Q(h), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1;
        }
        next() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slideNext();
        }
        prev() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slidePrev();
        }
        jumpTo(...t) {
            this.carousel && this.carousel.slideTo(...t);
        }
        isTopmost() {
            var t;
            return (null === (t = Jt.getInstance()) || void 0 === t ? void 0 : t.id) == this.id;
        }
        animate(t = null, e = "", i) {
            if (!t || !e) return void (i && i());
            this.stop(t);
            const n = s => {
                s.target === t && t.dataset.animationName && (t.removeEventListener("animationend", n), 
                delete t.dataset.animationName, i && i(), E(t, e));
            };
            t.dataset.animationName = e, t.addEventListener("animationend", n), S(t, e);
        }
        stop(t) {
            t && t.dispatchEvent(new CustomEvent("animationend", {
                bubbles: !1,
                cancelable: !0,
                currentTarget: t
            }));
        }
        setContent(t, e = "", i = !0) {
            if (this.isClosing()) return;
            const s = t.el;
            if (!s) return;
            let o = null;
            if (x(e) ? o = e : (o = n(e + ""), x(o) || (o = document.createElement("div"), o.innerHTML = e + "")), 
            [ "img", "picture", "iframe", "video", "audio" ].includes(o.nodeName.toLowerCase())) {
                const t = document.createElement("div");
                t.appendChild(o), o = t;
            }
            x(o) && t.filter && !t.error && (o = o.querySelector(t.filter)), o && x(o) ? (S(o, "fancybox__content"), 
            t.id && o.setAttribute("id", t.id), "none" !== o.style.display && "none" !== getComputedStyle(o).getPropertyValue("display") || (o.style.display = t.display || this.option("defaultDisplay") || "flex"), 
            s.classList.add(`has-${t.error ? "error" : t.type || "unknown"}`), s.prepend(o), 
            t.contentEl = o, i && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}");
        }
        revealContent(t, e) {
            const i = t.el, n = t.contentEl;
            i && n && (this.emit("reveal", t), this.hideLoading(t), t.state = it.Opening, (e = this.isOpeningSlide(t) ? void 0 === e ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(n, e, (() => {
                this.done(t);
            })) : this.done(t));
        }
        done(t) {
            this.isClosing() || (t.state = it.Ready, this.emit("done", t), S(t.el, "is-done"), 
            this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask((() => {
                var e;
                null === (e = t.panzoom) || void 0 === e || e.updateControls(), this.option("autoFocus") && (this.option("autoFocus") ? this.focus() : this.checkFocus());
            })), this.isOpeningSlide(t) && !this.isCompact && this.option("idle") && this.setIdle());
        }
        isCurrentSlide(t) {
            const e = this.getSlide();
            return !(!t || !e) && e.index === t.index;
        }
        isOpeningSlide(t) {
            var e, i;
            return null === (null === (e = this.carousel) || void 0 === e ? void 0 : e.prevPage) && t.index === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index);
        }
        showLoading(t) {
            t.state = it.Loading;
            const e = t.el;
            if (!e) return;
            S(e, _t), this.emit("loading", t), t.spinnerEl || setTimeout((() => {
                if (!this.isClosing() && !t.spinnerEl && t.state === it.Loading) {
                    let i = n(w);
                    t.spinnerEl = i, e.prepend(i), this.animate(i, "f-fadeIn");
                }
            }), 250);
        }
        hideLoading(t) {
            const e = t.el;
            if (!e) return;
            const i = t.spinnerEl;
            this.isClosing() ? null == i || i.remove() : (E(e, _t), i && this.animate(i, "f-fadeOut", (() => {
                i.remove();
            })), t.state === it.Loading && (this.emit("loaded", t), t.state = it.Ready));
        }
        setError(t, e) {
            if (this.isClosing()) return;
            const i = new Event("error", {
                bubbles: !0,
                cancelable: !0
            });
            if (this.emit("error", i, t), i.defaultPrevented) return;
            t.error = e, this.hideLoading(t), this.clearContent(t);
            const n = document.createElement("div");
            n.classList.add("fancybox-error"), n.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), 
            this.setContent(t, n);
        }
        clearContent(t) {
            if (void 0 === t.state) return;
            this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0);
            const e = t.el;
            e && (E(e, "has-error"), E(e, "has-unknown"), E(e, `has-${t.type || "unknown"}`)), 
            t.closeBtnEl && t.closeBtnEl.remove(), t.closeBtnEl = void 0, t.captionEl && t.captionEl.remove(), 
            t.captionEl = void 0, t.spinnerEl && t.spinnerEl.remove(), t.spinnerEl = void 0;
        }
        getSlide() {
            var t;
            const e = this.carousel;
            return (null === (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0;
        }
        close(t, e) {
            if (this.isClosing()) return;
            const i = new Event("shouldClose", {
                bubbles: !0,
                cancelable: !0
            });
            if (this.emit("shouldClose", i, t), i.defaultPrevented) return;
            t && t.cancelable && (t.preventDefault(), t.stopPropagation());
            const n = this.fsAPI, s = () => {
                this.proceedClose(t, e);
            };
            n && n.isFullscreen() === this.container ? Promise.resolve(n.exit()).then((() => s())) : s();
        }
        clearIdle() {
            this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null;
        }
        setIdle(t = !1) {
            const e = () => {
                this.clearIdle(), this.idle = !0, S(this.container, "is-idle"), this.emit("setIdle");
            };
            if (this.clearIdle(), !this.isClosing()) if (t) e(); else {
                const t = this.option("idle");
                t && (this.idleTimer = setTimeout(e, t));
            }
        }
        endIdle() {
            this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, E(this.container, "is-idle"), 
            this.emit("endIdle"));
        }
        resetIdle() {
            this.endIdle(), this.setIdle();
        }
        toggleIdle() {
            this.idle ? this.endIdle() : this.setIdle(!0);
        }
        toggleFullscreen() {
            const t = this.fsAPI;
            t && (t.isFullscreen() ? t.exit() : this.container && t.request(this.container));
        }
        isClosing() {
            return [ et.Closing, et.CustomClosing, et.Destroy ].includes(this.state);
        }
        proceedClose(t, e) {
            var i, n;
            this.state = et.Closing, this.clearIdle(), this.detachEvents();
            const s = this.container, o = this.carousel, a = this.getSlide(), r = a && this.option("placeFocusBack") ? a.triggerEl || this.option("triggerEl") : null;
            if (r && (U(r) ? Q(r) : r.focus()), s && (S(s, "is-closing"), s.setAttribute("aria-hidden", "true"), 
            this.option("animated") && S(s, Bt), s.style.pointerEvents = "none"), o) {
                o.clearTransitions(), null === (i = o.panzoom) || void 0 === i || i.destroy(), null === (n = o.plugins.Navigation) || void 0 === n || n.detach();
                for (const t of o.slides) {
                    t.state = it.Closing, this.hideLoading(t);
                    const e = t.contentEl;
                    e && this.stop(e);
                    const i = null == t ? void 0 : t.panzoom;
                    i && (i.stop(), i.detachEvents(), i.detachObserver()), this.isCurrentSlide(t) || o.emit("removeSlide", t);
                }
            }
            this.emit("close", t), this.state !== et.CustomClosing ? (void 0 === e && a && (e = this.optionFor(a, "hideClass")), 
            e && a ? (this.animate(a.contentEl, e, (() => {
                o && o.emit("removeSlide", a);
            })), setTimeout((() => {
                this.destroy();
            }), 500)) : this.destroy()) : setTimeout((() => {
                this.destroy();
            }), 500);
        }
        destroy() {
            var t;
            if (this.state === et.Destroy) return;
            this.state = et.Destroy, null === (t = this.carousel) || void 0 === t || t.destroy();
            const e = this.container;
            e && e.remove(), Gt.delete(this.id);
            const i = Jt.getInstance();
            i ? i.focus() : (Zt && (Zt.remove(), Zt = null), Ut && (Ut.remove(), Ut = null), 
            E(document.documentElement, Ft), (() => {
                if (!G) return;
                const t = document, e = t.body;
                e.classList.remove(Dt), e.style.setProperty(Ht, ""), t.documentElement.style.setProperty(jt, "");
            })(), this.emit("destroy"));
        }
        static bind(t, e, i) {
            if (!G) return;
            let n, s = "", o = {};
            if (void 0 === t ? n = document.body : "string" == typeof t ? (n = document.body, 
            s = t, "object" == typeof e && (o = e || {})) : (n = t, "string" == typeof e && (s = e), 
            "object" == typeof i && (o = i || {})), !n || !x(n)) return;
            s = s || "[data-fancybox]";
            const a = Jt.openers.get(n) || new Map;
            a.set(s, o), Jt.openers.set(n, a), 1 === a.size && n.addEventListener("click", Jt.fromEvent);
        }
        static unbind(t, e) {
            let i, n = "";
            if ("string" == typeof t ? (i = document.body, n = t) : (i = t, "string" == typeof e && (n = e)), 
            !i) return;
            const s = Jt.openers.get(i);
            s && n && s.delete(n), n && s || (Jt.openers.delete(i), i.removeEventListener("click", Jt.fromEvent));
        }
        static destroy() {
            let t;
            for (;t = Jt.getInstance(); ) t.destroy();
            for (const t of Jt.openers.keys()) t.removeEventListener("click", Jt.fromEvent);
            Jt.openers = new Map;
        }
        static fromEvent(t) {
            if (t.defaultPrevented) return;
            if (t.button && 0 !== t.button) return;
            if (t.ctrlKey || t.metaKey || t.shiftKey) return;
            let e = t.composedPath()[0];
            const i = e.closest("[data-fancybox-trigger]");
            if (i) {
                const t = i.dataset.fancyboxTrigger || "", n = document.querySelectorAll(`[data-fancybox="${t}"]`), s = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
                e = n[s] || e;
            }
            if (!(e && e instanceof Element)) return;
            let n, s, o, a;
            if ([ ...Jt.openers ].reverse().find((([t, i]) => !(!t.contains(e) || ![ ...i ].reverse().find((([i, r]) => {
                let l = e.closest(i);
                return !!l && (n = t, s = i, o = l, a = r, !0);
            }))))), !n || !s || !o) return;
            a = a || {}, t.preventDefault(), e = o;
            let r = [], l = u({}, tt, a);
            l.event = t, l.triggerEl = e, l.delegate = i;
            const c = l.groupAll, h = l.groupAttr, d = h && e ? e.getAttribute(`${h}`) : "";
            if ((!e || d || c) && (r = [].slice.call(n.querySelectorAll(s))), e && !c && (r = d ? r.filter((t => t.getAttribute(`${h}`) === d)) : [ e ]), 
            !r.length) return;
            const p = Jt.getInstance();
            return p && p.options.triggerEl && r.indexOf(p.options.triggerEl) > -1 ? void 0 : (e && (l.startIndex = r.indexOf(e)), 
            Jt.fromNodes(r, l));
        }
        static fromSelector(t, e) {
            let i = null, n = "";
            if ("string" == typeof t ? (i = document.body, n = t) : t instanceof HTMLElement && "string" == typeof e && (i = t, 
            n = e), !i || !n) return !1;
            const s = Jt.openers.get(i);
            if (!s) return !1;
            const o = s.get(n);
            return !!o && Jt.fromNodes(Array.from(i.querySelectorAll(n)), o);
        }
        static fromNodes(t, e) {
            e = u({}, tt, e || {});
            const i = [];
            for (const n of t) {
                const t = n.dataset || {}, s = t[qt] || n.getAttribute(Yt) || n.getAttribute("currentSrc") || n.getAttribute(qt) || void 0;
                let o;
                const a = e.delegate;
                let r;
                a && i.length === e.startIndex && (o = a instanceof HTMLImageElement ? a : a.querySelector("img:not([aria-hidden])")), 
                o || (o = n instanceof HTMLImageElement ? n : n.querySelector("img:not([aria-hidden])")), 
                o && (r = o.currentSrc || o[qt] || void 0, !r && o.dataset && (r = o.dataset.lazySrc || o.dataset[qt] || void 0));
                const l = {
                    src: s,
                    triggerEl: n,
                    thumbEl: o,
                    thumbElSrc: r,
                    thumbSrc: r
                };
                for (const e in t) l[e] = t[e] + "";
                i.push(l);
            }
            return new Jt(i, e);
        }
        static getInstance(t) {
            if (t) return Gt.get(t);
            return Array.from(Gt.values()).reverse().find((t => !t.isClosing() && t)) || null;
        }
        static getSlide() {
            var t;
            return (null === (t = Jt.getInstance()) || void 0 === t ? void 0 : t.getSlide()) || null;
        }
        static show(t = [], e = {}) {
            return new Jt(t, e);
        }
        static next() {
            const t = Jt.getInstance();
            t && t.next();
        }
        static prev() {
            const t = Jt.getInstance();
            t && t.prev();
        }
        static close(t = !0, ...e) {
            if (t) for (const t of Gt.values()) t.close(...e); else {
                const t = Jt.getInstance();
                t && t.close(...e);
            }
        }
    }
    Object.defineProperty(Jt, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.24"
    }), Object.defineProperty(Jt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: tt
    }), Object.defineProperty(Jt, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: It
    }), Object.defineProperty(Jt, "openers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
    });
    const posImgCircle = () => {
        const images = document.querySelectorAll(".bio__tech-item");
        const widthImageItem = document.querySelector(".bio__tech-item").offsetWidth / 3 * 2;
        const radius = document.querySelector(".bio__image").offsetWidth / 2 + widthImageItem;
        images.forEach(((image, index) => {
            const angle = index / images.length * 360;
            const x = radius * Math.cos(angle * (Math.PI / 180));
            const y = radius * Math.sin(angle * (Math.PI / 180));
            image.style.transform = `translate(${x}px, ${y}px)`;
        }));
    };
    posImgCircle();
    const showImageAfterLoading = () => {
        const blurredImages = document.querySelectorAll(".blurred-img");
        blurredImages.forEach((image => {
            const img = image.querySelector("img");
            function loaded() {
                image.classList.add("loaded");
            }
            if (img.complete) loaded(); else img.addEventListener("load", loaded);
        }));
    };
    showImageAfterLoading();
    window["FLS"] = true;
    isWebp();
    menuInit();
    pageNavigation();
    headerScroll();
    digitsCounter();
    Jt.bind();
})();