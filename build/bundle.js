module.exports = function(e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var o = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.i = function(e) {
        return e
    }, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 38)
}([function(e, t) {
    e.exports = require("auth0-extension-tools@1.3.1")
}, function(e, t, r) {
    "use strict";
    e.exports = r(0).config()
}, function(e, t, r) {
    const n = r(31),
        o = r(10),
        i = r(24),
        s = r(30);
    e.exports.createServer = n.createServer, e.exports.urlHelpers = o, e.exports.middlewares = i, e.exports.routes = s
}, function(e, t) {
    e.exports = require("express@4.12.4")
}, function(e, t, r) {
    "use strict";
    var n = r(90);
    n.emitErrs = !0;
    var o = new n.Logger({
        transports: [new n.transports.Console({
            timestamp: !0,
            level: "debug",
            handleExceptions: !0,
            json: !1,
            colorize: !0
        })],
        exitOnError: !1
    });
    e.exports = o, e.exports.stream = {
        write: function(e) {
            o.info(e.replace(/\n$/, ""))
        }
    }
}, function(e, t) {
    var r = e.exports = {
        version: "2.5.7"
    };
    "number" == typeof __e && (__e = r)
}, function(e, t, r) {
    e.exports = !r(7)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(e, t) {
    var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = r)
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, r) {
    function n(e) {
        if (!e.container) return null;
        const t = e.container.replace(c, "\\$&"),
            r = e.jtn ? e.jtn.replace(c, "\\$&") : "";
        if (e.url_format === u) return new RegExp("^/api/run/" + t + "/(?:" + r + "/?)?");
        if (e.url_format === a) return new RegExp("^/" + t + "/(?:" + r + "/?)?");
        if (e.url_format === s) return new RegExp("^/(?:" + r + "/?)?");
        throw new Error("Unsupported webtask URL format.")
    }

    function o(e, t) {
        if (!e) return null;
        const r = e.indexOf("sandbox8") >= 0 ? "8" : "";
        return "https://" + t + "." + (e.split(".it.auth0.com")[0].split("-")[1] || "us") + r + ".webtask.io/"
    }
    const i = r(88),
        s = 3,
        a = 2,
        u = 1,
        c = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        l = function(e, t) {
            var r = i.parse(e).pathname || "";
            return r = r.replace(t, "").replace(/^\/|\/$/g, ""), r.startsWith("/") || (r = "/" + r), r.endsWith("/") || (r += "/"), r
        };
    e.exports.getBasePath = function(e) {
        return l(e.originalUrl || "", e.path)
    }, e.exports.getBaseUrl = function(e, t) {
        var r = t;
        const n = i.parse(e.originalUrl || "").pathname || "";
        return i.format({
            protocol: r || "https",
            host: e.headers.host,
            pathname: n.replace(e.path, "").replace(/\/$/g, "")
        })
    }, e.exports.getWebtaskUrl = function(e) {
        const t = n(e.x_wt),
            r = e.url,
            s = e.url.replace(t, "/"),
            a = i.parse(s || "").pathname,
            u = e.x_wt && e.x_wt.ectx && e.x_wt.ectx.ISOLATED_DOMAIN || !1,
            c = i.parse(r || "").pathname || "";
        var l;
        if (u) {
            l = i.format({
                protocol: "https",
                host: e.headers.host,
                pathname: c.replace(a, "").replace(/\/$/g, "")
            });
            const p = ".it.auth0.com/api/run/" + e.x_wt.container + "/",
                f = o(l, e.x_wt.container);
            l.indexOf(p) >= 0 && (l = l.replace("https://" + e.headers.host + "/api/run/" + e.x_wt.container + "/", f))
        } else l = c;
        return l
    }
}, function(e, t, r) {
    "use strict";
    var n = r(74);
    e.exports = function(e, t, r) {
        return function(o, i, s) {
            var a = n(s);
            return !0 === e || "function" == typeof e && e(o, i, a) ? t(o, i, a) : r ? r(o, i, a) : a()
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    var r = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return r.call(e, t)
    }
}, function(e, t, r) {
    var n = r(48);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == n(e) ? e.split("") : Object(e)
    }
}, function(e, t) {
    var r = Math.ceil,
        n = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : r)(e)
    }
}, function(e, t, r) {
    var n = r(14),
        o = r(12);
    e.exports = function(e) {
        return n(o(e))
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        this.message = e
    }
    var o = r(73);
    n.prototype = new Error, n.prototype.name = "InvalidTokenError", e.exports = function(e, t) {
        if ("string" != typeof e) throw new n("Invalid token specified");
        t = t || {};
        var r = !0 === t.header ? 0 : 1;
        try {
            return JSON.parse(o(e.split(".")[r]))
        } catch (e) {
            throw new n("Invalid token specified: " + e.message)
        }
    }, e.exports.InvalidTokenError = n
}, function(e, t) {
    e.exports = require("express-jwt@3.1.0")
}, function(e, t) {
    e.exports = require("path")
}, function(e, t, r) {
    "use strict";
    (function(t) {
        var n = r(19),
            o = r(86),
            i = r(3),
            s = r(77),
            a = r(0),
            u = r(2),
            c = r(36),
            l = r(37),
            p = r(34),
            f = r(4),
            d = r(1),
            h = r(33);
        e.exports = function(e, r) {
            d.setProvider(e);
            var g = r ? new a.WebtaskStorageContext(r, {
                    force: 1
                }) : new a.FileStorageContext(n.join(t, "./data.json"), {
                    mergeWrites: !0
                }),
                v = new i;
            v.use(o(":method :url :status :response-time ms - :res[content-length]", {
                stream: f.stream
            }));
            var m = function(e) {
                return function(t, r, n) {
                    return t.webtaskContext && t.webtaskContext.body ? (t.body = t.webtaskContext.body, n()) : e(t, r, n)
                }
            };
            return v.use(m(s.json())), v.use(m(s.urlencoded({
                extended: !1
            }))), v.use("/meta", l()), v.use("/.extensions", p()), v.use(h(g)), v.use(u.routes.dashboardAdmins({
                secret: d("EXTENSION_SECRET"),
                audience: "urn:logs-to-datadog",
                rta: d("AUTH0_RTA").replace("https://", ""),
                domain: d("AUTH0_DOMAIN"),
                baseUrl: d("PUBLIC_WT_URL") || d("WT_URL"),
                clientName: "Logs to DataDog",
                urlPrefix: "",
                sessionStorageKey: "logs-to-datadog:apiToken"
            })), v.use("/app", i.static(n.join(t, "../dist"))), v.use("/", c(g)), v.use(u.middlewares.errorHandler(f.error.bind(f))), v
        }
    }).call(t, "/")
}, function(e, t, r) {
    const n = r(17),
        o = r(18),
        i = r(0),
        s = r(11);
    e.exports = function(e) {
        if (!e || "object" != typeof e) throw new i.ArgumentError("Must provide the options");
        if (null === e.secret || void 0 === e.secret) throw new i.ArgumentError("Must provide a valid secret");
        if ("string" != typeof e.secret || 0 === e.secret.length) throw new i.ArgumentError("The provided secret is invalid: " + e.secret);
        if (null === e.audience || void 0 === e.audience) throw new i.ArgumentError("Must provide a valid secret");
        if ("string" != typeof e.audience || 0 === e.audience.length) throw new i.ArgumentError("The provided audience is invalid: " + e.audience);
        if (null === e.baseUrl || void 0 === e.baseUrl) throw new i.ArgumentError("Must provide a valid base URL");
        if ("string" != typeof e.baseUrl || 0 === e.baseUrl.length) throw new i.ArgumentError("The provided base URL is invalid: " + e.baseUrl);
        const t = o({
            audience: e.audience,
            issuer: e.baseUrl,
            secret: e.secret,
            algorithms: ["HS256"],
            credentialsRequired: e.credentialsRequired || !0
        });
        return function(r, n, o) {
            t(r, n, function(t) {
                return t ? o(t) : e.onLoginSuccess ? e.onLoginSuccess(r, n, o) : o()
            })
        }
    }, e.exports.optional = function(t) {
        const r = e.exports(t);
        return s(function(e) {
            if (e && e.headers && e.headers.authorization && 0 === e.headers.authorization.indexOf("Bearer ")) try {
                const r = n(e.headers.authorization.split(" ")[1]);
                return r && r.iss === t.baseUrl
            } catch (e) {
                return !1
            }
            return !1
        }, r)
    }
}, function(e, t, r) {
    const n = r(17),
        o = r(18),
        i = r(83),
        s = r(0),
        a = r(11),
        u = r(0).UnauthorizedError;
    e.exports = function(e) {
        if (!e || "object" != typeof e) throw new s.ArgumentError("Must provide the options");
        if (null === e.domain || void 0 === e.domain) throw new s.ArgumentError("Must provide a valid domain");
        if ("string" != typeof e.domain || 0 === e.domain.length) throw new s.ArgumentError("The provided domain is invalid: " + e.domain);
        if (null === e.audience || void 0 === e.audience) throw new s.ArgumentError("Must provide a valid audience");
        if ("string" != typeof e.audience || 0 === e.audience.length) throw new s.ArgumentError("The provided audience is invalid: " + e.audience);
        const t = o({
            secret: i.expressJwtSecret({
                cache: !0,
                rateLimit: !0,
                jwksRequestsPerMinute: 5,
                jwksUri: "https://" + e.domain + "/.well-known/jwks.json",
                handleSigningKeyError: function(e, t) {
                    return t(e instanceof i.SigningKeyNotFoundError ? new u("A token was provided with an invalid kid") : e)
                }
            }),
            audience: e.audience,
            issuer: "https://" + e.domain + "/",
            algorithms: ["RS256"],
            credentialsRequired: e && e.credentialsRequired || !0
        });
        return function(r, n, o) {
            t(r, n, function(t) {
                return t ? o(t) : e.onLoginSuccess ? e.onLoginSuccess(r, n, o) : o()
            })
        }
    }, e.exports.optional = function(t) {
        const r = e.exports(t);
        return a(function(e) {
            if (e && e.headers && e.headers.authorization && 0 === e.headers.authorization.indexOf("Bearer ")) try {
                const r = n(e.headers.authorization.split(" ")[1]);
                return r && r.iss === "https://" + t.domain + "/"
            } catch (e) {
                return !1
            }
            return !1
        }, r)
    }
}, function(e, t, r) {
    e.exports = function(e) {
        return function(t, r, n, o) {
            return e && e(t), t && t.status ? (n.status(t.status), n.json({
                error: t.code || t.name,
                message: t.message || t.name
            })) : (n.status(t.status || 500), n.json({
                error: "InternalServerError",
                message: t.message || t.name
            }))
        }
    }
}, function(e, t, r) {
    e.exports.authenticateAdmins = r(21), e.exports.authenticateUsers = r(22), e.exports.requireAuthentication = r(26), e.exports.errorHandler = r(23), e.exports.managementApiClient = r(25), e.exports.validateHookToken = r(27), e.exports.webtaskConfig = r(28)
}, function(e, t, r) {
    const n = r(0);
    e.exports = function(e) {
        return function(t, r, o) {
            const i = t,
                s = t.user && t.user.access_token && t.user.access_token.length,
                a = s ? {
                    domain: e.domain,
                    accessToken: t.user.access_token
                } : e;
            n.managementApi.getClient(a).then(function(e) {
                return i.auth0 = e, o(), null
            }).catch(function(e) {
                o(e)
            })
        }
    }
}, function(e, t, r) {
    const n = r(0).UnauthorizedError;
    e.exports = function(e, t, r) {
        return e.user ? r() : r(new n("Authentication required for this endpoint."))
    }
}, function(e, t, r) {
    const n = r(0);
    e.exports = function(e, t, r) {
        if (null === e || void 0 === e) throw new n.ArgumentError("Must provide the domain");
        if ("string" != typeof e || 0 === e.length) throw new n.ArgumentError("The provided domain is invalid: " + e);
        if (null === t || void 0 === t) throw new n.ArgumentError("Must provide the webtaskUrl");
        if ("string" != typeof t || 0 === t.length) throw new n.ArgumentError("The provided webtaskUrl is invalid: " + t);
        if (null === r || void 0 === r) throw new n.ArgumentError("Must provide the extensionSecret");
        if ("string" != typeof r || 0 === r.length) throw new n.ArgumentError("The provided extensionSecret is invalid: " + r);
        return function(o) {
            if (null === o || void 0 === o) throw new n.ArgumentError("Must provide the hookPath");
            if ("string" != typeof o || 0 === o.length) throw new n.ArgumentError("The provided hookPath is invalid: " + o);
            return function(i, s, a) {
                if (i.headers.authorization && "Bearer" === i.headers.authorization.split(" ")[0]) {
                    const u = i.headers.authorization.split(" ")[1];
                    try {
                        if (n.validateHookToken(e, t, o, r, u)) return a()
                    } catch (e) {
                        return a(e)
                    }
                }
                return a(new n.HookTokenError("Hook token missing for the call to: " + o))
            }
        }
    }
}, function(e, t, r) {
    const n = r(0);
    e.exports = function(e) {
        return function(t, r, o) {
            return t.webtaskContext && e.setProvider(n.configProvider.fromWebtaskContext(t.webtaskContext)), o()
        }
    }
}, function(e, t, r) {
    const n = r(3),
        o = r(79),
        i = r(41),
        s = r(82),
        a = r(0),
        u = r(10);
    e.exports = function(e) {
        if (!e || "object" != typeof e) throw new a.ArgumentError("Must provide the options");
        if (null === e.secret || void 0 === e.secret) throw new a.ArgumentError("Must provide a valid secret");
        if ("string" != typeof e.secret || 0 === e.secret.length) throw new a.ArgumentError("The provided secret is invalid: " + e.secret);
        if (null === e.audience || void 0 === e.audience) throw new a.ArgumentError("Must provide a valid audience");
        if ("string" != typeof e.audience || 0 === e.audience.length) throw new a.ArgumentError("The provided audience is invalid: " + e.audience);
        if (null === e.rta || void 0 === e.rta) throw new a.ArgumentError("Must provide a valid rta");
        if ("string" != typeof e.rta || 0 === e.rta.length) throw new a.ArgumentError("The provided rta is invalid: " + e.rta);
        if (null === e.domain || void 0 === e.domain) throw new a.ArgumentError("Must provide a valid domain");
        if ("string" != typeof e.domain || 0 === e.domain.length) throw new a.ArgumentError("The provided domain is invalid: " + e.domain);
        if (null === e.baseUrl || void 0 === e.baseUrl) throw new a.ArgumentError("Must provide a valid base URL");
        if ("string" != typeof e.baseUrl || 0 === e.baseUrl.length) throw new a.ArgumentError("The provided base URL is invalid: " + e.baseUrl);
        if (null === e.clientName || void 0 === e.clientName) throw new a.ArgumentError("Must provide a valid client name");
        if ("string" != typeof e.clientName || 0 === e.clientName.length) throw new a.ArgumentError("The provided client name is invalid: " + e.clientName);
        const t = e.stateKey || "state",
            r = e.nonceKey || "nonce",
            c = e.urlPrefix || "",
            l = e.sessionStorageKey || "apiToken",
            p = n.Router();
        return p.get(c + "/login", function(n, i) {
            const s = o.randomBytes(16).toString("hex"),
                l = o.randomBytes(16).toString("hex");
            i.cookie(t, s), i.cookie(r, l);
            const p = new a.SessionManager(e.rta, e.domain, e.baseUrl),
                f = p.createAuthorizeUrl({
                    redirectUri: u.getBaseUrl(n) + c + "/login/callback",
                    scopes: e.scopes,
                    expiration: e.expiration,
                    nonce: l,
                    state: s
                });
            i.redirect(f)
        }), p.post(c + "/login/callback", i(), function(n, o, i) {
            var c;
            try {
                c = s.decode(n.body.id_token)
            } catch (e) {
                c = null
            }
            return c && n.cookies && n.cookies[r] === c.nonce ? n.cookies && n.cookies[t] === n.body.state ? new a.SessionManager(e.rta, e.domain, e.baseUrl).create(n.body.id_token, n.body.access_token, {
                secret: e.secret,
                issuer: e.baseUrl,
                audience: e.audience
            }).then(function(e) {
                o.header("Content-Type", "text/html"), o.status(200).send('<html><head><script type="text/javascript">sessionStorage.setItem("' + l + '", "' + e + '");window.location.href = "' + u.getBaseUrl(n) + '";<\/script></head></html>')
            }).catch(function(e) {
                i(e)
            }) : i(new a.ValidationError("Login failed. State mismatch.")) : i(new a.ValidationError("Login failed. Nonce mismatch."))
        }), p.get(c + "/logout", function(t, r) {
            const n = encodeURIComponent(u.getBaseUrl(t));
            r.header("Content-Type", "text/html"), r.status(200).send('<html><head><script type="text/javascript">sessionStorage.removeItem("' + l + '");window.location.href = "https://' + e.rta + "/v2/logout/?returnTo=" + n + "&client_id=" + n + '";<\/script></head></html>')
        }), p.get("/.well-known/oauth2-client-configuration", function(t, r) {
            r.header("Content-Type", "application/json"), r.status(200).send({
                redirect_uris: [u.getBaseUrl(t) + c + "/login/callback"],
                client_name: e.clientName,
                post_logout_redirect_uris: [u.getBaseUrl(t)]
            })
        }), p
    }
}, function(e, t, r) {
    e.exports.dashboardAdmins = r(29)
}, function(e, t, r) {
    const n = r(0),
        o = r(89);
    e.exports.createServer = function(e) {
        const t = n.createServer(e);
        var r = null;
        return o.fromExpress(function(e, n) {
            return r || (r = t(e.webtaskContext)), r(e, n)
        })
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e, t, r) {
        if (!t) throw new Error("API Key is required for DataDog.");
        if (p.apiKey = t, "US" === e ? (p.host = "http-intake.logs.datadoghq.com", p.port = 10516) : (p.host = "tcp-intake.logs.datadoghq.eu", p.port = 443), r) {
            var n = r.match(/([^:|^,\W]+):([^,|^\W]+)/g);
            if (!n || n.length < 1) throw new Error("Custom tags are not formatted properly. Format is comma-separated key:value.");
            l.ddtags = r
        }
    }
    var i = r(39),
        s = n(i),
        a = r(40),
        u = n(a),
        c = r(87),
        l = {
            ddsourcecategory: "external",
            ddsource: "auth0"
        },
        p = {};
    o.prototype.log = function(e, t) {
        var r = c.connect(p.port, p.host, function() {
            if (!r.authorized) return t("Error connecting to DataDog");
            var n = (0, u.default)(l, e);
            return r.write(p.apiKey + " " + (0, s.default)(n) + "\r\n"), r.end(), t()
        })
    }, e.exports = o
}, function(e, t, r) {
    "use strict";
    var n = r(75),
        o = r(85),
        i = r(76),
        s = r(1),
        a = r(4),
        u = r(32);
    e.exports = function(e) {
        return function(t, r, c) {
            var l = t.webtaskContext && t.webtaskContext.body || t.body || {},
                p = t.webtaskContext && t.webtaskContext.headers || {};
            if (!(l.schedule && "active" === l.state || p.referer === s("AUTH0_MANAGE_URL") + "/" && p["if-none-match"])) return c();
            var f = new u(s("DATADOG_SERVER"), s("DATADOG_API_KEY"), s("DATADOG_CUSTOM_TAGS")),
                d = function(e, t) {
                    if (!e || !e.length) return t();
                    a.info("Sending " + e.length + " logs to DataDog."), n.eachLimit(e, 10, function(e, t) {
                        f.log(e, t)
                    }, function(e) {
                        return e ? (a.error("Error occurred when sending logs to DataDog", e), t(e)) : (a.info("Upload complete."), t())
                    })
                },
                h = new i.reporters.SlackReporter({
                    hook: s("SLACK_INCOMING_WEBHOOK_URL"),
                    username: "auth0-logs-to-datadog",
                    title: "Logs To DataDog"
                }),
                g = {
                    domain: s("AUTH0_DOMAIN"),
                    clientId: s("AUTH0_CLIENT_ID"),
                    clientSecret: s("AUTH0_CLIENT_SECRET"),
                    batchSize: parseInt(s("BATCH_SIZE"), 10),
                    startFrom: s("START_FROM"),
                    logLevel: s("LOG_LEVEL"),
                    logTypes: s("LOG_TYPES")
                };
            (!g.batchSize || g.batchSize > 100) && (g.batchSize = 100), g.logTypes && !Array.isArray(g.logTypes) && (g.logTypes = g.logTypes.replace(/\s/g, "").split(","));
            var v = new i.LogsProcessor(e, g),
                m = function(t) {
                    var r = new Date,
                        n = r.getTime(),
                        o = n - 864e5;
                    v.getReport(o, n).then(function(e) {
                        return h.send(e, e.checkpoint)
                    }).then(function() {
                        return e.read()
                    }).then(function(r) {
                        return r.lastReportDate = t, e.write(r)
                    })
                },
                x = function() {
                    e.read().then(function(e) {
                        var t = o().format("DD-MM-YYYY"),
                            r = s("DAILY_REPORT_TIME") || 16;
                        e.lastReportDate !== t && (new Date).getHours() >= r && m(t)
                    })
                };
            return v.run(d).then(function(e) {
                e && e.status && e.status.error ? h.send(e.status, e.checkpoint) : !0 !== s("SLACK_SEND_SUCCESS") && "true" !== s("SLACK_SEND_SUCCESS") || h.send(e.status, e.checkpoint), x(), r.json(e)
            }).catch(function(e) {
                h.send({
                    error: e,
                    logsProcessed: 0
                }, null), x(), c(e)
            })
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(3).Router,
        o = r(2).middlewares,
        i = r(1),
        s = r(4);
    e.exports = function() {
        var e = n(),
            t = o.validateHookToken(i("AUTH0_DOMAIN"), i("WT_URL"), i("EXTENSION_SECRET"));
        return e.use("/on-uninstall", t("/.extensions/on-uninstall")), e.use(o.managementApiClient({
            domain: i("AUTH0_DOMAIN"),
            clientId: i("AUTH0_CLIENT_ID"),
            clientSecret: i("AUTH0_CLIENT_SECRET")
        })), e.delete("/on-uninstall", function(e, t) {
            var r = i("AUTH0_CLIENT_ID");
            e.auth0.clients.delete({
                client_id: r
            }).then(function() {
                s.debug("Deleted client " + r), t.sendStatus(204)
            }).catch(function(e) {
                s.debug("Error deleting client: " + i("AUTH0_CLIENT_ID")), s.error(e), t.sendStatus(204)
            })
        }), e
    }
}, function(e, t, r) {
    "use strict";
    (function(t) {
        var n = (r(81), r(80)),
            o = (r(19), r(2).urlHelpers),
            i = r(1);
        e.exports = function() {
            var e = '\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <title><%= config.TITLE %></title>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n    <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n    <% if (assets.version) { %>\n    <link rel="stylesheet" type="text/css" \n      href="https://betaprojectwave.github.io/auth0-logs-to-datadog/dist/auth0-logs-to-datadog.ui.<%= assets.version %>.css" />\n    <% } %>\n    <% if (assets.customCss) { %><link rel="stylesheet" type="text/css" href="<%= assets.customCss %>" /><% } %>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="text/javascript" src="//cdn.auth0.com/w2/auth0-7.0.4.min.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n    <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n    <% if (assets.vendors) { %><script type="text/javascript" src="/app/<%= assets.vendors %>"><\/script><% } %>\n    <% if (assets.app) { %><script type="text/javascript" src="/app/<%= assets.app %>"><\/script><% } %>\n    <% if (assets.version) { %>\n    <script type="text/javascript" \n      src="https://betaprojectwave.github.io/auth0-logs-to-datadog/dist/auth0-logs-to-datadog.ui.vendors.<%= assets.version %>.js"><\/script>\n    <script type="text/javascript" \n      src="https://betaprojectwave.github.io/auth0-logs-to-datadog/dist/auth0-logs-to-datadog.ui.<%= assets.version %>.js"><\/script>\n    <% } %>\n  </body>\n  </html>\n  ';
            return function(t, r, s) {
                if (0 === t.url.indexOf("/api")) return s();
                var a = {
                    AUTH0_DOMAIN: i("AUTH0_DOMAIN"),
                    AUTH0_CLIENT_ID: i("EXTENSION_CLIENT_ID"),
                    AUTH0_MANAGE_URL: i("AUTH0_MANAGE_URL") || "https://manage.auth0.com",
                    BASE_URL: o.getBaseUrl(t),
                    BASE_PATH: o.getBasePath(t),
                    TITLE: i("TITLE")
                };
                return r.send(n.render(e, {
                    config: a,
                    assets: {
                        customCss: i("CUSTOM_CSS"),
                        version: "1.3.0"
                    }
                }))
            }
        }
    }).call(t, "/")
}, function(e, t, r) {
    "use strict";
    var n = r(84),
        o = r(3).Router,
        i = r(2).middlewares,
        s = r(1),
        a = r(35);
    e.exports = function(e) {
        var t = o(),
            r = i.authenticateAdmins({
                credentialsRequired: !0,
                secret: s("EXTENSION_SECRET"),
                audience: "urn:logs-to-datadog",
                baseUrl: s("PUBLIC_WT_URL") || s("WT_URL"),
                onLoginSuccess: function(e, t, r) {
                    return r()
                }
            }),
            u = i.managementApiClient({
                domain: s("AUTH0_DOMAIN"),
                clientId: s("AUTH0_CLIENT_ID"),
                clientSecret: s("AUTH0_CLIENT_SECRET")
            });
        return t.get("/", u, a()), t.get("/api/report", r, function(t, r, o) {
            return e.read().then(function(e) {
                var o = e && e.logs ? n.sortByOrder(e.logs, "start", "desc") : [],
                    i = t.query.filter && "errors" === t.query.filter ? n.filter(o, function(e) {
                        return !!e.error
                    }) : o,
                    s = t.query.page && parseInt(t.query.page, 10) ? parseInt(t.query.page, 10) - 1 : 0,
                    a = t.query.per_page && parseInt(t.query.per_page, 10) || 10,
                    u = a * s;
                return r.json({
                    logs: i.slice(u, u + a),
                    total: i.length
                })
            }).catch(o)
        }), t
    }
}, function(e, t, r) {
    "use strict";
    var n = r(3),
        o = r(71);
    e.exports = function() {
        var e = n.Router();
        return e.get("/", function(e, t) {
            t.status(200).send(o)
        }), e
    }
}, function(e, t, r) {
    "use strict";
    var n = r(2),
        o = r(20),
        i = r(1),
        s = r(4),
        a = n.createServer(function(e, t) {
            return s.info("Starting Auth0 Logs to DataDog Extension - Version: ", "1.3.0"), o(e, t)
        });
    e.exports = function(e, t, r) {
        i.setValue("PUBLIC_WT_URL", n.urlHelpers.getWebtaskUrl(t)), a(e, t, r)
    }
}, function(e, t, r) {
    e.exports = {
        default: r(43),
        __esModule: !0
    }
}, function(e, t, r) {
    e.exports = {
        default: r(44),
        __esModule: !0
    }
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        return function(r, n, o) {
            if (r.cookies) return o();
            var s = r.headers.cookie,
                c = !e || Array.isArray(e) ? e || [] : [e];
            if (r.secret = c[0], r.cookies = Object.create(null), r.signedCookies = Object.create(null), !s) return o();
            r.cookies = u.parse(s, t), 0 !== c.length && (r.signedCookies = a(r.cookies, c), r.signedCookies = i(r.signedCookies)), r.cookies = i(r.cookies), o()
        }
    }

    function o(e) {
        if ("string" == typeof e && "j:" === e.substr(0, 2)) try {
            return JSON.parse(e.slice(2))
        } catch (e) {
            return
        }
    }

    function i(e) {
        for (var t, r, n = Object.keys(e), i = 0; i < n.length; i++) t = n[i], (r = o(e[t])) && (e[t] = r);
        return e
    }

    function s(e, t) {
        if ("string" == typeof e) {
            if ("s:" !== e.substr(0, 2)) return e;
            for (var r = !t || Array.isArray(t) ? t || [] : [t], n = 0; n < r.length; n++) {
                var o = c.unsign(e.slice(2), r[n]);
                if (!1 !== o) return o
            }
            return !1
        }
    }

    function a(e, t) {
        for (var r, n, o, i = Object.keys(e), a = Object.create(null), u = 0; u < i.length; u++) n = i[u], o = e[n], r = s(o, t), o !== r && (a[n] = r, delete e[n]);
        return a
    }
    var u = r(42),
        c = r(78);
    e.exports = n, e.exports.JSONCookie = o, e.exports.JSONCookies = i, e.exports.signedCookie = s, e.exports.signedCookies = a
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if ("string" != typeof e) throw new TypeError("argument str must be a string");
        for (var r = {}, n = t || {}, o = e.split(u), a = n.decode || s, c = 0; c < o.length; c++) {
            var l = o[c],
                p = l.indexOf("=");
            if (!(p < 0)) {
                var f = l.substr(0, p).trim(),
                    d = l.substr(++p, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == r[f] && (r[f] = i(d, a))
            }
        }
        return r
    }

    function o(e, t, r) {
        var n = r || {},
            o = n.encode || a;
        if ("function" != typeof o) throw new TypeError("option encode is invalid");
        if (!c.test(e)) throw new TypeError("argument name is invalid");
        var i = o(t);
        if (i && !c.test(i)) throw new TypeError("argument val is invalid");
        var s = e + "=" + i;
        if (null != n.maxAge) {
            var u = n.maxAge - 0;
            if (isNaN(u)) throw new Error("maxAge should be a Number");
            s += "; Max-Age=" + Math.floor(u)
        }
        if (n.domain) {
            if (!c.test(n.domain)) throw new TypeError("option domain is invalid");
            s += "; Domain=" + n.domain
        }
        if (n.path) {
            if (!c.test(n.path)) throw new TypeError("option path is invalid");
            s += "; Path=" + n.path
        }
        if (n.expires) {
            if ("function" != typeof n.expires.toUTCString) throw new TypeError("option expires is invalid");
            s += "; Expires=" + n.expires.toUTCString()
        }
        if (n.httpOnly && (s += "; HttpOnly"), n.secure && (s += "; Secure"), n.sameSite) {
            switch ("string" == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite) {
                case !0:
                    s += "; SameSite=Strict";
                    break;
                case "lax":
                    s += "; SameSite=Lax";
                    break;
                case "strict":
                    s += "; SameSite=Strict";
                    break;
                default:
                    throw new TypeError("option sameSite is invalid")
            }
        }
        return s
    }

    function i(e, t) {
        try {
            return t(e)
        } catch (t) {
            return e
        }
    }
    t.parse = n, t.serialize = o;
    var s = decodeURIComponent,
        a = encodeURIComponent,
        u = /; */,
        c = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
}, function(e, t, r) {
    var n = r(5),
        o = n.JSON || (n.JSON = {
            stringify: JSON.stringify
        });
    e.exports = function(e) {
        return o.stringify.apply(o, arguments)
    }
}, function(e, t, r) {
    r(70), e.exports = r(5).Object.assign
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, r) {
    var n = r(9);
    e.exports = function(e) {
        if (!n(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, r) {
    var n = r(16),
        o = r(66),
        i = r(65);
    e.exports = function(e) {
        return function(t, r, s) {
            var a, u = n(t),
                c = o(u.length),
                l = i(s, c);
            if (e && r != r) {
                for (; c > l;)
                    if ((a = u[l++]) != a) return !0
            } else
                for (; c > l; l++)
                    if ((e || l in u) && u[l] === r) return e || l || 0;
            return !e && -1
        }
    }
}, function(e, t) {
    var r = {}.toString;
    e.exports = function(e) {
        return r.call(e).slice(8, -1)
    }
}, function(e, t, r) {
    var n = r(45);
    e.exports = function(e, t, r) {
        if (n(e), void 0 === t) return e;
        switch (r) {
            case 1:
                return function(r) {
                    return e.call(t, r)
                };
            case 2:
                return function(r, n) {
                    return e.call(t, r, n)
                };
            case 3:
                return function(r, n, o) {
                    return e.call(t, r, n, o)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, r) {
    var n = r(9),
        o = r(8).document,
        i = n(o) && n(o.createElement);
    e.exports = function(e) {
        return i ? o.createElement(e) : {}
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, r) {
    var n = r(8),
        o = r(5),
        i = r(49),
        s = r(53),
        a = r(13),
        u = function(e, t, r) {
            var c, l, p, f = e & u.F,
                d = e & u.G,
                h = e & u.S,
                g = e & u.P,
                v = e & u.B,
                m = e & u.W,
                x = d ? o : o[t] || (o[t] = {}),
                w = x.prototype,
                y = d ? n : h ? n[t] : (n[t] || {}).prototype;
            d && (r = t);
            for (c in r)(l = !f && y && void 0 !== y[c]) && a(x, c) || (p = l ? y[c] : r[c], x[c] = d && "function" != typeof y[c] ? r[c] : v && l ? i(p, n) : m && y[c] == p ? function(e) {
                var t = function(t, r, n) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, r)
                        }
                        return new e(t, r, n)
                    }
                    return e.apply(this, arguments)
                };
                return t.prototype = e.prototype, t
            }(p) : g && "function" == typeof p ? i(Function.call, p) : p, g && ((x.virtual || (x.virtual = {}))[c] = p, e & u.R && w && !w[c] && s(w, c, p)))
        };
    u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, function(e, t, r) {
    var n = r(57),
        o = r(62);
    e.exports = r(6) ? function(e, t, r) {
        return n.f(e, t, o(1, r))
    } : function(e, t, r) {
        return e[t] = r, e
    }
}, function(e, t, r) {
    e.exports = !r(6) && !r(7)(function() {
        return 7 != Object.defineProperty(r(50)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    e.exports = !0
}, function(e, t, r) {
    "use strict";
    var n = r(60),
        o = r(58),
        i = r(61),
        s = r(67),
        a = r(14),
        u = Object.assign;
    e.exports = !u || r(7)(function() {
        var e = {},
            t = {},
            r = Symbol(),
            n = "abcdefghijklmnopqrst";
        return e[r] = 7, n.split("").forEach(function(e) {
            t[e] = e
        }), 7 != u({}, e)[r] || Object.keys(u({}, t)).join("") != n
    }) ? function(e, t) {
        for (var r = s(e), u = arguments.length, c = 1, l = o.f, p = i.f; u > c;)
            for (var f, d = a(arguments[c++]), h = l ? n(d).concat(l(d)) : n(d), g = h.length, v = 0; g > v;) p.call(d, f = h[v++]) && (r[f] = d[f]);
        return r
    } : u
}, function(e, t, r) {
    var n = r(46),
        o = r(54),
        i = r(68),
        s = Object.defineProperty;
    t.f = r(6) ? Object.defineProperty : function(e, t, r) {
        if (n(e), t = i(t, !0), n(r), o) try {
            return s(e, t, r)
        } catch (e) {}
        if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
        return "value" in r && (e[t] = r.value), e
    }
}, function(e, t) {
    t.f = Object.getOwnPropertySymbols
}, function(e, t, r) {
    var n = r(13),
        o = r(16),
        i = r(47)(!1),
        s = r(63)("IE_PROTO");
    e.exports = function(e, t) {
        var r, a = o(e),
            u = 0,
            c = [];
        for (r in a) r != s && n(a, r) && c.push(r);
        for (; t.length > u;) n(a, r = t[u++]) && (~i(c, r) || c.push(r));
        return c
    }
}, function(e, t, r) {
    var n = r(59),
        o = r(51);
    e.exports = Object.keys || function(e) {
        return n(e, o)
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t, r) {
    var n = r(64)("keys"),
        o = r(69);
    e.exports = function(e) {
        return n[e] || (n[e] = o(e))
    }
}, function(e, t, r) {
    var n = r(5),
        o = r(8),
        i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    (e.exports = function(e, t) {
        return i[e] || (i[e] = void 0 !== t ? t : {})
    })("versions", []).push({
        version: n.version,
        mode: r(55) ? "pure" : "global",
        copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
    })
}, function(e, t, r) {
    var n = r(15),
        o = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        return e = n(e), e < 0 ? o(e + t, 0) : i(e, t)
    }
}, function(e, t, r) {
    var n = r(15),
        o = Math.min;
    e.exports = function(e) {
        return e > 0 ? o(n(e), 9007199254740991) : 0
    }
}, function(e, t, r) {
    var n = r(12);
    e.exports = function(e) {
        return Object(n(e))
    }
}, function(e, t, r) {
    var n = r(9);
    e.exports = function(e, t) {
        if (!n(e)) return e;
        var r, o;
        if (t && "function" == typeof(r = e.toString) && !n(o = r.call(e))) return o;
        if ("function" == typeof(r = e.valueOf) && !n(o = r.call(e))) return o;
        if (!t && "function" == typeof(r = e.toString) && !n(o = r.call(e))) return o;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t) {
    var r = 0,
        n = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + n).toString(36))
    }
}, function(e, t, r) {
    var n = r(52);
    n(n.S + n.F, "Object", {
        assign: r(56)
    })
}, function(e, t) {
    e.exports = {
        title: "Auth0 logs to DataDog",
        name: "auth0-logs-to-datadog",
        version: "1.3.0",
        author: "Paul Pop <ppop@and.digital>",
        description: "This extension will export your Auth0 logs to DataDog",
        type: "cron",
        schedule: "0 */5 * * * *",
        category: "log_export",
        initialUrlPath: "/login",
        repository: "https://github.com/BetaProjectWave/auth0-logs-to-datadog",
        docsUrl: "https://github.com/BetaProjectWave/auth0-logs-to-datadog#readme",
        logoUrl: "https://www.getpostman.com/img/v2/integrations/datadog-logo.png",
        keywords: ["auth0", "extension", "datadog", "logs"],
        auth0: {
            createClient: !0,
            onUninstallPath: "/.extensions/on-uninstall",
            scopes: "read:logs delete:clients"
        },
        secrets: {
            BATCH_SIZE: {
                description: "The amount of logs to batch before sending to DataDog. A single cron execution will send multiple batches. Maximum: 100.",
                default: 100
            },
            DATADOG_API_KEY: {
                description: "DataDog API key",
                required: !0,
                type: "password"
            },
            DATADOG_CUSTOM_TAGS: {
                description: "Custom tags to send to DataDog",
                example: "key1:value1,key2:value2"
            },
            START_FROM: {
                description: "Checkpoint ID of log to start from."
            },
            SLACK_INCOMING_WEBHOOK_URL: {
                description: "Slack Incoming Webhook URL used to report statistics and possible failures"
            },
            SLACK_SEND_SUCCESS: {
                description: "This setting will enable verbose notifications to Slack which are useful for troubleshooting",
                type: "select",
                allowMultiple: !1,
                default: "false",
                options: [{
                    value: "false",
                    text: "No"
                }, {
                    value: "true",
                    text: "Yes"
                }]
            },
            DATADOG_SERVER: {
                description: "Datadog server HQ. If you are running in EU datadog please change this to EU",
                type: "select",
                allowMultiple: !1,
                default: "http-intake.logs.datadoghq.com",
                options: [{
                    value: "US",
                    text: "US"
                }, {
                    value: "EU",
                    text: "EU"
                }]
            },
            LOG_LEVEL: {
                description: "This allows you to specify the log level of events that need to be sent",
                type: "select",
                allowMultiple: !0,
                options: [{
                    value: "-",
                    text: ""
                }, {
                    value: "0",
                    text: "Debug"
                }, {
                    value: "1",
                    text: "Info"
                }, {
                    value: "2",
                    text: "Warning"
                }, {
                    value: "3",
                    text: "Error"
                }, {
                    value: "4",
                    text: "Critical"
                }]
            },
            LOG_TYPES: {
                description: "If you only want to send events with a specific type (eg: failed logins)",
                type: "select",
                allowMultiple: !0,
                options: [{
                    text: "",
                    value: "-"
                }, {
                    text: "Success Login",
                    value: "s"
                }, {
                    text: "Success Exchange",
                    value: "seacft"
                }, {
                    text: "Success Exchange (Client Credentials)",
                    value: "seccft"
                }, {
                    text: "Failed Exchange",
                    value: "feacft"
                }, {
                    text: "Failed Exchange (Client Credentials)",
                    value: "feccft"
                }, {
                    text: "Failed Login",
                    value: "f"
                }, {
                    text: "Warnings During Login",
                    value: "w"
                }, {
                    text: "Deleted User",
                    value: "du"
                }, {
                    text: "Failed Login (invalid email/username)",
                    value: "fu"
                }, {
                    text: "Failed Login (wrong password)",
                    value: "fp"
                }, {
                    text: "Failed by Connector",
                    value: "fc"
                }, {
                    text: "Failed by CORS",
                    value: "fco"
                }, {
                    text: "Connector Online",
                    value: "con"
                }, {
                    text: "Connector Offline",
                    value: "coff"
                }, {
                    text: "Failed Connector Provisioning",
                    value: "fcpro"
                }, {
                    text: "Success Signup",
                    value: "ss"
                }, {
                    text: "Failed Signup",
                    value: "fs"
                }, {
                    text: "Code Sent",
                    value: "cs"
                }, {
                    text: "Code/Link Sent",
                    value: "cls"
                }, {
                    text: "Success Verification Email",
                    value: "sv"
                }, {
                    text: "Failed Verification Email",
                    value: "fv"
                }, {
                    text: "Success Change Password",
                    value: "scp"
                }, {
                    text: "Failed Change Password",
                    value: "fcp"
                }, {
                    text: "Success Change Email",
                    value: "sce"
                }, {
                    text: "Failed Change Email",
                    value: "fce"
                }, {
                    text: "Success Change Username",
                    value: "scu"
                }, {
                    text: "Failed Change Username",
                    value: "fcu"
                }, {
                    text: "Success Change Phone Number",
                    value: "scpn"
                }, {
                    text: "Failed Change Phone Number",
                    value: "fcpn"
                }, {
                    text: "Success Verification Email Request",
                    value: "svr"
                }, {
                    text: "Failed Verification Email Request",
                    value: "fvr"
                }, {
                    text: "Success Change Password Request",
                    value: "scpr"
                }, {
                    text: "Failed Change Password Request",
                    value: "fcpr"
                }, {
                    text: "Failed Sending Notification",
                    value: "fn"
                }, {
                    text: "API Operation",
                    value: "sapi"
                }, {
                    text: "Failed API Operation",
                    value: "fapi"
                }, {
                    text: "Blocked Account",
                    value: "limit_wc"
                }, {
                    text: "Too Many Calls to /userinfo",
                    value: "limit_ui"
                }, {
                    text: "Rate Limit On API",
                    value: "api_limit"
                }, {
                    text: "Successful User Deletion",
                    value: "sdu"
                }, {
                    text: "Failed User Deletion",
                    value: "fdu"
                }, {
                    text: "Blocked Account",
                    value: "limit_wc"
                }, {
                    text: "Blocked IP Address",
                    value: "limit_mu"
                }, {
                    text: "Success Logout",
                    value: "slo"
                }, {
                    text: "Failed Logout",
                    value: "flo"
                }, {
                    text: "Success Delegation",
                    value: "sd"
                }, {
                    text: "Failed Delegation",
                    value: "fd"
                }]
            }
        }
    }
}, function(e, t) {
    function r(e) {
        this.message = e
    }

    function n(e) {
        var t = String(e).replace(/=+$/, "");
        if (t.length % 4 == 1) throw new r("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var n, i, s = 0, a = 0, u = ""; i = t.charAt(a++); ~i && (n = s % 4 ? 64 * n + i : i, s++ % 4) ? u += String.fromCharCode(255 & n >> (-2 * s & 6)) : 0) i = o.indexOf(i);
        return u
    }
    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    r.prototype = new Error, r.prototype.name = "InvalidCharacterError", e.exports = "undefined" != typeof window && window.atob && window.atob.bind(window) || n
}, function(e, t, r) {
    function n(e) {
        return decodeURIComponent(o(e).replace(/(.)/g, function(e, t) {
            var r = t.charCodeAt(0).toString(16).toUpperCase();
            return r.length < 2 && (r = "0" + r), "%" + r
        }))
    }
    var o = r(72);
    e.exports = function(e) {
        var t = e.replace(/-/g, "+").replace(/_/g, "/");
        switch (t.length % 4) {
            case 0:
                break;
            case 2:
                t += "==";
                break;
            case 3:
                t += "=";
                break;
            default:
                throw "Illegal base64url string!"
        }
        try {
            return n(t)
        } catch (e) {
            return o(t)
        }
    }
}, function(e, t, r) {
    function n(e) {
        var t = function() {
            return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments))
        };
        return t.called = !1, t
    }

    function o(e) {
        var t = function() {
                if (t.called) throw new Error(t.onceError);
                return t.called = !0, t.value = e.apply(this, arguments)
            },
            r = e.name || "Function wrapped with `once`";
        return t.onceError = r + " shouldn't be called more than once", t.called = !1, t
    }
    var i = r(91);
    e.exports = i(n), e.exports.strict = i(o), n.proto = n(function() {
        Object.defineProperty(Function.prototype, "once", {
            value: function() {
                return n(this)
            },
            configurable: !0
        }), Object.defineProperty(Function.prototype, "onceStrict", {
            value: function() {
                return o(this)
            },
            configurable: !0
        })
    })
}, function(e, t) {
    e.exports = require("async@2.1.2")
}, function(e, t) {
    e.exports = require("auth0-log-extension-tools@1.3.6")
}, function(e, t) {
    e.exports = require("body-parser@1.12.4")
}, function(e, t) {
    e.exports = require("cookie-signature@1.0.6")
}, function(e, t) {
    e.exports = require("crypto")
}, function(e, t) {
    e.exports = require("ejs@2.3.1")
}, function(e, t) {
    e.exports = require("fs")
}, function(e, t) {
    e.exports = require("jsonwebtoken@7.1.9")
}, function(e, t) {
    e.exports = require("jwks-rsa@1.1.1")
}, function(e, t) {
    e.exports = require("lodash@3.10.1")
}, function(e, t) {
    e.exports = require("moment@2.10.3")
}, function(e, t) {
    e.exports = require("morgan@1.5.3")
}, function(e, t) {
    e.exports = require("tls")
}, function(e, t) {
    e.exports = require("url")
}, function(e, t) {
    e.exports = require("webtask-tools")
}, function(e, t) {
    e.exports = require("winston@1.0.0")
}, function(e, t) {
    e.exports = require("wrappy@1.0.1")
}]);
