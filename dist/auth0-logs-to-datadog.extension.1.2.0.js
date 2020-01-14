module.exports = function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.i = function(e) {
        return e
    }, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 56)
}([function(e, t) {
    e.exports = require("auth0-extension-tools@1.2.1")
}, function(e, t, n) {
    "use strict";
    e.exports = n(0).config()
}, function(e, t, n) {
    const r = n(45),
        o = n(14),
        i = n(38),
        s = n(44);
    e.exports.createServer = r.createServer, e.exports.urlHelpers = o, e.exports.middlewares = i, e.exports.routes = s
}, function(e, t) {
    e.exports = require("express@4.12.4")
}, function(e, t, n) {
    "use strict";
    var r = n(119);
    r.emitErrs = !0;
    var o = new r.Logger({
        transports: [new r.transports.Console({
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
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.JwksClient = void 0;
    var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        c = n(12),
        a = r(c),
        u = n(113),
        l = r(u),
        d = n(24),
        p = (r(d), n(25)),
        f = r(p),
        h = n(27),
        g = r(h),
        v = n(93),
        m = n(95);
    t.JwksClient = function() {
        function e(t) {
            var n = this;
            o(this, e), this.getSigningKey = function(e, t) {
                n.logger("Fetching signing key for '" + e + "'"), n.getSigningKeys(function(r, o) {
                    if (r) return t(r);
                    var i = o.find(function(t) {
                        return t.kid === e
                    });
                    return i ? t(null, i) : (n.logger("Unable to find a signing key that matches '" + e + "'"), t(new g.default("Unable to find a signing key that matches '" + e + "'")))
                })
            }, this.options = i({
                rateLimit: !1,
                cache: !1,
                strictSsl: !0
            }, t), this.logger = (0, a.default)("jwks"), this.options.rateLimit && (this.getSigningKey = (0, m.rateLimitSigningKey)(this, t)), this.options.cache && (this.getSigningKey = (0, m.cacheSigningKey)(this, t))
        }
        return s(e, [{
            key: "getKeys",
            value: function(e) {
                var t = this;
                this.logger("Fetching keys from '" + this.options.jwksUri + "'"), (0, l.default)({
                    json: !0,
                    uri: this.options.jwksUri,
                    strictSSL: this.options.strictSsl
                }, function(n, r) {
                    return n || r.statusCode < 200 || r.statusCode >= 300 ? (t.logger("Failure:", r && r.body || n), e(r ? new f.default(r.body && (r.body.message || r.body) || r.statusMessage || "Http Error " + r.statusCode) : n)) : (t.logger("Keys:", r.body.keys), e(null, r.body.keys))
                })
            }
        }, {
            key: "getSigningKeys",
            value: function(e) {
                var t = this;
                this.getKeys(function(n, r) {
                    if (n) return e(n);
                    if (!r || !r.length) return e(new f.default("The JWKS endpoint did not contain any keys"));
                    var o = r.filter(function(e) {
                        return "sig" === e.use && "RSA" === e.kty && e.kid && (e.x5c && e.x5c.length || e.n && e.e)
                    }).map(function(e) {
                        return e.x5c && e.x5c.length ? {
                            kid: e.kid,
                            nbf: e.nbf,
                            publicKey: (0, v.certToPEM)(e.x5c[0])
                        } : {
                            kid: e.kid,
                            nbf: e.nbf,
                            rsaPublicKey: (0, v.rsaPublicKeyToPEM)(e.n, e.e)
                        }
                    });
                    return o.length ? (t.logger("Signing Keys:", o), e(null, o)) : e(new f.default("The JWKS endpoint did not contain any signing keys"))
                })
            }
        }]), e
    }()
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.SigningKeyNotFoundError = t.JwksRateLimitError = t.JwksError = t.ArgumentError = void 0;
    var o = n(24),
        i = r(o),
        s = n(25),
        c = r(s),
        a = n(26),
        u = r(a),
        l = n(27),
        d = r(l);
    t.ArgumentError = i.default, t.JwksError = c.default, t.JwksRateLimitError = u.default, t.SigningKeyNotFoundError = d.default
}, function(e, t) {
    var n = e.exports = {
        version: "2.5.5"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    e.exports = !n(9)(function() {
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
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t) {
    e.exports = require("debug@2.2.0")
}, function(e, t) {
    e.exports = require("lodash@3.10.1")
}, function(e, t, n) {
    function r(e) {
        if (!e.container) return null;
        const t = e.container.replace(a, "\\$&"),
            n = e.jtn ? e.jtn.replace(a, "\\$&") : "";
        if (e.url_format === c) return new RegExp("^/api/run/" + t + "/(?:" + n + "/?)?");
        if (e.url_format === s) return new RegExp("^/" + t + "/(?:" + n + "/?)?");
        if (e.url_format === i) return new RegExp("^/(?:" + n + "/?)?");
        throw new Error("Unsupported webtask URL format.")
    }
    const o = n(116),
        i = 3,
        s = 2,
        c = 1,
        a = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        u = function(e, t) {
            var n = o.parse(e).pathname || "";
            return n = n.replace(t, "").replace(/^\/|\/$/g, ""), n.startsWith("/") || (n = "/" + n), n.endsWith("/") || (n += "/"), n
        };
    e.exports.getBasePath = function(e) {
        return u(e.originalUrl || "", e.path)
    }, e.exports.getBaseUrl = function(e, t) {
        var n = t;
        const r = o.parse(e.originalUrl || "").pathname || "";
        return o.format({
            protocol: n || "https",
            host: e.headers.host,
            pathname: r.replace(e.path, "").replace(/\/$/g, "")
        })
    }, e.exports.getWebtaskUrl = function(e) {
        const t = r(e.x_wt),
            n = e.url,
            i = e.url.replace(t, "/"),
            s = o.parse(i || "").pathname,
            c = o.parse(n || "").pathname || "";
        var a = o.format({
            protocol: "https",
            host: e.headers.host,
            pathname: c.replace(s, "").replace(/\/$/g, "")
        });
        return e.x_wt && (0 === a.indexOf("https://sandbox.it.auth0.com") ? a = a.replace("https://sandbox.it.auth0.com/api/run/" + e.x_wt.container + "/", "https://" + e.x_wt.container + ".us.webtask.io/") : 0 === a.indexOf("https://sandbox-eu.it.auth0.com") ? a = a.replace("https://sandbox-eu.it.auth0.com/api/run/" + e.x_wt.container + "/", "https://" + e.x_wt.container + ".eu.webtask.io/") : 0 === a.indexOf("https://sandbox-au.it.auth0.com") && (a = a.replace("https://sandbox-au.it.auth0.com/api/run/" + e.x_wt.container + "/", "https://" + e.x_wt.container + ".au.webtask.io/"))), a
    }
}, function(e, t, n) {
    function r(e) {
        if (null === e || void 0 === e) throw new c.ArgumentError("Must provide an options object");
        if (null === e.domain || void 0 === e.domain) throw new c.ArgumentError("Must provide a valid domain");
        if ("string" != typeof e.domain || 0 === e.domain.length) throw new c.ArgumentError("The provided domain is invalid: " + e.domain);
        if (null === e.clientId || void 0 === e.clientId) throw new c.ArgumentError("Must provide a valid clientId");
        if ("string" != typeof e.clientId || 0 === e.clientId.length) throw new c.ArgumentError("The provided clientId is invalid: " + e.clientId);
        if (null === e.clientSecret || void 0 === e.clientSecret) throw new c.ArgumentError("Must provide a valid clientSecret");
        if ("string" != typeof e.clientSecret || 0 === e.clientSecret.length) throw new c.ArgumentError("The provided clientSecret is invalid: " + e.clientSecret);
        this.options = e, this.tokenCache = e.tokenCache || {
            getToken: function() {
                return o.resolve()
            },
            setToken: function() {
                return o.resolve()
            }
        }
    }
    const o = n(30),
        i = n(33),
        s = n(112),
        c = n(0);
    r.prototype.getAccessToken = function() {
        var e = this;
        return new o(function(t, n) {
            i.post("https://" + e.options.domain + "/oauth/token").send({
                audience: "https://" + e.options.domain + "/api/v2/",
                client_id: e.options.clientId,
                client_secret: e.options.clientSecret,
                grant_type: "client_credentials"
            }).set("Accept", "application/json").end(function(r, o) {
                if (r && 401 === r.status) return n(new c.ManagementApiError("unauthorized", "Invalid credentials for " + e.options.clientId, r.status));
                if (r && o && o.body && o.body.error) return n(new c.ManagementApiError(o.body.error, o.body.error_description || o.body.error, r.status));
                if (r) return n(r);
                if (!o.ok || !o.body.access_token) return n(new c.ManagementApiError("unknown_error", "Unknown error from Management API or no access_token was provided: " + (o.text || o.status)));
                const i = new Date;
                return t({
                    token: o.body.access_token,
                    expiresAt: i.setSeconds(i.getSeconds() + o.body.expires_in)
                })
            })
        })
    }, r.prototype.getAccessTokenCached = function() {
        var e = this;
        return e.tokenCache.getToken().then(function(t) {
            if (t && t.token) {
                const n = (new Date).valueOf();
                if (t.expiresAt - n > 1e4) return t
            }
            return e.getAccessToken(e.options).then(function(t) {
                return e.tokenCache.setToken(t).then(function() {
                    return t
                })
            })
        })
    }, r.prototype.getLogs = function(e) {
        const t = this;
        return new o(function(n, r) {
            t.getAccessTokenCached(t.options, t.storage).then(function(o) {
                const a = s.stringify(e);
                i.get("https://" + t.options.domain + "/api/v2/logs?" + a).set("Authorization", "Bearer " + o.token).set("Content-Type", "application/json").end(function(e, o) {
                    if (e && 403 === e.status) {
                        const i = function() {
                            return r(new c.ManagementApiError(o.body.error, o.body.error_description || o.body.error, e.status))
                        };
                        t.tokenCache.setToken(null).then(i).catch(i)
                    }
                    return e && o && o.body && o.body.error ? r(new c.ManagementApiError(o.body.error, o.body.error_description || o.body.error, e.status)) : e ? r(e) : o.ok ? n({
                        logs: o.body,
                        limits: {
                            limit: o.headers["x-ratelimit-limit"],
                            remaining: o.headers["x-ratelimit-remaining"],
                            reset: o.headers["x-ratelimit-reset"]
                        }
                    }) : r(new c.ManagementApiError("unknown_error", "Unknown error from Management API: " + (o.text || o.status)))
                })
            })
        })
    }, e.exports = r
}, function(e, t) {
    const n = {
            success: "success",
            error: "error",
            warning: "warning"
        },
        r = {
            s: {
                name: "Success Login",
                icon: "icon-budicon-448",
                severity: n.success,
                level: 1
            },
            ssa: {
                name: "Success Silent Auth",
                icon: "icon-budicon-448",
                severity: n.success,
                level: 1
            },
            fsa: {
                name: "Failed Silent Auth",
                icon: "icon-budicon-448",
                severity: n.error,
                level: 3
            },
            seacft: {
                name: "Success Exchange",
                description: "Authorization Code for Access Token",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            feacft: {
                name: "Failed Exchange",
                description: "Authorization Code for Access Token",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            seccft: {
                name: "Success Exchange",
                description: "Client Credentials for Access Token",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            feccft: {
                name: "Failed Exchange",
                description: "Client Credentials for Access Token",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            sepft: {
                name: "Success Exchange",
                description: "Password for Access Token",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            fepft: {
                name: "Failed Exchange",
                description: "Password for Access Token",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            sertft: {
                name: "Success Exchange",
                description: "Refresh Token for Access Token",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            fertft: {
                name: "Failed Exchange",
                description: "Refresh Token for Access Token",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            seoobft: {
                name: "Success Exchange",
                description: "Password and OOB Challenge for Access Token",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            feoobft: {
                name: "Failed Exchange",
                description: "Password and OOB Challenge for Access Token",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            seotpft: {
                name: "Success Exchange",
                description: "Password and OTP Challenge for Access Token",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            feotpft: {
                name: "Failed Exchange",
                description: "Password and OTP Challenge for Access Token",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            sercft: {
                name: "Success Exchange",
                description: "Password and MFA Recovery code for Access Token",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            fercft: {
                name: "Failed Exchange",
                description: "Password and MFA Recovery code for Access Token",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            f: {
                name: "Failed Login",
                icon: "icon-budicon-448",
                severity: n.error,
                level: 3
            },
            w: {
                name: "Warning",
                icon: "icon-budicon-354",
                severity: n.warning,
                level: 2
            },
            depnote: {
                name: "Deprecation Notice",
                icon: "icon-budicon-354",
                severity: n.warning,
                level: 2
            },
            du: {
                name: "Deleted User",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            fu: {
                name: "Failed Login (invalid email/username)",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            fp: {
                name: "Failed Login (wrong password)",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            fc: {
                name: "Failed by Connector",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 3
            },
            fco: {
                name: "Failed by CORS",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 3
            },
            con: {
                name: "Connector Online",
                icon: "icon-budicon-143",
                severity: n.success,
                level: 1
            },
            coff: {
                name: "Connector Offline",
                icon: "icon-budicon-143",
                severity: n.error,
                level: 3
            },
            fcpro: {
                name: "Failed Connector Provisioning",
                icon: "icon-budicon-143",
                severity: n.error,
                level: 4
            },
            ss: {
                name: "Success Signup",
                icon: "icon-budicon-314",
                severity: n.success,
                level: 1
            },
            fs: {
                name: "Failed Signup",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            cs: {
                name: "Code Sent",
                icon: "icon-budicon-243",
                severity: n.success,
                level: 1
            },
            cls: {
                name: "Code/Link Sent",
                icon: "icon-budicon-781",
                severity: n.success,
                level: 1
            },
            sv: {
                name: "Success Verification Email",
                icon: "icon-budicon-781",
                severity: n.success,
                level: 1
            },
            fv: {
                name: "Failed Verification Email",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            scp: {
                name: "Success Change Password",
                icon: "icon-budicon-280",
                severity: n.success,
                level: 1
            },
            fcp: {
                name: "Failed Change Password",
                icon: "icon-budicon-266",
                severity: n.error,
                level: 3
            },
            scph: {
                name: "Success Post Change Password Hook",
                icon: "icon-budicon-280",
                severity: n.success,
                level: 1
            },
            fcph: {
                name: "Failed Post Change Password Hook",
                icon: "icon-budicon-266",
                severity: n.error,
                level: 3
            },
            sce: {
                name: "Success Change Email",
                icon: "icon-budicon-266",
                severity: n.success,
                level: 1
            },
            fce: {
                name: "Failed Change Email",
                icon: "icon-budicon-266",
                severity: n.error,
                level: 3
            },
            scu: {
                name: "Success Change Username",
                icon: "icon-budicon-266",
                severity: n.success,
                level: 1
            },
            fcu: {
                name: "Failed Change Username",
                icon: "icon-budicon-266",
                severity: n.error,
                level: 3
            },
            scpn: {
                name: "Success Change Phone Number",
                icon: "icon-budicon-266",
                severity: n.success,
                level: 1
            },
            fcpn: {
                name: "Failed Change Phone Number",
                icon: "icon-budicon-266",
                severity: n.error,
                level: 3
            },
            svr: {
                name: "Success Verification Email Request",
                icon: "icon-budicon-781",
                severity: n.success,
                level: 1
            },
            fvr: {
                name: "Failed Verification Email Request",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            scpr: {
                name: "Success Change Password Request",
                icon: "icon-budicon-280",
                severity: n.success,
                level: 1
            },
            fcpr: {
                name: "Failed Change Password Request",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            fn: {
                name: "Failed Sending Notification",
                icon: "icon-budicon-782",
                severity: n.error,
                level: 3
            },
            sapi: {
                name: "API Operation",
                icon: "icon-budicon-546",
                severity: n.success,
                level: 1,
                category: "api"
            },
            fapi: {
                name: "Failed API Operation",
                icon: "icon-budicon-546",
                severity: n.error,
                level: 3,
                category: "api"
            },
            limit_wc: {
                name: "Blocked Account",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 4
            },
            limit_mu: {
                name: "Blocked IP Address",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 4
            },
            limit_ui: {
                name: "Too Many Calls to /userinfo",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 4
            },
            api_limit: {
                name: "Rate Limit On API",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 4
            },
            limit_delegation: {
                name: "Too Many Calls to /delegation",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 4
            },
            sdu: {
                name: "Successful User Deletion",
                icon: "icon-budicon-312",
                severity: n.success,
                level: 1
            },
            fdu: {
                name: "Failed User Deletion",
                icon: "icon-budicon-311",
                severity: n.error,
                level: 3
            },
            admin_update_launch: {
                name: "Auth0 Update Launched",
                icon: "icon-budicon-774",
                severity: n.success,
                level: 1
            },
            sys_os_update_start: {
                name: "Auth0 OS Update Started",
                icon: "icon-budicon-661",
                severity: n.success,
                level: 1
            },
            sys_os_update_end: {
                name: "Auth0 OS Update Ended",
                icon: "icon-budicon-661",
                severity: n.success,
                level: 1
            },
            sys_update_start: {
                name: "Auth0 Update Started",
                icon: "icon-budicon-661",
                severity: n.success,
                level: 1
            },
            sys_update_end: {
                name: "Auth0 Update Ended",
                icon: "icon-budicon-661",
                severity: n.success,
                level: 1
            },
            slo: {
                name: "Success Logout",
                icon: "icon-budicon-449",
                severity: n.success,
                level: 1
            },
            flo: {
                name: "Failed Logout",
                icon: "icon-budicon-449",
                severity: n.error,
                level: 3
            },
            sd: {
                name: "Success Delegation",
                icon: "icon-budicon-456",
                severity: n.success,
                level: 1
            },
            fd: {
                name: "Failed Delegation",
                icon: "icon-budicon-456",
                severity: n.error,
                level: 3
            },
            gd_unenroll: {
                name: "Unenroll device account",
                icon: "icon-budicon-298",
                severity: n.success,
                level: 1
            },
            gd_update_device_account: {
                name: "Update device account",
                icon: "icon-budicon-257",
                severity: n.success,
                level: 1
            },
            gd_module_switch: {
                name: "Module switch",
                icon: "icon-budicon-329",
                severity: n.success,
                level: 1
            },
            gd_tenant_update: {
                name: "Guardian tenant update",
                icon: "icon-budicon-170",
                severity: n.success,
                level: 1
            },
            gd_start_auth: {
                name: "Second factor started",
                icon: "icon-budicon-285",
                severity: n.success,
                level: 1
            },
            gd_start_enroll: {
                name: "Enroll started",
                icon: "icon-budicon-299",
                severity: n.success,
                level: 1
            },
            gd_start_enroll_failed: {
                name: "MFA Enrollment start failed",
                icon: "icon-budicon-299",
                severity: n.error,
                level: 3
            },
            gd_user_delete: {
                name: "User delete",
                icon: "icon-budicon-298",
                severity: n.success,
                level: 1
            },
            gd_auth_succeed: {
                name: "OTP Auth suceed",
                icon: "icon-budicon-mfa-login-succeed",
                severity: n.success,
                level: 1
            },
            gd_auth_failed: {
                name: "OTP Auth failed",
                icon: "icon-budicon-mfa-login-failed",
                severity: n.error,
                level: 3
            },
            gd_send_pn: {
                name: "Push notification sent",
                icon: "icon-budicon-mfa-send-pn",
                severity: n.success,
                level: 1
            },
            gd_send_pn_failure: {
                name: "Error sending MFA Push Notification",
                icon: "icon-budicon-mfa-send-pn",
                severity: n.error,
                level: 3
            },
            gd_auth_rejected: {
                name: "OTP Auth rejected",
                icon: "icon-budicon-mfa-login-failed",
                severity: n.error,
                level: 3
            },
            gd_recovery_succeed: {
                name: "Recovery succeed",
                icon: "icon-budicon-mfa-recovery-succeed",
                severity: n.success,
                level: 1
            },
            gd_recovery_failed: {
                name: "Recovery failed",
                icon: "icon-budicon-mfa-recovery-failed",
                severity: n.error,
                level: 3
            },
            gd_send_sms: {
                name: "SMS Sent",
                icon: "icon-budicon-799",
                severity: n.success,
                level: 1
            },
            gd_send_sms_failure: {
                name: "Error sending MFA SMS",
                icon: "icon-budicon-799",
                severity: n.error,
                level: 3
            },
            gd_otp_rate_limit_exceed: {
                name: "Too many failures",
                icon: "icon-budicon-435",
                severity: n.warning,
                level: 2
            },
            gd_recovery_rate_limit_exceed: {
                name: "Too many failures",
                icon: "icon-budicon-435",
                severity: n.warning,
                level: 2
            },
            gd_enrollment_complete: {
                name: "Guardian enrollment complete",
                icon: "icon-budicon-299",
                severity: n.success,
                level: 1
            },
            fui: {
                name: "Users import",
                icon: "icon-budicon-299",
                severity: n.warning,
                level: 2
            },
            sui: {
                name: "Users import",
                icon: "icon-budicon-299",
                severity: n.success,
                level: 1
            },
            pwd_leak: {
                name: "Breached password",
                icon: "icon-budicon-313",
                severity: n.error,
                level: 3
            },
            fcoa: {
                name: "Failed cross origin authentication",
                icon: "icon-budicon-448",
                severity: n.error,
                level: 3
            },
            scoa: {
                name: "Success cross origin authentication",
                icon: "icon-budicon-448",
                severity: n.success,
                level: 1
            },
            ublkdu: {
                name: "Account unblocked",
                icon: "icon-budicon-313",
                severity: n.success,
                level: 1
            }
        };
    e.exports = r, e.exports.get = function(e) {
        return r[e] && r[e].name || "Unknown Log Type: " + e
    }
}, function(e, t, n) {
    function r(e) {
        if (null === e || void 0 === e) throw new s.ArgumentError("Must provide an options object");
        i.call(this, {
            objectMode: !0
        }), this.client = new c(e), this.options = e, this.remaining = 50, this.lastBatch = 0, this.previousCheckpoint = e.checkpointId || null, this.lastCheckpoint = e.checkpointId || null, this.status = {
            start: new Date,
            end: null,
            logsProcessed: 0
        }
    }
    const o = n(117),
        i = n(114).Readable,
        s = n(0),
        c = n(15);
    o.inherits(r, i), r.prototype.getQuery = function(e) {
        return e && e.length ? "type:" + e.join(" OR type:") : ""
    }, r.prototype.done = function() {
        this.status.end = new Date, this.push(null)
    }, r.prototype.next = function(e) {
        const t = this,
            n = t.options.types && t.options.types.length ? 100 : e;
        if (t.remaining < 1) t.status.warning = "Auth0 Management API rate limit reached.", t.done();
        else {
            const r = t.lastCheckpoint ? {
                take: n,
                from: t.lastCheckpoint
            } : {
                per_page: n,
                page: 0
            };
            r.q = t.getQuery(t.options.types), r.sort = "date:1", t.client.getLogs(r).then(function(n) {
                const r = n.logs;
                if (t.remaining = n.limits.remaining, r && r.length) {
                    var o = r;
                    t.options.types && t.options.types.length && (o = r.filter(function(e) {
                        return t.options.types.indexOf(e.type) >= 0
                    }).slice(0, e || 100)), o.length ? (t.lastCheckpoint = o[o.length - 1]._id, t.lastBatch += o.length, t.push({
                        logs: o,
                        limits: n.limits
                    })) : (t.lastCheckpoint = r[r.length - 1]._id, t.lastBatch += 0, t.push({
                        logs: [],
                        limits: n.limits
                    }))
                } else t.status.end = new Date, t.push(null);
                return r
            }).catch(function(e) {
                t.emit("error", e)
            })
        }
    }, r.prototype.batchSaved = function() {
        this.status.logsProcessed += this.lastBatch, this.previousCheckpoint = this.lastCheckpoint, this.lastBatch = 0
    }, r.prototype._read = function() {}, e.exports = r
}, function(e, t, n) {
    "use strict";
    var r = n(101);
    e.exports = function(e, t, n) {
        return function(o, i, s) {
            for (var c = arguments.length, a = Array(c > 3 ? c - 3 : 0), u = 3; u < c; u++) a[u - 3] = arguments[u];
            var l = r(s);
            return !0 === e || "function" == typeof e && e.apply(void 0, [o, i, l].concat(a)) ? t.apply(void 0, [o, i, l].concat(a)) : n ? n.apply(void 0, [o, i, l].concat(a)) : l()
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t, n) {
    var r = n(66);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t, n) {
    var r = n(21),
        o = n(19);
    e.exports = function(e) {
        return r(o(e))
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        Error.call(this, e), Error.captureStackTrace(this, this.constructor), this.name = "ArgumentError", this.message = e
    }
    r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        Error.call(this, e), Error.captureStackTrace(this, this.constructor), this.name = "JwksError", this.message = e
    }
    r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        Error.call(this, e), Error.captureStackTrace(this, this.constructor), this.name = "JwksRateLimitError", this.message = e
    }
    r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        Error.call(this, e), Error.captureStackTrace(this, this.constructor), this.name = "SigningKeyNotFoundError", this.message = e
    }
    r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        this.message = e
    }
    var o = n(98);
    r.prototype = new Error, r.prototype.name = "InvalidTokenError", e.exports = function(e, t) {
        if ("string" != typeof e) throw new r("Invalid token specified");
        t = t || {};
        var n = !0 === t.header ? 0 : 1;
        try {
            return JSON.parse(o(e.split(".")[n]))
        } catch (e) {
            throw new r("Invalid token specified: " + e.message)
        }
    }, e.exports.InvalidTokenError = r
}, function(e, t) {
    var n = function(e, t, n, r) {
        if (this.bucketSize = e, this.tokensPerInterval = t, "string" == typeof n) switch (n) {
            case "sec":
            case "second":
                this.interval = 1e3;
                break;
            case "min":
            case "minute":
                this.interval = 6e4;
                break;
            case "hr":
            case "hour":
                this.interval = 36e5;
                break;
            case "day":
                this.interval = 864e5
        } else this.interval = n;
        this.parentBucket = r, this.content = 0, this.lastDrip = +new Date
    };
    n.prototype = {
        bucketSize: 1,
        tokensPerInterval: 1,
        interval: 1e3,
        parentBucket: null,
        content: 0,
        lastDrip: 0,
        removeTokens: function(e, t) {
            function n() {
                var n = Math.ceil((e - r.content) * (r.interval / r.tokensPerInterval));
                return setTimeout(function() {
                    r.removeTokens(e, t)
                }, n), !1
            }
            var r = this;
            return this.bucketSize ? e > this.bucketSize ? (process.nextTick(t.bind(null, "Requested tokens " + e + " exceeds bucket size " + this.bucketSize, null)), !1) : (this.drip(), e > this.content ? n() : this.parentBucket ? this.parentBucket.removeTokens(e, function(o, i) {
                return o ? t(o, null) : e > r.content ? n() : (r.content -= e, void t(null, Math.min(i, r.content)))
            }) : (this.content -= e, process.nextTick(t.bind(null, null, this.content)), !0)) : (process.nextTick(t.bind(null, null, e, Number.POSITIVE_INFINITY)), !0)
        },
        tryRemoveTokens: function(e) {
            return !this.bucketSize || !(e > this.bucketSize) && (this.drip(), !(e > this.content) && (!(this.parentBucket && !this.parent.tryRemoveTokens(e)) && (this.content -= e, !0)))
        },
        drip: function() {
            if (!this.tokensPerInterval) return void(this.content = this.bucketSize);
            var e = +new Date,
                t = Math.max(e - this.lastDrip, 0);
            this.lastDrip = e;
            var n = t * (this.tokensPerInterval / this.interval);
            this.content = Math.min(this.content + n, this.bucketSize)
        }
    }, e.exports = n
}, function(e, t) {
    e.exports = require("bluebird@3.4.6")
}, function(e, t) {
    e.exports = require("express-jwt@3.1.0")
}, function(e, t) {
    e.exports = require("path")
}, function(e, t) {
    e.exports = require("superagent@1.2.0")
}, function(e, t, n) {
    "use strict";
    (function(t) {
        var r = n(32),
            o = n(110),
            i = n(3),
            s = n(103),
            c = n(0),
            a = n(2),
            u = n(54),
            l = n(55),
            d = n(52),
            p = n(4),
            f = n(1),
            h = n(51);
        e.exports = function(e, n) {
            f.setProvider(e);
            var g = n ? new c.WebtaskStorageContext(n, {
                    force: 1
                }) : new c.FileStorageContext(r.join(t, "./data.json"), {
                    mergeWrites: !0
                }),
                v = new i;
            v.use(o(":method :url :status :response-time ms - :res[content-length]", {
                stream: p.stream
            }));
            var m = function(e) {
                return function(t, n, r) {
                    return t.webtaskContext && t.webtaskContext.body ? (t.body = t.webtaskContext.body, r()) : e(t, n, r)
                }
            };
            return v.use(m(s.json())), v.use(m(s.urlencoded({
                extended: !1
            }))), v.use("/meta", l()), v.use("/.extensions", d()), v.use(h(g)), v.use(a.routes.dashboardAdmins({
                secret: f("EXTENSION_SECRET"),
                audience: "urn:logs-to-datadog",
                rta: f("AUTH0_RTA").replace("https://", ""),
                domain: f("AUTH0_DOMAIN"),
                baseUrl: f("PUBLIC_WT_URL") || f("WT_URL"),
                clientName: "Logs to DataDog",
                urlPrefix: "",
                sessionStorageKey: "logs-to-datadog:apiToken"
            })), v.use("/app", i.static(r.join(t, "../dist"))), v.use("/", u(g)), v.use(a.middlewares.errorHandler(p.error.bind(p))), v
        }
    }).call(t, "/")
}, function(e, t, n) {
    const r = n(28),
        o = n(31),
        i = n(0),
        s = n(18);
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
        return function(n, r, o) {
            t(n, r, function(t) {
                return t ? o(t) : e.onLoginSuccess ? e.onLoginSuccess(n, r, o) : o()
            })
        }
    }, e.exports.optional = function(t) {
        const n = e.exports(t);
        return s(function(e) {
            if (e && e.headers && e.headers.authorization && 0 === e.headers.authorization.indexOf("Bearer ")) try {
                const n = r(e.headers.authorization.split(" ")[1]);
                return n && n.iss === t.baseUrl
            } catch (e) {
                return !1
            }
            return !1
        }, n)
    }
}, function(e, t, n) {
    const r = n(28),
        o = n(31),
        i = n(89),
        s = n(0),
        c = n(18),
        a = n(0).UnauthorizedError;
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
                    return t(e instanceof i.SigningKeyNotFoundError ? new a("A token was provided with an invalid kid") : e)
                }
            }),
            audience: e.audience,
            issuer: "https://" + e.domain + "/",
            algorithms: ["RS256"],
            credentialsRequired: e && e.credentialsRequired || !0
        });
        return function(n, r, o) {
            t(n, r, function(t) {
                return t ? o(t) : e.onLoginSuccess ? e.onLoginSuccess(n, r, o) : o()
            })
        }
    }, e.exports.optional = function(t) {
        const n = e.exports(t);
        return c(function(e) {
            if (e && e.headers && e.headers.authorization && 0 === e.headers.authorization.indexOf("Bearer ")) try {
                const n = r(e.headers.authorization.split(" ")[1]);
                return n && n.iss === "https://" + t.domain + "/"
            } catch (e) {
                return !1
            }
            return !1
        }, n)
    }
}, function(e, t, n) {
    e.exports = function(e) {
        return function(t, n, r, o) {
            return e && e(t), t && t.status ? (r.status(t.status), r.json({
                error: t.code || t.name,
                message: t.message || t.name
            })) : (r.status(t.status || 500), r.json({
                error: "InternalServerError",
                message: t.message || t.name
            }))
        }
    }
}, function(e, t, n) {
    e.exports.authenticateAdmins = n(35), e.exports.authenticateUsers = n(36), e.exports.requireAuthentication = n(40), e.exports.errorHandler = n(37), e.exports.managementApiClient = n(39), e.exports.validateHookToken = n(41), e.exports.webtaskConfig = n(42)
}, function(e, t, n) {
    const r = n(0);
    e.exports = function(e) {
        return function(t, n, o) {
            const i = t,
                s = t.user && t.user.access_token && t.user.access_token.length,
                c = s ? {
                    domain: e.domain,
                    accessToken: t.user.access_token
                } : e;
            r.managementApi.getClient(c).then(function(e) {
                return i.auth0 = e, o(), null
            }).catch(function(e) {
                o(e)
            })
        }
    }
}, function(e, t, n) {
    const r = n(0).UnauthorizedError;
    e.exports = function(e, t, n) {
        return e.user ? n() : n(new r("Authentication required for this endpoint."))
    }
}, function(e, t, n) {
    const r = n(0);
    e.exports = function(e, t, n) {
        if (null === e || void 0 === e) throw new r.ArgumentError("Must provide the domain");
        if ("string" != typeof e || 0 === e.length) throw new r.ArgumentError("The provided domain is invalid: " + e);
        if (null === t || void 0 === t) throw new r.ArgumentError("Must provide the webtaskUrl");
        if ("string" != typeof t || 0 === t.length) throw new r.ArgumentError("The provided webtaskUrl is invalid: " + t);
        if (null === n || void 0 === n) throw new r.ArgumentError("Must provide the extensionSecret");
        if ("string" != typeof n || 0 === n.length) throw new r.ArgumentError("The provided extensionSecret is invalid: " + n);
        return function(o) {
            if (null === o || void 0 === o) throw new r.ArgumentError("Must provide the hookPath");
            if ("string" != typeof o || 0 === o.length) throw new r.ArgumentError("The provided hookPath is invalid: " + o);
            return function(i, s, c) {
                if (i.headers.authorization && "Bearer" === i.headers.authorization.split(" ")[0]) {
                    const a = i.headers.authorization.split(" ")[1];
                    try {
                        if (r.validateHookToken(e, t, o, n, a)) return c()
                    } catch (e) {
                        return c(e)
                    }
                }
                return c(new r.HookTokenError("Hook token missing for the call to: " + o))
            }
        }
    }
}, function(e, t, n) {
    const r = n(0);
    e.exports = function(e) {
        return function(t, n, o) {
            return t.webtaskContext && e.setProvider(r.configProvider.fromWebtaskContext(t.webtaskContext)), o()
        }
    }
}, function(e, t, n) {
    const r = n(3),
        o = n(105),
        i = n(59),
        s = n(0),
        c = n(14);
    e.exports = function(e) {
        if (!e || "object" != typeof e) throw new s.ArgumentError("Must provide the options");
        if (null === e.secret || void 0 === e.secret) throw new s.ArgumentError("Must provide a valid secret");
        if ("string" != typeof e.secret || 0 === e.secret.length) throw new s.ArgumentError("The provided secret is invalid: " + e.secret);
        if (null === e.audience || void 0 === e.audience) throw new s.ArgumentError("Must provide a valid secret");
        if ("string" != typeof e.audience || 0 === e.audience.length) throw new s.ArgumentError("The provided audience is invalid: " + e.audience);
        if (null === e.rta || void 0 === e.rta) throw new s.ArgumentError("Must provide a valid rta");
        if ("string" != typeof e.rta || 0 === e.rta.length) throw new s.ArgumentError("The provided rta is invalid: " + e.rta);
        if (null === e.domain || void 0 === e.domain) throw new s.ArgumentError("Must provide a valid domain");
        if ("string" != typeof e.domain || 0 === e.domain.length) throw new s.ArgumentError("The provided domain is invalid: " + e.domain);
        if (null === e.baseUrl || void 0 === e.baseUrl) throw new s.ArgumentError("Must provide a valid base URL");
        if ("string" != typeof e.baseUrl || 0 === e.baseUrl.length) throw new s.ArgumentError("The provided base URL is invalid: " + e.baseUrl);
        if (null === e.clientName || void 0 === e.clientName) throw new s.ArgumentError("Must provide a valid client name");
        if ("string" != typeof e.clientName || 0 === e.clientName.length) throw new s.ArgumentError("The provided client name is invalid: " + e.clientName);
        const t = e.stateKey || "state",
            n = e.urlPrefix || "",
            a = e.sessionStorageKey || "apiToken",
            u = r.Router();
        return u.get(n + "/login", function(r, i) {
            const a = o.randomBytes(16).toString("hex");
            i.cookie(t, a);
            const u = new s.SessionManager(e.rta, e.domain, e.baseUrl),
                l = u.createAuthorizeUrl({
                    redirectUri: c.getBaseUrl(r) + n + "/login/callback",
                    scopes: e.scopes,
                    expiration: e.expiration
                });
            i.redirect(l + "&state=" + a)
        }), u.post(n + "/login/callback", i(), function(n, r, o) {
            return n.cookies && n.cookies[t] === n.body.state ? new s.SessionManager(e.rta, e.domain, e.baseUrl).create(n.body.id_token, n.body.access_token, {
                secret: e.secret,
                issuer: e.baseUrl,
                audience: e.audience
            }).then(function(e) {
                r.header("Content-Type", "text/html"), r.status(200).send('<html><head><script type="text/javascript">sessionStorage.setItem("' + a + '", "' + e + '");window.location.href = "' + c.getBaseUrl(n) + '";<\/script></head></html>')
            }).catch(function(e) {
                o(e)
            }) : o(new s.ValidationError("Login failed. State mismatch."))
        }), u.get(n + "/logout", function(t, n) {
            const r = encodeURIComponent(c.getBaseUrl(t));
            n.header("Content-Type", "text/html"), n.status(200).send('<html><head><script type="text/javascript">sessionStorage.removeItem("' + a + '");window.location.href = "https://' + e.rta + "/v2/logout/?returnTo=" + r + "&client_id=" + r + '";<\/script></head></html>')
        }), u.get("/.well-known/oauth2-client-configuration", function(t, r) {
            r.header("Content-Type", "application/json"), r.status(200).send({
                redirect_uris: [c.getBaseUrl(t) + n + "/login/callback"],
                client_name: e.clientName,
                post_logout_redirect_uris: [c.getBaseUrl(t)]
            })
        }), u
    }
}, function(e, t, n) {
    e.exports.dashboardAdmins = n(43)
}, function(e, t, n) {
    const r = n(0),
        o = n(118);
    e.exports.createServer = function(e) {
        const t = r.createServer(e);
        var n = null;
        return o.fromExpress(function(e, r) {
            return n || (n = t(e.webtaskContext)), n(e, r)
        })
    }
}, function(e, t, n) {
    const r = n(48);
    e.exports.LogsProcessor = n(47), e.exports.LogsApiClient = n(15), e.exports.LogsApiStream = n(17), e.exports.logTypes = n(16), e.exports.reporters = {
        SlackReporter: r
    }
}, function(e, t, n) {
    function r(e, t) {
        if (null === t || void 0 === t) throw new i.ArgumentError("Must provide an options object");
        this.storage = new a(e), this.options = o.assign({}, {
            batchSize: 100,
            maxRetries: 5,
            maxRunTimeSeconds: 20
        }, t)
    }
    const o = n(13),
        i = n(0),
        s = n(16),
        c = n(17),
        a = n(49);
    r.prototype.hasTimeLeft = function(e) {
        const t = (new Date).getTime();
        return e + 1e3 * this.options.maxRunTimeSeconds >= t
    }, r.prototype.getLogFilter = function(e) {
        var t = e.logTypes || [];
        if (e.logLevel) {
            const n = o.map(s, function(e, t) {
                const n = e;
                return n.type = t, n
            });
            t = t.concat(o.map(o.filter(n, function(t) {
                return t.level >= e.logLevel
            }), "type"))
        }
        return o.uniq(t)
    }, r.prototype.getReport = function(e, t) {
        const n = new Date(e).getTime(),
            r = t ? new Date(t).getTime() : (new Date).getTime();
        return this.storage.read().then(function(e) {
            return o.filter(e.logs, function(e) {
                const t = new Date(e.start).getTime(),
                    o = new Date(e.end).getTime();
                return t >= n && o <= r
            })
        }).then(function(e) {
            const t = {
                type: "report",
                processed: 0,
                warnings: 0,
                errors: 0,
                checkpoint: ""
            };
            return o.each(e, function(e) {
                t.processed += e.logsProcessed, t.checkpoint = e.checkpoint, e.error && (t.errors += 1), e.warning && (t.warnings += 1)
            }), t
        })
    }, r.prototype.createStream = function(e) {
        const t = this;
        return t.storage.getCheckpoint(e.startFrom).then(function(n) {
            return e.logger && e.logger.debug("Starting logs processor from checkpoint:", n), new c({
                checkpointId: n,
                types: t.getLogFilter(e),
                domain: e.domain,
                clientId: e.clientId,
                clientSecret: e.clientSecret,
                tokenCache: t.storage
            })
        })
    }, r.prototype.run = function(e) {
        const t = this;
        return new Promise(function(n, r) {
            const o = (new Date).getTime();
            var i = 0,
                s = 0,
                c = [];
            const a = t.storage,
                u = t.options,
                l = u.batchSize,
                d = u.maxRetries,
                p = function(e, t, o) {
                    u.logger && u.logger.debug("Processor failed:", e), t.error = e, a.done(t, o).then(function() {
                        return n({
                            status: t,
                            checkpoint: o
                        })
                    }).catch(r)
                },
                f = function(e, t) {
                    if (u.logger && u.logger.debug("Processor run complete. Logs processed:", e.logsProcessed), e.logsProcessed > 0) {
                        return (new Date).getTime() - s >= 6048e5 && (e.warning = "Logs are outdated more than for week. Last processed log has date is " + new Date(s)), a.done(e, t).then(function() {
                            return n({
                                status: e,
                                checkpoint: t
                            })
                        }).catch(r)
                    }
                    return n({
                        status: e,
                        checkpoint: t
                    })
                },
                h = function() {
                    var e = l;
                    return e -= c.length, e > 100 && (e = 100), e
                },
                g = function(n, r, s) {
                    if (!t.hasTimeLeft(o)) return p(n, r.status, r.previousCheckpoint);
                    if (i < d) return i += 1, e(c, s);
                    const a = [n, "Skipping logs from " + r.previousCheckpoint + " to " + r.lastCheckpoint + " after " + d + " retries."];
                    return u.logger && u.logger.error(a[0], a[1]), p(a, r.status, r.lastCheckpoint)
                };
            t.createStream(u).then(function(n) {
                const r = h();
                u.logger && u.logger.debug("Loading next batch of logs. Next limit:", r), n.next(r), n.on("data", function(r) {
                    const i = r.logs;
                    if (c = c.concat(i), i && i.length && (s = new Date(i[i.length - 1].date).getTime()), c.length < l && t.hasTimeLeft(o)) return n.next(h());
                    const a = function(e) {
                        return e ? g(e, n, a) : (c = [], t.hasTimeLeft(o) ? (n.batchSaved(), n.next(h())) : n.done())
                    };
                    return e(c, a)
                }), n.on("end", function() {
                    const t = function(e) {
                        return e ? g(e, n, t) : (n.batchSaved(), f(n.status, n.lastCheckpoint))
                    };
                    e(c, t)
                }), n.on("error", function(e) {
                    p(e, n.status, n.previousCheckpoint)
                })
            }).catch(r)
        })
    }, e.exports = r
}, function(e, t, n) {
    function r(e) {
        this.options = e || {}
    }
    const o = n(30),
        i = n(33);
    r.prototype.send = function(e, t) {
        if (!e || "object" != typeof e) throw new Error("object status is required");
        const n = this.options,
            r = this.createMessage(this.options, e, t);
        return new o(function(e, t) {
            return n.hook ? i.post(n.hook).send(r).set("Accept", "application/json").end(function(n) {
                return n ? t(n) : e()
            }) : e()
        })
    }, r.prototype.createMessage = function(e, t, n) {
        const r = {
                username: e.username || "auth0-logger",
                icon_emoji: e.icon || ":rocket:",
                attachments: []
            },
            o = e.title || "Auth0 Logger",
            i = "report" === t.type ? o + " Daily Report" : t.error ? o + " Error" : o + " Success",
            s = t.error || null,
            c = {
                fallback: e.fallback || i,
                text: e.text || i,
                error_field: {
                    title: "Error",
                    value: JSON.stringify(s),
                    short: !1
                }
            };
        "report" === t.type ? c.fields = [{
            title: "Logs processed",
            value: t.processed,
            short: !0
        }, {
            title: "Warnings",
            value: t.warnings,
            short: !0
        }, {
            title: "Errors",
            value: t.errors,
            short: !0
        }, {
            title: "Next checkpoint",
            value: t.checkpoint,
            short: !0
        }] : c.fields = [{
            title: "Start time",
            value: t.start,
            short: !0
        }, {
            title: "End time",
            value: t.end,
            short: !0
        }, {
            title: "Logs processed",
            value: t.logsProcessed,
            short: !0
        }, {
            title: "Next checkpoint",
            value: n,
            short: !0
        }];
        const a = e.url ? " (<" + e.url + "|Details>)" : null,
            u = c.fields;
        return t.error && u.push(c.error_field), r.attachments.push({
            color: t.error ? "#d13f42" : "#7cd197",
            fallback: c.fallback,
            text: c.fallback + (a || ""),
            fields: u
        }), r
    }, e.exports = r
}, function(e, t, n) {
    function r(e, t) {
        if (!e) throw new i("The storageContext is required");
        this.storageContext = e, this.options = o({}, {
            limit: 400
        }, t)
    }
    const o = n(13).assign,
        i = n(0).ArgumentError;
    r.prototype.read = function() {
        return this.storageContext.read().then(function(e) {
            const t = e || {};
            return t.logs = t.logs || [], t
        })
    }, r.prototype.write = function(e) {
        return this.storageContext.write(e)
    }, r.prototype.getCheckpoint = function(e) {
        const t = this;
        return t.read().then(function(n) {
            return e && e !== n.startFrom ? (n.startFrom = e, n.checkpointId = e, t.write(n).then(function() {
                return n.checkpointId || e || null
            })) : n.checkpointId
        })
    }, r.prototype.getToken = function() {
        return this.read().then(function(e) {
            return e.logs_access_token || null
        })
    }, r.prototype.setToken = function(e) {
        const t = this;
        return t.read().then(function(n) {
            return n.logs_access_token = e, t.write(n)
        })
    }, r.prototype.done = function(e, t) {
        const n = this;
        return n.read().then(function(r) {
            return Buffer.byteLength(JSON.stringify(r), "utf8") >= 1024 * n.options.limit && r.logs && r.logs.length && r.logs.splice(0, 5), e.checkpoint = t, r.logs.push(e), r.checkpointId = t, n.write(r)
        })
    }, e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e, t) {
        if (!e) throw new Error("API Key is required for DataDog.");
        if (l.apiKey = e, t) {
            var n = t.match(/([^:|^,\W]+):([^,|^\W]+)/g);
            if (!n || n.length < 1) throw new Error("Custom tags are not formatted properly. Format is comma-separated key:value.");
            d.ddtags = t
        }
    }
    var i = n(57),
        s = r(i),
        c = n(58),
        a = r(c),
        u = n(115),
        l = {
            host: "http-intake.logs.datadoghq.com",
            port: 10516
        },
        d = {
            ddsourcecategory: "external",
            ddsource: "auth0"
        };
    o.prototype.log = function(e, t) {
        var n = u.connect(l.port, l.host, function() {
            if (!n.authorized) return t("Error connecting to DataDog");
            var r = (0, a.default)(d, e);
            return n.write(l.apiKey + " " + (0, s.default)(r) + "\r\n"), n.end(), t()
        })
    }, e.exports = o
}, function(e, t, n) {
    "use strict";
    var r = n(102),
        o = n(109),
        i = n(46),
        s = n(1),
        c = n(4),
        a = n(50);
    e.exports = function(e) {
        return function(t, n, u) {
            var l = t.webtaskContext && t.webtaskContext.body || t.body || {},
                d = t.webtaskContext && t.webtaskContext.headers || {};
            if (!(l.schedule && "active" === l.state || d.referer === s("AUTH0_MANAGE_URL") + "/" && d["if-none-match"])) return u();
            var p = new a(s("DATADOG_API_KEY"), s("DATADOG_CUSTOM_TAGS")),
                f = function(e, t) {
                    if (!e || !e.length) return t();
                    c.info("Sending " + e.length + " logs to DataDog."), r.eachLimit(e, 10, function(e, t) {
                        p.log(e, t)
                    }, function(e) {
                        return e ? (c.error("Error occurred when sending logs to DataDog", e), t(e)) : (c.info("Upload complete."), t())
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
                    var n = new Date,
                        r = n.getTime(),
                        o = r - 864e5;
                    v.getReport(o, r).then(function(e) {
                        return h.send(e, e.checkpoint)
                    }).then(function() {
                        return e.read()
                    }).then(function(n) {
                        return n.lastReportDate = t, e.write(n)
                    })
                },
                y = function() {
                    e.read().then(function(e) {
                        var t = o().format("DD-MM-YYYY"),
                            n = s("DAILY_REPORT_TIME") || 16;
                        e.lastReportDate !== t && (new Date).getHours() >= n && m(t)
                    })
                };
            return v.run(f).then(function(e) {
                e && e.status && e.status.error ? h.send(e.status, e.checkpoint) : !0 !== s("SLACK_SEND_SUCCESS") && "true" !== s("SLACK_SEND_SUCCESS") || h.send(e.status, e.checkpoint), y(), n.json(e)
            }).catch(function(e) {
                h.send({
                    error: e,
                    logsProcessed: 0
                }, null), y(), u(e)
            })
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3).Router,
        o = n(2).middlewares,
        i = n(1),
        s = n(4);
    e.exports = function() {
        var e = r(),
            t = o.validateHookToken(i("AUTH0_DOMAIN"), i("WT_URL"), i("EXTENSION_SECRET"));
        return e.use("/on-uninstall", t("/.extensions/on-uninstall")), e.use(o.managementApiClient({
            domain: i("AUTH0_DOMAIN"),
            clientId: i("AUTH0_CLIENT_ID"),
            clientSecret: i("AUTH0_CLIENT_SECRET")
        })), e.delete("/on-uninstall", function(e, t) {
            var n = i("AUTH0_CLIENT_ID");
            e.auth0.clients.delete({
                client_id: n
            }).then(function() {
                s.debug("Deleted client " + n), t.sendStatus(204)
            }).catch(function(e) {
                s.debug("Error deleting client: " + i("AUTH0_CLIENT_ID")), s.error(e), t.sendStatus(204)
            })
        }), e
    }
}, function(e, t, n) {
    "use strict";
    (function(t) {
        var r = (n(107), n(106)),
            o = (n(32), n(2).urlHelpers),
            i = n(1);
        e.exports = function() {
            var e = '\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <title><%= config.TITLE %></title>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n    <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n    <% if (assets.version) { %>\n    \x3c!-- TODO: Replace this with your own URL for hosting the assets --\x3e\n    <link rel="stylesheet" type="text/css" href="https://config.dev.astoapp.co.uk/assets/auth0/auth0-logs-to-datadog.ui.<%= assets.version %>.css" />\n    <% } %>\n    <% if (assets.customCss) { %><link rel="stylesheet" type="text/css" href="<%= assets.customCss %>" /><% } %>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="text/javascript" src="//cdn.auth0.com/w2/auth0-7.0.4.min.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n    <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n    <% if (assets.vendors) { %><script type="text/javascript" src="/app/<%= assets.vendors %>"><\/script><% } %>\n    <% if (assets.app) { %><script type="text/javascript" src="/app/<%= assets.app %>"><\/script><% } %>\n    <% if (assets.version) { %>\n    \x3c!-- TODO: Replace this with your own URL for hosting the assets --\x3e\n    <script type="text/javascript" src="https://config.dev.astoapp.co.uk/assets/auth0/auth0-logs-to-datadog.ui.vendors.<%= assets.version %>.js"><\/script>\n    <script type="text/javascript" src="https://config.dev.astoapp.co.uk/assets/auth0/auth0-logs-to-datadog.ui.<%= assets.version %>.js"><\/script>\n    <% } %>\n  </body>\n  </html>\n  ';
            return function(t, n, s) {
                if (0 === t.url.indexOf("/api")) return s();
                var c = {
                    AUTH0_DOMAIN: i("AUTH0_DOMAIN"),
                    AUTH0_CLIENT_ID: i("EXTENSION_CLIENT_ID"),
                    AUTH0_MANAGE_URL: i("AUTH0_MANAGE_URL") || "https://manage.auth0.com",
                    BASE_URL: o.getBaseUrl(t),
                    BASE_PATH: o.getBasePath(t),
                    TITLE: i("TITLE")
                };
                return n.send(r.render(e, {
                    config: c,
                    assets: {
                        customCss: i("CUSTOM_CSS"),
                        version: "1.2.0"
                    }
                }))
            }
        }
    }).call(t, "/")
}, function(e, t, n) {
    "use strict";
    var r = n(13),
        o = n(3).Router,
        i = n(2).middlewares,
        s = n(1),
        c = n(53);
    e.exports = function(e) {
        var t = o(),
            n = i.authenticateAdmins({
                credentialsRequired: !0,
                secret: s("EXTENSION_SECRET"),
                audience: "urn:logs-to-datadog",
                baseUrl: s("PUBLIC_WT_URL") || s("WT_URL"),
                onLoginSuccess: function(e, t, n) {
                    return n()
                }
            }),
            a = i.managementApiClient({
                domain: s("AUTH0_DOMAIN"),
                clientId: s("AUTH0_CLIENT_ID"),
                clientSecret: s("AUTH0_CLIENT_SECRET")
            });
        return t.get("/", a, c()), t.get("/api/report", n, function(t, n, o) {
            return e.read().then(function(e) {
                var o = e && e.logs ? r.sortByOrder(e.logs, "start", "desc") : [],
                    i = t.query.filter && "errors" === t.query.filter ? r.filter(o, function(e) {
                        return !!e.error
                    }) : o,
                    s = t.query.page && parseInt(t.query.page, 10) ? parseInt(t.query.page, 10) - 1 : 0,
                    c = t.query.per_page && parseInt(t.query.per_page, 10) || 10,
                    a = c * s;
                return n.json({
                    logs: i.slice(a, a + c),
                    total: i.length
                })
            }).catch(o)
        }), t
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(88);
    e.exports = function() {
        var e = r.Router();
        return e.get("/", function(e, t) {
            t.status(200).send(o)
        }), e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(2),
        o = n(34),
        i = n(1),
        s = n(4),
        c = r.createServer(function(e, t) {
            return s.info("Starting Auth0 Logs to DataDog Extension - Version: ", "1.2.0"), o(e, t)
        });
    e.exports = function(e, t, n) {
        i.setValue("PUBLIC_WT_URL", r.urlHelpers.getWebtaskUrl(t)), c(e, t, n)
    }
}, function(e, t, n) {
    e.exports = {
        default: n(61),
        __esModule: !0
    }
}, function(e, t, n) {
    e.exports = {
        default: n(62),
        __esModule: !0
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return function(n, r, o) {
            if (n.cookies) return o();
            var s = n.headers.cookie,
                u = !e || Array.isArray(e) ? e || [] : [e];
            if (n.secret = u[0], n.cookies = Object.create(null), n.signedCookies = Object.create(null), !s) return o();
            n.cookies = a.parse(s, t), 0 !== u.length && (n.signedCookies = c(n.cookies, u), n.signedCookies = i(n.signedCookies)), n.cookies = i(n.cookies), o()
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
        for (var t, n, r = Object.keys(e), i = 0; i < r.length; i++) t = r[i], (n = o(e[t])) && (e[t] = n);
        return e
    }

    function s(e, t) {
        if ("string" == typeof e) {
            if ("s:" !== e.substr(0, 2)) return e;
            for (var n = !t || Array.isArray(t) ? t || [] : [t], r = 0; r < n.length; r++) {
                var o = u.unsign(e.slice(2), n[r]);
                if (!1 !== o) return o
            }
            return !1
        }
    }

    function c(e, t) {
        for (var n, r, o, i = Object.keys(e), c = Object.create(null), a = 0; a < i.length; a++) r = i[a], o = e[r], n = s(o, t), o !== n && (c[r] = n, delete e[r]);
        return c
    }
    var a = n(60),
        u = n(104);
    e.exports = r, e.exports.JSONCookie = o, e.exports.JSONCookies = i, e.exports.signedCookie = s, e.exports.signedCookies = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ("string" != typeof e) throw new TypeError("argument str must be a string");
        for (var n = {}, r = t || {}, o = e.split(a), c = r.decode || s, u = 0; u < o.length; u++) {
            var l = o[u],
                d = l.indexOf("=");
            if (!(d < 0)) {
                var p = l.substr(0, d).trim(),
                    f = l.substr(++d, l.length).trim();
                '"' == f[0] && (f = f.slice(1, -1)), void 0 == n[p] && (n[p] = i(f, c))
            }
        }
        return n
    }

    function o(e, t, n) {
        var r = n || {},
            o = r.encode || c;
        if ("function" != typeof o) throw new TypeError("option encode is invalid");
        if (!u.test(e)) throw new TypeError("argument name is invalid");
        var i = o(t);
        if (i && !u.test(i)) throw new TypeError("argument val is invalid");
        var s = e + "=" + i;
        if (null != r.maxAge) {
            var a = r.maxAge - 0;
            if (isNaN(a)) throw new Error("maxAge should be a Number");
            s += "; Max-Age=" + Math.floor(a)
        }
        if (r.domain) {
            if (!u.test(r.domain)) throw new TypeError("option domain is invalid");
            s += "; Domain=" + r.domain
        }
        if (r.path) {
            if (!u.test(r.path)) throw new TypeError("option path is invalid");
            s += "; Path=" + r.path
        }
        if (r.expires) {
            if ("function" != typeof r.expires.toUTCString) throw new TypeError("option expires is invalid");
            s += "; Expires=" + r.expires.toUTCString()
        }
        if (r.httpOnly && (s += "; HttpOnly"), r.secure && (s += "; Secure"), r.sameSite) {
            switch ("string" == typeof r.sameSite ? r.sameSite.toLowerCase() : r.sameSite) {
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
    t.parse = r, t.serialize = o;
    var s = decodeURIComponent,
        c = encodeURIComponent,
        a = /; */,
        u = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
}, function(e, t, n) {
    var r = n(7),
        o = r.JSON || (r.JSON = {
            stringify: JSON.stringify
        });
    e.exports = function(e) {
        return o.stringify.apply(o, arguments)
    }
}, function(e, t, n) {
    n(87), e.exports = n(7).Object.assign
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    var r = n(11);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, n) {
    var r = n(23),
        o = n(83),
        i = n(82);
    e.exports = function(e) {
        return function(t, n, s) {
            var c, a = r(t),
                u = o(a.length),
                l = i(s, u);
            if (e && n != n) {
                for (; u > l;)
                    if ((c = a[l++]) != c) return !0
            } else
                for (; u > l; l++)
                    if ((e || l in a) && a[l] === n) return e || l || 0;
            return !e && -1
        }
    }
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    var r = n(63);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, o) {
                    return e.call(t, n, r, o)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t, n) {
    var r = n(11),
        o = n(10).document,
        i = r(o) && r(o.createElement);
    e.exports = function(e) {
        return i ? o.createElement(e) : {}
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    var r = n(10),
        o = n(7),
        i = n(67),
        s = n(71),
        c = n(20),
        a = function(e, t, n) {
            var u, l, d, p = e & a.F,
                f = e & a.G,
                h = e & a.S,
                g = e & a.P,
                v = e & a.B,
                m = e & a.W,
                y = f ? o : o[t] || (o[t] = {}),
                w = y.prototype,
                x = f ? r : h ? r[t] : (r[t] || {}).prototype;
            f && (n = t);
            for (u in n)(l = !p && x && void 0 !== x[u]) && c(y, u) || (d = l ? x[u] : n[u], y[u] = f && "function" != typeof x[u] ? n[u] : v && l ? i(d, r) : m && x[u] == d ? function(e) {
                var t = function(t, n, r) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, n)
                        }
                        return new e(t, n, r)
                    }
                    return e.apply(this, arguments)
                };
                return t.prototype = e.prototype, t
            }(d) : g && "function" == typeof d ? i(Function.call, d) : d, g && ((y.virtual || (y.virtual = {}))[u] = d, e & a.R && w && !w[u] && s(w, u, d)))
        };
    a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, e.exports = a
}, function(e, t, n) {
    var r = n(74),
        o = n(79);
    e.exports = n(8) ? function(e, t, n) {
        return r.f(e, t, o(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t, n) {
    e.exports = !n(8) && !n(9)(function() {
        return 7 != Object.defineProperty(n(68)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, n) {
    "use strict";
    var r = n(77),
        o = n(75),
        i = n(78),
        s = n(84),
        c = n(21),
        a = Object.assign;
    e.exports = !a || n(9)(function() {
        var e = {},
            t = {},
            n = Symbol(),
            r = "abcdefghijklmnopqrst";
        return e[n] = 7, r.split("").forEach(function(e) {
            t[e] = e
        }), 7 != a({}, e)[n] || Object.keys(a({}, t)).join("") != r
    }) ? function(e, t) {
        for (var n = s(e), a = arguments.length, u = 1, l = o.f, d = i.f; a > u;)
            for (var p, f = c(arguments[u++]), h = l ? r(f).concat(l(f)) : r(f), g = h.length, v = 0; g > v;) d.call(f, p = h[v++]) && (n[p] = f[p]);
        return n
    } : a
}, function(e, t, n) {
    var r = n(64),
        o = n(72),
        i = n(85),
        s = Object.defineProperty;
    t.f = n(8) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), o) try {
            return s(e, t, n)
        } catch (e) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, function(e, t) {
    t.f = Object.getOwnPropertySymbols
}, function(e, t, n) {
    var r = n(20),
        o = n(23),
        i = n(65)(!1),
        s = n(80)("IE_PROTO");
    e.exports = function(e, t) {
        var n, c = o(e),
            a = 0,
            u = [];
        for (n in c) n != s && r(c, n) && u.push(n);
        for (; t.length > a;) r(c, n = t[a++]) && (~i(u, n) || u.push(n));
        return u
    }
}, function(e, t, n) {
    var r = n(76),
        o = n(69);
    e.exports = Object.keys || function(e) {
        return r(e, o)
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
}, function(e, t, n) {
    var r = n(81)("keys"),
        o = n(86);
    e.exports = function(e) {
        return r[e] || (r[e] = o(e))
    }
}, function(e, t, n) {
    var r = n(10),
        o = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
    e.exports = function(e) {
        return o[e] || (o[e] = {})
    }
}, function(e, t, n) {
    var r = n(22),
        o = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        return e = r(e), e < 0 ? o(e + t, 0) : i(e, t)
    }
}, function(e, t, n) {
    var r = n(22),
        o = Math.min;
    e.exports = function(e) {
        return e > 0 ? o(r(e), 9007199254740991) : 0
    }
}, function(e, t, n) {
    var r = n(19);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    var r = n(11);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, o;
        if (t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        if ("function" == typeof(n = e.valueOf) && !r(o = n.call(e))) return o;
        if (!t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, function(e, t, n) {
    var r = n(70);
    r(r.S + r.F, "Object", {
        assign: n(73)
    })
}, function(e, t) {
    e.exports = {
        title: "Auth0 logs to DataDog",
        name: "auth0-logs-to-datadog",
        version: "1.2.0",
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
}, function(e, t, n) {
    "use strict";
    var r = n(5),
        o = n(6),
        i = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        }(o),
        s = n(91),
        c = n(90),
        a = n(92);
    e.exports = function(e) {
        return new r.JwksClient(e)
    }, e.exports.ArgumentError = i.ArgumentError, e.exports.JwksError = i.JwksError, e.exports.JwksRateLimitError = i.JwksRateLimitError, e.exports.SigningKeyNotFoundError = i.SigningKeyNotFoundError, e.exports.expressJwtSecret = c.expressJwtSecret, e.exports.hapiJwt2Key = s.hapiJwt2Key, e.exports.koaJwtSecret = a.koaJwtSecret
}, function(e, t, n) {
    "use strict";
    var r = n(6),
        o = n(5),
        i = function(e, t) {
            return e && "SigningKeyNotFoundError" === e.name ? t(null) : e ? t(e) : void 0
        };
    e.exports.expressJwtSecret = function(e) {
        if (null === e || void 0 === e) throw new r.ArgumentError("An options object must be provided when initializing expressJwtSecret");
        var t = new o.JwksClient(e),
            n = e.handleSigningKeyError || i;
        return function(e, r, o, i) {
            if (!r || "RS256" !== r.alg) return i(null, null);
            t.getSigningKey(r.kid, function(e, t) {
                return e ? n(e, function(e) {
                    return i(e, null)
                }) : i(null, t.publicKey || t.rsaPublicKey)
            })
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(6),
        o = n(5),
        i = function(e, t) {
            return e && "SigningKeyNotFoundError" === e.name ? t(null, null, null) : e ? t(e, null, null) : void 0
        };
    e.exports.hapiJwt2Key = function(e) {
        if (null === e || void 0 === e) throw new r.ArgumentError("An options object must be provided when initializing expressJwtSecret");
        var t = new o.JwksClient(e),
            n = e.handleSigningKeyError || i;
        return function(e, r) {
            return e && e.header ? "RS256" !== e.header.alg ? r(null, null, null) : void t.getSigningKey(e.header.kid, function(e, t) {
                return e ? n(e, function(e) {
                    return r(e, null, null)
                }) : r(null, t.publicKey || t.rsaPublicKey, t)
            }) : r(null, null, null)
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(6),
        o = n(5);
    e.exports.koaJwtSecret = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (!e.jwksUri) throw new r.ArgumentError("No JWKS URI provided");
        var t = new o.JwksClient(e);
        return function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                r = n.alg,
                o = n.kid;
            return new Promise(function(n, i) {
                if ("RS256" !== r) return i(new Error("Missing / invalid token algorithm"));
                t.getSigningKey(o, function(t, r) {
                    if (t) return e.handleSigningKeyError ? e.handleSigningKeyError(t).then(i) : i(t);
                    n(r.publicKey || r.rsaPublicKey)
                })
            })
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e = e.match(/.{1,64}/g).join("\n"), e = "-----BEGIN CERTIFICATE-----\n" + e + "\n-----END CERTIFICATE-----\n"
    }

    function o(e) {
        var t = e[0];
        return t < "0" || t > "7" ? "00" + e : e
    }

    function i(e) {
        var t = e.toString(16);
        return t.length % 2 ? "0" + t : t
    }

    function s(e) {
        if (e <= 127) return i(e);
        var t = i(e);
        return i(128 + t.length / 2) + t
    }

    function c(e, t) {
        var n = new Buffer(e, "base64"),
            r = new Buffer(t, "base64"),
            i = o(n.toString("hex")),
            c = o(r.toString("hex")),
            a = i.length / 2,
            u = c.length / 2,
            l = s(a),
            d = s(u),
            p = "30" + s(a + u + l.length / 2 + d.length / 2 + 2) + "02" + l + i + "02" + d + c,
            f = new Buffer(p, "hex").toString("base64"),
            h = "-----BEGIN RSA PUBLIC KEY-----\n";
        return h += "" + f.match(/.{1,64}/g).join("\n"), h += "\n-----END RSA PUBLIC KEY-----\n"
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.certToPEM = r, t.rsaPublicKeyToPEM = c
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : options,
            n = t.cacheMaxEntries,
            r = void 0 === n ? 5 : n,
            o = t.cacheMaxAge,
            s = void 0 === o ? (0, i.default)("10h") : o,
            a = (0, c.default)("jwks"),
            l = e.getSigningKey;
        return a("Configured caching of singing keys. Max: " + r + " / Age: " + s), (0, u.default)({
            load: function(e, t) {
                l(e, function(n, r) {
                    return n ? t(n) : (a("Caching signing key for '" + e + "':", r), t(null, r))
                })
            },
            hash: function(e) {
                return e
            },
            maxAge: s,
            max: r
        })
    };
    var o = n(111),
        i = r(o),
        s = n(12),
        c = r(s),
        a = n(108),
        u = r(a)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.rateLimitSigningKey = t.cacheSigningKey = void 0;
    var o = n(94),
        i = r(o),
        s = n(96),
        c = r(s);
    t.cacheSigningKey = i.default, t.rateLimitSigningKey = c.default
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : options,
            n = t.jwksRequestsPerMinute,
            r = void 0 === n ? 10 : n,
            o = (0, i.default)("jwks"),
            c = e.getSigningKey,
            u = new s.RateLimiter(r, "minute", !0);
        return o("Configured rate limiting to JWKS endpoint at " + r + "/minute"),
            function(e, t) {
                u.removeTokens(1, function(n, r) {
                    return n ? t(n) : (o("Requests to the JWKS endpoint available for the next minute:", r), r < 0 ? (o("Too many requests to the JWKS endpoint"), t(new a.default("Too many requests to the JWKS endpoint"))) : c(e, t))
                })
            }
    };
    var o = n(12),
        i = r(o),
        s = n(99),
        c = n(26),
        a = r(c)
}, function(e, t) {
    function n(e) {
        this.message = e
    }

    function r(e) {
        var t = String(e).replace(/=+$/, "");
        if (t.length % 4 == 1) throw new n("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var r, i, s = 0, c = 0, a = ""; i = t.charAt(c++); ~i && (r = s % 4 ? 64 * r + i : i, s++ % 4) ? a += String.fromCharCode(255 & r >> (-2 * s & 6)) : 0) i = o.indexOf(i);
        return a
    }
    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    n.prototype = new Error, n.prototype.name = "InvalidCharacterError", e.exports = "undefined" != typeof window && window.atob && window.atob.bind(window) || r
}, function(e, t, n) {
    function r(e) {
        return decodeURIComponent(o(e).replace(/(.)/g, function(e, t) {
            var n = t.charCodeAt(0).toString(16).toUpperCase();
            return n.length < 2 && (n = "0" + n), "%" + n
        }))
    }
    var o = n(97);
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
            return r(t)
        } catch (e) {
            return o(t)
        }
    }
}, function(e, t, n) {
    t.RateLimiter = n(100), t.TokenBucket = n(29)
}, function(e, t, n) {
    var r = n(29),
        o = function(e, t, n) {
            this.tokenBucket = new r(e, e, t, null), this.tokenBucket.content = e, this.curIntervalStart = +new Date, this.tokensThisInterval = 0, this.fireImmediately = n
        };
    o.prototype = {
        tokenBucket: null,
        curIntervalStart: 0,
        tokensThisInterval: 0,
        fireImmediately: !1,
        removeTokens: function(e, t) {
            function n(n, o) {
                if (n) return t(n, null);
                r.tokensThisInterval += e, t(null, o)
            }
            if (e > this.tokenBucket.bucketSize) return process.nextTick(t.bind(null, "Requested tokens " + e + " exceeds maximum tokens per interval " + this.tokenBucket.bucketSize, null)), !1;
            var r = this,
                o = Date.now();
            if (o - this.curIntervalStart >= this.tokenBucket.interval && (this.curIntervalStart = o, this.tokensThisInterval = 0), e > this.tokenBucket.tokensPerInterval - this.tokensThisInterval) {
                if (this.fireImmediately) process.nextTick(t.bind(null, null, -1));
                else {
                    var i = Math.ceil(this.curIntervalStart + this.tokenBucket.interval - o);
                    setTimeout(function() {
                        r.tokenBucket.removeTokens(e, n)
                    }, i)
                }
                return !1
            }
            return this.tokenBucket.removeTokens(e, n)
        },
        tryRemoveTokens: function(e) {
            if (e > this.tokenBucket.bucketSize) return !1;
            var t = Date.now();
            return t - this.curIntervalStart >= this.tokenBucket.interval && (this.curIntervalStart = t, this.tokensThisInterval = 0), !(e > this.tokenBucket.tokensPerInterval - this.tokensThisInterval) && this.tokenBucket.tryRemoveTokens(e)
        },
        getTokensRemaining: function() {
            return this.tokenBucket.drip(), this.tokenBucket.content
        }
    }, e.exports = o
}, function(e, t, n) {
    function r(e) {
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
            n = e.name || "Function wrapped with `once`";
        return t.onceError = n + " shouldn't be called more than once", t.called = !1, t
    }
    var i = n(120);
    e.exports = i(r), e.exports.strict = i(o), r.proto = r(function() {
        Object.defineProperty(Function.prototype, "once", {
            value: function() {
                return r(this)
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
    e.exports = require("body-parser@1.12.4")
}, function(e, t) {
    e.exports = require("cookie-signature")
}, function(e, t) {
    e.exports = require("crypto")
}, function(e, t) {
    e.exports = require("ejs@2.3.1")
}, function(e, t) {
    e.exports = require("fs")
}, function(e, t) {
    e.exports = require("lru-memoizer@1.10.0")
}, function(e, t) {
    e.exports = require("moment@2.10.3")
}, function(e, t) {
    e.exports = require("morgan@1.5.3")
}, function(e, t) {
    e.exports = require("ms@0.7.1")
}, function(e, t) {
    e.exports = require("querystring")
}, function(e, t) {
    e.exports = require("request@2.56.0")
}, function(e, t) {
    e.exports = require("stream")
}, function(e, t) {
    e.exports = require("tls")
}, function(e, t) {
    e.exports = require("url")
}, function(e, t) {
    e.exports = require("util")
}, function(e, t) {
    e.exports = require("webtask-tools")
}, function(e, t) {
    e.exports = require("winston@1.0.0")
}, function(e, t) {
    e.exports = require("wrappy")
}]);
