(() => {
  // node_modules/kaplay/dist/kaplay.mjs
  var Ra = Object.defineProperty;
  var i = (t18, e) => Ra(t18, "name", { value: e, configurable: true });
  var co = (() => {
    for (var t18 = new Uint8Array(128), e = 0; e < 64; e++) t18[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
    return (n) => {
      for (var r = n.length, o = new Uint8Array((r - (n[r - 1] == "=") - (n[r - 2] == "=")) * 3 / 4 | 0), s = 0, a = 0; s < r; ) {
        var m = t18[n.charCodeAt(s++)], u = t18[n.charCodeAt(s++)], p = t18[n.charCodeAt(s++)], c = t18[n.charCodeAt(s++)];
        o[a++] = m << 2 | u >> 4, o[a++] = u << 4 | p >> 2, o[a++] = p << 6 | c;
      }
      return o;
    };
  })();
  var I = class t {
    static {
      i(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(e, n, r) {
      this.r = Me(e, 0, 255), this.g = Me(n, 0, 255), this.b = Me(r, 0, 255);
    }
    static fromArray(e) {
      return new t(e[0], e[1], e[2]);
    }
    static fromHex(e) {
      if (typeof e == "number") return new t(e >> 16 & 255, e >> 8 & 255, e >> 0 & 255);
      if (typeof e == "string") {
        let n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        if (!n) throw new Error("Invalid hex color format");
        return new t(parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16));
      } else throw new Error("Invalid hex color format");
    }
    static fromHSL(e, n, r) {
      if (n == 0) return new t(255 * r, 255 * r, 255 * r);
      let o = i((c, f, d) => (d < 0 && (d += 1), d > 1 && (d -= 1), d < 1 / 6 ? c + (f - c) * 6 * d : d < 1 / 2 ? f : d < 2 / 3 ? c + (f - c) * (2 / 3 - d) * 6 : c), "hue2rgb"), s = r < 0.5 ? r * (1 + n) : r + n - r * n, a = 2 * r - s, m = o(a, s, e + 1 / 3), u = o(a, s, e), p = o(a, s, e - 1 / 3);
      return new t(Math.round(m * 255), Math.round(u * 255), Math.round(p * 255));
    }
    static RED = new t(255, 0, 0);
    static GREEN = new t(0, 255, 0);
    static BLUE = new t(0, 0, 255);
    static YELLOW = new t(255, 255, 0);
    static MAGENTA = new t(255, 0, 255);
    static CYAN = new t(0, 255, 255);
    static WHITE = new t(255, 255, 255);
    static BLACK = new t(0, 0, 0);
    clone() {
      return new t(this.r, this.g, this.b);
    }
    lighten(e) {
      return new t(this.r + e, this.g + e, this.b + e);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new t(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(e) {
      return new t(this.r * e.r / 255, this.g * e.g / 255, this.b * e.b / 255);
    }
    lerp(e, n) {
      return new t(fe(this.r, e.r, n), fe(this.g, e.g, n), fe(this.b, e.b, n));
    }
    toHSL() {
      let e = this.r / 255, n = this.g / 255, r = this.b / 255, o = Math.max(e, n, r), s = Math.min(e, n, r), a = (o + s) / 2, m = a, u = a;
      if (o == s) a = m = 0;
      else {
        let p = o - s;
        switch (m = u > 0.5 ? p / (2 - o - s) : p / (o + s), o) {
          case e:
            a = (n - r) / p + (n < r ? 6 : 0);
            break;
          case n:
            a = (r - e) / p + 2;
            break;
          case r:
            a = (e - n) / p + 4;
            break;
        }
        a /= 6;
      }
      return [a, m, u];
    }
    eq(e) {
      return this.r === e.r && this.g === e.g && this.b === e.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
    toArray() {
      return [this.r, this.g, this.b];
    }
  };
  function _(...t18) {
    if (t18.length === 0) return new I(255, 255, 255);
    if (t18.length === 1) {
      if (t18[0] instanceof I) return t18[0].clone();
      if (typeof t18[0] == "string") return I.fromHex(t18[0]);
      if (Array.isArray(t18[0]) && t18[0].length === 3) return I.fromArray(t18[0]);
    } else if (t18.length === 2) {
      if (t18[0] instanceof I) return t18[0].clone();
    } else if (t18.length === 3 || t18.length === 4) return new I(t18[0], t18[1], t18[2]);
    throw new Error("Invalid color arguments");
  }
  i(_, "rgb");
  var lo = i((t18, e, n) => I.fromHSL(t18, e, n), "hsl2rgb");
  function se(t18) {
    return t18 * Math.PI / 180;
  }
  i(se, "deg2rad");
  function ct(t18) {
    return t18 * 180 / Math.PI;
  }
  i(ct, "rad2deg");
  function Me(t18, e, n) {
    return e > n ? Me(t18, n, e) : Math.min(Math.max(t18, e), n);
  }
  i(Me, "clamp");
  function fe(t18, e, n) {
    if (typeof t18 == "number" && typeof e == "number") return t18 + (e - t18) * n;
    if (t18 instanceof C && e instanceof C) return t18.lerp(e, n);
    if (t18 instanceof I && e instanceof I) return t18.lerp(e, n);
    throw new Error(`Bad value for lerp(): ${t18}, ${e}. Only number, Vec2 and Color is supported.`);
  }
  i(fe, "lerp");
  function Se(t18, e, n, r, o) {
    return r + (t18 - e) / (n - e) * (o - r);
  }
  i(Se, "map");
  function po(t18, e, n, r, o) {
    return Me(Se(t18, e, n, r, o), r, o);
  }
  i(po, "mapc");
  var C = class t2 {
    static {
      i(this, "Vec2");
    }
    x = 0;
    y = 0;
    constructor(e = 0, n = e) {
      this.x = e, this.y = n;
    }
    static fromAngle(e) {
      let n = se(e);
      return new t2(Math.cos(n), Math.sin(n));
    }
    static fromArray(e) {
      return new t2(e[0], e[1]);
    }
    static LEFT = new t2(-1, 0);
    static RIGHT = new t2(1, 0);
    static UP = new t2(0, -1);
    static DOWN = new t2(0, 1);
    clone() {
      return new t2(this.x, this.y);
    }
    add(...e) {
      let n = x(...e);
      return new t2(this.x + n.x, this.y + n.y);
    }
    sub(...e) {
      let n = x(...e);
      return new t2(this.x - n.x, this.y - n.y);
    }
    scale(...e) {
      let n = x(...e);
      return new t2(this.x * n.x, this.y * n.y);
    }
    dist(...e) {
      let n = x(...e);
      return this.sub(n).len();
    }
    sdist(...e) {
      let n = x(...e);
      return this.sub(n).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let e = this.len();
      return e === 0 ? new t2(0) : this.scale(1 / e);
    }
    normal() {
      return new t2(this.y, -this.x);
    }
    reflect(e) {
      return this.sub(e.scale(2 * this.dot(e)));
    }
    project(e) {
      return e.scale(e.dot(this) / e.len());
    }
    reject(e) {
      return this.sub(this.project(e));
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    angle(...e) {
      let n = x(...e);
      return ct(Math.atan2(this.y - n.y, this.x - n.x));
    }
    angleBetween(...e) {
      let n = x(...e);
      return ct(Math.atan2(this.cross(n), this.dot(n)));
    }
    lerp(e, n) {
      return new t2(fe(this.x, e.x, n), fe(this.y, e.y, n));
    }
    slerp(e, n) {
      let r = this.dot(e), o = this.cross(e), s = Math.atan2(o, r);
      return this.scale(Math.sin((1 - n) * s)).add(e.scale(Math.sin(n * s))).scale(1 / o);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(e) {
      return new t2(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
    }
    transform(e) {
      return e.multVec2(this);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y;
    }
    bbox() {
      return new W(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
    toArray() {
      return [this.x, this.y];
    }
  };
  function x(...t18) {
    if (t18.length === 1) {
      if (t18[0] instanceof C) return new C(t18[0].x, t18[0].y);
      if (Array.isArray(t18[0]) && t18[0].length === 2) return new C(...t18[0]);
    }
    return new C(...t18);
  }
  i(x, "vec2");
  var z = class t3 {
    static {
      i(this, "Quad");
    }
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(e, n, r, o) {
      this.x = e, this.y = n, this.w = r, this.h = o;
    }
    scale(e) {
      return new t3(this.x + this.w * e.x, this.y + this.h * e.y, this.w * e.w, this.h * e.h);
    }
    pos() {
      return new C(this.x, this.y);
    }
    clone() {
      return new t3(this.x, this.y, this.w, this.h);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
  function le(t18, e, n, r) {
    return new z(t18, e, n, r);
  }
  i(le, "quad");
  var Mt = class t4 {
    static {
      i(this, "Mat2");
    }
    a;
    b;
    c;
    d;
    constructor(e, n, r, o) {
      this.a = e, this.b = n, this.c = r, this.d = o;
    }
    mul(e) {
      return new t4(this.a * e.a + this.b * e.c, this.a * e.b + this.b * e.d, this.c * e.a + this.d * e.c, this.c * e.b + this.d * e.d);
    }
    transform(e) {
      return x(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
    }
    get inverse() {
      let e = this.det;
      return new t4(this.d / e, -this.b / e, -this.c / e, this.a / e);
    }
    get transpose() {
      return new t4(this.a, this.c, this.b, this.d);
    }
    get eigenvalues() {
      let e = this.trace / 2, n = this.det, r = e + Math.sqrt(e * e - n), o = e - Math.sqrt(e * e - n);
      return [r, o];
    }
    eigenvectors(e, n) {
      return this.c != 0 ? [[e - this.d, this.c], [n - this.d, this.c]] : this.b != 0 ? [[this.b, e - this.a], [this.b, n - this.a]] : Math.abs(this.transform(x(1, 0)).x - e) < Number.EPSILON ? [[1, 0], [0, 1]] : [[0, 1], [1, 0]];
    }
    get det() {
      return this.a * this.d - this.b * this.c;
    }
    get trace() {
      return this.a + this.d;
    }
    static rotation(e) {
      let n = Math.cos(e), r = Math.sin(e);
      return new t4(n, r, -r, n);
    }
    static scale(e, n) {
      return new t4(e, 0, 0, n);
    }
  };
  var ht = class t5 {
    static {
      i(this, "Mat3");
    }
    m11;
    m12;
    m13;
    m21;
    m22;
    m23;
    m31;
    m32;
    m33;
    constructor(e, n, r, o, s, a, m, u, p) {
      this.m11 = e, this.m12 = n, this.m13 = r, this.m21 = o, this.m22 = s, this.m23 = a, this.m31 = m, this.m32 = u, this.m33 = p;
    }
    static fromMat2(e) {
      return new t5(e.a, e.b, 0, e.c, e.d, 0, 0, 0, 1);
    }
    toMat2() {
      return new Mt(this.m11, this.m12, this.m21, this.m22);
    }
    mul(e) {
      return new t5(this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31, this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32, this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33, this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31, this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32, this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33, this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31, this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32, this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33);
    }
    get det() {
      return this.m11 * this.m22 * this.m33 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32 - this.m13 * this.m22 * this.m31 - this.m12 * this.m21 * this.m33 - this.m11 * this.m23 * this.m32;
    }
    rotate(e) {
      let n = Math.cos(e), r = Math.sin(e), o = this.m11, s = this.m12;
      return this.m11 = n * this.m11 + r * this.m21, this.m12 = n * this.m12 + r * this.m22, this.m21 = n * this.m21 - r * o, this.m22 = n * this.m22 - r * s, this;
    }
    scale(e, n) {
      return this.m11 *= e, this.m12 *= e, this.m21 *= n, this.m22 *= n, this;
    }
    get inverse() {
      let e = this.det;
      return new t5((this.m22 * this.m33 - this.m23 * this.m32) / e, (this.m13 * this.m32 - this.m12 * this.m33) / e, (this.m12 * this.m23 - this.m13 * this.m22) / e, (this.m23 * this.m31 - this.m21 * this.m33) / e, (this.m11 * this.m33 - this.m13 * this.m31) / e, (this.m13 * this.m21 - this.m11 * this.m23) / e, (this.m21 * this.m32 - this.m22 * this.m31) / e, (this.m12 * this.m31 - this.m11 * this.m32) / e, (this.m11 * this.m22 - this.m12 * this.m21) / e);
    }
    get transpose() {
      return new t5(this.m11, this.m21, this.m31, this.m12, this.m22, this.m32, this.m13, this.m23, this.m33);
    }
  };
  var he = class t6 {
    static {
      i(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new t6([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new t6([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([1, 0, 0, 0, 0, n, -r, 0, 0, r, n, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, 0, r, 0, 0, 1, 0, 0, -r, 0, n, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, -r, 0, 0, r, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return this.m[12] += this.m[0] * e.x + this.m[4] * e.y, this.m[13] += this.m[1] * e.x + this.m[5] * e.y, this.m[14] += this.m[2] * e.x + this.m[6] * e.y, this.m[15] += this.m[3] * e.x + this.m[7] * e.y, this;
    }
    scale(e) {
      return this.m[0] *= e.x, this.m[4] *= e.y, this.m[1] *= e.x, this.m[5] *= e.y, this.m[2] *= e.x, this.m[6] *= e.y, this.m[3] *= e.x, this.m[7] *= e.y, this;
    }
    rotate(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e), o = this.m[0], s = this.m[1], a = this.m[4], m = this.m[5];
      return this.m[0] = o * n + s * r, this.m[1] = -o * r + s * n, this.m[4] = a * n + m * r, this.m[5] = -a * r + m * n, this;
    }
    mult(e) {
      let n = [];
      for (let r = 0; r < 4; r++) for (let o = 0; o < 4; o++) n[r * 4 + o] = this.m[0 * 4 + o] * e.m[r * 4 + 0] + this.m[1 * 4 + o] * e.m[r * 4 + 1] + this.m[2 * 4 + o] * e.m[r * 4 + 2] + this.m[3 * 4 + o] * e.m[r * 4 + 3];
      return new t6(n);
    }
    multVec2(e) {
      return new C(e.x * this.m[0] + e.y * this.m[4] + this.m[12], e.x * this.m[1] + e.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new C(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new C(n, e / n);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new C(e / n, n);
      } else return new C(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return ct(this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return ct(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / e) : -Math.acos(this.m[4] / e)));
      } else return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new C(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new C(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e));
      } else return new C(0, 0);
    }
    invert() {
      let e = [], n = this.m[10] * this.m[15] - this.m[14] * this.m[11], r = this.m[9] * this.m[15] - this.m[13] * this.m[11], o = this.m[9] * this.m[14] - this.m[13] * this.m[10], s = this.m[8] * this.m[15] - this.m[12] * this.m[11], a = this.m[8] * this.m[14] - this.m[12] * this.m[10], m = this.m[8] * this.m[13] - this.m[12] * this.m[9], u = this.m[6] * this.m[15] - this.m[14] * this.m[7], p = this.m[5] * this.m[15] - this.m[13] * this.m[7], c = this.m[5] * this.m[14] - this.m[13] * this.m[6], f = this.m[4] * this.m[15] - this.m[12] * this.m[7], d = this.m[4] * this.m[14] - this.m[12] * this.m[6], v = this.m[5] * this.m[15] - this.m[13] * this.m[7], h = this.m[4] * this.m[13] - this.m[12] * this.m[5], O = this.m[6] * this.m[11] - this.m[10] * this.m[7], y = this.m[5] * this.m[11] - this.m[9] * this.m[7], w = this.m[5] * this.m[10] - this.m[9] * this.m[6], V = this.m[4] * this.m[11] - this.m[8] * this.m[7], R = this.m[4] * this.m[10] - this.m[8] * this.m[6], P = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      e[0] = this.m[5] * n - this.m[6] * r + this.m[7] * o, e[4] = -(this.m[4] * n - this.m[6] * s + this.m[7] * a), e[8] = this.m[4] * r - this.m[5] * s + this.m[7] * m, e[12] = -(this.m[4] * o - this.m[5] * a + this.m[6] * m), e[1] = -(this.m[1] * n - this.m[2] * r + this.m[3] * o), e[5] = this.m[0] * n - this.m[2] * s + this.m[3] * a, e[9] = -(this.m[0] * r - this.m[1] * s + this.m[3] * m), e[13] = this.m[0] * o - this.m[1] * a + this.m[2] * m, e[2] = this.m[1] * u - this.m[2] * p + this.m[3] * c, e[6] = -(this.m[0] * u - this.m[2] * f + this.m[3] * d), e[10] = this.m[0] * v - this.m[1] * f + this.m[3] * h, e[14] = -(this.m[0] * c - this.m[1] * d + this.m[2] * h), e[3] = -(this.m[1] * O - this.m[2] * y + this.m[3] * w), e[7] = this.m[0] * O - this.m[2] * V + this.m[3] * R, e[11] = -(this.m[0] * y - this.m[1] * V + this.m[3] * P), e[15] = this.m[0] * w - this.m[1] * R + this.m[2] * P;
      let D = this.m[0] * e[0] + this.m[1] * e[4] + this.m[2] * e[8] + this.m[3] * e[12];
      for (let b = 0; b < 4; b++) for (let E = 0; E < 4; E++) e[b * 4 + E] *= 1 / D;
      return new t6(e);
    }
    clone() {
      return new t6([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  function An(t18, e, n, r = (o) => -Math.cos(o)) {
    return t18 + (r(n) + 1) / 2 * (e - t18);
  }
  i(An, "wave");
  var Ma = 1103515245;
  var Da = 12345;
  var mo = 2147483648;
  var $t = class {
    static {
      i(this, "RNG");
    }
    seed;
    constructor(e) {
      this.seed = e;
    }
    gen() {
      return this.seed = (Ma * this.seed + Da) % mo, this.seed / mo;
    }
    genNumber(e, n) {
      return e + this.gen() * (n - e);
    }
    genVec2(e, n) {
      return new C(this.genNumber(e.x, n.x), this.genNumber(e.y, n.y));
    }
    genColor(e, n) {
      return new I(this.genNumber(e.r, n.r), this.genNumber(e.g, n.g), this.genNumber(e.b, n.b));
    }
    genAny(...e) {
      if (e.length === 0) return this.gen();
      if (e.length === 1) {
        if (typeof e[0] == "number") return this.genNumber(0, e[0]);
        if (e[0] instanceof C) return this.genVec2(x(0, 0), e[0]);
        if (e[0] instanceof I) return this.genColor(_(0, 0, 0), e[0]);
      } else if (e.length === 2) {
        if (typeof e[0] == "number" && typeof e[1] == "number") return this.genNumber(e[0], e[1]);
        if (e[0] instanceof C && e[1] instanceof C) return this.genVec2(e[0], e[1]);
        if (e[0] instanceof I && e[1] instanceof I) return this.genColor(e[0], e[1]);
      }
      throw new Error("More than 2 arguments not supported");
    }
  };
  var yr = new $t(Date.now());
  function fo(t18) {
    return t18 != null && (yr.seed = t18), yr.seed;
  }
  i(fo, "randSeed");
  function ge(...t18) {
    return yr.genAny(...t18);
  }
  i(ge, "rand");
  function xr(...t18) {
    return Math.floor(ge(...t18.length > 0 ? t18 : [2]));
  }
  i(xr, "randi");
  function ho(t18) {
    return ge() <= t18;
  }
  i(ho, "chance");
  function vr(t18) {
    for (let e = t18.length - 1; e > 0; e--) {
      let n = Math.floor(Math.random() * (e + 1));
      [t18[e], t18[n]] = [t18[n], t18[e]];
    }
    return t18;
  }
  i(vr, "shuffle");
  function go(t18, e) {
    return t18.length <= e ? t18.slice() : vr(t18.slice()).slice(0, e);
  }
  i(go, "chooseMultiple");
  function bo(t18) {
    return t18[xr(t18.length)];
  }
  i(bo, "choose");
  function wr(t18, e) {
    return t18.pos.x + t18.width > e.pos.x && t18.pos.x < e.pos.x + e.width && t18.pos.y + t18.height > e.pos.y && t18.pos.y < e.pos.y + e.height;
  }
  i(wr, "testRectRect");
  function Ba(t18, e) {
    if (t18.p1.x === t18.p2.x && t18.p1.y === t18.p2.y || e.p1.x === e.p2.x && e.p1.y === e.p2.y) return null;
    let n = (e.p2.y - e.p1.y) * (t18.p2.x - t18.p1.x) - (e.p2.x - e.p1.x) * (t18.p2.y - t18.p1.y);
    if (n === 0) return null;
    let r = ((e.p2.x - e.p1.x) * (t18.p1.y - e.p1.y) - (e.p2.y - e.p1.y) * (t18.p1.x - e.p1.x)) / n, o = ((t18.p2.x - t18.p1.x) * (t18.p1.y - e.p1.y) - (t18.p2.y - t18.p1.y) * (t18.p1.x - e.p1.x)) / n;
    return r < 0 || r > 1 || o < 0 || o > 1 ? null : r;
  }
  i(Ba, "testLineLineT");
  function Sn(t18, e) {
    let n = Ba(t18, e);
    return n ? x(t18.p1.x + n * (t18.p2.x - t18.p1.x), t18.p1.y + n * (t18.p2.y - t18.p1.y)) : null;
  }
  i(Sn, "testLineLine");
  function Vn(t18, e) {
    let n = e.p2.sub(e.p1), r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY;
    if (n.x != 0) {
      let s = (t18.pos.x - e.p1.x) / n.x, a = (t18.pos.x + t18.width - e.p1.x) / n.x;
      r = Math.max(r, Math.min(s, a)), o = Math.min(o, Math.max(s, a));
    }
    if (n.y != 0) {
      let s = (t18.pos.y - e.p1.y) / n.y, a = (t18.pos.y + t18.height - e.p1.y) / n.y;
      r = Math.max(r, Math.min(s, a)), o = Math.min(o, Math.max(s, a));
    }
    return o >= r && o >= 0 && r <= 1;
  }
  i(Vn, "testRectLine");
  function Dt(t18, e) {
    return e.x > t18.pos.x && e.x < t18.pos.x + t18.width && e.y > t18.pos.y && e.y < t18.pos.y + t18.height;
  }
  i(Dt, "testRectPoint");
  function yo(t18, e) {
    let n = Math.max(t18.pos.x, Math.min(e.center.x, t18.pos.x + t18.width)), r = Math.max(t18.pos.y, Math.min(e.center.y, t18.pos.y + t18.height));
    return x(n, r).sdist(e.center) <= e.radius * e.radius;
  }
  i(yo, "testRectCircle");
  function xo(t18, e) {
    return vo(e, new ye(t18.points()));
  }
  i(xo, "testRectPolygon");
  function Pn(t18, e) {
    let n = e.sub(t18.p1), r = t18.p2.sub(t18.p1);
    if (Math.abs(n.cross(r)) > Number.EPSILON) return false;
    let o = n.dot(r) / r.dot(r);
    return o >= 0 && o <= 1;
  }
  i(Pn, "testLinePoint");
  function Bt(t18, e) {
    let n = t18.p2.sub(t18.p1), r = n.dot(n), o = t18.p1.sub(e.center), s = 2 * n.dot(o), a = o.dot(o) - e.radius * e.radius, m = s * s - 4 * r * a;
    if (r <= Number.EPSILON || m < 0) return false;
    if (m == 0) {
      let u = -s / (2 * r);
      if (u >= 0 && u <= 1) return true;
    } else {
      let u = (-s + Math.sqrt(m)) / (2 * r), p = (-s - Math.sqrt(m)) / (2 * r);
      if (u >= 0 && u <= 1 || p >= 0 && p <= 1) return true;
    }
    return Gn(e, t18.p1);
  }
  i(Bt, "testLineCircle");
  function Cr(t18, e) {
    if (et(e, t18.p1) || et(e, t18.p2)) return true;
    for (let n = 0; n < e.pts.length; n++) {
      let r = e.pts[n], o = e.pts[(n + 1) % e.pts.length];
      if (Sn(t18, new Te(r, o))) return true;
    }
    return false;
  }
  i(Cr, "testLinePolygon");
  function Gn(t18, e) {
    return t18.center.sdist(e) < t18.radius * t18.radius;
  }
  i(Gn, "testCirclePoint");
  function Fa(t18, e) {
    return t18.center.sdist(e.center) < (t18.radius + e.radius) * (t18.radius + e.radius);
  }
  i(Fa, "testCircleCircle");
  function Xt(t18, e) {
    let n = e.pts[e.pts.length - 1];
    for (let r of e.pts) {
      if (Bt(new Te(n, r), t18)) return true;
      n = r;
    }
    return Gn(t18, e.pts[0]) ? true : et(e, t18.center);
  }
  i(Xt, "testCirclePolygon");
  function vo(t18, e) {
    for (let n = 0; n < t18.pts.length; n++) if (Cr(new Te(t18.pts[n], t18.pts[(n + 1) % t18.pts.length]), e)) return true;
    return !!(t18.pts.some((n) => et(e, n)) || e.pts.some((n) => et(t18, n)));
  }
  i(vo, "testPolygonPolygon");
  function et(t18, e) {
    let n = false, r = t18.pts;
    for (let o = 0, s = r.length - 1; o < r.length; s = o++) r[o].y > e.y != r[s].y > e.y && e.x < (r[s].x - r[o].x) * (e.y - r[o].y) / (r[s].y - r[o].y) + r[o].x && (n = !n);
    return n;
  }
  i(et, "testPolygonPoint");
  function Or(t18, e) {
    e = e.sub(t18.center);
    let n = se(t18.angle), r = Math.cos(n), o = Math.sin(n), s = e.x * r + e.y * o, a = -e.x * o + e.y * r;
    return s * s / (t18.radiusX * t18.radiusX) + a * a / (t18.radiusY * t18.radiusY) < 1;
  }
  i(Or, "testEllipsePoint");
  function En(t18, e) {
    let n = e.center.sub(t18.center), r = se(t18.angle), o = Math.cos(r), s = Math.sin(r), a = n.x * o + n.y * s, m = -n.x * s + n.y * o;
    return Or(new je(x(), t18.radiusX + e.radius, t18.radiusY + e.radius, 0), x(a, m));
  }
  i(En, "testEllipseCircle");
  function wo(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new Te(n.transform(e.p1.sub(t18.center)), n.transform(e.p2.sub(t18.center))), Bt(e, new Ce(x(), 1));
  }
  i(wo, "testEllipseLine");
  function La(t18, e) {
    if (t18.radiusX === t18.radiusY) return En(e, new Ce(t18.center, t18.radiusX));
    if (e.radiusX === e.radiusY) return En(t18, new Ce(e.center, e.radiusX));
    let n = new ht(1 / t18.radiusX ** 2, 0, 0, 0, 1 / t18.radiusY ** 2, 0, 0, 0, -1), r = new ht(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1), o = t18.center.x, s = t18.center.y, a = e.center.x, m = e.center.y, u = se(t18.angle), p = se(e.angle), c = new ht(Math.cos(u), -Math.sin(u), o, Math.sin(u), Math.cos(u), s, 0, 0, 1), f = new ht(Math.cos(p), -Math.sin(p), a, Math.sin(p), Math.cos(p), m, 0, 0, 1), d = c.inverse, v = f.inverse, h = d.transpose.mul(n).mul(d), O = v.transpose.mul(r).mul(v), y = h.m11, w = h.m12, V = h.m13, R = h.m21, P = h.m22, D = h.m23, b = h.m31, E = h.m32, A = h.m33, G = O.m11, M = O.m12, F = O.m13, K = O.m21, H = O.m22, q = O.m23, Y = O.m31, N = O.m32, j = O.m33, Z = y * P * A - y * D * E - w * R * A + w * D * b + V * R * E - V * P * b, $ = (y * P * j - y * D * N - y * E * q + y * A * H - w * R * j + w * D * Y + w * b * q - w * A * K + V * R * N - V * P * Y - V * b * H + V * E * K + R * E * F - R * A * M - P * b * F + P * A * G + D * b * M - D * E * G) / Z, ee = (y * H * j - y * q * N - w * K * j + w * q * Y + V * K * N - V * H * Y - R * M * j + R * F * N + P * G * j - P * F * Y - D * G * N + D * M * Y + b * M * q - b * F * H - E * G * q + E * F * K + A * G * H - A * M * K) / Z, Ee = (G * H * j - G * q * N - M * K * j + M * q * Y + F * K * N - F * H * Y) / Z;
    if ($ >= 0) {
      let k = -3 * ee + $ ** 2, ft = 3 * $ * Ee + ee * $ ** 2 - 4 * ee ** 2, Pt = -27 * Ee ** 2 + 18 * Ee * $ * ee + $ ** 2 * ee ** 2 - 4 * $ ** 3 * Ee - 4 * ee ** 3;
      return !(k > 0 && ft < 0 && Pt > 0);
    } else {
      let k = -3 * ee + $ ** 2, ft = -27 * Ee ** 2 + 18 * Ee * $ * ee + $ ** 2 * ee ** 2 - 4 * $ ** 3 * Ee - 4 * ee ** 3;
      return !(k > 0 && ft > 0);
    }
  }
  i(La, "testEllipseEllipse");
  function Co(t18, e) {
    return Er(t18, new ye(e.points()));
  }
  i(Co, "testEllipseRect");
  function Er(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new ye(e.pts.map((r) => n.transform(r.sub(t18.center)))), Xt(new Ce(x(), 1), e);
  }
  i(Er, "testEllipsePolygon");
  function Ka(t18, e) {
    return t18.x === e.x && t18.y === e.y;
  }
  i(Ka, "testPointPoint");
  function Ia(t18, e) {
    return e instanceof C ? Ka(e, t18.pt) : e instanceof Ce ? Gn(e, t18.pt) : e instanceof Te ? Pn(e, t18.pt) : e instanceof W ? Dt(e, t18.pt) : e instanceof ye ? et(e, t18.pt) : e instanceof je ? Or(e, t18.pt) : false;
  }
  i(Ia, "testPointShape");
  function ja(t18, e) {
    return e instanceof C ? Pn(t18, e) : e instanceof Ce ? Bt(t18, e) : e instanceof Te ? Sn(t18, e) != null : e instanceof W ? Vn(e, t18) : e instanceof ye ? Cr(t18, e) : e instanceof je ? wo(e, t18) : false;
  }
  i(ja, "testLineShape");
  function ka(t18, e) {
    return e instanceof C ? Gn(t18, e) : e instanceof Ce ? Fa(t18, e) : e instanceof Te ? Bt(e, t18) : e instanceof W ? yo(e, t18) : e instanceof ye ? Xt(t18, e) : e instanceof je ? En(e, t18) : false;
  }
  i(ka, "testCircleShape");
  function _a(t18, e) {
    return e instanceof C ? Dt(t18, e) : e instanceof Ce ? yo(t18, e) : e instanceof Te ? Vn(t18, e) : e instanceof W ? wr(t18, e) : e instanceof ye ? xo(t18, e) : e instanceof je ? Co(e, t18) : false;
  }
  i(_a, "testRectShape");
  function Na(t18, e) {
    return e instanceof C ? et(t18, e) : e instanceof Ce ? Xt(e, t18) : e instanceof Te ? Cr(e, t18) : e instanceof W ? xo(e, t18) : e instanceof ye ? vo(e, t18) : e instanceof je ? Er(e, t18) : false;
  }
  i(Na, "testPolygonShape");
  function Ua(t18, e) {
    return e instanceof C ? Or(t18, e) : e instanceof Ce ? En(t18, e) : e instanceof Te ? wo(t18, e) : e instanceof W ? Co(t18, e) : e instanceof ye ? Er(t18, e) : e instanceof je ? La(e, t18) : false;
  }
  i(Ua, "testEllipseShape");
  function Oo(t18, e, n) {
    let r = t18, o = n.p1, s = n.p2, a = e, m = s.sub(o), u = a.cross(m);
    if (Math.abs(u) < Number.EPSILON) return null;
    let p = o.sub(r), c = p.cross(m) / u;
    if (c <= 0 || c >= 1) return null;
    let f = p.cross(a) / u;
    if (f <= 0 || f >= 1) return null;
    let d = m.normal().unit();
    return e.dot(d) > 0 && (d.x *= -1, d.y *= -1), { point: r.add(a.scale(c)), normal: d, fraction: c };
  }
  i(Oo, "raycastLine");
  function Ha(t18, e, n) {
    let r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY, s;
    if (t18.x != 0) {
      let a = (n.pos.x - t18.x) / e.x, m = (n.pos.x + n.width - t18.x) / e.x;
      s = x(-Math.sign(e.x), 0), r = Math.max(r, Math.min(a, m)), o = Math.min(o, Math.max(a, m));
    }
    if (t18.y != 0) {
      let a = (n.pos.y - t18.y) / e.y, m = (n.pos.y + n.height - t18.y) / e.y;
      Math.min(a, m) > r && (s = x(0, -Math.sign(e.y))), r = Math.max(r, Math.min(a, m)), o = Math.min(o, Math.max(a, m));
    }
    return o >= r && r >= 0 && r <= 1 ? { point: t18.add(e.scale(r)), normal: s, fraction: r } : null;
  }
  i(Ha, "raycastRect");
  function Eo(t18, e, n) {
    let r = t18, o = n.center, s = e, a = s.dot(s), m = r.sub(o), u = 2 * s.dot(m), p = m.dot(m) - n.radius * n.radius, c = u * u - 4 * a * p;
    if (a <= Number.EPSILON || c < 0) return null;
    if (c == 0) {
      let f = -u / (2 * a);
      if (f >= 0 && f <= 1) {
        let d = r.add(s.scale(f));
        return { point: d, normal: d.sub(o), fraction: f };
      }
    } else {
      let f = (-u + Math.sqrt(c)) / (2 * a), d = (-u - Math.sqrt(c)) / (2 * a), v = null;
      if (f >= 0 && f <= 1 && (v = f), d >= 0 && d <= 1 && (v = Math.min(d, v ?? d)), v != null) {
        let h = r.add(s.scale(v));
        return { point: h, normal: h.sub(o).unit(), fraction: v };
      }
    }
    return null;
  }
  i(Eo, "raycastCircle");
  function qa(t18, e, n) {
    let r = n.pts, o = null, s = r[r.length - 1];
    for (let a = 0; a < r.length; a++) {
      let m = r[a], u = Oo(t18, e, new Te(s, m));
      u && (!o || o.fraction > u.fraction) && (o = u), s = m;
    }
    return o;
  }
  i(qa, "raycastPolygon");
  function za(t18, e, n) {
    let r = n.toMat2(), o = r.inverse, s = o.transform(t18.sub(n.center)), a = o.transform(e), m = Eo(s, a, new Ce(x(), 1));
    if (m) {
      let u = Mt.rotation(se(-n.angle)), c = Mt.scale(n.radiusX, n.radiusY).transform(m.point), f = r.transform(m.point).add(n.center), d = f.dist(t18) / e.len();
      return { point: f, normal: u.transform(x(n.radiusY ** 2 * c.x, n.radiusX ** 2 * c.y)).unit(), fraction: d };
    }
    return m;
  }
  i(za, "raycastEllipse");
  function To(t18, e, n, r = 64) {
    let o = t18, s = e.len(), a = e.scale(1 / s), m = 0, u = x(Math.floor(t18.x), Math.floor(t18.y)), p = x(a.x > 0 ? 1 : -1, a.y > 0 ? 1 : -1), c = x(Math.abs(1 / a.x), Math.abs(1 / a.y)), f = x(p.x > 0 ? u.x + 1 - t18.x : t18.x - u.x, p.y > 0 ? u.y + 1 - t18.y : t18.y - u.y), d = x(c.x < 1 / 0 ? c.x * f.x : 1 / 0, c.y < 1 / 0 ? c.y * f.y : 1 / 0), v = -1;
    for (; m <= r; ) {
      let h = n(u);
      if (h === true) return { point: o.add(a.scale(m)), normal: x(v === 0 ? -p.x : 0, v === 1 ? -p.y : 0), fraction: m / s, gridPos: u };
      if (h) return h;
      d.x < d.y ? (u.x += p.x, m = d.x, d.x += c.x, v = 0) : (u.y += p.y, m = d.y, d.y += c.y, v = 1);
    }
    return null;
  }
  i(To, "raycastGrid");
  var Tn = class t7 {
    static {
      i(this, "Point");
    }
    pt;
    constructor(e) {
      this.pt = e.clone();
    }
    transform(e) {
      return new t7(e.multVec2(this.pt));
    }
    bbox() {
      return new W(this.pt, 0, 0);
    }
    area() {
      return 0;
    }
    clone() {
      return new t7(this.pt);
    }
    collides(e) {
      return Ia(this, e);
    }
    contains(e) {
      return this.pt.eq(e);
    }
    raycast(e, n) {
      return null;
    }
    random() {
      return this.pt.clone();
    }
  };
  var Te = class t8 {
    static {
      i(this, "Line");
    }
    p1;
    p2;
    constructor(e, n) {
      this.p1 = e.clone(), this.p2 = n.clone();
    }
    transform(e) {
      return new t8(e.multVec2(this.p1), e.multVec2(this.p2));
    }
    bbox() {
      return W.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new t8(this.p1, this.p2);
    }
    collides(e) {
      return ja(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Oo(e, n, this);
    }
    random() {
      return this.p1.add(this.p2.sub(this.p1).scale(ge(1)));
    }
  };
  var W = class t9 {
    static {
      i(this, "Rect");
    }
    pos;
    width;
    height;
    constructor(e, n, r) {
      this.pos = e.clone(), this.width = n, this.height = r;
    }
    static fromPoints(e, n) {
      return new t9(e.clone(), n.x - e.x, n.y - e.y);
    }
    center() {
      return new C(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(e) {
      return new ye(this.points().map((n) => e.multVec2(n)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new t9(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let n = this.pos, r = this.pos.add(this.width, this.height), o = Math.max(n.x - e.x, 0, e.x - r.x), s = Math.max(n.y - e.y, 0, e.y - r.y);
      return o * o + s * s;
    }
    collides(e) {
      return _a(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Ha(e, n, this);
    }
    random() {
      return this.pos.add(ge(this.width), ge(this.height));
    }
  };
  var Ce = class t10 {
    static {
      i(this, "Circle");
    }
    center;
    radius;
    constructor(e, n) {
      this.center = e.clone(), this.radius = n;
    }
    transform(e) {
      return new je(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return W.fromPoints(this.center.sub(x(this.radius)), this.center.add(x(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new t10(this.center, this.radius);
    }
    collides(e) {
      return ka(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Eo(e, n, this);
    }
    random() {
      return this.center.add(C.fromAngle(ge(360)).scale(ge(this.radius)));
    }
  };
  var je = class t11 {
    static {
      i(this, "Ellipse");
    }
    center;
    radiusX;
    radiusY;
    angle;
    constructor(e, n, r, o = 0) {
      this.center = e.clone(), this.radiusX = n, this.radiusY = r, this.angle = o;
    }
    static fromMat2(e) {
      let n = e.inverse, r = n.transpose.mul(n), [o, s] = r.eigenvalues, [a, m] = r.eigenvectors(o, s), [u, p] = [1 / Math.sqrt(o), 1 / Math.sqrt(s)];
      return u > p ? new t11(x(), u, p, ct(Math.atan2(-a[1], a[0]))) : new t11(x(), p, u, ct(Math.atan2(-m[1], m[0])));
    }
    toMat2() {
      let e = se(this.angle), n = Math.cos(e), r = Math.sin(e);
      return new Mt(n * this.radiusX, -r * this.radiusY, r * this.radiusX, n * this.radiusY);
    }
    transform(e) {
      if (this.angle == 0 && e.getRotation() == 0) return new t11(e.multVec2(this.center), e.m[0] * this.radiusX, e.m[5] * this.radiusY);
      {
        let n = this.toMat2(), r = e.getRotation(), o = e.getScale();
        n = ht.fromMat2(n).scale(o.x, o.y).rotate(r).toMat2();
        let a = t11.fromMat2(n);
        return a.center = e.multVec2(this.center), a;
      }
    }
    bbox() {
      if (this.angle == 0) return W.fromPoints(this.center.sub(x(this.radiusX, this.radiusY)), this.center.add(x(this.radiusX, this.radiusY)));
      {
        let e = se(this.angle), n = Math.cos(e), r = Math.sin(e), o = this.radiusX * n, s = this.radiusX * r, a = this.radiusY * r, m = this.radiusY * n, u = Math.sqrt(o * o + a * a), p = Math.sqrt(s * s + m * m);
        return W.fromPoints(this.center.sub(x(u, p)), this.center.add(x(u, p)));
      }
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new t11(this.center, this.radiusX, this.radiusY, this.angle);
    }
    collides(e) {
      return Ua(this, e);
    }
    contains(e) {
      e = e.sub(this.center);
      let n = se(this.angle), r = Math.cos(n), o = Math.sin(n), s = e.x * r + e.y * o, a = -e.x * o + e.y * r;
      return s * s / (this.radiusX * this.radiusX) + a * a / (this.radiusY * this.radiusY) < 1;
    }
    raycast(e, n) {
      return za(e, n, this);
    }
    random() {
      return this.center;
    }
  };
  function Ya(t18, e, n, r) {
    let o = e.sub(t18), s = r.sub(n), a = o.cross(s);
    return a < 1e-5 && a > -1e-5 || (a = n.sub(t18).cross(s) / a, a < 0 || a > 1) ? null : t18.add(o.scale(a));
  }
  i(Ya, "segmentLineIntersection");
  var ye = class t12 {
    static {
      i(this, "Polygon");
    }
    pts;
    constructor(e) {
      if (e.length < 3) throw new Error("Polygons should have at least 3 vertices");
      this.pts = e;
    }
    transform(e) {
      return new t12(this.pts.map((n) => e.multVec2(n)));
    }
    bbox() {
      let e = x(Number.MAX_VALUE), n = x(-Number.MAX_VALUE);
      for (let r of this.pts) e.x = Math.min(e.x, r.x), n.x = Math.max(n.x, r.x), e.y = Math.min(e.y, r.y), n.y = Math.max(n.y, r.y);
      return W.fromPoints(e, n);
    }
    area() {
      let e = 0, n = this.pts.length;
      for (let r = 0; r < n; r++) {
        let o = this.pts[r], s = this.pts[(r + 1) % n];
        e += o.x * s.y * 0.5, e -= s.x * o.y * 0.5;
      }
      return Math.abs(e);
    }
    clone() {
      return new t12(this.pts.map((e) => e.clone()));
    }
    collides(e) {
      return Na(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return qa(e, n, this);
    }
    random() {
      return x();
    }
    cut(e, n) {
      let r = new Te(e, n), o = [], s = [], a = n.sub(e), m = this.pts[this.pts.length - 1], u = m.sub(e), p = a.cross(u) > 0;
      return this.pts.forEach((c) => {
        u = c.sub(e);
        let f = a.cross(u) > 0;
        if (p != f) {
          let d = Ya(m, c, e, n);
          o.push(d), s.push(d), p = f;
        }
        (f ? o : s).push(c), m = c;
      }), [o.length ? new t12(o) : null, s.length ? new t12(s) : null];
    }
  };
  function Ao(t18, e, n, r) {
    let o = r * r, s = 1 - r, a = s * s;
    return t18.scale(a).add(e.scale(2 * s * r)).add(n.scale(o));
  }
  i(Ao, "evaluateQuadratic");
  function So(t18, e, n, r) {
    let o = 1 - r;
    return e.sub(t18).scale(2 * o).add(n.sub(e).scale(2 * r));
  }
  i(So, "evaluateQuadraticFirstDerivative");
  function Vo(t18, e, n, r) {
    return n.sub(e.scale(2)).add(t18).scale(2);
  }
  i(Vo, "evaluateQuadraticSecondDerivative");
  function Qt(t18, e, n, r, o) {
    let s = o * o, a = s * o, m = 1 - o, u = m * m, p = u * m;
    return t18.scale(p).add(e.scale(3 * u * o)).add(n.scale(3 * m * s)).add(r.scale(a));
  }
  i(Qt, "evaluateBezier");
  function Po(t18, e, n, r, o) {
    let s = o * o, a = 1 - o, m = a * a;
    return e.sub(t18).scale(3 * m).add(n.sub(e).scale(6 * a * o)).add(r.sub(n).scale(3 * s));
  }
  i(Po, "evaluateBezierFirstDerivative");
  function Go(t18, e, n, r, o) {
    let s = 1 - o;
    return n.sub(e.scale(2)).add(t18).scale(6 * s).add(r.sub(n.scale(2)).add(e).scale(6 * o));
  }
  i(Go, "evaluateBezierSecondDerivative");
  function Ro(t18, e, n, r, o) {
    let s = 0.5 * (((-o + 2) * o - 1) * o), a = 0.5 * ((3 * o - 5) * o * o + 2), m = 0.5 * (((-3 * o + 4) * o + 1) * o), u = 0.5 * ((o - 1) * o * o);
    return t18.scale(s).add(e.scale(a)).add(n.scale(m)).add(r.scale(u));
  }
  i(Ro, "evaluateCatmullRom");
  function Mo(t18, e, n, r, o) {
    let s = 0.5 * ((-3 * o + 4) * o - 1), a = 0.5 * ((9 * o - 10) * o), m = 0.5 * ((-9 * o + 8) * o + 1), u = 0.5 * ((3 * o - 2) * o);
    return t18.scale(s).add(e.scale(a)).add(n.scale(m)).add(r.scale(u));
  }
  i(Mo, "evaluateCatmullRomFirstDerivative");
  function Do(t18) {
    let e = Tr(t18), n = e(1);
    return (r) => {
      let o = r * n, s = e(o, true);
      return t18(s);
    };
  }
  i(Do, "normalizedCurve");
  function Tr(t18, e = 10, n = 10) {
    let r = [0], o = [0], a = 1 / (e - 1) / n, m = 0, u = t18(0), p = 0;
    for (let c = 1; c < e; c++) {
      for (let f = 0; f < n; f++) {
        p += a;
        let d = t18(p), v = d.dist(u);
        m += v, u = d;
      }
      r[c] = m, o[c] = p;
    }
    return o[e - 1] = 1, (c, f = false) => {
      if (f) {
        let d = c;
        if (d <= 0) return 0;
        if (d >= m) return 1;
        let v = 0;
        for (; r[v + 1] < d; ) v++;
        let h = o[v], O = o[v + 1], y = r[v], w = r[v + 1], V = (d - y) / (w - y);
        return h + (O - h) * V;
      } else {
        if (c <= 0) return 0;
        if (c >= 1) return r[e - 1];
        let d = 0;
        for (; o[d + 1] < c; ) d++;
        let v = o[d], h = o[d + 1], O = r[d], y = r[d + 1], w = (c - v) / (h - v);
        return O + (y - O) * w;
      }
    };
  }
  i(Tr, "curveLengthApproximation");
  function Ft(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, s = -3 * t18 + 3 * r - 2 * e - n, a = e, m = t18;
    return (u) => {
      let p = u * u, c = p * u;
      return o * c + s * p + a * u + m;
    };
  }
  i(Ft, "hermite");
  function Ar(t18, e, n, r, o, s = Ft) {
    let a = s(e.x, (1 - o) * (n.x - t18.x), (1 - o) * (r.x - e.x), n.x), m = s(e.y, (1 - o) * (n.y - t18.y), (1 - o) * (r.y - e.y), n.y);
    return (u) => new C(a(u), m(u));
  }
  i(Ar, "cardinal");
  function Lt(t18, e, n, r, o = Ft) {
    return Ar(t18, e, n, r, 0.5, o);
  }
  i(Lt, "catmullRom");
  function Bo(t18, e, n, r, o = Ft) {
    return Lt(r.add(t18.sub(e).scale(6)), t18, r, t18.add(r.sub(n).scale(6)), o);
  }
  i(Bo, "bezier");
  function Fo(t18, e, n, r, o, s, a, m = Ft) {
    let u = m(e.x, 0.5 * (1 - o) * (1 + a) * (1 + s) * (e.x - t18.x) + 0.5 * (1 - o) * (1 - a) * (1 - s) * (n.x - e.x), 0.5 * (1 - o) * (1 + a) * (1 - s) * (n.x - e.x) + 0.5 * (1 - o) * (1 - a) * (1 + s) * (r.x - n.x), n.x), p = m(e.y, 0.5 * (1 - o) * (1 + a) * (1 + s) * (e.y - t18.y) + 0.5 * (1 - o) * (1 - a) * (1 - s) * (n.y - e.y), 0.5 * (1 - o) * (1 + a) * (1 - s) * (n.y - e.y) + 0.5 * (1 - o) * (1 - a) * (1 + s) * (r.y - n.y), n.y);
    return (c) => new C(u(c), p(c));
  }
  i(Fo, "kochanekBartels");
  function Lo(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, s = -3 * t18 + 3 * r - 2 * e + n, a = e;
    return (m) => {
      let u = m * m;
      return 3 * o * u + 2 * s * m + a;
    };
  }
  i(Lo, "hermiteFirstDerivative");
  function Yt(t18) {
    return 0 <= t18 && t18 <= 1;
  }
  i(Yt, "inZeroOneDomain");
  function gr(t18, e) {
    return Math.abs(t18 - e) <= Number.EPSILON;
  }
  i(gr, "approximately");
  function Wt(t18) {
    return t18 < 0 ? -Math.pow(-t18, 1 / 3) : Math.pow(t18, 1 / 3);
  }
  i(Wt, "cubeRoot");
  function Wa(t18, e, n, r) {
    let o = 3 * t18 - 6 * e + 3 * n, s = -3 * t18 + 3 * e, a = t18, m = -t18 + 3 * e - 3 * n + r;
    if (gr(m, 0)) {
      if (gr(o, 0)) return gr(s, 0) ? [] : [-a / s].filter(Yt);
      let w = Math.sqrt(s * s - 4 * o * a), V = 2 * o;
      return [(w - s) / V, (-s - w) / V].filter(Yt);
    }
    o /= m, s /= m, a /= m;
    let u = (3 * s - o * o) / 3, p = u / 3, c = (2 * o * o * o - 9 * o * s + 27 * a) / 27, f = c / 2, d = f * f + p * p * p;
    if (d < 0) {
      let w = -u / 3, V = w * w * w, R = Math.sqrt(V), P = -c / (2 * R), D = P < -1 ? -1 : P > 1 ? 1 : P, b = Math.acos(D), A = 2 * Wt(R), G = A * Math.cos(b / 3) - o / 3, M = A * Math.cos((b + 2 * Math.PI) / 3) - o / 3, F = A * Math.cos((b + 4 * Math.PI) / 3) - o / 3;
      return [G, M, F].filter(Yt);
    }
    if (d === 0) {
      let w = f < 0 ? Wt(-f) : -Wt(f), V = 2 * w - o / 3, R = -w - o / 3;
      return [V, R].filter(Yt);
    }
    let v = Math.sqrt(d), h = Wt(v - f), O = Wt(v + f);
    return [h - O - o / 3].filter(Yt);
  }
  i(Wa, "getCubicRoots");
  function $a(t18, e, n, r, o) {
    let s = Wa(t18.x - o, e.x - o, n.x - o, r.x - o);
    return s.length > 0 ? Qt(t18, e, n, r, s[0]).y : NaN;
  }
  i($a, "cubicBezierYforX");
  function Ko(t18) {
    if (!t18 || t18.length == 0) throw new Error("Need at least one point for easingLinear.");
    let e = t18.length;
    return (n) => {
      if (n <= 0 || t18.length == 1 || n <= t18[0].x) return t18[0].y;
      for (let r = 0; r < e; r++) if (t18[r].x >= n) return Se(n, t18[r - 1].x, t18[r].x, t18[r - 1].y, t18[r].y);
      return t18[t18.length - 1].y;
    };
  }
  i(Ko, "easingLinear");
  function Io(t18, e) {
    return (n) => $a(x(0, 0), t18, e, x(1, 1), n);
  }
  i(Io, "easingCubicBezier");
  function jo(t18, e = "jump-end") {
    let n = 1 / t18, r = e == "jump-start" || e == "jump-both", o = e == "jump-end" || e == "jump-both", s = 1 / (t18 + (o ? 1 : 0)), a = r ? s : 0;
    return (m) => {
      let u = Math.floor(m / n);
      return a + u * s;
    };
  }
  i(jo, "easingSteps");
  function ko(t18, e) {
    let n = Number.MAX_VALUE, r = { normal: x(0), distance: 0 };
    for (let o of [t18, e]) for (let s = 0; s < o.pts.length; s++) {
      let a = o.pts[s], u = o.pts[(s + 1) % o.pts.length].sub(a).normal().unit(), p = Number.MAX_VALUE, c = -Number.MAX_VALUE;
      for (let h = 0; h < t18.pts.length; h++) {
        let O = t18.pts[h].dot(u);
        p = Math.min(p, O), c = Math.max(c, O);
      }
      let f = Number.MAX_VALUE, d = -Number.MAX_VALUE;
      for (let h = 0; h < e.pts.length; h++) {
        let O = e.pts[h].dot(u);
        f = Math.min(f, O), d = Math.max(d, O);
      }
      let v = Math.min(c, d) - Math.max(p, f);
      if (v < 0) return null;
      if (v < Math.abs(n)) {
        let h = d - p, O = f - c;
        n = Math.abs(h) < Math.abs(O) ? h : O, r.normal = u, r.distance = n;
      }
    }
    return r;
  }
  i(ko, "sat");
  function _o(t18, e, n) {
    return (e.x - t18.x) * (n.y - t18.y) - (e.y - t18.y) * (n.x - t18.x) >= 0;
  }
  i(_o, "isOrientedCcw");
  function Xa(t18) {
    let e = 0, n = t18[t18.length - 1];
    for (let r = 0; r < t18.length; r++) e += (t18[r].x - n.x) * (t18[r].y + n.y), n = t18[r];
    return e < 0;
  }
  i(Xa, "isOrientedCcwPolygon");
  function br(t18, e, n, r) {
    let o = r.x - n.x, s = r.y - n.y, a = o * (t18.y - n.y) - s * (t18.x - n.x), m = o * (e.y - n.y) - s * (e.x - n.x);
    return a * m >= 0;
  }
  i(br, "onSameSide");
  function Qa(t18, e, n, r) {
    return br(t18, e, n, r) && br(t18, n, e, r) && br(t18, r, e, n);
  }
  i(Qa, "pointInTriangle");
  function Ja(t18, e, n, r) {
    for (let o of t18) if (o !== e && o !== n && o !== r && Qa(o, e, n, r)) return true;
    return false;
  }
  i(Ja, "someInTriangle");
  function Za(t18, e, n, r) {
    return _o(t18, e, n) && !Ja(r, t18, e, n);
  }
  i(Za, "isEar");
  function Rn(t18) {
    if (t18.length < 3) return [];
    if (t18.length == 3) return [t18];
    let e = [], n = [], r = 0;
    for (let f = 0; f < t18.length; f++) {
      let d = t18[r], v = t18[f];
      (v.x < d.x || v.x == d.x && v.y < d.y) && (r = r), e[f] = f + 1, n[f] = f - 1;
    }
    e[e.length - 1] = 0, n[0] = n.length - 1, Xa(t18) || ([e, n] = [n, e]);
    let o = [];
    for (let f = 0; f < t18.length; ++f) _o(t18[n[f]], t18[f], t18[e[f]]) || o.push(t18[f]);
    let s = [], a = t18.length, m = 1, u = 0, p, c;
    for (; a > 3; ) {
      p = e[m], c = n[m];
      let f = t18[c], d = t18[m], v = t18[p];
      if (Za(f, d, v, o)) s.push([f, d, v]), e[c] = p, n[p] = c, o.splice(o.indexOf(d), 1), --a, u = 0;
      else if (++u > a) return [];
      m = p;
    }
    return p = e[m], c = n[m], s.push([t18[c], t18[m], t18[p]]), s;
  }
  i(Rn, "triangulate");
  function No(t18) {
    if (t18.length < 3) return false;
    let e = t18.length - 2, n = t18.length - 1, r = 0, o = t18[n].sub(t18[e]), s = t18[r].sub(t18[n]), a = o.cross(s);
    for (; r + 1 < t18.length; ) if (e = n, n = r, r++, o = t18[n].sub(t18[e]), s = t18[r].sub(t18[n]), o.cross(s) * a < 0) return false;
    return true;
  }
  i(No, "isConvex");
  var Uo = i((t18) => t18[0] instanceof I, "arrayIsColor");
  var Ho = i((t18) => t18[0] instanceof C, "arrayIsVec2");
  var qo = i((t18) => typeof t18[0] == "number", "arrayIsNumber");
  var Kt = class {
    static {
      i(this, "BinaryHeap");
    }
    _items;
    _compareFn;
    constructor(e = (n, r) => n < r) {
      this._compareFn = e, this._items = [];
    }
    insert(e) {
      this._items.push(e), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0) return null;
      let e = this._items[0], n = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = n, this.moveDown(0)), e;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(e) {
      for (; e > 0; ) {
        let n = Math.floor((e - 1) / 2);
        if (!this._compareFn(this._items[e], this._items[n]) && this._items[e] >= this._items[n]) break;
        this.swap(e, n), e = n;
      }
    }
    moveDown(e) {
      for (; e < Math.floor(this._items.length / 2); ) {
        let n = 2 * e + 1;
        if (n < this._items.length - 1 && !this._compareFn(this._items[n], this._items[n + 1]) && ++n, this._compareFn(this._items[e], this._items[n])) break;
        this.swap(e, n), e = n;
      }
    }
    swap(e, n) {
      [this._items[e], this._items[n]] = [this._items[n], this._items[e]];
    }
    get length() {
      return this._items.length;
    }
  };
  function eu(t18) {
    let e = window.atob(t18), n = e.length, r = new Uint8Array(n);
    for (let o = 0; o < n; o++) r[o] = e.charCodeAt(o);
    return r.buffer;
  }
  i(eu, "base64ToArrayBuffer");
  function zo(t18) {
    return eu(t18.split(",")[1]);
  }
  i(zo, "dataURLToArrayBuffer");
  function Mn(t18, e) {
    let n = document.createElement("a");
    n.href = e, n.download = t18, n.click();
  }
  i(Mn, "download");
  function Sr(t18, e) {
    Mn(t18, "data:text/plain;charset=utf-8," + e);
  }
  i(Sr, "downloadText");
  function Yo(t18, e) {
    Sr(t18, JSON.stringify(e));
  }
  i(Yo, "downloadJSON");
  function Vr(t18, e) {
    let n = URL.createObjectURL(e);
    Mn(t18, n), URL.revokeObjectURL(n);
  }
  i(Vr, "downloadBlob");
  var Dn = i((t18) => t18.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var Wo = i((t18) => t18.split(".").slice(0, -1).join("."), "getFileName");
  function Bn(t18, e) {
    if (t18 === e) return true;
    let n = typeof t18, r = typeof e;
    if (n !== r) return false;
    if (n === "object" && r === "object" && t18 !== null && e !== null) {
      if (Array.isArray(t18) !== Array.isArray(e)) return false;
      let o = Object.keys(t18), s = Object.keys(e);
      if (o.length !== s.length) return false;
      for (let a of o) {
        let m = t18[a], u = e[a];
        if (!Bn(m, u)) return false;
      }
      return true;
    }
    return false;
  }
  i(Bn, "deepEq");
  var Jt = class extends Map {
    static {
      i(this, "Registry");
    }
    lastID = 0;
    push(e) {
      let n = this.lastID;
      return this.set(n, e), this.lastID++, n;
    }
    pushd(e) {
      let n = this.push(e);
      return () => this.delete(n);
    }
  };
  var ke = class t13 {
    static {
      i(this, "KEventController");
    }
    paused = false;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(e) {
      let n = new t13(() => e.forEach((r) => r.cancel()));
      return Object.defineProperty(n, "paused", { get: i(() => e[0].paused, "get"), set: i((r) => e.forEach((o) => o.paused = r), "set") }), n.paused = false, n;
    }
    static replace(e, n) {
      return e.cancel = () => n.cancel(), n.paused = e.paused, Object.defineProperty(e, "paused", { get: i(() => n.paused, "get"), set: i((r) => n.paused = r, "set") }), e;
    }
  };
  var ae = class {
    static {
      i(this, "KEvent");
    }
    handlers = new Jt();
    add(e) {
      let n = this.handlers.pushd((...o) => {
        r.paused || e(...o);
      }), r = new ke(n);
      return r;
    }
    addOnce(e) {
      let n = this.add((...r) => {
        n.cancel(), e(...r);
      });
      return n;
    }
    next() {
      return new Promise((e) => this.addOnce(e));
    }
    trigger(...e) {
      this.handlers.forEach((n) => n(...e));
    }
    numListeners() {
      return this.handlers.size;
    }
    clear() {
      this.handlers.clear();
    }
  };
  var ze = class {
    static {
      i(this, "KEventHandler");
    }
    handlers = {};
    registers = {};
    on(e, n) {
      return this.handlers[e] || (this.handlers[e] = new ae()), this.handlers[e].add(n);
    }
    onOnce(e, n) {
      let r = this.on(e, (...o) => {
        r.cancel(), n(...o);
      });
      return r;
    }
    next(e) {
      return new Promise((n) => {
        this.onOnce(e, (...r) => n(r[0]));
      });
    }
    trigger(e, ...n) {
      this.handlers[e] && this.handlers[e].trigger(...n);
    }
    remove(e) {
      delete this.handlers[e];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(e) {
      return this.handlers[e]?.numListeners() ?? 0;
    }
  };
  var $o = i((t18) => t18 instanceof Error ? t18.message : String(t18), "getErrorMessage");
  function Zt(t18, e) {
    return Number(t18.toFixed(e));
  }
  i(Zt, "toFixed");
  function me(t18, e) {
    return (...n) => {
      let r = n.length;
      if (r === t18.length) return t18(...n);
      if (r === e.length) return e(...n);
    };
  }
  i(me, "overload2");
  var tu = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
  function Qo(t18) {
    if (typeof t18 != "string") throw new TypeError("string cannot be undefined or null");
    let e = [], n = 0, r = 0;
    for (; n < t18.length; ) {
      if (r += nu(n + r, t18), cu(t18[n + r]) && r++, su(t18[n + r]) && r++, au(t18[n + r]) && r++, lu(t18[n + r])) {
        r++;
        continue;
      }
      e.push(t18.substring(n, n + r)), n += r, r = 0;
    }
    return e;
  }
  i(Qo, "runes");
  function nu(t18, e) {
    let n = e[t18];
    if (!ru(n) || t18 === e.length - 1) return 1;
    let r = n + e[t18 + 1], o = e.substring(t18 + 2, t18 + 5);
    return Xo(r) && Xo(o) ? 4 : ou(r) && uu(o) ? e.slice(t18).indexOf(String.fromCodePoint(917631)) + 2 : iu(o) ? 4 : 2;
  }
  i(nu, "nextUnits");
  function ru(t18) {
    return t18 && gt(t18[0].charCodeAt(0), 55296, 56319);
  }
  i(ru, "isFirstOfSurrogatePair");
  function Xo(t18) {
    return gt(Pr(t18), 127462, 127487);
  }
  i(Xo, "isRegionalIndicator");
  function ou(t18) {
    return gt(Pr(t18), 127988, 127988);
  }
  i(ou, "isSubdivisionFlag");
  function iu(t18) {
    return gt(Pr(t18), 127995, 127999);
  }
  i(iu, "isFitzpatrickModifier");
  function su(t18) {
    return typeof t18 == "string" && gt(t18.charCodeAt(0), 65024, 65039);
  }
  i(su, "isVariationSelector");
  function au(t18) {
    return typeof t18 == "string" && gt(t18.charCodeAt(0), 8400, 8447);
  }
  i(au, "isDiacriticalMark");
  function uu(t18) {
    let e = t18.codePointAt(0);
    return typeof t18 == "string" && typeof e == "number" && gt(e, 917504, 917631);
  }
  i(uu, "isSupplementarySpecialpurposePlane");
  function cu(t18) {
    return typeof t18 == "string" && tu.includes(t18.charCodeAt(0));
  }
  i(cu, "isGrapheme");
  function lu(t18) {
    return typeof t18 == "string" && t18.charCodeAt(0) === 8205;
  }
  i(lu, "isZeroWidthJoiner");
  function Pr(t18) {
    let e = t18.charCodeAt(0) - 55296, n = t18.charCodeAt(1) - 56320;
    return (e << 10) + n + 65536;
  }
  i(Pr, "codePointFromSurrogatePair");
  function gt(t18, e, n) {
    return t18 >= e && t18 <= n;
  }
  i(gt, "betweenInclusive");
  var De = i((t18, e) => Array.isArray(t18) ? t18?.includes(e) : t18 === e, "isEqOrIncludes");
  var Ye = i((t18, e) => Array.isArray(e) ? e.some((n) => t18.has(n)) : t18.has(e), "setHasOrIncludes");
  var en = i((t18, e, n) => {
    t18.has(e) ? t18.get(e)?.push(n) : t18.set(e, [n]);
  }, "mapAddOrPush");
  var Jo = /* @__PURE__ */ (() => {
    let t18 = 0;
    return () => t18++;
  })();
  var Zo = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var ei = i(() => lt.lastInputDevice, "getLastInputDeviceType");
  var ti = i(() => {
    let t18 = lt.buttons;
    for (let e in t18) {
      let n = t18[e].keyboard && [t18[e].keyboard].flat(), r = t18[e].keyboardCode && [t18[e].keyboardCode].flat(), o = t18[e].gamepad && [t18[e].gamepad].flat(), s = t18[e].mouse && [t18[e].mouse].flat();
      n && n.forEach((a) => {
        en(lt.buttonsByKey, a, e);
      }), r && r.forEach((a) => {
        en(lt.buttonsByKeyCode, a, e);
      }), o && o.forEach((a) => {
        en(lt.buttonsByGamepad, a, e);
      }), s && s.forEach((a) => {
        en(lt.buttonsByMouse, a, e);
      });
    }
  }, "parseButtonBindings");
  var bt = class {
    static {
      i(this, "ButtonState");
    }
    pressed = /* @__PURE__ */ new Set([]);
    pressedRepeat = /* @__PURE__ */ new Set([]);
    released = /* @__PURE__ */ new Set([]);
    down = /* @__PURE__ */ new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(e) {
      this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
    }
    pressRepeat(e) {
      this.pressedRepeat.add(e);
    }
    release(e) {
      this.down.delete(e), this.pressed.delete(e), this.released.add(e);
    }
  };
  var Gr = class {
    static {
      i(this, "GamepadState");
    }
    buttonState = new bt();
    stickState = /* @__PURE__ */ new Map();
  };
  var Rr = class {
    static {
      i(this, "FPSCounter");
    }
    dts = [];
    timer = 0;
    fps = 0;
    tick(e) {
      this.dts.push(e), this.timer += e, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((n, r) => n + r) / this.dts.length)), this.dts = []);
    }
  };
  var lt;
  var ni = Zo;
  var pu = i((t18) => {
    let e = t18.buttons ?? {};
    return { canvas: t18.canvas, buttons: e, buttonsByKey: /* @__PURE__ */ new Map(), buttonsByMouse: /* @__PURE__ */ new Map(), buttonsByGamepad: /* @__PURE__ */ new Map(), buttonsByKeyCode: /* @__PURE__ */ new Map(), loopID: null, stopped: false, dt: 0, fixedDt: 1 / 50, restDt: 0, time: 0, realTime: 0, fpsCounter: new Rr(), timeScale: 1, skipTime: false, isHidden: false, numFrames: 0, mousePos: new C(0), mouseDeltaPos: new C(0), keyState: new bt(), mouseState: new bt(), mergedGamepadState: new Gr(), gamepadStates: /* @__PURE__ */ new Map(), lastInputDevice: null, buttonState: new bt(), gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: t18.canvas.offsetWidth, lastHeight: t18.canvas.offsetHeight, events: new ze() };
  }, "initAppState");
  var ri = i((t18) => {
    if (!t18.canvas) throw new Error("Please provide a canvas");
    let e = pu(t18);
    lt = e, ti();
    function n() {
      return e.dt * e.timeScale;
    }
    i(n, "dt");
    function r() {
      return e.fixedDt * e.timeScale;
    }
    i(r, "fixedDt");
    function o() {
      return e.restDt * e.timeScale;
    }
    i(o, "restDt");
    function s() {
      return e.isHidden;
    }
    i(s, "isHidden");
    function a() {
      return e.time;
    }
    i(a, "time");
    function m() {
      return e.fpsCounter.fps;
    }
    i(m, "fps");
    function u() {
      return e.numFrames;
    }
    i(u, "numFrames");
    function p() {
      return e.canvas.toDataURL();
    }
    i(p, "screenshot");
    function c(g) {
      e.canvas.style.cursor = g;
    }
    i(c, "setCursor");
    function f() {
      return e.canvas.style.cursor;
    }
    i(f, "getCursor");
    function d(g) {
      if (g) try {
        let T = e.canvas.requestPointerLock();
        T.catch && T.catch((S) => console.error(S));
      } catch (T) {
        console.error(T);
      }
      else document.exitPointerLock();
    }
    i(d, "setCursorLocked");
    function v() {
      return !!document.pointerLockElement;
    }
    i(v, "isCursorLocked");
    function h(g) {
      g.requestFullscreen ? g.requestFullscreen() : g.webkitRequestFullscreen && g.webkitRequestFullscreen();
    }
    i(h, "enterFullscreen");
    function O() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    i(O, "exitFullscreen");
    function y(g = true) {
      g ? h(e.canvas) : O();
    }
    i(y, "setFullscreen");
    function w() {
      return document.fullscreenElement === e.canvas || document.webkitFullscreenElement === e.canvas;
    }
    i(w, "isFullscreen");
    function V() {
      e.stopped = true;
      let g = Object.entries(Ge), T = Object.entries(fr), S = Object.entries(On);
      for (let [B, ne] of g) e.canvas.removeEventListener(B, ne);
      for (let [B, ne] of T) document.removeEventListener(B, ne);
      for (let [B, ne] of S) window.removeEventListener(B, ne);
      uo.disconnect();
    }
    i(V, "quit");
    function R(g, T) {
      e.loopID !== null && cancelAnimationFrame(e.loopID);
      let S = 0, B = 0, ne = i((Ae) => {
        if (e.stopped) return;
        if (document.visibilityState !== "visible") {
          e.loopID = requestAnimationFrame(ne);
          return;
        }
        let oe = Ae / 1e3, Ze = Math.min(oe - e.realTime, 0.25), Rt = t18.maxFPS ? 1 / t18.maxFPS : 0;
        if (e.realTime = oe, B += Ze, B > Rt) {
          if (!e.skipTime) {
            for (S += B, e.dt = e.fixedDt, e.restDt = 0; S > e.fixedDt; ) S -= e.fixedDt, S < e.fixedDt && (e.restDt = S), g();
            e.restDt = S, e.dt = B, e.time += n(), e.fpsCounter.tick(e.dt);
          }
          B = 0, e.skipTime = false, e.numFrames++, T(Cn, Sa);
        }
        e.loopID = requestAnimationFrame(ne);
      }, "frame");
      ne(0);
    }
    i(R, "run");
    function P() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    i(P, "isTouchscreen");
    function D() {
      return e.mousePos.clone();
    }
    i(D, "mousePos");
    function b() {
      return e.mouseDeltaPos.clone();
    }
    i(b, "mouseDeltaPos");
    function E(g = "left") {
      return e.mouseState.pressed.has(g);
    }
    i(E, "isMousePressed");
    function A(g = "left") {
      return e.mouseState.down.has(g);
    }
    i(A, "isMouseDown");
    function G(g = "left") {
      return e.mouseState.released.has(g);
    }
    i(G, "isMouseReleased");
    function M() {
      return e.isMouseMoved;
    }
    i(M, "isMouseMoved");
    function F(g) {
      return g === void 0 ? e.keyState.pressed.size > 0 : Ye(e.keyState.pressed, g);
    }
    i(F, "isKeyPressed");
    function K(g) {
      return g === void 0 ? e.keyState.pressedRepeat.size > 0 : Ye(e.keyState.pressedRepeat, g);
    }
    i(K, "isKeyPressedRepeat");
    function H(g) {
      return g === void 0 ? e.keyState.down.size > 0 : Ye(e.keyState.down, g);
    }
    i(H, "isKeyDown");
    function q(g) {
      return g === void 0 ? e.keyState.released.size > 0 : Ye(e.keyState.released, g);
    }
    i(q, "isKeyReleased");
    function Y(g) {
      return g === void 0 ? e.mergedGamepadState.buttonState.pressed.size > 0 : Ye(e.mergedGamepadState.buttonState.pressed, g);
    }
    i(Y, "isGamepadButtonPressed");
    function N(g) {
      return g === void 0 ? e.mergedGamepadState.buttonState.down.size > 0 : Ye(e.mergedGamepadState.buttonState.down, g);
    }
    i(N, "isGamepadButtonDown");
    function j(g) {
      return g === void 0 ? e.mergedGamepadState.buttonState.released.size > 0 : Ye(e.mergedGamepadState.buttonState.released, g);
    }
    i(j, "isGamepadButtonReleased");
    function Z(g) {
      return g === void 0 ? e.buttonState.pressed.size > 0 : Ye(e.buttonState.pressed, g);
    }
    i(Z, "isButtonPressed");
    function $(g) {
      return g === void 0 ? e.buttonState.down.size > 0 : Ye(e.buttonState.down, g);
    }
    i($, "isButtonDown");
    function ee(g) {
      return g === void 0 ? e.buttonState.released.size > 0 : Ye(e.buttonState.released, g);
    }
    i(ee, "isButtonReleased");
    function Ee(g) {
      return e.buttons?.[g];
    }
    i(Ee, "getButton");
    function k(g, T) {
      e.buttons[g] = { ...e.buttons[g], ...T };
    }
    i(k, "setButton");
    function ft(g) {
      e.buttonState.press(g), e.events.trigger("buttonPress", g);
    }
    i(ft, "pressButton");
    function Pt(g) {
      e.buttonState.release(g), e.events.trigger("buttonRelease", g);
    }
    i(Pt, "releaseButton");
    function Ut(g) {
      return e.events.on("resize", g);
    }
    i(Ut, "onResize");
    let yn = me((g) => e.events.on("keyDown", g), (g, T) => e.events.on("keyDown", (S) => De(g, S) && T(S))), xn = me((g) => e.events.on("keyPress", (T) => g(T)), (g, T) => e.events.on("keyPress", (S) => De(g, S) && T(S))), ur = me((g) => e.events.on("keyPressRepeat", g), (g, T) => e.events.on("keyPressRepeat", (S) => De(g, S) && T(S))), cr = me((g) => e.events.on("keyRelease", g), (g, T) => e.events.on("keyRelease", (S) => De(g, S) && T(S))), Gt = me((g) => e.events.on("mouseDown", (T) => g(T)), (g, T) => e.events.on("mouseDown", (S) => De(g, S) && T(S))), $e = me((g) => e.events.on("mousePress", (T) => g(T)), (g, T) => e.events.on("mousePress", (S) => De(g, S) && T(S))), vn = me((g) => e.events.on("mouseRelease", (T) => g(T)), (g, T) => e.events.on("mouseRelease", (S) => S === g && T(S)));
    function L(g) {
      return e.events.on("mouseMove", () => g(D(), b()));
    }
    i(L, "onMouseMove");
    function U(g) {
      return e.events.on("charInput", g);
    }
    i(U, "onCharInput");
    function X(g) {
      return e.events.on("touchStart", g);
    }
    i(X, "onTouchStart");
    function re(g) {
      return e.events.on("touchMove", g);
    }
    i(re, "onTouchMove");
    function xe(g) {
      return e.events.on("touchEnd", g);
    }
    i(xe, "onTouchEnd");
    function J(g) {
      return e.events.on("scroll", g);
    }
    i(J, "onScroll");
    function we(g) {
      return e.events.on("hide", g);
    }
    i(we, "onHide");
    function Ht(g) {
      return e.events.on("show", g);
    }
    i(Ht, "onShow");
    let at = me((g) => e.events.on("gamepadButtonPress", (T, S) => g(T, S)), (g, T) => e.events.on("gamepadButtonPress", (S, B) => De(g, S) && T(S, B))), lr = me((g) => e.events.on("gamepadButtonDown", (T, S) => g(T, S)), (g, T) => e.events.on("gamepadButtonDown", (S, B) => De(g, S) && T(S, B))), mr = me((g) => e.events.on("gamepadButtonRelease", (T, S) => g(T, S)), (g, T) => e.events.on("gamepadButtonRelease", (S, B) => De(g, S) && T(S, B)));
    function pr(g, T) {
      return e.events.on("gamepadStick", (S, B, ne) => S === g && T(B, ne));
    }
    i(pr, "onGamepadStick");
    function dr(g) {
      e.events.on("gamepadConnect", g);
    }
    i(dr, "onGamepadConnect");
    function wn(g) {
      e.events.on("gamepadDisconnect", g);
    }
    i(wn, "onGamepadDisconnect");
    function Xe(g) {
      return e.mergedGamepadState.stickState.get(g) || new C(0);
    }
    i(Xe, "getGamepadStick");
    function ut() {
      return [...e.charInputted];
    }
    i(ut, "charInputted");
    function qt() {
      return [...e.gamepads];
    }
    i(qt, "getGamepads");
    let Ie = me((g) => e.events.on("buttonPress", (T) => g(T)), (g, T) => e.events.on("buttonPress", (S) => De(g, S) && T(S))), zt = me((g) => e.events.on("buttonDown", (T) => g(T)), (g, T) => e.events.on("buttonDown", (S) => De(g, S) && T(S))), Je = me((g) => e.events.on("buttonRelease", (T) => g(T)), (g, T) => e.events.on("buttonRelease", (S) => De(g, S) && T(S)));
    function Cn() {
      e.events.trigger("input"), e.keyState.down.forEach((g) => e.events.trigger("keyDown", g)), e.mouseState.down.forEach((g) => e.events.trigger("mouseDown", g)), e.buttonState.down.forEach((g) => {
        e.events.trigger("buttonDown", g);
      }), Pa();
    }
    i(Cn, "processInput");
    function Sa() {
      e.keyState.update(), e.mouseState.update(), e.buttonState.update(), e.mergedGamepadState.buttonState.update(), e.mergedGamepadState.stickState.forEach((g, T) => {
        e.mergedGamepadState.stickState.set(T, new C(0));
      }), e.charInputted = [], e.isMouseMoved = false, e.mouseDeltaPos = new C(0), e.gamepadStates.forEach((g) => {
        g.buttonState.update(), g.stickState.forEach((T, S) => {
          g.stickState.set(S, new C(0));
        });
      });
    }
    i(Sa, "resetInput");
    function oo(g) {
      let T = { index: g.index, isPressed: i((S) => e.gamepadStates.get(g.index)?.buttonState.pressed.has(S) || false, "isPressed"), isDown: i((S) => e.gamepadStates.get(g.index)?.buttonState.down.has(S) || false, "isDown"), isReleased: i((S) => e.gamepadStates.get(g.index)?.buttonState.released.has(S) || false, "isReleased"), getStick: i((S) => e.gamepadStates.get(g.index)?.stickState.get(S) || x(), "getStick") };
      return e.gamepads.push(T), e.gamepadStates.set(g.index, { buttonState: new bt(), stickState: /* @__PURE__ */ new Map([["left", new C(0)], ["right", new C(0)]]) }), T;
    }
    i(oo, "registerGamepad");
    function Va(g) {
      e.gamepads = e.gamepads.filter((T) => T.index !== g.index), e.gamepadStates.delete(g.index);
    }
    i(Va, "removeGamepad");
    function Pa() {
      for (let g of navigator.getGamepads()) g && !e.gamepadStates.has(g.index) && oo(g);
      for (let g of e.gamepads) {
        let T = navigator.getGamepads()[g.index];
        if (!T) continue;
        let B = (t18.gamepads ?? {})[T.id] || ni[T.id] || ni.default, ne = e.gamepadStates.get(g.index);
        if (ne) {
          for (let Ae = 0; Ae < T.buttons.length; Ae++) {
            let oe = B.buttons[Ae], Ze = T.buttons[Ae], Rt = e.buttonsByGamepad.has(oe);
            if (Ze.pressed) {
              if (ne.buttonState.down.has(oe)) {
                e.events.trigger("gamepadButtonDown", oe, g);
                continue;
              }
              e.lastInputDevice = "gamepad", Rt && e.buttonsByGamepad.get(oe)?.forEach((Re) => {
                e.buttonState.press(Re), e.events.trigger("buttonPress", Re);
              }), e.mergedGamepadState.buttonState.press(oe), ne.buttonState.press(oe), e.events.trigger("gamepadButtonPress", oe, g);
            } else ne.buttonState.down.has(oe) && (Rt && e.buttonsByGamepad.get(oe)?.forEach((Re) => {
              e.buttonState.release(Re), e.events.trigger("buttonRelease", Re);
            }), e.mergedGamepadState.buttonState.release(oe), ne.buttonState.release(oe), e.events.trigger("gamepadButtonRelease", oe, g));
          }
          for (let Ae in B.sticks) {
            let oe = B.sticks[Ae];
            if (!oe) continue;
            let Ze = new C(T.axes[oe.x], T.axes[oe.y]);
            ne.stickState.set(Ae, Ze), e.mergedGamepadState.stickState.set(Ae, Ze), e.events.trigger("gamepadStick", Ae, Ze, g);
          }
        }
      }
    }
    i(Pa, "processGamepad");
    let Ge = {}, fr = {}, On = {}, io = t18.pixelDensity || 1;
    Ge.mousemove = (g) => {
      let T = new C(g.offsetX, g.offsetY), S = new C(g.movementX, g.movementY);
      if (w()) {
        let B = e.canvas.width / io, ne = e.canvas.height / io, Ae = window.innerWidth, oe = window.innerHeight, Ze = Ae / oe, Rt = B / ne;
        if (Ze > Rt) {
          let Re = oe / ne, hr = (Ae - B * Re) / 2;
          T.x = Se(g.offsetX - hr, 0, B * Re, 0, B), T.y = Se(g.offsetY, 0, ne * Re, 0, ne);
        } else {
          let Re = Ae / B, hr = (oe - ne * Re) / 2;
          T.x = Se(g.offsetX, 0, B * Re, 0, B), T.y = Se(g.offsetY - hr, 0, ne * Re, 0, ne);
        }
      }
      e.events.onOnce("input", () => {
        e.isMouseMoved = true, e.mousePos = T, e.mouseDeltaPos = S, e.events.trigger("mouseMove");
      });
    };
    let so = ["left", "middle", "right", "back", "forward"];
    Ge.mousedown = (g) => {
      e.events.onOnce("input", () => {
        let T = so[g.button];
        T && (e.lastInputDevice = "mouse", e.buttonsByMouse.has(T) && e.buttonsByMouse.get(T)?.forEach((S) => {
          e.buttonState.press(S), e.events.trigger("buttonPress", S);
        }), e.mouseState.press(T), e.events.trigger("mousePress", T));
      });
    }, Ge.mouseup = (g) => {
      e.events.onOnce("input", () => {
        let T = so[g.button];
        T && (e.buttonsByMouse.has(T) && e.buttonsByMouse.get(T)?.forEach((S) => {
          e.buttonState.release(S), e.events.trigger("buttonRelease", S);
        }), e.mouseState.release(T), e.events.trigger("mouseRelease", T));
      });
    };
    let Ga = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), ao = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
    Ge.keydown = (g) => {
      Ga.has(g.key) && g.preventDefault(), e.events.onOnce("input", () => {
        let T = ao[g.key] || g.key.toLowerCase(), S = g.code;
        if (T === void 0) throw new Error(`Unknown key: ${g.key}`);
        T.length === 1 ? (e.events.trigger("charInput", T), e.charInputted.push(T)) : T === "space" && (e.events.trigger("charInput", " "), e.charInputted.push(" ")), g.repeat ? (e.keyState.pressRepeat(T), e.events.trigger("keyPressRepeat", T)) : (e.lastInputDevice = "keyboard", e.buttonsByKey.has(T) && e.buttonsByKey.get(T)?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.buttonsByKeyCode.has(S) && e.buttonsByKeyCode.get(S)?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.keyState.press(T), e.events.trigger("keyPressRepeat", T), e.events.trigger("keyPress", T));
      });
    }, Ge.keyup = (g) => {
      e.events.onOnce("input", () => {
        let T = ao[g.key] || g.key.toLowerCase(), S = g.code;
        e.buttonsByKey.has(T) && e.buttonsByKey.get(T)?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.buttonsByKeyCode.has(S) && e.buttonsByKeyCode.get(S)?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.keyState.release(T), e.events.trigger("keyRelease", T);
      });
    }, Ge.touchstart = (g) => {
      g.preventDefault(), e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new C(T[0].clientX - S.x, T[0].clientY - S.y), e.lastInputDevice = "mouse", e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.mouseState.press("left"), e.events.trigger("mousePress", "left")), T.forEach((B) => {
          e.events.trigger("touchStart", new C(B.clientX - S.x, B.clientY - S.y), B);
        });
      });
    }, Ge.touchmove = (g) => {
      g.preventDefault(), e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S = e.canvas.getBoundingClientRect();
        if (t18.touchToMouse !== false) {
          let B = e.mousePos;
          e.mousePos = new C(T[0].clientX - S.x, T[0].clientY - S.y), e.mouseDeltaPos = e.mousePos.sub(B), e.events.trigger("mouseMove");
        }
        T.forEach((B) => {
          e.events.trigger("touchMove", new C(B.clientX - S.x, B.clientY - S.y), B);
        });
      });
    }, Ge.touchend = (g) => {
      e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new C(T[0].clientX - S.x, T[0].clientY - S.y), e.mouseDeltaPos = new C(0, 0), e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), T.forEach((B) => {
          e.events.trigger("touchEnd", new C(B.clientX - S.x, B.clientY - S.y), B);
        });
      });
    }, Ge.touchcancel = (g) => {
      e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new C(T[0].clientX - S.x, T[0].clientY - S.y), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), T.forEach((B) => {
          e.events.trigger("touchEnd", new C(B.clientX - S.x, B.clientY - S.y), B);
        });
      });
    }, Ge.wheel = (g) => {
      g.preventDefault(), e.events.onOnce("input", () => {
        e.events.trigger("scroll", new C(g.deltaX, g.deltaY));
      });
    }, Ge.contextmenu = (g) => g.preventDefault(), fr.visibilitychange = () => {
      document.visibilityState === "visible" ? (e.skipTime = true, e.isHidden = false, e.events.trigger("show")) : (e.isHidden = true, e.events.trigger("hide"));
    }, On.gamepadconnected = (g) => {
      let T = oo(g.gamepad);
      e.events.onOnce("input", () => {
        e.events.trigger("gamepadConnect", T);
      });
    }, On.gamepaddisconnected = (g) => {
      let T = qt().filter((S) => S.index === g.gamepad.index)[0];
      Va(g.gamepad), e.events.onOnce("input", () => {
        e.events.trigger("gamepadDisconnect", T);
      });
    };
    for (let [g, T] of Object.entries(Ge)) e.canvas.addEventListener(g, T);
    for (let [g, T] of Object.entries(fr)) document.addEventListener(g, T);
    for (let [g, T] of Object.entries(On)) window.addEventListener(g, T);
    let uo = new ResizeObserver((g) => {
      for (let T of g) if (T.target === e.canvas) {
        if (e.lastWidth === e.canvas.offsetWidth && e.lastHeight === e.canvas.offsetHeight) return;
        e.lastWidth = e.canvas.offsetWidth, e.lastHeight = e.canvas.offsetHeight, e.events.onOnce("input", () => {
          e.events.trigger("resize");
        });
      }
    });
    return uo.observe(e.canvas), { state: e, dt: n, fixedDt: r, restDt: o, time: a, run: R, canvas: e.canvas, fps: m, numFrames: u, quit: V, isHidden: s, setFullscreen: y, isFullscreen: w, setCursor: c, screenshot: p, getGamepads: qt, getCursor: f, setCursorLocked: d, isCursorLocked: v, isTouchscreen: P, mousePos: D, mouseDeltaPos: b, isKeyDown: H, isKeyPressed: F, isKeyPressedRepeat: K, isKeyReleased: q, isMouseDown: A, isMousePressed: E, isMouseReleased: G, isMouseMoved: M, isGamepadButtonPressed: Y, isGamepadButtonDown: N, isGamepadButtonReleased: j, getGamepadStick: Xe, isButtonPressed: Z, isButtonDown: $, isButtonReleased: ee, setButton: k, getButton: Ee, pressButton: ft, releaseButton: Pt, charInputted: ut, onResize: Ut, onKeyDown: yn, onKeyPress: xn, onKeyPressRepeat: ur, onKeyRelease: cr, onMouseDown: Gt, onMousePress: $e, onMouseRelease: vn, onMouseMove: L, onCharInput: U, onTouchStart: X, onTouchMove: re, onTouchEnd: xe, onScroll: J, onHide: we, onShow: Ht, onGamepadButtonDown: lr, onGamepadButtonPress: at, onGamepadButtonRelease: mr, onGamepadStick: pr, onGamepadConnect: dr, onGamepadDisconnect: wn, onButtonPress: Ie, onButtonDown: zt, onButtonRelease: Je, getLastInputDeviceType: ei, events: e.events };
  }, "initApp");
  function te() {
    return l.app.dt();
  }
  i(te, "dt");
  function tn() {
    return l.app.fixedDt();
  }
  i(tn, "fixedDt");
  function nn() {
    return l.app.restDt();
  }
  i(nn, "restDt");
  var du = new C(-1, -1);
  var fu = new C(0, -1);
  var hu = new C(1, -1);
  var gu = new C(-1, 0);
  var bu = new C(0, 0);
  var yu = new C(1, 0);
  var xu = new C(-1, 1);
  var vu = new C(0, 1);
  var wu = new C(1, 1);
  function _e(t18) {
    switch (t18) {
      case "topleft":
        return du;
      case "top":
        return fu;
      case "topright":
        return hu;
      case "left":
        return gu;
      case "center":
        return bu;
      case "right":
        return yu;
      case "botleft":
        return xu;
      case "bot":
        return vu;
      case "botright":
        return wu;
      default:
        return t18;
    }
  }
  i(_e, "anchorPt");
  function oi(t18) {
    switch (t18) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  i(oi, "alignPt");
  function ii(t18) {
    return t18.createBuffer(1, 1, 44100);
  }
  i(ii, "createEmptyAudioBuffer");
  var Fn = 2.5949095;
  var si = 1.70158 + 1;
  var ai = 2 * Math.PI / 3;
  var ui = 2 * Math.PI / 4.5;
  var Ln = { linear: i((t18) => t18, "linear"), easeInSine: i((t18) => 1 - Math.cos(t18 * Math.PI / 2), "easeInSine"), easeOutSine: i((t18) => Math.sin(t18 * Math.PI / 2), "easeOutSine"), easeInOutSine: i((t18) => -(Math.cos(Math.PI * t18) - 1) / 2, "easeInOutSine"), easeInQuad: i((t18) => t18 * t18, "easeInQuad"), easeOutQuad: i((t18) => 1 - (1 - t18) * (1 - t18), "easeOutQuad"), easeInOutQuad: i((t18) => t18 < 0.5 ? 2 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 2) / 2, "easeInOutQuad"), easeInCubic: i((t18) => t18 * t18 * t18, "easeInCubic"), easeOutCubic: i((t18) => 1 - Math.pow(1 - t18, 3), "easeOutCubic"), easeInOutCubic: i((t18) => t18 < 0.5 ? 4 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 3) / 2, "easeInOutCubic"), easeInQuart: i((t18) => t18 * t18 * t18 * t18, "easeInQuart"), easeOutQuart: i((t18) => 1 - Math.pow(1 - t18, 4), "easeOutQuart"), easeInOutQuart: i((t18) => t18 < 0.5 ? 8 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 4) / 2, "easeInOutQuart"), easeInQuint: i((t18) => t18 * t18 * t18 * t18 * t18, "easeInQuint"), easeOutQuint: i((t18) => 1 - Math.pow(1 - t18, 5), "easeOutQuint"), easeInOutQuint: i((t18) => t18 < 0.5 ? 16 * t18 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 5) / 2, "easeInOutQuint"), easeInExpo: i((t18) => t18 === 0 ? 0 : Math.pow(2, 10 * t18 - 10), "easeInExpo"), easeOutExpo: i((t18) => t18 === 1 ? 1 : 1 - Math.pow(2, -10 * t18), "easeOutExpo"), easeInOutExpo: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? Math.pow(2, 20 * t18 - 10) / 2 : (2 - Math.pow(2, -20 * t18 + 10)) / 2, "easeInOutExpo"), easeInCirc: i((t18) => 1 - Math.sqrt(1 - Math.pow(t18, 2)), "easeInCirc"), easeOutCirc: i((t18) => Math.sqrt(1 - Math.pow(t18 - 1, 2)), "easeOutCirc"), easeInOutCirc: i((t18) => t18 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t18, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t18 + 2, 2)) + 1) / 2, "easeInOutCirc"), easeInBack: i((t18) => si * t18 * t18 * t18 - 1.70158 * t18 * t18, "easeInBack"), easeOutBack: i((t18) => 1 + si * Math.pow(t18 - 1, 3) + 1.70158 * Math.pow(t18 - 1, 2), "easeOutBack"), easeInOutBack: i((t18) => t18 < 0.5 ? Math.pow(2 * t18, 2) * ((Fn + 1) * 2 * t18 - Fn) / 2 : (Math.pow(2 * t18 - 2, 2) * ((Fn + 1) * (t18 * 2 - 2) + Fn) + 2) / 2, "easeInOutBack"), easeInElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : -Math.pow(2, 10 * t18 - 10) * Math.sin((t18 * 10 - 10.75) * ai), "easeInElastic"), easeOutElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : Math.pow(2, -10 * t18) * Math.sin((t18 * 10 - 0.75) * ai) + 1, "easeOutElastic"), easeInOutElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? -(Math.pow(2, 20 * t18 - 10) * Math.sin((20 * t18 - 11.125) * ui)) / 2 : Math.pow(2, -20 * t18 + 10) * Math.sin((20 * t18 - 11.125) * ui) / 2 + 1, "easeInOutElastic"), easeInBounce: i((t18) => 1 - Ln.easeOutBounce(1 - t18), "easeInBounce"), easeOutBounce: i((t18) => t18 < 1 / 2.75 ? 7.5625 * t18 * t18 : t18 < 2 / 2.75 ? 7.5625 * (t18 -= 1.5 / 2.75) * t18 + 0.75 : t18 < 2.5 / 2.75 ? 7.5625 * (t18 -= 2.25 / 2.75) * t18 + 0.9375 : 7.5625 * (t18 -= 2.625 / 2.75) * t18 + 0.984375, "easeOutBounce"), easeInOutBounce: i((t18) => t18 < 0.5 ? (1 - Ln.easeOutBounce(1 - 2 * t18)) / 2 : (1 + Ln.easeOutBounce(2 * t18 - 1)) / 2, "easeInOutBounce") };
  var tt = Ln;
  function Cu(t18, e, n) {
    let r = [], o = e;
    for (r.push(o); o !== t18; ) {
      if (o = n.get(o), o == null) return null;
      r.push(o);
    }
    return r.reverse();
  }
  i(Cu, "buildPath");
  function Mr(t18, e, n) {
    let r = new Kt((a, m) => a.cost < m.cost);
    r.insert({ cost: 0, node: e });
    let o = /* @__PURE__ */ new Map();
    o.set(e, e);
    let s = /* @__PURE__ */ new Map();
    for (s.set(e, 0); r.length !== 0; ) {
      let a = r.remove()?.node;
      if (a === n) break;
      let m = t18.getNeighbours(a);
      for (let u of m) {
        let p = (s.get(a) || 0) + t18.getCost(a, u) + t18.getHeuristic(u, n);
        (!s.has(u) || p < s.get(u)) && (s.set(u, p), r.insert({ cost: p, node: u }), o.set(u, a));
      }
    }
    return Cu(e, n, o);
  }
  i(Mr, "aStarSearch");
  var Dr = class {
    static {
      i(this, "NavEdge");
    }
    a;
    b;
    polygon;
    constructor(e, n, r) {
      this.a = e, this.b = n, this.polygon = new WeakRef(r);
    }
    isLeft(e, n) {
      return (this.b.x - this.a.x) * (n - this.a.y) - (e - this.a.x) * (this.b.y - this.a.y);
    }
    get middle() {
      return this.a.add(this.b).scale(0.5);
    }
  };
  var Br = class {
    static {
      i(this, "NavPolygon");
    }
    _edges;
    _centroid;
    _id;
    constructor(e) {
      this._id = e;
    }
    get id() {
      return this._id;
    }
    set edges(e) {
      this._edges = e;
      let n = 0, r = 0, o = 0;
      for (let s of this._edges) {
        s.polygon = new WeakRef(this);
        let a = s.a.x * s.b.y - s.a.y * s.b.x;
        n += (s.a.x + s.b.x) * a, r += (s.a.y + s.b.y) * a, o += a;
      }
      o /= 2, this._centroid = x(n / (6 * o), r / (6 * o));
    }
    get edges() {
      return this._edges;
    }
    get centroid() {
      return this._centroid;
    }
    contains(e) {
      let n = false;
      for (let r of this.edges) r.b.y > e.y != r.a.y > e.y && e.x < (r.a.x - r.b.x) * (e.y - r.b.y) / (r.a.y - r.b.y) + r.b.x && (n = !n);
      return n;
    }
  };
  var Kn = class {
    static {
      i(this, "NavMesh");
    }
    _polygons;
    _pointCache;
    _edgeCache;
    constructor() {
      this._polygons = [], this._pointCache = {}, this._edgeCache = {};
    }
    _addPoint(e) {
      let n = this._pointCache[`${e.x}_${e.y}`];
      return n || (n = e.clone(), this._pointCache[`${e.x}_${e.y}`] = n, n);
    }
    _addEdge(e) {
      let n = `${e.a.x}_${e.a.y}-${e.b.x}_${e.b.y}`;
      return this._edgeCache[n] = e, e;
    }
    _findEdge(e, n) {
      let r = `${e.x}_${e.y}-${n.x}_${n.y}`;
      return this._edgeCache[r];
    }
    _findCommonEdge(e, n) {
      for (let r of e.edges) {
        let o = this._findEdge(r.b, r.a);
        if (o && o.polygon.deref().id === n.id) return o;
      }
      return null;
    }
    addPolygon(e) {
      let n = new Br(this._polygons.length), r = e.map((o, s) => new Dr(o, e[(s + 1) % e.length], n));
      n.edges = r, this._polygons.push(n);
      for (let o of n.edges) this._addEdge(o);
      return n;
    }
    addRect(e, n) {
      let r = this._addPoint(e), o = this._addPoint(e.add(n.x, 0)), s = this._addPoint(e.add(n)), a = this._addPoint(e.add(0, n.y));
      return this.addPolygon([r, o, s, a]);
    }
    _getLocation(e) {
      for (let n of this._polygons) if (n.contains(e)) return n;
      return null;
    }
    getNeighbours(e) {
      let n = [];
      for (let r of this._polygons[e].edges) {
        let o = this._findEdge(r.b, r.a);
        if (o) {
          let s = o.polygon.deref();
          s && n.push(s.id);
        }
      }
      return n;
    }
    getCost(e, n) {
      return 1;
    }
    getHeuristic(e, n) {
      let r = this._polygons[e], o = this._polygons[n], s = r.centroid.x - o.centroid.x, a = r.centroid.y - o.centroid.y;
      return Math.sqrt(s * s + a * a);
    }
    getPath(e, n) {
      return e === void 0 || n === void 0 ? [] : e === n ? [e, n] : Mr(this, e, n);
    }
    getWaypointPath(e, n, r) {
      let o = r?.type || "centroids", s = this._getLocation(e), a = this._getLocation(n);
      if (s === void 0 || a === void 0) return [];
      let m = this.getPath(s.id, a.id);
      if (!m) return [];
      if (o === "edges") {
        let u = [];
        for (let p = 1; p < m.length; p++) {
          let c = this._polygons[m[p - 1]], f = this._polygons[m[p]], d = this._findCommonEdge(c, f);
          u.push(d.middle.add(f.centroid.sub(d.middle).unit().scale(4)));
        }
        return [e, ...u, n];
      } else return [e, ...m.slice(1, -1).map((u) => this._polygons[u].centroid), n];
    }
  };
  function mt(t18) {
    let e = new he();
    return t18.pos && e.translate(t18.pos), t18.scale && e.scale(t18.scale), t18.angle && e.rotate(t18.angle), t18.parent ? e.mult(t18.parent.transform) : e;
  }
  i(mt, "calcTransform");
  function ci(t18) {
    return new C(t18.x / ie() * 2 - 1, -t18.y / ue() * 2 + 1);
  }
  i(ci, "screen2ndc");
  function yt(t18, e, n, r, o, s = 1) {
    r = se(r % 360), o = se(o % 360), o <= r && (o += Math.PI * 2);
    let a = [], m = Math.ceil((o - r) / se(8) * s), u = (o - r) / m, p = x(Math.cos(r), Math.sin(r)), c = x(Math.cos(u), Math.sin(u));
    for (let f = 0; f <= m; f++) a.push(t18.add(e * p.x, n * p.y)), p = x(p.x * c.x - p.y * c.y, p.x * c.y + p.y * c.x);
    return a;
  }
  i(yt, "getArcPts");
  function li(...t18) {
    let e = _(...t18), n = t18[3] ?? 1;
    l.gfx.bgColor = e, l.gfx.bgAlpha = n, l.gfx.ggl.gl.clearColor(e.r / 255, e.g / 255, e.b / 255, n);
  }
  i(li, "setBackground");
  function mi() {
    return l.gfx.bgColor?.clone?.() ?? null;
  }
  i(mi, "getBackground");
  function Q(...t18) {
    if (t18[0] === void 0) return;
    let e = x(...t18);
    e.x === 0 && e.y === 0 || l.gfx.transform.translate(e);
  }
  i(Q, "pushTranslate");
  function be() {
    l.gfx.transformStack.push(l.gfx.transform.clone());
  }
  i(be, "pushTransform");
  function pi(t18) {
    l.gfx.transform = t18.clone();
  }
  i(pi, "pushMatrix");
  function nt(...t18) {
    if (t18[0] === void 0) return;
    let e = x(...t18);
    e.x === 1 && e.y === 1 || l.gfx.transform.scale(e);
  }
  i(nt, "pushScale");
  function We(t18) {
    t18 && l.gfx.transform.rotate(t18);
  }
  i(We, "pushRotate");
  function pe() {
    l.gfx.transformStack.length > 0 && (l.gfx.transform = l.gfx.transformStack.pop());
  }
  i(pe, "popTransform");
  function Oe() {
    l.gfx.renderer.flush();
  }
  i(Oe, "flush");
  function ie() {
    return l.gfx.width;
  }
  i(ie, "width");
  function ue() {
    return l.gfx.height;
  }
  i(ue, "height");
  function In() {
    return (l.gfx.viewport.width + l.gfx.viewport.height) / (l.gfx.width + l.gfx.height);
  }
  i(In, "getViewportScale");
  function di(t18) {
    return new C(t18.x * l.gfx.viewport.width / l.gfx.width, t18.y * l.gfx.viewport.height / l.gfx.height);
  }
  i(di, "contentToView");
  function Ou(t18) {
    return new C((t18.x - l.gfx.viewport.x) * ie() / l.gfx.viewport.width, (t18.y - l.gfx.viewport.y) * ue() / l.gfx.viewport.height);
  }
  i(Ou, "windowToContent");
  function jn() {
    return Ou(l.app.mousePos());
  }
  i(jn, "mousePos");
  function xt() {
    return x(ie() / 2, ue() / 2);
  }
  i(xt, "center");
  var kn = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var pt = "topleft";
  var fi = "monospace";
  var vt = "monospace";
  var rn = "linear";
  var on = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var Eu = on.reduce((t18, e) => t18 + e.size, 0);
  var hi = 2048;
  var gi = hi * 4 * Eu;
  var bi = hi * 6;
  var yi = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var xi = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var sn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var an = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var vi = /* @__PURE__ */ new Set(["id", "require"]);
  var wi = /* @__PURE__ */ new Set(["add", "fixedUpdate", "update", "draw", "destroy", "inspect", "drawInspect"]);
  var Ci = 200;
  var Oi = 640;
  var Ei = 65536;
  var un = class {
    static {
      i(this, "TexPacker");
    }
    textures = [];
    bigTextures = [];
    canvas;
    c2d;
    x = 0;
    y = 0;
    curHeight = 0;
    gfx;
    constructor(e, n, r) {
      this.gfx = e, this.canvas = document.createElement("canvas"), this.canvas.width = n, this.canvas.height = r, this.textures = [Ve.fromImage(e, this.canvas)], this.bigTextures = [];
      let o = this.canvas.getContext("2d");
      if (!o) throw new Error("Failed to get 2d context");
      this.c2d = o;
    }
    add(e) {
      if (e.width > this.canvas.width || e.height > this.canvas.height) {
        let o = Ve.fromImage(this.gfx, e);
        return this.bigTextures.push(o), [o, new z(0, 0, 1, 1)];
      }
      this.x + e.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + e.height > this.canvas.height && (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height), this.textures.push(Ve.fromImage(this.gfx, this.canvas)), this.x = 0, this.y = 0, this.curHeight = 0);
      let n = this.textures[this.textures.length - 1], r = new C(this.x, this.y);
      return this.x += e.width, e.height > this.curHeight && (this.curHeight = e.height), e instanceof ImageData ? this.c2d.putImageData(e, r.x, r.y) : this.c2d.drawImage(e, r.x, r.y), n.update(this.canvas), [n, new z(r.x / this.canvas.width, r.y / this.canvas.height, e.width / this.canvas.width, e.height / this.canvas.height)];
    }
    free() {
      for (let e of this.textures) e.free();
      for (let e of this.bigTextures) e.free();
    }
  };
  function de(t18) {
    return typeof t18 != "string" || Dn(t18) ? t18 : l.assets.urlPrefix + t18;
  }
  i(de, "fixURL");
  var ce = class t14 {
    static {
      i(this, "Asset");
    }
    loaded = false;
    data = null;
    error = null;
    onLoadEvents = new ae();
    onErrorEvents = new ae();
    onFinishEvents = new ae();
    constructor(e) {
      e.then((n) => {
        this.loaded = true, this.data = n, this.onLoadEvents.trigger(n);
      }).catch((n) => {
        if (this.error = n, this.onErrorEvents.numListeners() > 0) this.onErrorEvents.trigger(n);
        else throw n;
      }).finally(() => {
        this.onFinishEvents.trigger(), this.loaded = true;
      });
    }
    static loaded(e) {
      let n = new t14(Promise.resolve(e));
      return n.data = e, n.loaded = true, n;
    }
    onLoad(e) {
      return this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e), this;
    }
    onError(e) {
      return this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e), this;
    }
    onFinish(e) {
      return this.loaded ? e() : this.onFinishEvents.add(e), this;
    }
    then(e) {
      return this.onLoad(e);
    }
    catch(e) {
      return this.onError(e);
    }
    finally(e) {
      return this.onFinish(e);
    }
  };
  var dt = class {
    static {
      i(this, "AssetBucket");
    }
    assets = /* @__PURE__ */ new Map();
    lastUID = 0;
    add(e, n) {
      let r = e ?? this.lastUID++ + "", o = new ce(n);
      return this.assets.set(r, o), o;
    }
    addLoaded(e, n) {
      let r = e ?? this.lastUID++ + "", o = ce.loaded(n);
      return this.assets.set(r, o), o;
    }
    get(e) {
      return this.assets.get(e);
    }
    progress() {
      if (this.assets.size === 0) return 1;
      let e = 0;
      return this.assets.forEach((n) => {
        n.loaded && e++;
      }), e / this.assets.size;
    }
  };
  function Kr(t18) {
    return fetch(t18).then((e) => {
      if (!e.ok) throw new Error(`Failed to fetch "${t18}"`);
      return e;
    });
  }
  i(Kr, "fetchURL");
  function wt(t18) {
    return Kr(t18).then((e) => e.json());
  }
  i(wt, "fetchJSON");
  function Ti(t18) {
    return Kr(t18).then((e) => e.text());
  }
  i(Ti, "fetchText");
  function Ai(t18) {
    return Kr(t18).then((e) => e.arrayBuffer());
  }
  i(Ai, "fetchArrayBuffer");
  function Si(t18) {
    return t18 !== void 0 && (l.assets.urlPrefix = t18), l.assets.urlPrefix;
  }
  i(Si, "loadRoot");
  function Vi(t18, e) {
    return l.assets.custom.add(t18, wt(de(e)));
  }
  i(Vi, "loadJSON");
  function Ct(t18) {
    let e = new Image();
    return e.crossOrigin = "anonymous", e.src = t18, new Promise((n, r) => {
      e.onload = () => n(e), e.onerror = () => r(new Error(`Failed to load image from "${t18}"`));
    });
  }
  i(Ct, "loadImg");
  function Be() {
    let t18 = [l.assets.sprites, l.assets.sounds, l.assets.shaders, l.assets.fonts, l.assets.bitmapFonts, l.assets.custom];
    return t18.reduce((e, n) => e + n.progress(), 0) / t18.length;
  }
  i(Be, "loadProgress");
  function Pi(t18) {
    return l.assets.custom.get(t18) ?? null;
  }
  i(Pi, "getAsset");
  function cn(t18) {
    return l.assets.custom.add(null, t18);
  }
  i(cn, "load");
  var Gi = i((t18) => ({ urlPrefix: "", sprites: new dt(), fonts: new dt(), bitmapFonts: new dt(), sounds: new dt(), shaders: new dt(), custom: new dt(), music: {}, packer: new un(t18, 2048, 2048), loaded: false }), "initAssets");
  var Ri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var Fe = class t15 {
    static {
      i(this, "SpriteData");
    }
    tex;
    frames = [new z(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(e, n, r = {}, o = null) {
      this.tex = e, n && (this.frames = n), this.anims = r, this.slice9 = o;
    }
    get width() {
      return this.tex.width * this.frames[0].w;
    }
    get height() {
      return this.tex.height * this.frames[0].h;
    }
    static from(e, n = {}) {
      return typeof e == "string" ? t15.fromURL(e, n) : Promise.resolve(t15.fromImage(e, n));
    }
    static fromImage(e, n = {}) {
      let [r, o] = l.assets.packer.add(e), s = n.frames ? n.frames.map((a) => new z(o.x + a.x * o.w, o.y + a.y * o.h, a.w * o.w, a.h * o.h)) : jr(n.sliceX || 1, n.sliceY || 1, o.x, o.y, o.w, o.h);
      return new t15(r, s, n.anims, n.slice9);
    }
    static fromURL(e, n = {}) {
      return Ct(e).then((r) => t15.fromImage(r, n));
    }
  };
  function It(t18) {
    if (typeof t18 == "string") {
      let e = Ir(t18);
      if (e) return e;
      if (Be() < 1) return null;
      throw new Error(`Sprite not found: ${t18}`);
    } else {
      if (t18 instanceof Fe) return ce.loaded(t18);
      if (t18 instanceof ce) return t18;
      throw new Error(`Invalid sprite: ${t18}`);
    }
  }
  i(It, "resolveSprite");
  function Ir(t18) {
    return l.assets.sprites.get(t18) ?? null;
  }
  i(Ir, "getSprite");
  function Ot(t18, e, n = { sliceX: 1, sliceY: 1, anims: {} }) {
    return e = de(e), Array.isArray(e) ? e.some((r) => typeof r == "string") ? l.assets.sprites.add(t18, Promise.all(e.map((r) => typeof r == "string" ? Ct(r) : Promise.resolve(r))).then((r) => Mi(r, n))) : l.assets.sprites.addLoaded(t18, Mi(e, n)) : typeof e == "string" ? l.assets.sprites.add(t18, Fe.from(e, n)) : l.assets.sprites.addLoaded(t18, Fe.fromImage(e, n));
  }
  i(Ot, "loadSprite");
  function jr(t18 = 1, e = 1, n = 0, r = 0, o = 1, s = 1) {
    let a = [], m = o / t18, u = s / e;
    for (let p = 0; p < e; p++) for (let c = 0; c < t18; c++) a.push(new z(n + c * m, r + p * u, m, u));
    return a;
  }
  i(jr, "slice");
  function Mi(t18, e = {}) {
    let n = document.createElement("canvas"), r = t18[0].width, o = t18[0].height;
    n.width = r * t18.length, n.height = o;
    let s = n.getContext("2d");
    if (!s) throw new Error("Failed to create canvas context");
    t18.forEach((m, u) => {
      m instanceof ImageData ? s.putImageData(m, u * r, 0) : s.drawImage(m, u * r, 0);
    });
    let a = s.getImageData(0, 0, t18.length * r, o);
    return Fe.fromImage(a, { ...e, sliceX: t18.length, sliceY: 1 });
  }
  i(Mi, "createSpriteSheet");
  function Di(t18 = "bean") {
    return Ot(t18, Ri);
  }
  i(Di, "loadBean");
  function Bi(t18, e, n) {
    e = de(e), n = de(n), typeof e == "string" && !n && (n = Wo(e) + ".json");
    let r = typeof n == "string" ? wt(n) : Promise.resolve(n);
    return l.assets.sprites.add(t18, r.then((o) => {
      let s = o.meta.size, a = o.frames.map((u) => new z(u.frame.x / s.w, u.frame.y / s.h, u.frame.w / s.w, u.frame.h / s.h)), m = {};
      for (let u of o.meta.frameTags) u.from === u.to ? m[u.name] = u.from : m[u.name] = { from: u.from, to: u.to, speed: 10, loop: true, pingpong: u.direction === "pingpong" };
      return Fe.from(e, { frames: a, anims: m });
    }));
  }
  i(Bi, "loadAseprite");
  var Et = class {
    static {
      i(this, "FontData");
    }
    fontface;
    filter = rn;
    outline = null;
    size = 64;
    constructor(e, n = {}) {
      if (this.fontface = e, this.filter = n.filter ?? rn, this.size = n.size ?? 64, this.size > 256) throw new Error(`Max font size: ${256}`);
      n.outline && (this.outline = { width: 1, color: _(0, 0, 0) }, typeof n.outline == "number" ? this.outline.width = n.outline : typeof n.outline == "object" && (n.outline.width && (this.outline.width = n.outline.width), n.outline.color && (this.outline.color = n.outline.color)));
    }
  };
  function kr(t18) {
    if (!t18) return kr(l.globalOpt.font ?? fi);
    if (typeof t18 == "string") {
      let e = _n(t18), n = _r(t18);
      if (e) return e.data ?? e;
      if (n) return n.data ?? n;
      if (document.fonts.check(`${64}px ${t18}`)) return t18;
      if (Be() < 1) return null;
      throw new Error(`Font not found: ${t18}`);
    } else if (t18 instanceof ce) return t18.data ? t18.data : t18;
    return t18;
  }
  i(kr, "resolveFont");
  function _r(t18) {
    return l.assets.fonts.get(t18) ?? null;
  }
  i(_r, "getFont");
  function Fi(t18, e, n = {}) {
    let r = de(e), o = new FontFace(t18, typeof e == "string" ? `url(${r})` : r);
    return document.fonts.add(o), l.assets.fonts.add(t18, o.load().catch((s) => {
      throw new Error(`Failed to load font from "${r}": ${s}`);
    }).then((s) => new Et(s, n)));
  }
  i(Fi, "loadFont");
  function Li(t18, e, n, r) {
    let o = t18.width / e, s = {}, a = r.split("").entries();
    for (let [m, u] of a) s[u] = new z(m % o * e, Math.floor(m / o) * n, e, n);
    return { tex: t18, map: s, size: n };
  }
  i(Li, "makeFont");
  function _n(t18) {
    return l.assets.bitmapFonts.get(t18) ?? null;
  }
  i(_n, "getBitmapFont");
  function Ki(t18, e, n, r, o = {}) {
    let s = de(e);
    return l.assets.bitmapFonts.add(t18, Ct(s).then((a) => Li(Ve.fromImage(l.gfx.ggl, a, o), n, r, o.chars ?? kn)));
  }
  i(Ki, "loadBitmapFont");
  function Ii(t18, e) {
    return e = de(e), l.assets.sprites.add(t18, new Promise(async (n) => {
      let r = typeof e == "string" ? await wt(e) : e, o = await Promise.all(r.frames.map(Ct)), s = document.createElement("canvas");
      s.width = r.width, s.height = r.height * r.frames.length;
      let a = s.getContext("2d");
      if (!a) throw new Error("Failed to create canvas context");
      o.forEach((u, p) => {
        a.drawImage(u, 0, p * r.height);
      });
      let m = await Ot(null, s, { sliceY: r.frames.length, anims: r.anims });
      n(m);
    }));
  }
  i(Ii, "loadPedit");
  var Nr = class {
    static {
      i(this, "Shader");
    }
    ctx;
    glProgram;
    constructor(e, n, r, o) {
      this.ctx = e, e.onDestroy(() => this.free());
      let s = e.gl, a = s.createShader(s.VERTEX_SHADER), m = s.createShader(s.FRAGMENT_SHADER);
      if (!a || !m) throw new Error("Failed to create shader");
      s.shaderSource(a, n), s.shaderSource(m, r), s.compileShader(a), s.compileShader(m);
      let u = s.createProgram();
      if (this.glProgram = u, s.attachShader(u, a), s.attachShader(u, m), o.forEach((p, c) => s.bindAttribLocation(u, c, p)), s.linkProgram(u), !s.getProgramParameter(u, s.LINK_STATUS)) {
        let p = s.getShaderInfoLog(a);
        if (p) throw new Error("VERTEX SHADER " + p);
        let c = s.getShaderInfoLog(m);
        if (c) throw new Error("FRAGMENT SHADER " + c);
      }
      s.deleteShader(a), s.deleteShader(m);
    }
    bind() {
      this.ctx.pushProgram(this.glProgram);
    }
    unbind() {
      this.ctx.popProgram();
    }
    send(e) {
      let n = this.ctx.gl;
      for (let r in e) {
        let o = e[r], s = n.getUniformLocation(this.glProgram, r);
        if (typeof o == "number") n.uniform1f(s, o);
        else if (o instanceof he) n.uniformMatrix4fv(s, false, new Float32Array(o.m));
        else if (o instanceof I) n.uniform3f(s, o.r, o.g, o.b);
        else if (o instanceof C) n.uniform2f(s, o.x, o.y);
        else if (Array.isArray(o)) {
          let a = o[0];
          qo(o) ? n.uniform1fv(s, o) : Ho(o) ? n.uniform2fv(s, o.map((m) => [m.x, m.y]).flat()) : Uo(o) && n.uniform3fv(s, o.map((m) => [m.r, m.g, m.b]).flat());
        } else throw new Error("Unsupported uniform data type");
      }
    }
    free() {
      this.ctx.gl.deleteProgram(this.glProgram);
    }
  };
  function Nn(t18, e = sn, n = an) {
    let r = yi.replace("{{user}}", e ?? sn), o = xi.replace("{{user}}", n ?? an);
    try {
      return new Nr(t18, r, o, on.map((s) => s.name));
    } catch (s) {
      let m = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/, u = $o(s).match(m);
      if (!u?.groups) throw s;
      let p = Number(u.groups.line) - 14, c = u.groups.msg.trim(), f = u.groups.type.toLowerCase();
      throw new Error(`${f} shader line ${p}: ${c}`);
    }
  }
  i(Nn, "makeShader");
  function ji(t18) {
    if (!t18) return l.gfx.defShader;
    if (typeof t18 == "string") {
      let e = Ur(t18);
      if (e) return e.data ?? e;
      if (Be() < 1) return null;
      throw new Error(`Shader not found: ${t18}`);
    } else if (t18 instanceof ce) return t18.data ? t18.data : t18;
    return t18;
  }
  i(ji, "resolveShader");
  function Ur(t18) {
    return l.assets.shaders.get(t18) ?? null;
  }
  i(Ur, "getShader");
  function ki(t18, e, n) {
    return l.assets.shaders.addLoaded(t18, Nn(l.gfx.ggl, e, n));
  }
  i(ki, "loadShader");
  function _i(t18, e, n) {
    e = de(e), n = de(n);
    let r = i((s) => s ? Ti(s) : Promise.resolve(null), "resolveUrl"), o = Promise.all([r(e), r(n)]).then(([s, a]) => Nn(l.gfx.ggl, s, a));
    return l.assets.shaders.add(t18, o);
  }
  i(_i, "loadShaderURL");
  var rt = class t16 {
    static {
      i(this, "SoundData");
    }
    buf;
    constructor(e) {
      this.buf = e;
    }
    static fromArrayBuffer(e) {
      return new Promise((n, r) => l.audio.ctx.decodeAudioData(e, n, r)).then((n) => new t16(n));
    }
    static fromURL(e) {
      return Dn(e) ? t16.fromArrayBuffer(zo(e)) : Ai(e).then((n) => t16.fromArrayBuffer(n));
    }
  };
  function Ni(t18) {
    if (typeof t18 == "string") {
      let e = Hr(t18);
      if (e) return e;
      if (Be() < 1) return null;
      throw new Error(`Sound not found: ${t18}`);
    } else {
      if (t18 instanceof rt) return ce.loaded(t18);
      if (t18 instanceof ce) return t18;
      throw new Error(`Invalid sound: ${t18}`);
    }
  }
  i(Ni, "resolveSound");
  function Hr(t18) {
    return l.assets.sounds.get(t18) ?? null;
  }
  i(Hr, "getSound");
  function Ui(t18, e) {
    return e = de(e), l.assets.sounds.add(t18, typeof e == "string" ? rt.fromURL(e) : rt.fromArrayBuffer(e));
  }
  i(Ui, "loadSound");
  function Hi(t18, e) {
    let n = de(e), r = new Audio(n);
    return r.preload = "auto", l.assets.music[t18] = n;
  }
  i(Hi, "loadMusic");
  function qr(t18, e) {
    return t18 = de(t18), typeof e == "string" ? cn(new Promise((n, r) => {
      wt(e).then((o) => {
        qr(t18, o).then(n).catch(r);
      });
    })) : cn(Fe.from(t18).then((n) => {
      let r = {};
      for (let o in e) {
        let s = e[o], a = n.frames[0], m = 2048 * a.w, u = 2048 * a.h, p = s.frames ? s.frames.map((f) => new z(a.x + (s.x + f.x) / m * a.w, a.y + (s.y + f.y) / u * a.h, f.w / m * a.w, f.h / u * a.h)) : jr(s.sliceX || 1, s.sliceY || 1, a.x + s.x / m * a.w, a.y + s.y / u * a.h, s.width / m * a.w, s.height / u * a.h), c = new Fe(n.tex, p, s.anims);
        l.assets.sprites.addLoaded(o, c), r[o] = c;
      }
      return r;
    }));
  }
  i(qr, "loadSpriteAtlas");
  function Le(t18, e, n = false, r, o, s = {}) {
    let a = r ?? l.gfx.defTex, m = o ?? l.gfx.defShader, u = ji(m);
    if (!u || u instanceof ce) return;
    let p = l.gfx.fixed || n ? l.gfx.transform : l.game.cam.transform.mult(l.gfx.transform), c = [];
    for (let f of t18) {
      let d = ci(p.multVec2(f.pos));
      c.push(d.x, d.y, f.uv.x, f.uv.y, f.color.r / 255, f.color.g / 255, f.color.b / 255, f.opacity);
    }
    l.gfx.renderer.push(l.gfx.ggl.gl.TRIANGLES, c, e, u, a, s);
  }
  i(Le, "drawRaw");
  function Pe(t18) {
    if (!t18.pts) throw new Error('drawPolygon() requires property "pts".');
    let e = t18.pts.length;
    if (!(e < 3)) {
      if (be(), Q(t18.pos), nt(t18.scale), We(t18.angle), Q(t18.offset), t18.fill !== false) {
        let n = t18.color ?? I.WHITE, r = t18.pts.map((s, a) => ({ pos: new C(s.x, s.y), uv: t18.uv ? t18.uv[a] : new C(0, 0), color: t18.colors && t18.colors[a] ? t18.colors[a].mult(n) : n, opacity: t18.opacity ?? 1 })), o;
        t18.triangulate ? o = Rn(t18.pts).map((a) => a.map((m) => t18.pts.indexOf(m))).flat() : o = [...Array(e - 2).keys()].map((s) => [0, s + 1, s + 2]).flat(), Le(r, t18.indices ?? o, t18.fixed, t18.uv ? t18.tex : l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
      }
      t18.outline && jt({ pts: [...t18.pts, t18.pts[0]], radius: t18.radius, width: t18.outline.width, color: t18.outline.color, join: t18.outline.join, uniform: t18.uniform, fixed: t18.fixed, opacity: t18.opacity ?? t18.outline.opacity }), pe();
    }
  }
  i(Pe, "drawPolygon");
  function Un(t18) {
    if (t18.radiusX === void 0 || t18.radiusY === void 0) throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
    if (t18.radiusX === 0 || t18.radiusY === 0) return;
    let e = t18.start ?? 0, n = t18.end ?? 360, r = _e(t18.anchor ?? "center").scale(new C(-t18.radiusX, -t18.radiusY)), o = yt(r, t18.radiusX, t18.radiusY, e, n, t18.resolution);
    o.unshift(r);
    let s = Object.assign({}, t18, { pts: o, radius: 0, ...t18.gradient ? { colors: [t18.gradient[0], ...Array(o.length - 1).fill(t18.gradient[1])] } : {} });
    if (n - e >= 360 && t18.outline) {
      t18.fill !== false && Pe(Object.assign({}, s, { outline: null })), Pe(Object.assign({}, s, { pts: o.slice(1), fill: false }));
      return;
    }
    Pe(s);
  }
  i(Un, "drawEllipse");
  function Ne(t18) {
    if (typeof t18.radius != "number") throw new Error('drawCircle() requires property "radius".');
    t18.radius !== 0 && Un(Object.assign({}, t18, { radiusX: t18.radius, radiusY: t18.radius, angle: 0 }));
  }
  i(Ne, "drawCircle");
  function kt(t18) {
    let { p1: e, p2: n } = t18;
    if (!e || !n) throw new Error('drawLine() requires properties "p1" and "p2".');
    let r = t18.width || 1, o = n.sub(e).unit().normal().scale(r * 0.5), s = [e.sub(o), e.add(o), n.add(o), n.sub(o)].map((a) => ({ pos: new C(a.x, a.y), uv: new C(0), color: t18.color ?? I.WHITE, opacity: t18.opacity ?? 1 }));
    Le(s, [0, 1, 3, 1, 2, 3], t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(kt, "drawLine");
  function Au(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || x(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let m = a.len(), u = a.normal().scale(-r / m), p, c = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let h = a.scale(-r / m);
        n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
        break;
      }
      case "round": {
        let h = Math.max(r, 10), O = Math.PI / h, y = u.scale(-1), w = Math.cos(O), V = Math.sin(O);
        for (let R = 0; R < h; R++) n.push(c), n.push(c.sub(y)), y = x(y.x * w - y.y * V, y.x * V + y.y * w);
      }
    }
    for (let h = 1; h < e.length; h++) {
      if (c === e[h] || c.eq(e[h])) continue;
      p = c, c = e[h];
      let O = c.sub(p), y = O.len(), w = O.normal().scale(-r / y), V = a.cross(O);
      if (Math.abs(V) / (m * y) < 0.05) {
        n.push(p.add(u)), n.push(p.sub(u)), a.dot(O) < 0 && (n.push(p.sub(u)), n.push(p.add(u))), a = O, m = y, u = w;
        continue;
      }
      let R = w.sub(u).cross(O) / V, P = u.add(a.scale(R));
      V > 0 ? (n.push(p.add(P)), n.push(p.sub(u)), n.push(p.add(P)), n.push(p.sub(w))) : (n.push(p.add(u)), n.push(p.sub(P)), n.push(p.add(w)), n.push(p.sub(P))), a = O, m = y, u = w;
    }
    if (!o) switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
      case "square": {
        let h = a.scale(r / m);
        n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
        break;
      }
      case "round": {
        let h = Math.max(r, 10), O = Math.PI / h, y = u.scale(1), w = Math.cos(O), V = Math.sin(O);
        for (let R = 0; R < h; R++) y = x(y.x * w - y.y * V, y.x * V + y.y * w), n.push(c), n.push(c.sub(y));
      }
    }
    if (n.length < 4) return;
    let f = n.map((h) => ({ pos: s.add(h), uv: x(), color: t18.color || I.WHITE, opacity: t18.opacity ?? 1 })), d = [], v = 0;
    for (let h = 0; h < n.length - 2; h += 2) d[v++] = h + 1, d[v++] = h, d[v++] = h + 2, d[v++] = h + 2, d[v++] = h + 3, d[v++] = h + 1;
    o && (d[v++] = n.length - 1, d[v++] = n.length - 2, d[v++] = 0, d[v++] = 0, d[v++] = 1, d[v++] = n.length - 1), Le(f, d, t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(Au, "_drawLinesBevel");
  function Su(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || x(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let m = a.len(), u = a.normal().scale(-r / m), p, c = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let h = a.scale(-r / m);
        n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
        break;
      }
      case "round": {
        let h = Math.max(r, 10), O = Math.PI / h, y = u.scale(-1), w = Math.cos(O), V = Math.sin(O);
        for (let R = 0; R < h; R++) n.push(c), n.push(c.sub(y)), y = x(y.x * w - y.y * V, y.x * V + y.y * w);
      }
    }
    for (let h = 1; h < e.length; h++) {
      if (c === e[h] || c.eq(e[h])) continue;
      p = c, c = e[h];
      let O = c.sub(p), y = O.len(), w = O.normal().scale(-r / y), V = a.cross(O);
      if (Math.abs(V) / (m * y) < 0.05) {
        n.push(p.add(u)), n.push(p.sub(u)), a.dot(O) < 0 && (n.push(p.sub(u)), n.push(p.add(u))), a = O, m = y, u = w;
        continue;
      }
      let R = w.sub(u).cross(O) / V, P = u.add(a.scale(R));
      if (V > 0) {
        let D = p.add(P), b = Math.max(r, 10), E = se(u.angleBetween(w) / b), A = u, G = Math.cos(E), M = Math.sin(E);
        for (let F = 0; F < b; F++) n.push(D), n.push(p.sub(A)), A = x(A.x * G - A.y * M, A.x * M + A.y * G);
      } else {
        let D = p.sub(P), b = Math.max(r, 10), E = se(u.angleBetween(w) / b), A = u, G = Math.cos(E), M = Math.sin(E);
        for (let F = 0; F < b; F++) n.push(p.add(A)), n.push(D), A = x(A.x * G - A.y * M, A.x * M + A.y * G);
      }
      a = O, m = y, u = w;
    }
    if (!o) switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
      case "square": {
        let h = a.scale(r / m);
        n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
        break;
      }
      case "round": {
        let h = Math.max(r, 10), O = Math.PI / h, y = u.scale(1), w = Math.cos(O), V = Math.sin(O);
        for (let R = 0; R < h; R++) y = x(y.x * w - y.y * V, y.x * V + y.y * w), n.push(c), n.push(c.sub(y));
      }
    }
    if (n.length < 4) return;
    let f = n.map((h) => ({ pos: s.add(h), uv: x(), color: t18.color || I.WHITE, opacity: t18.opacity ?? 1 })), d = [], v = 0;
    for (let h = 0; h < n.length - 2; h += 2) d[v++] = h + 1, d[v++] = h, d[v++] = h + 2, d[v++] = h + 2, d[v++] = h + 3, d[v++] = h + 1;
    o && (d[v++] = n.length - 1, d[v++] = n.length - 2, d[v++] = 0, d[v++] = 0, d[v++] = 1, d[v++] = n.length - 1), Le(f, d, t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(Su, "_drawLinesRound");
  function Vu(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || x(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let m = a.len(), u = a.normal().scale(-r / m), p, c = e[0];
    if (!o) switch (t18.cap) {
      case "square": {
        let h = a.scale(-r / m);
        n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
        break;
      }
      case "round": {
        let h = Math.max(r, 10), O = Math.PI / h, y = u.scale(-1), w = Math.cos(O), V = Math.sin(O);
        for (let R = 0; R < h; R++) n.push(c), n.push(c.sub(y)), y = x(y.x * w - y.y * V, y.x * V + y.y * w);
      }
    }
    for (let h = 1; h < e.length; h++) {
      if (c === e[h] || c.eq(e[h])) continue;
      p = c, c = e[h];
      let O = c.sub(p), y = O.len(), w = O.normal().scale(-r / y), V = a.cross(O);
      if (Math.abs(V) / (m * y) < 0.05) {
        n.push(p.add(u)), n.push(p.sub(u)), a.dot(O) < 0 && (n.push(p.sub(u)), n.push(p.add(u))), a = O, m = y, u = w;
        continue;
      }
      let R = w.sub(u).cross(O) / V, P = u.add(a.scale(R));
      n.push(p.add(P)), n.push(p.sub(P)), a = O, m = y, u = w;
    }
    if (!o) switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
      case "square": {
        let h = a.scale(r / m);
        n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
        break;
      }
      case "round": {
        let h = Math.max(r, 10), O = Math.PI / h, y = u.scale(1), w = Math.cos(O), V = Math.sin(O);
        for (let R = 0; R < h; R++) y = x(y.x * w - y.y * V, y.x * V + y.y * w), n.push(c), n.push(c.sub(y));
      }
    }
    if (n.length < 4) return;
    let f = n.map((h) => ({ pos: s.add(h), uv: x(), color: t18.color || I.WHITE, opacity: t18.opacity ?? 1 })), d = [], v = 0;
    for (let h = 0; h < n.length - 2; h += 2) d[v++] = h + 1, d[v++] = h, d[v++] = h + 2, d[v++] = h + 2, d[v++] = h + 3, d[v++] = h + 1;
    o && (d[v++] = n.length - 1, d[v++] = n.length - 2, d[v++] = 0, d[v++] = 0, d[v++] = 1, d[v++] = n.length - 1), Le(f, d, t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(Vu, "_drawLinesMiter");
  function jt(t18) {
    let e = t18.pts, n = t18.width ?? 1;
    if (!e) throw new Error('drawLines() requires property "pts".');
    if (!(e.length < 2)) {
      if (e.length > 2) switch (t18.join) {
        case "bevel":
          return Au(t18);
        case "round":
          return Su(t18);
        case "miter":
          return Vu(t18);
      }
      if (t18.radius && e.length >= 3) {
        kt(Object.assign({}, t18, { p1: e[0], p2: e[1] }));
        for (let r = 1; r < e.length - 2; r++) {
          let o = e[r], s = e[r + 1];
          kt(Object.assign({}, t18, { p1: o, p2: s }));
        }
        kt(Object.assign({}, t18, { p1: e[e.length - 2], p2: e[e.length - 1] }));
      } else for (let r = 0; r < e.length - 1; r++) kt(Object.assign({}, t18, { p1: e[r], p2: e[r + 1] })), t18.join !== "none" && Ne(Object.assign({}, t18, { pos: e[r], radius: n / 2 }));
    }
  }
  i(jt, "drawLines");
  function Hn(t18, e) {
    let n = e.segments ?? 16, r = [];
    for (let o = 0; o <= n; o++) r.push(t18(o / n));
    jt({ pts: r, width: e.width || 1, pos: e.pos, color: e.color, opacity: e.opacity });
  }
  i(Hn, "drawCurve");
  function qi(t18) {
    Hn((e) => Qt(t18.pt1, t18.pt2, t18.pt3, t18.pt4, e), t18);
  }
  i(qi, "drawBezier");
  var Ve = class t17 {
    static {
      i(this, "Texture");
    }
    ctx;
    src = null;
    glTex;
    width;
    height;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let s = e.gl, a = e.gl.createTexture();
      if (!a) throw new Error("Failed to create texture");
      this.glTex = a, e.onDestroy(() => this.free()), this.width = n, this.height = r;
      let m = { linear: s.LINEAR, nearest: s.NEAREST }[o.filter ?? e.opts.texFilter ?? "nearest"], u = { repeat: s.REPEAT, clampToEdge: s.CLAMP_TO_EDGE }[o.wrap ?? "clampToEdge"];
      this.bind(), n && r && s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, n, r, 0, s.RGBA, s.UNSIGNED_BYTE, null), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, m), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, m), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, u), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, u), this.unbind();
    }
    static fromImage(e, n, r = {}) {
      let o = new t17(e, n.width, n.height, r);
      return o.update(n), o.src = n, o;
    }
    update(e, n = 0, r = 0) {
      let o = this.ctx.gl;
      this.bind(), o.texSubImage2D(o.TEXTURE_2D, 0, n, r, o.RGBA, o.UNSIGNED_BYTE, e), this.unbind();
    }
    bind() {
      this.ctx.pushTexture2D(this.glTex);
    }
    unbind() {
      this.ctx.popTexture2D();
    }
    free() {
      this.ctx.gl.deleteTexture(this.glTex);
    }
  };
  var ot = class {
    static {
      i(this, "FrameBuffer");
    }
    ctx;
    tex;
    glFramebuffer;
    glRenderbuffer;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let s = e.gl;
      e.onDestroy(() => this.free()), this.tex = new Ve(e, n, r, o);
      let a = s.createFramebuffer(), m = s.createRenderbuffer();
      if (!a || !m) throw new Error("Failed to create framebuffer");
      this.glFramebuffer = a, this.glRenderbuffer = m, this.bind(), s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, n, r), s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tex.glTex, 0), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, this.glRenderbuffer), this.unbind();
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    toImageData() {
      let e = this.ctx.gl, n = new Uint8ClampedArray(this.width * this.height * 4);
      this.bind(), e.readPixels(0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, n), this.unbind();
      let r = this.width * 4, o = new Uint8Array(r);
      for (let s = 0; s < (this.height / 2 | 0); s++) {
        let a = s * r, m = (this.height - s - 1) * r;
        o.set(n.subarray(a, a + r)), n.copyWithin(a, m, m + r), n.set(o, m);
      }
      return new ImageData(n, this.width, this.height);
    }
    toDataURL() {
      let e = document.createElement("canvas"), n = e.getContext("2d");
      if (e.width = this.width, e.height = this.height, !n) throw new Error("Failed to get 2d context");
      return n.putImageData(this.toImageData(), 0, 0), e.toDataURL();
    }
    clear() {
      let e = this.ctx.gl;
      e.clear(e.COLOR_BUFFER_BIT);
    }
    draw(e) {
      this.bind(), e(), this.unbind();
    }
    bind() {
      this.ctx.pushFramebuffer(this.glFramebuffer), this.ctx.pushRenderbuffer(this.glRenderbuffer), this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
    }
    unbind() {
      this.ctx.popFramebuffer(), this.ctx.popRenderbuffer(), this.ctx.popViewport();
    }
    free() {
      let e = this.ctx.gl;
      e.deleteFramebuffer(this.glFramebuffer), e.deleteRenderbuffer(this.glRenderbuffer), this.tex.free();
    }
  };
  var qn = class {
    static {
      i(this, "BatchRenderer");
    }
    ctx;
    glVBuf;
    glIBuf;
    vqueue = [];
    iqueue = [];
    stride;
    maxVertices;
    maxIndices;
    vertexFormat;
    numDraws = 0;
    curPrimitive = null;
    curTex = null;
    curShader = null;
    curUniform = {};
    constructor(e, n, r, o) {
      let s = e.gl;
      this.vertexFormat = n, this.ctx = e, this.stride = n.reduce((m, u) => m + u.size, 0), this.maxVertices = r, this.maxIndices = o;
      let a = s.createBuffer();
      if (!a) throw new Error("Failed to create vertex buffer");
      this.glVBuf = a, e.pushArrayBuffer(this.glVBuf), s.bufferData(s.ARRAY_BUFFER, r * 4, s.DYNAMIC_DRAW), e.popArrayBuffer(), this.glIBuf = s.createBuffer(), e.pushElementArrayBuffer(this.glIBuf), s.bufferData(s.ELEMENT_ARRAY_BUFFER, o * 4, s.DYNAMIC_DRAW), e.popElementArrayBuffer();
    }
    push(e, n, r, o, s = null, a = {}) {
      (e !== this.curPrimitive || s !== this.curTex || o !== this.curShader || !Bn(this.curUniform, a) || this.vqueue.length + n.length * this.stride > this.maxVertices || this.iqueue.length + r.length > this.maxIndices) && this.flush();
      let m = this.vqueue.length / this.stride;
      for (let u of n) this.vqueue.push(u);
      for (let u of r) this.iqueue.push(u + m);
      this.curPrimitive = e, this.curShader = o, this.curTex = s, this.curUniform = a;
    }
    flush() {
      if (!this.curPrimitive || !this.curShader || this.vqueue.length === 0 || this.iqueue.length === 0) return;
      let e = this.ctx.gl;
      this.ctx.pushArrayBuffer(this.glVBuf), e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)), this.ctx.pushElementArrayBuffer(this.glIBuf), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(this.iqueue)), this.ctx.setVertexFormat(this.vertexFormat), this.curShader.bind(), this.curShader.send(this.curUniform), this.curTex?.bind(), e.drawElements(this.curPrimitive, this.iqueue.length, e.UNSIGNED_SHORT, 0), this.curTex?.unbind(), this.curShader.unbind(), this.ctx.popArrayBuffer(), this.ctx.popElementArrayBuffer(), this.vqueue = [], this.iqueue = [], this.numDraws++;
    }
    free() {
      let e = this.ctx.gl;
      e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
    }
  };
  function Tt(t18) {
    let e = [], n = i((s) => {
      e.push(s), t18(s);
    }, "push"), r = i(() => {
      e.pop(), t18(o() ?? null);
    }, "pop"), o = i(() => e[e.length - 1], "cur");
    return [n, r, o];
  }
  i(Tt, "genStack");
  function zi(t18, e = {}) {
    let n = [];
    function r(D) {
      n.push(D);
    }
    i(r, "onDestroy");
    function o() {
      n.forEach((b) => b());
      let D = t18.getExtension("WEBGL_lose_context");
      D && D.loseContext();
    }
    i(o, "destroy");
    let s = null;
    function a(D) {
      if (Bn(D, s)) return;
      s = D;
      let b = D.reduce((E, A) => E + A.size, 0);
      D.reduce((E, A, G) => (t18.vertexAttribPointer(G, A.size, t18.FLOAT, false, b * 4, E), t18.enableVertexAttribArray(G), E + A.size * 4), 0);
    }
    i(a, "setVertexFormat");
    let [m, u] = Tt((D) => t18.bindTexture(t18.TEXTURE_2D, D)), [p, c] = Tt((D) => t18.bindBuffer(t18.ARRAY_BUFFER, D)), [f, d] = Tt((D) => t18.bindBuffer(t18.ELEMENT_ARRAY_BUFFER, D)), [v, h] = Tt((D) => t18.bindFramebuffer(t18.FRAMEBUFFER, D)), [O, y] = Tt((D) => t18.bindRenderbuffer(t18.RENDERBUFFER, D)), [w, V] = Tt((D) => {
      if (!D) return;
      let { x: b, y: E, w: A, h: G } = D;
      t18.viewport(b, E, A, G);
    }), [R, P] = Tt((D) => t18.useProgram(D));
    return w({ x: 0, y: 0, w: t18.drawingBufferWidth, h: t18.drawingBufferHeight }), { gl: t18, opts: e, onDestroy: r, destroy: o, pushTexture2D: m, popTexture2D: u, pushArrayBuffer: p, popArrayBuffer: c, pushElementArrayBuffer: f, popElementArrayBuffer: d, pushFramebuffer: v, popFramebuffer: h, pushRenderbuffer: O, popRenderbuffer: y, pushViewport: w, popViewport: V, pushProgram: R, popProgram: P, setVertexFormat: a };
  }
  i(zi, "initGfx");
  var zr = {};
  function $i(t18, e) {
    e.pos && (t18.pos = t18.pos.add(e.pos)), e.scale && (t18.scale = t18.scale.scale(x(e.scale))), e.angle && (t18.angle += e.angle), e.color && t18.ch.length === 1 && (t18.color = t18.color.mult(e.color)), e.opacity != null && (t18.opacity *= e.opacity);
  }
  i($i, "applyCharTransform");
  function zn(t18) {
    let e = {}, n = "", r = [], o = String(t18), s = i((a) => {
      r.length > 0 && (e[n.length] = r.slice()), n += a;
    }, "emit");
    for (; o !== ""; ) {
      if (o[0] === "\\") {
        if (o.length === 1) throw new Error("Styled text error: \\ at end of string");
        s(o[1]), o = o.slice(2);
        continue;
      }
      if (o[0] === "[") {
        let a = /^\[(\/)?(\w+?)\]/.exec(o);
        if (!a) {
          s(o[0]), o = o.slice(1);
          continue;
        }
        let [m, u, p] = a;
        if (u !== void 0) {
          let c = r.pop();
          if (c !== p) throw c !== void 0 ? new Error(`Styled text error: mismatched tags. Expected [/${c}], got [/${p}]`) : new Error(`Styled text error: stray end tag [/${p}]`);
        } else r.push(p);
        o = o.slice(m.length);
        continue;
      }
      s(o[0]), o = o.slice(1);
    }
    if (r.length > 0) throw new Error(`Styled text error: unclosed tags ${r}`);
    return { charStyleMap: e, text: n };
  }
  i(zn, "compileStyledText");
  function Ue(t18) {
    if (t18.text === void 0) throw new Error('formatText() requires property "text".');
    let e = kr(t18.font);
    if (!t18.text || t18.text === "" || e instanceof ce || !e) return { width: 0, height: 0, chars: [], opt: t18, renderedText: "" };
    let { charStyleMap: n, text: r } = zn(t18.text + ""), o = Qo(r);
    if (e instanceof Et || typeof e == "string") {
      let V = e instanceof Et ? e.fontface.family : e, R = e instanceof Et ? { outline: e.outline, filter: e.filter } : { outline: null, filter: rn }, P = zr[V] ?? { font: { tex: new Ve(l.gfx.ggl, 2048, 2048, { filter: R.filter }), map: {}, size: 64 }, cursor: new C(0), outline: R.outline };
      zr[V] || (zr[V] = P), e = P.font;
      for (let D of o) if (!P.font.map[D]) {
        let b = l.fontCacheC2d;
        if (!b) throw new Error("fontCacheC2d is not defined.");
        if (!l.fontCacheCanvas) throw new Error("fontCacheCanvas is not defined.");
        b.clearRect(0, 0, l.fontCacheCanvas.width, l.fontCacheCanvas.height), b.font = `${e.size}px ${V}`, b.textBaseline = "top", b.textAlign = "left", b.fillStyle = "#ffffff";
        let E = b.measureText(D), A = Math.ceil(E.width);
        if (!A) continue;
        let G = E.fontBoundingBoxAscent + E.fontBoundingBoxDescent;
        P.outline && P.outline.width && P.outline.color && (b.lineJoin = "round", b.lineWidth = P.outline.width * 2, b.strokeStyle = P.outline.color.toHex(), b.strokeText(D, P.outline.width, P.outline.width), A += P.outline.width * 2, G += P.outline.width * 3), b.fillText(D, P.outline?.width ?? 0, P.outline?.width ?? 0);
        let M = b.getImageData(0, 0, A, G);
        if (P.cursor.x + A > 2048 && (P.cursor.x = 0, P.cursor.y += G, P.cursor.y > 2048)) throw new Error("Font atlas exceeds character limit");
        e.tex.update(M, P.cursor.x, P.cursor.y), e.map[D] = new z(P.cursor.x, P.cursor.y, A, G), P.cursor.x += A;
      }
    }
    let s = t18.size || e.size, a = x(t18.scale ?? 1).scale(s / e.size), m = t18.lineSpacing ?? 0, u = t18.letterSpacing ?? 0, p = 0, c = 0, f = 0, d = [], v = [], h = 0, O = null, y = 0;
    for (; h < o.length; ) {
      let V = o[h];
      if (V === `
`) f += s + m, d.push({ width: p - u, chars: v }), O = null, y = 0, p = 0, v = [];
      else {
        let R = e.map[V];
        if (R) {
          let P = R.w * a.x;
          t18.width && p + P > t18.width && (f += s + m, O != null && (h -= v.length - O, V = o[h], R = e.map[V], P = R.w * a.x, v = v.slice(0, O - 1), p = y), O = null, y = 0, d.push({ width: p - u, chars: v }), p = 0, v = []), v.push({ tex: e.tex, width: R.w, height: R.h, quad: new z(R.x / e.tex.width, R.y / e.tex.height, R.w / e.tex.width, R.h / e.tex.height), ch: V, pos: new C(p, f), opacity: t18.opacity ?? 1, color: t18.color ?? I.WHITE, scale: x(a), angle: 0 }), V === " " && (O = v.length, y = p), p += P, c = Math.max(c, p), p += u;
        }
      }
      h++;
    }
    d.push({ width: p - u, chars: v }), f += s, t18.width && (c = t18.width);
    let w = [];
    for (let V = 0; V < d.length; V++) {
      let R = (c - d[V].width) * oi(t18.align ?? "left");
      for (let P of d[V].chars) {
        let D = e.map[P.ch], b = w.length + V;
        if (P.pos = P.pos.add(R, 0).add(D.w * a.x * 0.5, D.h * a.y * 0.5), t18.transform) {
          let E = typeof t18.transform == "function" ? t18.transform(b, P.ch) : t18.transform;
          E && $i(P, E);
        }
        if (n[b]) {
          let E = n[b];
          for (let A of E) {
            let G = t18.styles?.[A], M = typeof G == "function" ? G(b, P.ch) : G;
            M && $i(P, M);
          }
        }
        w.push(P);
      }
    }
    return { width: c, height: f, chars: w, opt: t18, renderedText: r };
  }
  i(Ue, "formatText");
  function it(t18) {
    if (t18.width === void 0 || t18.height === void 0) throw new Error('drawUVQuad() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0) return;
    let e = t18.width, n = t18.height, o = _e(t18.anchor || pt).scale(new C(e, n).scale(-0.5)), s = t18.quad || new z(0, 0, 1, 1), a = t18.color || _(255, 255, 255), m = t18.opacity ?? 1, u = t18.tex ? 0.1 / t18.tex.width : 0, p = t18.tex ? 0.1 / t18.tex.height : 0, c = s.x + u, f = s.y + p, d = s.w - u * 2, v = s.h - p * 2;
    be(), Q(t18.pos), We(t18.angle), nt(t18.scale), Q(o), Le([{ pos: new C(-e / 2, n / 2), uv: new C(t18.flipX ? c + d : c, t18.flipY ? f : f + v), color: a, opacity: m }, { pos: new C(-e / 2, -n / 2), uv: new C(t18.flipX ? c + d : c, t18.flipY ? f + v : f), color: a, opacity: m }, { pos: new C(e / 2, -n / 2), uv: new C(t18.flipX ? c : c + d, t18.flipY ? f + v : f), color: a, opacity: m }, { pos: new C(e / 2, n / 2), uv: new C(t18.flipX ? c : c + d, t18.flipY ? f : f + v), color: a, opacity: m }], [0, 1, 3, 1, 2, 3], t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0), pe();
  }
  i(it, "drawUVQuad");
  function He(t18) {
    be(), Q(t18.opt.pos), We(t18.opt.angle), Q(_e(t18.opt.anchor ?? "topleft").add(1, 1).scale(t18.width, t18.height).scale(-0.5)), t18.chars.forEach((e) => {
      it({ tex: e.tex, width: e.width, height: e.height, pos: e.pos, scale: e.scale, angle: e.angle, color: e.color, opacity: e.opacity, quad: e.quad, anchor: "center", uniform: t18.opt.uniform, shader: t18.opt.shader, fixed: t18.opt.fixed });
    }), pe();
  }
  i(He, "drawFormattedText");
  function ve(t18) {
    if (t18.width === void 0 || t18.height === void 0) throw new Error('drawRect() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0) return;
    let e = t18.width, n = t18.height, o = _e(t18.anchor || pt).add(1, 1).scale(new C(e, n).scale(-0.5)), s = [new C(0, 0), new C(e, 0), new C(e, n), new C(0, n)];
    if (t18.radius) {
      let a = Math.min(e, n) / 2, m = Array.isArray(t18.radius) ? t18.radius.map((u) => Math.min(a, u)) : new Array(4).fill(Math.min(a, t18.radius));
      s = [new C(m[0], 0), ...m[1] ? yt(new C(e - m[1], m[1]), m[1], m[1], 270, 360) : [x(e, 0)], ...m[2] ? yt(new C(e - m[2], n - m[2]), m[2], m[2], 0, 90) : [x(e, n)], ...m[3] ? yt(new C(m[3], n - m[3]), m[3], m[3], 90, 180) : [x(0, n)], ...m[0] ? yt(new C(m[0], m[0]), m[0], m[0], 180, 270) : []];
    }
    Pe(Object.assign({}, t18, { offset: o, pts: s, ...t18.gradient ? { colors: t18.horizontal ? [t18.gradient[0], t18.gradient[1], t18.gradient[1], t18.gradient[0]] : [t18.gradient[0], t18.gradient[0], t18.gradient[1], t18.gradient[1]] } : {} }));
  }
  i(ve, "drawRect");
  function qe(t18) {
    Oe();
    let e = l.gfx.width, n = l.gfx.height;
    l.gfx.width = l.gfx.viewport.width, l.gfx.height = l.gfx.viewport.height, t18(), Oe(), l.gfx.width = e, l.gfx.height = n;
  }
  i(qe, "drawUnscaled");
  function Yr(t18, e) {
    qe(() => {
      let n = x(8);
      be(), Q(t18);
      let r = Ue({ text: e, font: vt, size: 16, pos: n, color: _(255, 255, 255), fixed: true }), o = r.width + n.x * 2, s = r.height + n.x * 2;
      t18.x + o >= ie() && Q(x(-o, 0)), t18.y + s >= ue() && Q(x(0, -s)), ve({ width: o, height: s, color: _(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), He(r), pe();
    });
  }
  i(Yr, "drawInspectText");
  function Yn(t18) {
    if (!t18.p1 || !t18.p2 || !t18.p3) throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
    return Pe(Object.assign({}, t18, { pts: [t18.p1, t18.p2, t18.p3] }));
  }
  i(Yn, "drawTriangle");
  function Qi() {
    if (l.debug.inspect) {
      let t18 = null;
      for (let e of l.game.root.get("*", { recursive: true })) if (e.c("area") && e.isHovering()) {
        t18 = e;
        break;
      }
      if (l.game.root.drawInspect(), t18) {
        let e = [], n = t18.inspect();
        for (let r in n) n[r] ? e.push(`${n[r]}`) : e.push(`${r}`);
        Yr(di(jn()), e.join(`
`));
      }
      Yr(x(8), `FPS: ${l.debug.fps()}`);
    }
    l.debug.paused && qe(() => {
      be(), Q(ie(), 0), Q(-8, 8);
      let t18 = 32;
      ve({ width: t18, height: t18, anchor: "topright", color: _(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let e = 1; e <= 2; e++) ve({ width: 4, height: t18 * 0.6, anchor: "center", pos: x(-t18 / 3 * e, t18 * 0.5), color: _(255, 255, 255), radius: 2, fixed: true });
      pe();
    }), l.debug.timeScale !== 1 && qe(() => {
      be(), Q(ie(), ue()), Q(-8, -8);
      let t18 = 8, e = Ue({ text: l.debug.timeScale.toFixed(1), font: vt, size: 16, color: _(255, 255, 255), pos: x(-t18), anchor: "botright", fixed: true });
      ve({ width: e.width + t18 * 2 + t18 * 4, height: e.height + t18 * 2, anchor: "botright", color: _(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let n = 0; n < 2; n++) {
        let r = l.debug.timeScale < 1;
        Yn({ p1: x(-e.width - t18 * (r ? 2 : 3.5), -t18), p2: x(-e.width - t18 * (r ? 2 : 3.5), -t18 - e.height), p3: x(-e.width - t18 * (r ? 3.5 : 2), -t18 - e.height / 2), pos: x(-n * t18 * 1 + (r ? -t18 * 0.5 : 0), 0), color: _(255, 255, 255), fixed: true });
      }
      He(e), pe();
    }), l.debug.curRecording && qe(() => {
      be(), Q(0, ue()), Q(24, -24), Ne({ radius: 12, color: _(255, 0, 0), opacity: An(0, 1, l.app.time() * 4), fixed: true }), pe();
    }), l.debug.showLog && l.game.logs.length > 0 && qe(() => {
      be(), Q(0, ue()), Q(8, -8);
      let t18 = 8, e = [];
      for (let r of l.game.logs) {
        let o = "", s = r.msg instanceof Error ? "error" : "info";
        o += `[time]${r.time.toFixed(2)}[/time]`, o += " ", o += `[${s}]${Wr(r.msg)}[/${s}]`, e.push(o);
      }
      l.game.logs = l.game.logs.filter((r) => l.app.time() - r.time < (l.globalOpt.logTime || 4));
      let n = Ue({ text: e.join(`
`), font: vt, pos: x(t18, -t18), anchor: "botleft", size: 16, width: ie() * 0.6, lineSpacing: t18 / 2, fixed: true, styles: { time: { color: _(127, 127, 127) }, info: { color: _(255, 255, 255) }, error: { color: _(255, 0, 127) } } });
      ve({ width: n.width + t18 * 2, height: n.height + t18 * 2, anchor: "botleft", color: _(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), He(n), pe();
    });
  }
  i(Qi, "drawDebug");
  function Wr(t18, e = false) {
    var n = "", r;
    return e && typeof t18 == "string" && (t18 = JSON.stringify(t18)), Array.isArray(t18) && (n = ["[", t18.map((o) => Wr(o, true)).join(", "), "]"].join(""), t18 = n), typeof t18 == "object" && t18.toString === Object.prototype.toString && (t18.constructor !== Object && (n += t18.constructor.name + " "), n += ["{", (r = Object.getOwnPropertyNames(t18).map((o) => `${/^\w+$/.test(o) ? o : JSON.stringify(o)}: ${Wr(t18[o], true)}`).join(", ")) ? ` ${r} ` : "", "}"].join(""), t18 = n), String(t18).replaceAll(/(?<!\\)\[/g, "\\[");
  }
  i(Wr, "prettyDebug");
  function Ji() {
    let t18 = l.game.cam, e = C.fromAngle(ge(0, 360)).scale(t18.shake);
    t18.shake = fe(t18.shake, 0, 5 * te()), t18.transform = new he().translate(xt()).scale(t18.scale).rotate(t18.angle).translate((t18.pos ?? xt()).scale(-1).add(e)), l.game.root.draw(), Oe();
  }
  i(Ji, "drawFrame");
  function Zi() {
    let t18 = Be();
    l.game.events.numListeners("loading") > 0 ? l.game.events.trigger("loading", t18) : qe(() => {
      let e = ie() / 2, n = 24, r = x(ie() / 2, ue() / 2).sub(x(e / 2, n / 2));
      ve({ pos: x(0), width: ie(), height: ue(), color: _(0, 0, 0) }), ve({ pos: r, width: e, height: n, fill: false, outline: { width: 4 } }), ve({ pos: r, width: e * t18, height: n });
    });
  }
  i(Zi, "drawLoadScreen");
  function Wn(t18, e, n) {
    let r = l.gfx.ggl.gl;
    Oe(), r.clear(r.STENCIL_BUFFER_BIT), r.enable(r.STENCIL_TEST), r.stencilFunc(r.NEVER, 1, 255), r.stencilOp(r.REPLACE, r.REPLACE, r.REPLACE), e(), Oe(), r.stencilFunc(n, 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.KEEP), t18(), Oe(), r.disable(r.STENCIL_TEST);
  }
  i(Wn, "drawStenciled");
  function es(t18, e) {
    let n = l.gfx.ggl.gl;
    Wn(t18, e, n.EQUAL);
  }
  i(es, "drawMasked");
  function At(t18) {
    if (!t18.tex) throw new Error('drawTexture() requires property "tex".');
    let e = t18.quad ?? new z(0, 0, 1, 1), n = t18.tex.width * e.w, r = t18.tex.height * e.h, o = new C(1);
    if (t18.tiled) {
      let a = _e(t18.anchor || pt).add(new C(1, 1)).scale(0.5).scale(t18.width || n, t18.height || r), m = (t18.width || n) / n, u = (t18.height || r) / r, p = Math.floor(m), c = Math.floor(u), f = m - p, d = u - c, v = (p + f ? 1 : 0) * (c + d ? 1 : 0), h = new Array(v * 6), O = new Array(v * 4), y = 0, w = i((V, R, P, D, b) => {
        h[y * 6 + 0] = y * 4 + 0, h[y * 6 + 1] = y * 4 + 1, h[y * 6 + 2] = y * 4 + 3, h[y * 6 + 3] = y * 4 + 1, h[y * 6 + 4] = y * 4 + 2, h[y * 6 + 5] = y * 4 + 3, O[y * 4 + 0] = { pos: new C(V - a.x, R - a.y), uv: new C(b.x, b.y), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, O[y * 4 + 1] = { pos: new C(V + P - a.x, R - a.y), uv: new C(b.x + b.w, b.y), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, O[y * 4 + 2] = { pos: new C(V + P - a.x, R + D - a.y), uv: new C(b.x + b.w, b.y + b.h), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, O[y * 4 + 3] = { pos: new C(V - a.x, R + D - a.y), uv: new C(b.x, b.y + b.h), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, y++;
      }, "addQuad");
      for (let V = 0; V < c; V++) {
        for (let R = 0; R < p; R++) w(R * n, V * r, n, r, e);
        f && w(p * n, V * r, n * f, r, new z(e.x, e.y, e.w * f, e.h));
      }
      if (d) {
        for (let V = 0; V < p; V++) w(V * n, c * r, n, r * d, new z(e.x, e.y, e.w, e.h * d));
        f && w(p * n, c * r, n * f, r * d, new z(e.x, e.y, e.w * f, e.h * d));
      }
      Le(O, h, t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0);
    } else t18.width && t18.height ? (o.x = t18.width / n, o.y = t18.height / r) : t18.width ? (o.x = t18.width / n, o.y = o.x) : t18.height && (o.y = t18.height / r, o.x = o.y), it(Object.assign({}, t18, { scale: o.scale(t18.scale || new C(1)), tex: t18.tex, quad: e, width: n, height: r }));
  }
  i(At, "drawTexture");
  function ts(t18) {
    if (!t18.sprite) throw new Error('drawSprite() requires property "sprite"');
    let e = It(t18.sprite);
    if (!e || !e.data) return;
    let n = e.data.frames[t18.frame ?? 0];
    if (!n) throw new Error(`Frame not found: ${t18.frame ?? 0}`);
    At(Object.assign({}, t18, { tex: e.data.tex, quad: n.scale(t18.quad ?? new z(0, 0, 1, 1)) }));
  }
  i(ts, "drawSprite");
  function ns(t18, e) {
    let n = l.gfx.ggl.gl;
    Wn(t18, e, n.NOTEQUAL);
  }
  i(ns, "drawSubtracted");
  function $r(t18) {
    He(Ue(t18));
  }
  i($r, "drawText");
  var rs = i((t18, e) => {
    let n = Nn(e, sn, an), r = t18.pixelDensity ?? 1, o = t18.scale ?? 1, { gl: s } = e, a = Ve.fromImage(e, new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), m = t18.width && t18.height ? new ot(e, t18.width * r * o, t18.height * r * o) : new ot(e, s.drawingBufferWidth, s.drawingBufferHeight), u = null, p = 1;
    t18.background && (typeof t18.background == "string" ? u = _(t18.background) : (u = _(...t18.background), p = t18.background[3] ?? 1), s.clearColor(u.r / 255, u.g / 255, u.b / 255, p ?? 1)), s.enable(s.BLEND), s.blendFuncSeparate(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA);
    let c = new qn(e, on, gi, bi), f = Ve.fromImage(e, new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
    return { lastDrawCalls: 0, ggl: e, defShader: n, defTex: a, frameBuffer: m, postShader: null, postShaderUniform: null, renderer: c, transform: new he(), transformStack: [], bgTex: f, bgColor: u, bgAlpha: p, width: t18.width ?? s.drawingBufferWidth / r / o, height: t18.height ?? s.drawingBufferHeight / r / o, viewport: { x: 0, y: 0, width: s.drawingBufferWidth, height: s.drawingBufferHeight }, fixed: false };
  }, "initAppGfx");
  function $n() {
    let t18 = l.pixelDensity, e = l.gfx.ggl.gl.drawingBufferWidth / t18, n = l.gfx.ggl.gl.drawingBufferHeight / t18;
    if (l.globalOpt.letterbox) {
      if (!l.globalOpt.width || !l.globalOpt.height) throw new Error("Letterboxing requires width and height defined.");
      let r = e / n, o = l.globalOpt.width / l.globalOpt.height;
      if (r > o) {
        let s = n * o, a = (e - s) / 2;
        l.gfx.viewport = { x: a, y: 0, width: s, height: n };
      } else {
        let s = e / o, a = (n - s) / 2;
        l.gfx.viewport = { x: 0, y: a, width: e, height: s };
      }
      return;
    }
    if (l.globalOpt.stretch && (!l.globalOpt.width || !l.globalOpt.height)) throw new Error("Stretching requires width and height defined.");
    l.gfx.viewport = { x: 0, y: 0, width: e, height: n };
  }
  i($n, "updateViewport");
  function st(t18) {
    return t18.fixed ? true : t18.parent ? st(t18.parent) : false;
  }
  i(st, "isFixed");
  function Ke(t18) {
    return { color: t18.color, opacity: t18.opacity, anchor: t18.anchor, outline: t18.outline, shader: t18.shader, uniform: t18.uniform };
  }
  i(Ke, "getRenderProps");
  function os(t18, e = {}) {
    return { id: "circle", radius: t18, draw() {
      Ne(Object.assign(Ke(this), { radius: this.radius, fill: e.fill }));
    }, renderArea() {
      return new W(new C(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
    }, inspect() {
      return `radius: ${Math.ceil(this.radius)}`;
    } };
  }
  i(os, "circle");
  function Xn(...t18) {
    return { id: "color", color: _(...t18), inspect() {
      return `color: ${this.color.toString()}`;
    } };
  }
  i(Xn, "color");
  function is(t18) {
    return { add() {
      this.canvas = t18;
    } };
  }
  i(is, "drawon");
  function ss(t18 = 1) {
    let e, n = 0, r = false;
    return { require: ["opacity"], add() {
      e = this.opacity, this.opacity = 0;
    }, update() {
      r || (n += te(), this.opacity = Se(n, 0, t18, 0, e), n >= t18 && (this.opacity = e, r = true));
    } };
  }
  i(ss, "fadeIn");
  function as(t18 = "intersect") {
    return { id: "mask", mask: t18 };
  }
  i(as, "mask");
  function Qn(t18) {
    return { id: "opacity", opacity: t18 ?? 1, fadeIn(e = 1, n = l.k.easings.linear) {
      return l.game.root.tween(0, this.opacity, e, (r) => this.opacity = r, n);
    }, fadeOut(e = 1, n = l.k.easings.linear) {
      return l.game.root.tween(this.opacity, 0, e, (r) => this.opacity = r, n);
    }, inspect() {
      return `opacity: ${Zt(this.opacity, 1)}`;
    } };
  }
  i(Qn, "opacity");
  function us(t18 = 1, e = _(0, 0, 0), n = 1, r = "miter", o = 10, s = "butt") {
    return { id: "outline", outline: { width: t18, color: e, opacity: n, join: r, miterLimit: o, cap: s }, inspect() {
      return `outline: ${this.outline.width}px, ${this.outline.color}`;
    } };
  }
  i(us, "outline");
  var Xr = class {
    static {
      i(this, "Particle");
    }
    pos = x(0);
    vel = x(0);
    acc = x(0);
    angle = 0;
    angularVelocity = 0;
    damping = 0;
    t;
    lt = null;
    gc;
    constructor() {
      this.t = 0, this.gc = true;
    }
    get progress() {
      return this.lt ? this.t / this.lt : this.t;
    }
  };
  function cs(t18, e) {
    let n = e.lifetime, r = [], o = t18.colors || [I.WHITE], s = t18.opacities || [1], a = t18.quads || [new z(0, 0, 1, 1)], m = t18.scales || [1], u = t18.lifeTime, p = e.direction, c = e.spread, f = t18.speed || [0, 0], d = t18.angle || [0, 0], v = t18.angularVelocity || [0, 0], h = t18.acceleration || [x(0), x(0)], O = t18.damping || [0, 0], y = [], w = new Array(t18.max), V = 0, R = 0;
    for (let b = 0; b < t18.max; b++) {
      y[b * 6 + 0] = b * 4 + 0, y[b * 6 + 1] = b * 4 + 1, y[b * 6 + 2] = b * 4 + 3, y[b * 6 + 3] = b * 4 + 1, y[b * 6 + 4] = b * 4 + 2, y[b * 6 + 5] = b * 4 + 3;
      for (let E = 0; E < 4; E++) w[b * 4 + E] = { pos: new C(0, 0), uv: new C(0, 0), color: _(255, 255, 255), opacity: 1 };
      r[b] = new Xr();
    }
    let P = new ae();
    function D(b = 0) {
      for (; b < t18.max; ) {
        if (r[b].gc) return b;
        b++;
      }
      return null;
    }
    return i(D, "nextFree"), { id: "particles", emit(b) {
      let E = 0;
      for (let A = 0; A < b; A++) {
        if (E = D(E), E == null) return;
        let G = ge(p - c, p + c), M = C.fromAngle(G).scale(ge(f[0], f[1])), F = ge(d[0], d[1]), K = ge(v[0], v[1]), H = x(ge(h[0].x, h[1].x), ge(h[0].y, h[1].y)), q = ge(O[0], O[1]), Y = u ? ge(u[0], u[1]) : null, N = e.shape ? e.shape.random() : x(), j = r[E];
        j.lt = Y, j.pos = N, j.vel = M, j.acc = H, j.angle = F, j.angularVelocity = K, j.damping = q, j.angularVelocity = K, j.gc = false;
      }
      V += b;
    }, update() {
      if (n !== void 0 && n <= 0) return;
      let b = te();
      for (let E of r) if (!E.gc) {
        if (E.t += b, E.lt && E.t >= E.lt) {
          E.gc = true, V--;
          continue;
        }
        E.vel = E.vel.add(E.acc.scale(b)).scale(1 - E.damping * b), E.pos = E.pos.add(E.vel.scale(b)), E.angle += E.angularVelocity * b;
      }
      for (n !== void 0 && (n -= b, n <= 0 && P.trigger()), R += b; V < t18.max && e.rate && R > e.rate; ) this.emit(1), V++, R -= e.rate;
    }, draw() {
      if (!(n !== void 0 && n <= 0)) {
        for (let b = 0; b < r.length; b++) {
          let E = r[b];
          if (E.gc) continue;
          let A = E.progress, G = Math.floor(E.progress * o.length), M = G < o.length - 1 ? fe(o[G], o[G + 1], Se(A, G / o.length, (G + 1) / o.length, 0, 1)) : o[G], F = Math.floor(E.progress * s.length), K = F < s.length - 1 ? fe(s[F], s[F + 1], Se(A, F / s.length, (F + 1) / s.length, 0, 1)) : s[F], H = Math.floor(E.progress * a.length), q = a[H], Y = Math.floor(E.progress * m.length), N = m[Y], j = Math.cos(E.angle * Math.PI / 180), Z = Math.sin(E.angle * Math.PI / 180), $ = (t18.texture ? t18.texture.width : 10) * q.w / 2, ee = (t18.texture ? t18.texture.height : 10) * q.h / 2, Ee = b * 4, k = w[Ee];
          k.pos.x = E.pos.x + -$ * N * j - -ee * N * Z, k.pos.y = E.pos.y + -$ * N * Z + -ee * N * j, k.uv.x = q.x, k.uv.y = q.y, k.color.r = M.r, k.color.g = M.g, k.color.b = M.b, k.opacity = K, k = w[Ee + 1], k.pos.x = E.pos.x + $ * N * j - -ee * N * Z, k.pos.y = E.pos.y + $ * N * Z + -ee * N * j, k.uv.x = q.x + q.w, k.uv.y = q.y, k.color.r = M.r, k.color.g = M.g, k.color.b = M.b, k.opacity = K, k = w[Ee + 2], k.pos.x = E.pos.x + $ * N * j - ee * N * Z, k.pos.y = E.pos.y + $ * N * Z + ee * N * j, k.uv.x = q.x + q.w, k.uv.y = q.y + q.h, k.color.r = M.r, k.color.g = M.g, k.color.b = M.b, k.opacity = K, k = w[Ee + 3], k.pos.x = E.pos.x + -$ * N * j - ee * N * Z, k.pos.y = E.pos.y + -$ * N * Z + ee * N * j, k.uv.x = q.x, k.uv.y = q.y + q.h, k.color.r = M.r, k.color.g = M.g, k.color.b = M.b, k.opacity = K;
        }
        Le(w, y, this.fixed, t18.texture, this.shader, this.uniform);
      }
    }, onEnd(b) {
      return P.add(b);
    }, inspect() {
      return `count: ${V}/${t18.max}`;
    } };
  }
  i(cs, "particles");
  function ls(t18, e = {}) {
    if (t18.length < 3) throw new Error(`Polygon's need more than two points, ${t18.length} points provided`);
    return { id: "polygon", pts: t18, colors: e.colors, uv: e.uv, tex: e.tex, radius: e.radius, draw() {
      Pe(Object.assign(Ke(this), { pts: this.pts, colors: this.colors, uv: this.uv, tex: this.tex, radius: this.radius, fill: e.fill, triangulate: e.triangulate }));
    }, renderArea() {
      return new ye(this.pts);
    }, inspect() {
      return `polygon: ${this.pts.map((n) => `[${n.x},${n.y}]`).join(",")}`;
    } };
  }
  i(ls, "polygon");
  function Jn(t18, e, n) {
    let r;
    return l.game.root.get("area").forEach((s) => {
      if (n && n.some((u) => s.is(u))) return;
      let m = s.worldArea().raycast(t18, e);
      m && (r ? m.fraction < r.fraction && (r = m, r.object = s) : (r = m, r.object = s));
    }), r;
  }
  i(Jn, "raycast");
  function Zn(t18, e, n = {}) {
    return { id: "rect", width: t18, height: e, radius: n.radius || 0, draw() {
      ve(Object.assign(Ke(this), { width: this.width, height: this.height, radius: this.radius, fill: n.fill }));
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    }, inspect() {
      return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
    } };
  }
  i(Zn, "rect");
  function ms(t18, e) {
    return { id: "shader", shader: t18, ...typeof e == "function" ? { uniform: e(), update() {
      this.uniform = e();
    } } : { uniform: e }, inspect() {
      return `shader: ${t18}`;
    } };
  }
  i(ms, "shader");
  function ps(...t18) {
    return t18.length > 0 && (l.game.cam.pos = x(...t18)), l.game.cam.pos ? l.game.cam.pos.clone() : xt();
  }
  i(ps, "camPos");
  function ds(...t18) {
    return t18.length > 0 && (l.game.cam.scale = x(...t18)), l.game.cam.scale.clone();
  }
  i(ds, "camScale");
  function fs(t18) {
    return t18 !== void 0 && (l.game.cam.angle = t18), l.game.cam.angle;
  }
  i(fs, "camRot");
  function hs(t18 = _(255, 255, 255), e = 1) {
    let n = l.game.root.add([Zn(ie(), ue()), Xn(t18), Qn(1), nr()]), r = n.fadeOut(e);
    return r.onEnd(() => tr(n)), r;
  }
  i(hs, "camFlash");
  function gs() {
    return l.game.cam.transform.clone();
  }
  i(gs, "camTransform");
  function bs(t18 = 12) {
    l.game.cam.shake += t18;
  }
  i(bs, "shake");
  function pn(t18) {
    return l.game.cam.transform.multVec2(t18);
  }
  i(pn, "toScreen");
  function er(t18) {
    return l.game.cam.transform.invert().multVec2(t18);
  }
  i(er, "toWorld");
  function ys(t18, e) {
    if (!e.tileWidth || !e.tileHeight) throw new Error("Must provide tileWidth and tileHeight.");
    let n = l.game.root.add([St(e.pos ?? x(0))]), r = t18.length, o = 0, s = null, a = null, m = null, u = null, p = i((b) => b.x + b.y * o, "tile2Hash"), c = i((b) => x(Math.floor(b % o), Math.floor(b / o)), "hash2Tile"), f = i(() => {
      s = [];
      for (let b of n.children) d(b);
    }, "createSpatialMap"), d = i((b) => {
      let E = p(b.tilePos);
      s[E] ? s[E].push(b) : s[E] = [b];
    }, "insertIntoSpatialMap"), v = i((b) => {
      let E = p(b.tilePos);
      if (s[E]) {
        let A = s[E].indexOf(b);
        A >= 0 && s[E].splice(A, 1);
      }
    }, "removeFromSpatialMap"), h = i(() => {
      let b = false;
      for (let E of n.children) {
        let A = n.pos2Tile(E.pos);
        (E.tilePos.x != A.x || E.tilePos.y != A.y) && (b = true, v(E), E.tilePos.x = A.x, E.tilePos.y = A.y, d(E));
      }
      b && n.trigger("spatialMapChanged");
    }, "updateSpatialMap"), O = i(() => {
      let b = n.getSpatialMap(), E = n.numRows() * n.numColumns();
      a ? a.length = E : a = new Array(E), a.fill(1, 0, E);
      for (let A = 0; A < b.length; A++) {
        let G = b[A];
        if (G) {
          let M = 0;
          for (let F of G) if (F.isObstacle) {
            M = 1 / 0;
            break;
          } else M += F.cost;
          a[A] = M || 1;
        }
      }
    }, "createCostMap"), y = i(() => {
      let b = n.getSpatialMap(), E = n.numRows() * n.numColumns();
      m ? m.length = E : m = new Array(E), m.fill(15, 0, E);
      for (let A = 0; A < b.length; A++) {
        let G = b[A];
        if (G) {
          let M = G.length, F = 15;
          for (let K = 0; K < M; K++) F |= G[K].edgeMask;
          m[A] = F;
        }
      }
    }, "createEdgeMap"), w = i(() => {
      let b = n.numRows() * n.numColumns(), E = i((G, M) => {
        let F = [];
        for (F.push(G); F.length > 0; ) {
          let K = F.pop();
          P(K).forEach((H) => {
            u[H] < 0 && (u[H] = M, F.push(H));
          });
        }
      }, "traverse");
      u ? u.length = b : u = new Array(b), u.fill(-1, 0, b);
      let A = 0;
      for (let G = 0; G < a.length; G++) {
        if (u[G] >= 0) {
          A++;
          continue;
        }
        E(G, A), A++;
      }
    }, "createConnectivityMap"), V = i((b, E) => a[E], "getCost"), R = i((b, E) => {
      let A = c(b), G = c(E);
      return A.dist(G);
    }, "getHeuristic"), P = i((b, E) => {
      let A = [], G = Math.floor(b % o), M = G > 0 && m[b] & 1 && a[b - 1] !== 1 / 0, F = b >= o && m[b] & 2 && a[b - o] !== 1 / 0, K = G < o - 1 && m[b] & 4 && a[b + 1] !== 1 / 0, H = b < o * r - o - 1 && m[b] & 8 && a[b + o] !== 1 / 0;
      return E ? (M && (F && A.push(b - o - 1), A.push(b - 1), H && A.push(b + o - 1)), F && A.push(b - o), K && (F && A.push(b - o + 1), A.push(b + 1), H && A.push(b + o + 1)), H && A.push(b + o)) : (M && A.push(b - 1), F && A.push(b - o), K && A.push(b + 1), H && A.push(b + o)), A;
    }, "getNeighbours"), D = { id: "level", tileWidth() {
      return e.tileWidth;
    }, tileHeight() {
      return e.tileHeight;
    }, spawn(b, ...E) {
      let A = x(...E), G = (() => {
        if (typeof b == "string") {
          if (e.tiles[b]) {
            if (typeof e.tiles[b] != "function") throw new Error("Level symbol def must be a function returning a component list");
            return e.tiles[b](A);
          } else if (e.wildcardTile) return e.wildcardTile(b, A);
        } else {
          if (Array.isArray(b)) return b;
          throw new Error("Expected a symbol or a component list");
        }
      })();
      if (!G) return null;
      let M = false, F = false;
      for (let H of G) H.id === "tile" && (F = true), H.id === "pos" && (M = true);
      M || G.push(St(this.tile2Pos(A))), F || G.push(rr());
      let K = n.add(G);
      return M && (K.tilePosOffset = K.pos.clone()), K.tilePos = A, K.transform = mt(K), s && (d(K), this.trigger("spatialMapChanged"), this.trigger("navigationMapInvalid")), K;
    }, numColumns() {
      return o;
    }, numRows() {
      return r;
    }, levelWidth() {
      return o * this.tileWidth();
    }, levelHeight() {
      return r * this.tileHeight();
    }, tile2Pos(...b) {
      return x(...b).scale(this.tileWidth(), this.tileHeight());
    }, pos2Tile(...b) {
      let E = x(...b);
      return x(Math.floor(E.x / this.tileWidth()), Math.floor(E.y / this.tileHeight()));
    }, getSpatialMap() {
      return s || f(), s;
    }, onSpatialMapChanged(b) {
      return this.on("spatialMapChanged", b);
    }, onNavigationMapInvalid(b) {
      return this.on("navigationMapInvalid", b);
    }, getAt(b) {
      s || f();
      let E = p(b);
      return s[E] || [];
    }, raycast(b, E) {
      let A = this.toWorld(b), G = this.toWorld(b.add(E)).sub(A), M = 1 / this.tileWidth(), F = b.scale(M), K = To(F, E, (H) => {
        let q = this.getAt(H);
        if (q.some((N) => N.isObstacle)) return true;
        let Y = null;
        for (let N of q) if (N.is("area")) {
          let Z = N.worldArea().raycast(A, G);
          Z && (Y ? Z.fraction < Y.fraction && (Y = Z, Y.object = N) : (Y = Z, Y.object = N));
        }
        return Y && (Y.point = this.fromWorld(Y.point).scale(M)), Y || false;
      }, 64);
      return K && (K.point = K.point.scale(this.tileWidth())), K;
    }, update() {
      s && h();
    }, invalidateNavigationMap() {
      a = null, m = null, u = null;
    }, onNavigationMapChanged(b) {
      return this.on("navigationMapChanged", b);
    }, getTilePath(b, E, A = {}) {
      if (a || O(), m || y(), u || w(), b.x < 0 || b.x >= o || b.y < 0 || b.y >= r || E.x < 0 || E.x >= o || E.y < 0 || E.y >= r) return null;
      let G = p(b), M = p(E);
      if (a[M] === 1 / 0) return null;
      if (G === M) return [];
      if (u[G] != -1 && u[G] !== u[M]) return null;
      let F = new Kt((j, Z) => j.cost < Z.cost);
      F.insert({ cost: 0, node: G });
      let K = /* @__PURE__ */ new Map();
      K.set(G, G);
      let H = /* @__PURE__ */ new Map();
      for (H.set(G, 0); F.length !== 0; ) {
        let j = F.remove()?.node;
        if (j === M) break;
        let Z = P(j, A.allowDiagonals);
        for (let $ of Z) {
          let ee = (H.get(j) || 0) + V(j, $) + R($, M);
          (!H.has($) || ee < H.get($)) && (H.set($, ee), F.insert({ cost: ee, node: $ }), K.set($, j));
        }
      }
      let q = [], Y = M, N = c(Y);
      for (q.push(N); Y !== G; ) {
        let j = K.get(Y);
        if (j === void 0) throw new Error("Bug in pathfinding algorithm");
        Y = j;
        let Z = c(Y);
        q.push(Z);
      }
      return q.reverse();
    }, getPath(b, E, A = {}) {
      let G = this.tileWidth(), M = this.tileHeight(), F = this.getTilePath(this.pos2Tile(b), this.pos2Tile(E), A);
      return F ? [b, ...F.slice(1, -1).map((K) => K.scale(G, M).add(G / 2, M / 2)), E] : null;
    } };
    return n.use(D), n.onNavigationMapInvalid(() => {
      n.invalidateNavigationMap(), n.trigger("navigationMapChanged");
    }), t18.forEach((b, E) => {
      let A = b.split("");
      o = Math.max(A.length, o), A.forEach((G, M) => {
        n.spawn(G, x(M, E));
      });
    }), n;
  }
  i(ys, "addLevel");
  function Qe(t18, e, n) {
    return l.game.objEvents.registers[t18] || (l.game.objEvents.registers[t18] = new Jt()), l.game.objEvents.on(t18, (r, ...o) => {
      r.is(e) && n(r, ...o);
    });
  }
  i(Qe, "on");
  var xs = me((t18) => {
    let e = l.game.root.add([{ fixedUpdate: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => Qe("fixedUpdate", t18, e));
  var vs = me((t18) => {
    let e = l.game.root.add([{ update: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => Qe("update", t18, e));
  var ws = me((t18) => {
    let e = l.game.root.add([{ draw: t18 }]);
    return { get paused() {
      return e.hidden;
    }, set paused(n) {
      e.hidden = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => Qe("draw", t18, e));
  var Qr = me((t18) => l.game.events.on("add", t18), (t18, e) => Qe("add", t18, e));
  var Cs = me((t18) => l.game.events.on("destroy", t18), (t18, e) => Qe("destroy", t18, e));
  function Os(t18, e, n) {
    return Qe("collide", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Os, "onCollide");
  function Es(t18, e, n) {
    return Qe("collideUpdate", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Es, "onCollideUpdate");
  function Ts(t18, e, n) {
    return Qe("collideEnd", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Ts, "onCollideEnd");
  function or(t18, e) {
    l.game.root.get(t18, { recursive: true }).forEach(e), Qr(t18, e);
  }
  i(or, "forAllCurrentAndFuture");
  var As = me((t18) => l.app.onMousePress(t18), (t18, e) => {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onClick() requires the object to have area() component");
      n.push(r.onClick(() => e(r)));
    }), ke.join(n);
  });
  function Ss(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onHover() requires the object to have area() component");
      n.push(r.onHover(() => e(r)));
    }), ke.join(n);
  }
  i(Ss, "onHover");
  function Vs(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onHoverUpdate() requires the object to have area() component");
      n.push(r.onHoverUpdate(() => e(r)));
    }), ke.join(n);
  }
  i(Vs, "onHoverUpdate");
  function Ps(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area) throw new Error("onHoverEnd() requires the object to have area() component");
      n.push(r.onHoverEnd(() => e(r)));
    }), ke.join(n);
  }
  i(Ps, "onHoverEnd");
  function Gs(t18) {
    l.game.events.on("loading", t18);
  }
  i(Gs, "onLoading");
  function Rs(t18) {
    l.app.onResize(t18);
  }
  i(Rs, "onResize");
  function Ms(t18) {
    l.game.events.on("error", t18);
  }
  i(Ms, "onError");
  function _t(t18) {
    l.assets.loaded ? t18() : l.game.events.on("load", t18);
  }
  i(_t, "onLoad");
  function dn(t18 = []) {
    let e = /* @__PURE__ */ new Map(), n = [], r = {}, o = new ze(), s = [], a = null, m = false, u = { id: Jo(), hidden: false, transform: new he(), children: [], parent: null, set paused(c) {
      if (c !== m) {
        m = c;
        for (let f of s) f.paused = c;
      }
    }, get paused() {
      return m;
    }, get tags() {
      let c = [];
      for (let [f, d] of e.entries()) Object.keys(d).length == 1 && c.push(f);
      return c;
    }, add(c) {
      let f = Array.isArray(c) ? dn(c) : c;
      if (f.parent) throw new Error("Cannot add a game obj that already has a parent.");
      return f.parent = this, f.transform = mt(f), this.children.push(f), f.trigger("add", f), l.game.events.trigger("add", f), f;
    }, readd(c) {
      let f = this.children.indexOf(c);
      return f !== -1 && (this.children.splice(f, 1), this.children.push(c)), c;
    }, remove(c) {
      let f = this.children.indexOf(c);
      if (f !== -1) {
        c.parent = null, this.children.splice(f, 1);
        let d = i((v) => {
          v.trigger("destroy"), l.game.events.trigger("destroy", v), v.children.forEach((h) => d(h));
        }, "trigger");
        d(c);
      }
    }, removeAll(c) {
      if (c) this.get(c).forEach((f) => this.remove(f));
      else for (let f of [...this.children]) this.remove(f);
    }, fixedUpdate() {
      this.paused || (this.children.forEach((c) => c.fixedUpdate()), this.trigger("fixedUpdate"));
    }, update() {
      this.paused || (this.children.forEach((c) => c.update()), this.trigger("update"));
    }, draw() {
      if (this.hidden) return;
      this.canvas && (Oe(), this.canvas.bind());
      let c = l.gfx.fixed;
      this.fixed && (l.gfx.fixed = true), be(), Q(this.pos), nt(this.scale), We(this.angle);
      let f = this.children.sort((d, v) => {
        let h = d.layerIndex ?? l.game.defaultLayerIndex, O = v.layerIndex ?? l.game.defaultLayerIndex;
        return h - O || (d.z ?? 0) - (v.z ?? 0);
      });
      if (this.mask) {
        let d = { intersect: l.k.drawMasked, subtract: l.k.drawSubtracted }[this.mask];
        if (!d) throw new Error(`Invalid mask func: "${this.mask}"`);
        d(() => {
          f.forEach((v) => v.draw());
        }, () => {
          this.trigger("draw");
        });
      } else this.trigger("draw"), f.forEach((d) => d.draw());
      pe(), l.gfx.fixed = c, this.canvas && (Oe(), this.canvas.unbind());
    }, drawInspect() {
      this.hidden || (be(), Q(this.pos), nt(this.scale), We(this.angle), this.children.forEach((c) => c.drawInspect()), this.trigger("drawInspect"), pe());
    }, use(c) {
      if (!c) return;
      if (typeof c == "string") return this.use({ id: c });
      let f = [];
      c.id ? (this.unuse(c.id), r[c.id] = [], f = r[c.id], e.set(c.id, c)) : n.push(c);
      for (let v in c) {
        if (vi.has(v)) continue;
        let h = Object.getOwnPropertyDescriptor(c, v);
        if (h) if (typeof h.value == "function" && (c[v] = c[v].bind(this)), h.set && Object.defineProperty(c, v, { set: h.set.bind(this) }), h.get && Object.defineProperty(c, v, { get: h.get.bind(this) }), wi.has(v)) {
          let O = v === "add" ? () => {
            a = i((y) => f.push(y), "onCurCompCleanup"), c[v]?.(), a = null;
          } : c[v];
          f.push(this.on(v, O).cancel);
        } else if (this[v] === void 0) Object.defineProperty(this, v, { get: i(() => c[v], "get"), set: i((O) => c[v] = O, "set"), configurable: true, enumerable: true }), f.push(() => delete this[v]);
        else throw new Error(`Duplicate component property: "${v}"`);
      }
      let d = i(() => {
        if (c.require) {
          for (let v of c.require) if (!this.c(v)) throw new Error(`Component "${c.id}" requires component "${v}"`);
        }
      }, "checkDeps");
      c.destroy && f.push(c.destroy.bind(this)), this.exists() ? (d(), c.add && (a = i((v) => f.push(v), "onCurCompCleanup"), c.add.call(this), a = null)) : c.require && f.push(this.on("add", d).cancel);
    }, unuse(c) {
      if (e.has(c)) {
        for (let f of e.values()) if (f.require && f.require.includes(c)) throw new Error(`Can't unuse. Component "${f.id}" requires component "${c}"`);
        e.delete(c);
      }
      r[c] && (r[c].forEach((f) => f()), delete r[c]);
    }, c(c) {
      return e.get(c) ?? null;
    }, get(c, f = {}) {
      let d = f.recursive ? this.children.flatMap(i(function v(h) {
        return [h, ...h.children.flatMap(v)];
      }, "recurse")) : this.children;
      if (d = d.filter((v) => c ? v.is(c) : true), f.liveUpdate) {
        let v = i((O) => f.recursive ? this.isAncestorOf(O) : O.parent === this, "isChild"), h = [];
        h.push(l.k.onAdd((O) => {
          v(O) && O.is(c) && d.push(O);
        })), h.push(l.k.onDestroy((O) => {
          if (v(O) && O.is(c)) {
            let y = d.findIndex((w) => w.id === O.id);
            y !== -1 && d.splice(y, 1);
          }
        })), this.onDestroy(() => {
          for (let O of h) O.cancel();
        });
      }
      return d;
    }, query(c) {
      let f = c.hierarchy || "children", d = c.include, v = c.exclude, h = [];
      switch (f) {
        case "children":
          h = this.children;
          break;
        case "siblings":
          h = this.parent ? this.parent.children.filter((y) => y !== this) : [];
          break;
        case "ancestors":
          let O = this.parent;
          for (; O; ) h.push(O), O = O.parent;
          break;
        case "descendants":
          h = this.children.flatMap(i(function y(w) {
            return [w, ...w.children.flatMap(y)];
          }, "recurse"));
          break;
      }
      if (d && ((c.includeOp || "and") === "and" || !Array.isArray(c.include) ? h = h.filter((y) => y.is(d)) : h = h.filter((y) => c.include.some((w) => y.is(w)))), v && ((c.includeOp || "and") === "and" || !Array.isArray(c.include) ? h = h.filter((y) => !y.is(v)) : h = h.filter((y) => !c.exclude.some((w) => y.is(w)))), c.visible === true && (h = h.filter((O) => O.visible)), c.distance) {
        if (!this.pos) throw Error("Can't do a distance query from an object without pos");
        let O = c.distanceOp || "near", y = c.distance * c.distance;
        O === "near" ? h = h.filter((w) => w.pos && this.pos.sdist(w.pos) <= y) : h = h.filter((w) => w.pos && this.pos.sdist(w.pos) > y);
      }
      return c.name && (h = h.filter((O) => O.name === c.name)), h;
    }, isAncestorOf(c) {
      return c.parent ? c.parent === this || this.isAncestorOf(c.parent) : false;
    }, exists() {
      return l.game.root.isAncestorOf(this);
    }, is(c) {
      if (c === "*") return true;
      if (Array.isArray(c)) {
        for (let f of c) if (!this.c(f)) return false;
        return true;
      } else return this.c(c) != null;
    }, on(c, f) {
      let d = o.on(c, f.bind(this));
      return a && a(() => d.cancel()), d;
    }, trigger(c, ...f) {
      o.trigger(c, ...f), l.game.objEvents.trigger(c, this, ...f);
    }, destroy() {
      this.parent && this.parent.remove(this);
    }, inspect() {
      let c = {};
      for (let [f, d] of e) c[f] = d.inspect?.() ?? null;
      for (let [f, d] of n.entries()) {
        if (d.inspect) {
          c[f] = d.inspect();
          continue;
        }
        for (let [v, h] of Object.entries(d)) typeof h != "function" && (c[v] = `${v}: ${h}`);
      }
      return c;
    }, onAdd(c) {
      return this.on("add", c);
    }, onFixedUpdate(c) {
      return this.on("fixedUpdate", c);
    }, onUpdate(c) {
      return this.on("update", c);
    }, onDraw(c) {
      return this.on("draw", c);
    }, onDestroy(c) {
      return this.on("destroy", c);
    }, clearEvents() {
      o.clear();
    } }, p = ["onKeyPress", "onKeyPressRepeat", "onKeyDown", "onKeyRelease", "onMousePress", "onMouseDown", "onMouseRelease", "onMouseMove", "onCharInput", "onMouseMove", "onTouchStart", "onTouchMove", "onTouchEnd", "onScroll", "onGamepadButtonPress", "onGamepadButtonDown", "onGamepadButtonRelease", "onGamepadStick", "onButtonPress", "onButtonDown", "onButtonRelease"];
    for (let c of p) u[c] = (...f) => {
      let d = l.app[c]?.(...f);
      return s.push(d), u.onDestroy(() => d.cancel()), u.on("sceneEnter", () => {
        s.splice(s.indexOf(d), 1);
        let v = l.app[c]?.(...f);
        ke.replace(d, v), s.push(d);
      }), d;
    };
    for (let c of t18) u.use(c);
    return u;
  }
  i(dn, "make");
  var Ds = i(() => ({ events: new ze(), objEvents: new ze(), root: dn([]), gravity: null, scenes: {}, currentScene: null, layers: null, defaultLayerIndex: 0, logs: [], cam: { pos: null, scale: new C(1), angle: 0, shake: 0, transform: new he() } }), "initGame");
  function Bs(t18) {
    l.game.gravity = t18 ? (l.game.gravity || x(0, 1)).unit().scale(t18) : null;
  }
  i(Bs, "setGravity");
  function Fs() {
    return l.game.gravity ? l.game.gravity.len() : 0;
  }
  i(Fs, "getGravity");
  function Ls(t18) {
    l.game.gravity = t18.unit().scale(l.game.gravity ? l.game.gravity.len() : 1);
  }
  i(Ls, "setGravityDirection");
  function Vt() {
    return l.game.gravity ? l.game.gravity.unit() : x(0, 1);
  }
  i(Vt, "getGravityDirection");
  var Ks = co("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");
  var Is = i(() => (() => {
    let e = new (window.AudioContext || window.webkitAudioContext)(), n = e.createGain();
    n.connect(e.destination);
    let r = new rt(ii(e));
    return e.decodeAudioData(Ks.buffer.slice(0)).then((o) => {
      r.buf = o;
    }).catch((o) => {
      console.error("Failed to load burp: ", o);
    }), { ctx: e, masterNode: n, burpSnd: r };
  })(), "initAudio");
  function js(t18, e = {}) {
    let n = new ae(), r = new Audio(t18);
    r.crossOrigin = "anonymous", l.audio.ctx.createMediaElementSource(r).connect(l.audio.masterNode);
    function s() {
      l.debug.paused || l.app.isHidden() && !l.globalOpt.backgroundAudio || l.audio.ctx.resume();
    }
    i(s, "resumeAudioCtx");
    function a() {
      s(), r.play();
    }
    return i(a, "play"), e.paused || a(), r.onended = () => n.trigger(), { play() {
      a();
    }, seek(m) {
      r.currentTime = m;
    }, stop() {
      r.pause(), this.seek(0);
    }, set loop(m) {
      r.loop = m;
    }, get loop() {
      return r.loop;
    }, set paused(m) {
      m ? r.pause() : a();
    }, get paused() {
      return r.paused;
    }, time() {
      return r.currentTime;
    }, duration() {
      return r.duration;
    }, set volume(m) {
      r.volume = Me(m, 0, 1);
    }, get volume() {
      return r.volume;
    }, set speed(m) {
      r.playbackRate = Math.max(m, 0);
    }, get speed() {
      return r.playbackRate;
    }, set detune(m) {
    }, get detune() {
      return 0;
    }, onEnd(m) {
      return n.add(m);
    }, then(m) {
      return this.onEnd(m);
    } };
  }
  i(js, "playMusic");
  function ks(t18, e = {}) {
    if (typeof t18 == "string" && l.assets.music[t18]) return js(l.assets.music[t18], e);
    let n = l.audio.ctx, r = e.paused ?? false, o = n.createBufferSource(), s = new ae(), a = n.createGain(), m = n.createStereoPanner(), u = e.seek ?? 0, p = 0, c = 0, f = false;
    o.loop = !!e.loop, o.detune.value = e.detune ?? 0, o.playbackRate.value = e.speed ?? 1, o.connect(m), o.onended = () => {
      h() >= (o.buffer?.duration ?? Number.POSITIVE_INFINITY) && s.trigger();
    }, m.pan.value = e.pan ?? 0, m.connect(a), a.connect(l.audio.masterNode), a.gain.value = e.volume ?? 1;
    let d = i((y) => {
      o.buffer = y.buf, r || (p = n.currentTime, o.start(0, u), f = true);
    }, "start"), v = Ni(t18);
    v instanceof ce && v.onLoad(d);
    let h = i(() => {
      if (!o.buffer) return 0;
      let y = r ? c - p : n.currentTime - p, w = o.buffer.duration;
      return o.loop ? y % w : Math.min(y, w);
    }, "getTime"), O = i((y) => {
      let w = n.createBufferSource();
      return w.buffer = y.buffer, w.loop = y.loop, w.playbackRate.value = y.playbackRate.value, w.detune.value = y.detune.value, w.onended = y.onended, w.connect(m), w;
    }, "cloneNode");
    return { stop() {
      this.paused = true, this.seek(0);
    }, set paused(y) {
      if (r !== y) if (r = y, y) f && (o.stop(), f = false), c = n.currentTime;
      else {
        o = O(o);
        let w = c - p;
        o.start(0, w), f = true, p = n.currentTime - w, c = 0;
      }
    }, get paused() {
      return r;
    }, play(y = 0) {
      this.seek(y), this.paused = false;
    }, seek(y) {
      o.buffer?.duration && (y > o.buffer.duration || (r ? (o = O(o), p = c - y) : (o.stop(), o = O(o), p = n.currentTime - y, o.start(0, y), f = true, c = 0)));
    }, set speed(y) {
      o.playbackRate.value = y;
    }, get speed() {
      return o.playbackRate.value;
    }, set detune(y) {
      o.detune.value = y;
    }, get detune() {
      return o.detune.value;
    }, set volume(y) {
      a.gain.value = Math.max(y, 0);
    }, get volume() {
      return a.gain.value;
    }, set pan(y) {
      m.pan.value = y;
    }, get pan() {
      return m.pan.value;
    }, set loop(y) {
      o.loop = y;
    }, get loop() {
      return o.loop;
    }, duration() {
      return o.buffer?.duration ?? 0;
    }, time() {
      return h() % this.duration();
    }, onEnd(y) {
      return s.add(y);
    }, then(y) {
      return this.onEnd(y);
    } };
  }
  i(ks, "play");
  function ir(t18) {
    return l.k.play(l.audio.burpSnd, t18);
  }
  i(ir, "burp");
  function _s(t18) {
    return t18 !== void 0 && (l.audio.masterNode.gain.value = t18), l.audio.masterNode.gain.value;
  }
  i(_s, "volume");
  function sr() {
    l.app.onHide(() => {
      l.globalOpt.backgroundAudio || l.audio.ctx.suspend();
    }), l.app.onShow(() => {
      !l.globalOpt.backgroundAudio && !l.debug.paused && l.audio.ctx.resume();
    }), l.app.onResize(() => {
      if (l.app.isFullscreen()) return;
      let t18 = l.globalOpt.width && l.globalOpt.height;
      t18 && !l.globalOpt.stretch && !l.globalOpt.letterbox || (l.canvas.width = l.canvas.offsetWidth * l.pixelDensity, l.canvas.height = l.canvas.offsetHeight * l.pixelDensity, $n(), t18 || (l.gfx.frameBuffer.free(), l.gfx.frameBuffer = new ot(l.gfx.ggl, l.gfx.ggl.gl.drawingBufferWidth, l.gfx.ggl.gl.drawingBufferHeight), l.gfx.width = l.gfx.ggl.gl.drawingBufferWidth / l.pixelDensity / l.gscale, l.gfx.height = l.gfx.ggl.gl.drawingBufferHeight / l.pixelDensity / l.gscale));
    }), l.globalOpt.debug !== false && (l.app.onKeyPress(l.globalOpt.debugKey ?? "f1", () => l.debug.inspect = !l.debug.inspect), l.app.onKeyPress("f2", () => l.debug.clearLog()), l.app.onKeyPress("f8", () => l.debug.paused = !l.debug.paused), l.app.onKeyPress("f7", () => {
      l.debug.timeScale = Zt(Me(l.debug.timeScale - 0.2, 0, 2), 1);
    }), l.app.onKeyPress("f9", () => {
      l.debug.timeScale = Zt(Me(l.debug.timeScale + 0.2, 0, 2), 1);
    }), l.app.onKeyPress("f10", () => l.debug.stepFrame())), l.globalOpt.burp && l.app.onKeyPress("b", () => ir());
  }
  i(sr, "initEvents");
  function Ns(t18, e = {}) {
    let n = l.game.root.add([St(t18), ar()]), r = (e.speed || 1) * 5, o = e.scale || 1;
    n.add([fn(l.boomSprite), Nt(0), hn("center"), Jr(r, o), ...e.comps ?? []]);
    let s = n.add([fn(l.kaSprite), Nt(0), hn("center"), gn(), ...e.comps ?? []]);
    return s.wait(0.4 / r, () => s.use(Jr(r, o))), s.onDestroy(() => n.destroy()), n;
  }
  i(Ns, "addKaboom");
  var Us = i(function(t18, e) {
    if (l.game.layers) throw Error("Layers can only be assigned once.");
    let n = t18.indexOf(e);
    if (n == -1) throw Error("The default layer name should be present in the layers list.");
    l.game.layers = t18, l.game.defaultLayerIndex = n;
  }, "layers");
  function tr(t18) {
    t18.destroy();
  }
  i(tr, "destroy");
  function Hs() {
    return l.game.root;
  }
  i(Hs, "getTreeRoot");
  function qs(t18, e) {
    l.game.scenes[t18] = e;
  }
  i(qs, "scene");
  function zs(t18, ...e) {
    if (!l.game.scenes[t18]) throw new Error(`Scene not found: ${t18}`);
    l.game.events.onOnce("frameEnd", () => {
      l.game.events.trigger("sceneLeave", t18), l.app.events.clear(), l.game.events.clear(), l.game.objEvents.clear(), [...l.game.root.children].forEach((n) => {
        !n.stay || n.scenesToStay && !n.scenesToStay.includes(t18) ? l.game.root.remove(n) : n.trigger("sceneEnter", t18);
      }), l.game.root.clearEvents(), sr(), l.game.cam = { pos: null, scale: x(1), angle: 0, shake: 0, transform: new he() }, l.game.scenes[t18](...e);
    }), l.game.currentScene = t18;
  }
  i(zs, "go");
  function Ys(t18) {
    return l.game.events.on("sceneLeave", t18);
  }
  i(Ys, "onSceneLeave");
  function Ws() {
    return l.game.currentScene;
  }
  i(Ws, "getSceneName");
  function fn(t18, e = {}) {
    let n = null, r = null, o = null, s = new ae();
    if (!t18) throw new Error("Please pass the resource name or data to sprite()");
    let a = i((u, p, c, f) => {
      let d = x(1, 1);
      return c && f ? (d.x = c / (u.width * p.w), d.y = f / (u.height * p.h)) : c ? (d.x = c / (u.width * p.w), d.y = d.x) : f && (d.y = f / (u.height * p.h), d.x = d.y), d;
    }, "calcTexScale"), m = i((u, p) => {
      if (!p) return;
      let c = p.frames[0].clone();
      e.quad && (c = c.scale(e.quad));
      let f = a(p.tex, c, e.width, e.height);
      u.width = p.tex.width * c.w * f.x, u.height = p.tex.height * c.h * f.y, e.anim && u.play(e.anim), n = p, s.trigger(n);
    }, "setSpriteData");
    return { id: "sprite", width: 0, height: 0, frame: e.frame || 0, quad: e.quad || new z(0, 0, 1, 1), animSpeed: e.animSpeed ?? 1, flipX: e.flipX ?? false, flipY: e.flipY ?? false, get sprite() {
      return t18.toString();
    }, set sprite(u) {
      let p = It(u);
      p && p.onLoad((c) => m(this, c));
    }, get animFrame() {
      if (!n || !r || o === null) return this.frame;
      let u = n.anims[r.name];
      return typeof u == "number" ? u : this.frame - Math.min(u.from, u.to);
    }, draw() {
      if (!n) return;
      let u = n.frames[this.frame ?? 0];
      if (!u) throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (n.slice9) {
        let { left: p, right: c, top: f, bottom: d } = n.slice9, v = n.tex.width * u.w, h = n.tex.height * u.h, O = this.width - p - c, y = this.height - f - d, w = p / v, V = c / v, R = 1 - w - V, P = f / h, D = d / h, b = 1 - P - D, E = [le(0, 0, w, P), le(w, 0, R, P), le(w + R, 0, V, P), le(0, P, w, b), le(w, P, R, b), le(w + R, P, V, b), le(0, P + b, w, D), le(w, P + b, R, D), le(w + R, P + b, V, D), le(0, 0, p, f), le(p, 0, O, f), le(p + O, 0, c, f), le(0, f, p, y), le(p, f, O, y), le(p + O, f, c, y), le(0, f + y, p, d), le(p, f + y, O, d), le(p + O, f + y, c, d)];
        for (let A = 0; A < 9; A++) {
          let G = E[A], M = E[A + 9];
          At(Object.assign(Ke(this), { pos: M.pos(), tex: n.tex, quad: u.scale(G), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: M.w, height: M.h }));
        }
      } else At(Object.assign(Ke(this), { tex: n.tex, quad: u.scale(this.quad ?? new z(0, 0, 1, 1)), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: this.width, height: this.height }));
    }, add() {
      let u = It(t18);
      u ? u.onLoad((p) => m(this, p)) : _t(() => m(this, It(t18).data));
    }, update() {
      if (!n || !r || o === null) return;
      let u = n.anims[r.name];
      if (typeof u == "number") {
        this.frame = u;
        return;
      }
      if (u.speed === 0) throw new Error("Sprite anim speed cannot be 0");
      r.timer += te() * this.animSpeed, r.timer >= 1 / r.speed && (r.timer = 0, this.frame += o, (this.frame < Math.min(u.from, u.to) || this.frame > Math.max(u.from, u.to)) && (r.loop ? r.pingpong ? (this.frame -= o, o *= -1, this.frame += o) : this.frame = u.from : r.pingpong ? o === Math.sign(u.to - u.from) ? (this.frame = u.to, o *= -1, this.frame += o) : (this.frame = u.from, r.onEnd(), this.stop()) : (this.frame = u.to, r.onEnd(), this.stop())));
    }, play(u, p = {}) {
      if (!n) {
        s.add(() => this.play(u, p));
        return;
      }
      let c = n.anims[u];
      if (c === void 0) throw new Error(`Anim not found: ${u}`);
      r && this.stop(), r = typeof c == "number" ? { name: u, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: i(() => {
      }, "onEnd") } : { name: u, timer: 0, loop: p.loop ?? c.loop ?? false, pingpong: p.pingpong ?? c.pingpong ?? false, speed: p.speed ?? c.speed ?? 10, onEnd: p.onEnd ?? (() => {
      }) }, o = typeof c == "number" ? null : c.from < c.to ? 1 : -1, this.frame = typeof c == "number" ? c : c.from, this.trigger("animStart", u);
    }, stop() {
      if (!r) return;
      let u = r.name;
      r = null, this.trigger("animEnd", u);
    }, numFrames() {
      return n?.frames.length ?? 0;
    }, getCurAnim() {
      return r;
    }, curAnim() {
      return r?.name;
    }, getAnim(u) {
      return n?.anims[u] ?? null;
    }, hasAnim(u) {
      return !!this.getAnim(u);
    }, onAnimEnd(u) {
      return this.on("animEnd", u);
    }, onAnimStart(u) {
      return this.on("animStart", u);
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    }, inspect() {
      return typeof t18 == "string" ? `sprite: "${t18}"` : null;
    } };
  }
  i(fn, "sprite");
  function $s(t18, e = {}) {
    function n(o) {
      let s = Ue(Object.assign(Ke(o), { text: o.text + "", size: o.textSize, font: o.font, width: e.width && o.width, align: o.align, letterSpacing: o.letterSpacing, lineSpacing: o.lineSpacing, transform: o.textTransform, styles: o.textStyles }));
      return e.width || (o.width = s.width / (o.scale?.x || 1)), o.height = s.height / (o.scale?.y || 1), s;
    }
    i(n, "update");
    let r = { id: "text", set text(o) {
      t18 = o, n(this), this.renderedText = zn(t18).text;
    }, get text() {
      return t18;
    }, textSize: e.size ?? 36, font: e.font, width: e.width ?? 0, height: 0, align: e.align, lineSpacing: e.lineSpacing, letterSpacing: e.letterSpacing, textTransform: e.transform, textStyles: e.styles, renderedText: t18 ? zn(t18).text : "", add() {
      _t(() => n(this));
    }, draw() {
      He(n(this));
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    } };
    return n(r), r;
  }
  i($s, "text");
  function Xs(t18, e) {
    return { id: "rect", width: t18, height: e, draw() {
      it(Object.assign(Ke(this), { width: this.width, height: this.height }));
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    }, inspect() {
      return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)})h`;
    } };
  }
  i(Xs, "uvquad");
  function Qs(t18 = {}) {
    let e = null, n = null, r = null, o = null;
    return { id: "agent", require: ["pos", "tile"], agentSpeed: t18.speed ?? 100, allowDiagonals: t18.allowDiagonals ?? true, getDistanceToTarget() {
      return e ? this.pos.dist(e) : 0;
    }, getNextLocation() {
      return n && r ? n[r] : null;
    }, getPath() {
      return n ? n.slice() : null;
    }, getTarget() {
      return e;
    }, isNavigationFinished() {
      return n ? r === null : true;
    }, isTargetReachable() {
      return n !== null;
    }, isTargetReached() {
      return e ? this.pos.eq(e) : true;
    }, setTarget(s) {
      e = s, n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), r = n ? 0 : null, n && r !== null ? (o || (o = this.getLevel().onNavigationMapChanged(() => {
        e && n && r !== null && (n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), n ? (r = 0, this.trigger("navigationNext", this, n[r])) : (r = null, this.trigger("navigationEnded", this)));
      }), this.onDestroy(() => o?.cancel())), this.trigger("navigationStarted", this), this.trigger("navigationNext", this, n[r])) : this.trigger("navigationEnded", this);
    }, update() {
      if (e && n && r !== null) {
        if (this.pos.sdist(n[r]) < 2) if (r === n.length - 1) {
          this.pos = e.clone(), r = null, this.trigger("navigationEnded", this), this.trigger("targetReached", this);
          return;
        } else r++, this.trigger("navigationNext", this, n[r]);
        this.moveTo(n[r], this.agentSpeed);
      }
    }, onNavigationStarted(s) {
      return this.on("navigationStarted", s);
    }, onNavigationNext(s) {
      return this.on("navigationNext", s);
    }, onNavigationEnded(s) {
      return this.on("navigationEnded", s);
    }, onTargetReached(s) {
      return this.on("targetReached", s);
    }, inspect() {
      return "agent: " + JSON.stringify({ target: JSON.stringify(e), path: JSON.stringify(n) });
    } };
  }
  i(Qs, "agent");
  function Js(t18) {
    let e = t18.graph;
    return { id: "pathfinder", require: ["pos"], navigateTo(n) {
      return this.graph?.getWaypointPath(this.pos, n, t18.navigationOpt);
    }, get graph() {
      if (e) return e;
      let n = this.parent;
      for (; n; ) {
        if (n.is("pathfinderMap")) return n.graph;
        n = n.parent;
      }
    }, set graph(n) {
      e = n;
    } };
  }
  i(Js, "pathfinder");
  function Zs(t18 = {}) {
    let e = t18.waypoints, n = t18.speed || 100, r = t18.endBehavior || "stop", o = 0, s = e != null;
    return { id: "patrol", require: ["pos"], get patrolSpeed() {
      return n;
    }, set patrolSpeed(a) {
      n = a;
    }, get waypoints() {
      return e;
    }, set waypoints(a) {
      e = a, o = 0, s = false;
    }, get nextLocation() {
      return e ? e[o] : void 0;
    }, update() {
      let a = this.nextLocation;
      if (!(!e || !a || s) && (this.moveTo(a, n), this.pos.sdist(a) < 9)) switch (r) {
        case "loop":
          o = (o + 1) % e.length;
          break;
        case "ping-pong":
          o = o + 1, o == e.length && (e.reverse(), o = 0);
          break;
        case "stop":
          o = Math.min(o + 1, e.length - 1), o == e.length - 1 && (s = true, this.trigger("patrolFinished"));
          break;
      }
    }, onPatrolFinished(a) {
      return this.on("patrolFinished", a);
    } };
  }
  i(Zs, "patrol");
  function ea(t18, e = {}) {
    let n = typeof t18 == "function" ? t18 : () => l.game.root.query(t18), r = e.checkFrequency || 1, o = typeof e.direction == "number" ? C.fromAngle(e.direction) : e.direction, s = 0;
    return { id: "sentry", require: ["pos"], direction: typeof e.direction == "number" ? C.fromAngle(e.direction) : e.direction, spotted: [], set directionAngle(a) {
      this.direction = a !== void 0 ? C.fromAngle(a) : void 0;
    }, get directionAngle() {
      return this.direction ? this.direction.angle() : void 0;
    }, fieldOfView: e.fieldOfView || 200, isWithinFieldOfView(a, m, u) {
      let p = (typeof m == "number" ? C.fromAngle(m) : m) || o, c = u || e.fieldOfView;
      if (!p || !c || c >= 360) return true;
      let f = c / 2;
      return a.pos && p.angleBetween(a.pos.sub(this.pos)) <= f;
    }, hasLineOfSight(a) {
      let m = Jn(this.pos, a.pos.sub(this.pos), e.raycastExclude);
      return m != null && m.object === a;
    }, update() {
      if (s += te(), s > r) {
        s -= r;
        let a = n();
        if (a.length && o && this.fieldOfView && this.fieldOfView < 360) {
          let m = this.fieldOfView / 2;
          a = a.filter((u) => u.pos && o.angleBetween(u.pos.sub(this.pos)) <= m);
        }
        a.length && e.lineOfSight && (a = a.filter((m) => m.pos && this.hasLineOfSight(m))), a.length > 0 && (this.spotted = a, this.trigger("objectSpotted", a));
      }
    }, onObjectsSpotted(a) {
      return this.on("objectSpotted", a);
    } };
  }
  i(ea, "sentry");
  function rr(t18 = {}) {
    let e = x(0), n = t18.isObstacle ?? false, r = t18.cost ?? 0, o = t18.edges ?? [], s = i(() => {
      let m = { left: 1, top: 2, right: 4, bottom: 8 };
      return o.map((u) => m[u] || 0).reduce((u, p) => u | p, 0);
    }, "getEdgeMask"), a = s();
    return { id: "tile", tilePosOffset: t18.offset ?? x(0), set tilePos(m) {
      let u = this.getLevel();
      e = m.clone(), this.pos = x(this.tilePos.x * u.tileWidth(), this.tilePos.y * u.tileHeight()).add(this.tilePosOffset);
    }, get tilePos() {
      return e;
    }, set isObstacle(m) {
      n !== m && (n = m, this.getLevel().invalidateNavigationMap());
    }, get isObstacle() {
      return n;
    }, set cost(m) {
      r !== m && (r = m, this.getLevel().invalidateNavigationMap());
    }, get cost() {
      return r;
    }, set edges(m) {
      o = m, a = s(), this.getLevel().invalidateNavigationMap();
    }, get edges() {
      return o;
    }, get edgeMask() {
      return a;
    }, getLevel() {
      return this.parent;
    }, moveLeft() {
      this.tilePos = this.tilePos.add(x(-1, 0));
    }, moveRight() {
      this.tilePos = this.tilePos.add(x(1, 0));
    }, moveUp() {
      this.tilePos = this.tilePos.add(x(0, -1));
    }, moveDown() {
      this.tilePos = this.tilePos.add(x(0, 1));
    } };
  }
  i(rr, "tile");
  var bn = class {
    static {
      i(this, "AnimateChannel");
    }
    name;
    duration;
    loops;
    direction;
    easing;
    interpolation;
    isFinished;
    timing;
    easings;
    relative;
    constructor(e, n, r) {
      this.name = e, this.duration = n.duration, this.loops = n.loops || 0, this.direction = n.direction || "forward", this.easing = n.easing || tt.linear, this.interpolation = n.interpolation || "linear", this.isFinished = false, this.timing = n.timing, this.easings = n.easings, this.relative = r;
    }
    update(e, n) {
      return true;
    }
    getLowerKeyIndexAndRelativeTime(e, n, r) {
      let o = n - 1, s = e / this.duration;
      if (this.loops !== 0 && s >= this.loops) return [o, 0];
      let a = Math.trunc(s);
      if (s -= a, (this.direction == "reverse" || this.direction == "ping-pong" && a & 1) && (s = 1 - s), r) {
        let m = 0;
        for (; r[m + 1] !== void 0 && r[m + 1] < s; ) m++;
        return m >= o ? [o, 0] : [m, (s - r[m]) / (r[m + 1] - r[m])];
      } else {
        let m = Math.floor((n - 1) * s);
        return [m, (s - m / o) * o];
      }
    }
    setValue(e, n, r) {
      if (this.relative) switch (n) {
        case "pos":
          e.pos = e.base.pos.add(r);
          break;
        case "angle":
          e.angle = e.base.angle + r;
          break;
        case "scale":
          e.scale = e.base.scale.scale(r);
          break;
        case "opacity":
          e.opacity = e.base.opacity * r;
          break;
        default:
          e[n] = r;
      }
      else e[n] = r;
    }
    serialize() {
      let e = { duration: this.duration, keys: [] };
      return this.loops && (e.loops = this.loops), this.direction !== "forward" && (e.direction = this.direction), this.easing != tt.linear && (e.easing = this.easing.name), this.interpolation !== "linear" && (e.interpolation = this.interpolation), this.timing && (e.timing = this.timing), this.easings && (e.easings = this.easings.map((n) => this.easing.name)), e;
    }
  };
  function ta(t18, e) {
    return e.add(e.sub(t18));
  }
  i(ta, "reflect");
  var Zr = class extends bn {
    static {
      i(this, "AnimateChannelNumber");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, fe(this.keys[r], this.keys[r + 1], s(o)));
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  var eo = class extends bn {
    static {
      i(this, "AnimateChannelVec2");
    }
    keys;
    curves;
    dcurves;
    constructor(e, n, r, o, s) {
      if (super(e, r, o), this.keys = n, this.interpolation === "spline") {
        this.curves = [], s && (this.dcurves = []);
        for (let a = 0; a < this.keys.length - 1; a++) {
          let m = this.keys[a], u = a + 1, p = this.keys[u], c = a > 0 ? this.keys[a - 1] : ta(p, m), f = u < this.keys.length - 1 ? this.keys[u + 1] : ta(m, p);
          this.curves.push(Lt(c, m, p, f)), s && this.dcurves?.push(Lt(c, m, p, f, Lo));
        }
      }
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        switch (this.interpolation) {
          case "linear":
            this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], s(o)));
            break;
          case "slerp":
            this.setValue(e, this.name, this.keys[r].slerp(this.keys[r + 1], s(o)));
            break;
          case "spline":
            if (this.curves) {
              this.setValue(e, this.name, this.curves[r](s(o))), this.dcurves && this.setValue(e, "angle", this.dcurves[r](s(o)).angle());
              break;
            }
        }
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys.map((e) => [e.x, e.y]) });
    }
  };
  var to = class extends bn {
    static {
      i(this, "AnimateChannelColor");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation == "none") this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], s(o)));
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  function na(t18 = {}) {
    let e = [], n = 0, r = false;
    return { id: "animate", require: t18.followMotion ? ["rotate"] : void 0, base: { pos: x(0, 0), angle: 0, scale: x(1, 1), opacity: 1 }, add() {
      t18.relative && (this.is("pos") && (this.base.pos = this.pos.clone()), this.is("rotate") && (this.base.angle = this.angle), this.is("scale") && (this.base.scale = this.scale), this.is("opacity") && (this.base.opacity = this.opacity));
    }, update() {
      let o = true, s;
      n += te();
      for (let a of e) s = a.update(this, n), s && !a.isFinished && (a.isFinished = true, this.trigger("animateChannelFinished", a.name)), o &&= s;
      o && !r && (r = true, this.trigger("animateFinished"));
    }, animate(o, s, a) {
      r = false, this.unanimate(o), typeof s[0] == "number" ? e.push(new Zr(o, s, a, t18.relative || false)) : s[0] instanceof C ? e.push(new eo(o, s, a, t18.relative || false, o === "pos" && (t18.followMotion || false))) : s[0] instanceof I && e.push(new to(o, s, a, t18.relative || false));
    }, unanimate(o) {
      let s = e.findIndex((a) => a.name === o);
      s >= 0 && e.splice(s, 1);
    }, unanimateAll() {
      e.splice(0, e.length);
    }, onAnimateFinished(o) {
      return this.on("animateFinished", o);
    }, onAnimateChannelFinished(o) {
      return this.on("animateChannelFinished", o);
    }, serializeAnimationChannels() {
      return e.reduce((o, s) => (o[s.name] = s.serialize(), o), {});
    }, serializeAnimationOptions() {
      let o = {};
      return t18.followMotion && (o.followMotion = true), t18.relative && (o.relative = true), o;
    } };
  }
  i(na, "animate");
  function no(t18, e) {
    let n = { name: t18.name };
    return t18.is("animate") && (n.channels = t18.serializeAnimationChannels(), Object.assign(n, t18.serializeAnimationOptions())), t18.children.length > 0 && (n.children = t18.children.filter((r) => r.is("named")).map((r) => no(r, r.name))), n;
  }
  i(no, "serializeAnimation");
  function Jr(t18 = 2, e = 1) {
    let n = 0;
    return { require: ["scale"], update() {
      let r = Math.sin(n * t18) * e;
      r < 0 && this.destroy(), this.scale = x(r), n += te();
    } };
  }
  i(Jr, "boom");
  function ra(t18, e) {
    if (t18 == null) throw new Error("health() requires the initial amount of hp");
    return { id: "health", hurt(n = 1) {
      this.setHP(t18 - n), this.trigger("hurt", n);
    }, heal(n = 1) {
      let r = t18;
      this.setHP(t18 + n), this.trigger("heal", t18 - r);
    }, hp() {
      return t18;
    }, maxHP() {
      return e ?? null;
    }, setMaxHP(n) {
      e = n;
    }, setHP(n) {
      t18 = e ? Math.min(e, n) : n, t18 <= 0 && this.trigger("death");
    }, onHurt(n) {
      return this.on("hurt", n);
    }, onHeal(n) {
      return this.on("heal", n);
    }, onDeath(n) {
      return this.on("death", n);
    }, inspect() {
      return `health: ${t18}`;
    } };
  }
  i(ra, "health");
  function oa(t18, e = {}) {
    if (t18 == null) throw new Error("lifespan() requires time");
    let n = e.fade ?? 0;
    return { id: "lifespan", require: ["opacity"], async add() {
      await l.game.root.wait(t18), this.opacity = this.opacity ?? 1, n > 0 && await l.game.root.tween(this.opacity, 0, n, (r) => this.opacity = r, tt.linear), this.destroy();
    } };
  }
  i(oa, "lifespan");
  function ia(t18) {
    return { id: "named", name: t18 };
  }
  i(ia, "named");
  function sa(t18, e, n) {
    if (!t18) throw new Error("state() requires an initial state");
    let r = {};
    function o(u) {
      r[u] || (r[u] = { enter: new ae(), end: new ae(), update: new ae(), draw: new ae() });
    }
    i(o, "initStateEvents");
    function s(u, p, c) {
      return o(p), r[p][u].add(c);
    }
    i(s, "on");
    function a(u, p, ...c) {
      o(p), r[p][u].trigger(...c);
    }
    i(a, "trigger");
    let m = false;
    return { id: "state", state: t18, enterState(u, ...p) {
      if (m = true, e && !e.includes(u)) throw new Error(`State not found: ${u}`);
      let c = this.state;
      if (n) {
        if (!n?.[c]) return;
        let f = typeof n[c] == "string" ? [n[c]] : n[c];
        if (!f.includes(u)) throw new Error(`Cannot transition state from "${c}" to "${u}". Available transitions: ${f.map((d) => `"${d}"`).join(", ")}`);
      }
      a("end", c, ...p), this.state = u, a("enter", u, ...p), a("enter", `${c} -> ${u}`, ...p);
    }, onStateTransition(u, p, c) {
      return s("enter", `${u} -> ${p}`, c);
    }, onStateEnter(u, p) {
      return s("enter", u, p);
    }, onStateUpdate(u, p) {
      return s("update", u, p);
    }, onStateDraw(u, p) {
      return s("draw", u, p);
    }, onStateEnd(u, p) {
      return s("end", u, p);
    }, update() {
      m || (a("enter", t18), m = true), a("update", this.state);
    }, draw() {
      a("draw", this.state);
    }, inspect() {
      return `state: ${this.state}`;
    } };
  }
  i(sa, "state");
  function ar(t18) {
    return { id: "stay", stay: true, scenesToStay: t18 };
  }
  i(ar, "stay");
  function aa(t18 = true, e) {
    let n, r;
    return { id: "textInput", hasFocus: t18, require: ["text"], add() {
      n = l.k.onCharInput((o) => {
        this.hasFocus && (!e || this.text.length < e) && (l.k.isKeyDown("shift") ? this.text += o.toUpperCase() : this.text += o);
      }), r = l.k.onKeyPressRepeat("backspace", () => {
        this.hasFocus && (this.text = this.text.slice(0, -1));
      });
    }, destroy() {
      n.cancel(), r.cancel();
    } };
  }
  i(aa, "textInput");
  function gn() {
    return { id: "timer", wait(t18, e) {
      let n = [];
      e && n.push(e);
      let r = 0, o = this.onUpdate(() => {
        r += l.app.state.dt, r >= t18 && (n.forEach((s) => s()), o.cancel());
      });
      return { get paused() {
        return o.paused;
      }, set paused(s) {
        o.paused = s;
      }, cancel: o.cancel, onEnd(s) {
        n.push(s);
      }, then(s) {
        return this.onEnd(s), this;
      } };
    }, loop(t18, e) {
      let n = null, r = i(() => {
        n = this.wait(t18, r), e();
      }, "newAction");
      return n = this.wait(0, r), { get paused() {
        return n?.paused ?? false;
      }, set paused(o) {
        n && (n.paused = o);
      }, cancel: i(() => n?.cancel(), "cancel") };
    }, tween(t18, e, n, r, o = tt.linear) {
      let s = 0, a = [], m = this.onUpdate(() => {
        s += l.app.state.dt;
        let u = Math.min(s / n, 1);
        r(fe(t18, e, o(u))), u === 1 && (m.cancel(), r(e), a.forEach((p) => p()));
      });
      return { get paused() {
        return m.paused;
      }, set paused(u) {
        m.paused = u;
      }, onEnd(u) {
        a.push(u);
      }, then(u) {
        return this.onEnd(u), this;
      }, cancel() {
        m.cancel();
      }, finish() {
        m.cancel(), r(e), a.forEach((u) => u());
      } };
    } };
  }
  i(gn, "timer");
  var ro = 0;
  function ua() {
    return ro > 0;
  }
  i(ua, "usesArea");
  function ca(t18 = {}) {
    let e = {}, n = /* @__PURE__ */ new Set();
    return { id: "area", collisionIgnore: t18.collisionIgnore ?? [], add() {
      ro++, this.area.cursor && this.onHover(() => l.app.setCursor(this.area.cursor)), this.onCollideUpdate((r, o) => {
        if (!r.id) throw new Error("area() requires the object to have an id");
        e[r.id] || this.trigger("collide", r, o), o && (e[r.id] = o, n.add(r.id));
      });
    }, destroy() {
      ro--;
    }, fixedUpdate() {
      for (let r in e) n.has(Number(r)) || (this.trigger("collideEnd", e[r].target), delete e[r]);
      n.clear();
    }, drawInspect() {
      let r = this.localArea();
      be(), Q(this.area.offset);
      let o = { outline: { width: 4 / In(), color: _(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: st(this) };
      r instanceof W ? ve({ ...o, pos: r.pos, width: r.width * this.area.scale.x, height: r.height * this.area.scale.y }) : r instanceof ye ? Pe({ ...o, pts: r.pts, scale: this.area.scale }) : r instanceof Ce && Ne({ ...o, pos: r.center, radius: r.radius }), pe();
    }, area: { shape: t18.shape ?? null, scale: t18.scale ? x(t18.scale) : x(1), offset: t18.offset ?? x(0), cursor: t18.cursor ?? null }, isClicked() {
      return l.app.isMousePressed() && this.isHovering();
    }, isHovering() {
      let r = st(this) ? l.k.mousePos() : l.k.toWorld(l.k.mousePos());
      return this.hasPoint(r);
    }, checkCollision(r) {
      if (!r.id) throw new Error("checkCollision() requires the object to have an id");
      return e[r.id] ?? null;
    }, getCollisions() {
      return Object.values(e);
    }, isColliding(r) {
      if (!r.id) throw new Error("isColliding() requires the object to have an id");
      return !!e[r.id];
    }, isOverlapping(r) {
      if (!r.id) throw new Error("isOverlapping() requires the object to have an id");
      let o = e[r.id];
      return o && o.hasOverlap();
    }, onClick(r, o = "left") {
      let s = l.app.onMousePress(o, () => {
        this.isHovering() && r();
      });
      return this.onDestroy(() => s.cancel()), s;
    }, onHover(r) {
      let o = false;
      return this.onUpdate(() => {
        o ? o = this.isHovering() : this.isHovering() && (o = true, r());
      });
    }, onHoverUpdate(r) {
      return this.onUpdate(() => {
        this.isHovering() && r();
      });
    }, onHoverEnd(r) {
      let o = false;
      return this.onUpdate(() => {
        o ? this.isHovering() || (o = false, r()) : o = this.isHovering();
      });
    }, onCollide(r, o) {
      if (typeof r == "function" && o === void 0) return this.on("collide", r);
      if (typeof r == "string") return this.onCollide((s, a) => {
        s.is(r) && o?.(s, a);
      });
      throw new Error("onCollide() requires either a function or a tag");
    }, onCollideUpdate(r, o) {
      if (typeof r == "function" && o === void 0) return this.on("collideUpdate", r);
      if (typeof r == "string") return this.on("collideUpdate", (s, a) => s.is(r) && o?.(s, a));
      throw new Error("onCollideUpdate() requires either a function or a tag");
    }, onCollideEnd(r, o) {
      if (typeof r == "function" && o === void 0) return this.on("collideEnd", r);
      if (typeof r == "string") return this.on("collideEnd", (s) => s.is(r) && o?.(s));
      throw new Error("onCollideEnd() requires either a function or a tag");
    }, hasPoint(r) {
      return et(this.worldArea(), r);
    }, resolveCollision(r) {
      let o = this.checkCollision(r);
      o && !o.resolved && (this.pos = this.pos.add(o.displacement), o.resolved = true);
    }, localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    }, worldArea() {
      let r = this.localArea();
      if (!(r instanceof ye || r instanceof W)) throw new Error("Only support polygon and rect shapes for now");
      let o = this.transform.clone().translate(this.area.offset).scale(x(this.area.scale ?? 1));
      if (r instanceof W) {
        let s = _e(this.anchor || pt).add(1, 1).scale(-0.5).scale(r.width, r.height);
        o.translate(s);
      }
      return r.transform(o);
    }, screenArea() {
      let r = this.worldArea();
      return st(this) ? r : r.transform(l.game.cam.transform);
    }, inspect() {
      return this.area.scale?.x == this.area.scale?.y ? `area: ${this.area.scale?.x?.toFixed(1)}x` : `area: (${this.area.scale?.x?.toFixed(1)}x, ${this.area.scale.y?.toFixed(1)}y)`;
    } };
  }
  i(ca, "area");
  function la(t18 = {}) {
    let e = null, n = null, r = false, o = x(0), s = null, a = null, m;
    return { id: "body", require: ["pos"], vel: x(0), drag: t18.drag ?? 0, jumpForce: t18.jumpForce ?? Oi, gravityScale: t18.gravityScale ?? 1, isStatic: t18.isStatic ?? false, mass: t18.mass ?? 1, add() {
      if (s = this.pos.clone(), a = this.pos.clone(), m = this.pos.clone(), this.mass === 0) throw new Error("Can't set body mass to 0");
      this.is("area") && (this.onCollideUpdate((u, p) => {
        if (!p || !u.is("body") || p.resolved) return;
        this.trigger("beforePhysicsResolve", p);
        let c = p.reverse();
        if (u.trigger("beforePhysicsResolve", c), !(p.resolved || c.resolved) && !(this.isStatic && u.isStatic)) {
          if (!this.isStatic && !u.isStatic) {
            let f = this.mass + u.mass;
            this.pos = this.pos.add(p.displacement.scale(u.mass / f)), u.pos = u.pos.add(p.displacement.scale(-this.mass / f)), this.transform = mt(this), u.transform = mt(u);
          } else {
            let f = !this.isStatic && u.isStatic ? p : p.reverse();
            f.source.pos = f.source.pos.add(f.displacement), f.source.transform = mt(f.source);
          }
          p.resolved = true, this.trigger("physicsResolve", p), u.trigger("physicsResolve", p.reverse());
        }
      }), this.onPhysicsResolve((u) => {
        if (l.game.gravity) if (u.isBottom() && this.isFalling()) {
          this.vel = this.vel.reject(l.game.gravity.unit());
          let p = e;
          e = u.target, p != e && (n = u.target.pos), r ? r = false : p || (this.trigger("ground", e), u.target.trigger("land", this));
        } else u.isTop() && this.isJumping() && (this.vel = this.vel.reject(l.game.gravity.unit()), this.trigger("headbutt", u.target), u.target.trigger("headbutted", this));
      }));
    }, update() {
      e && this.isColliding(e) && e.exists() && e.is("body") && (n && !e.pos.eq(n) && t18.stickToPlatform !== false && this.moveBy(e.pos.sub(n)), n = e.pos);
      let u = nn();
      u && (this.pos.x == m.x && (this.pos.x = fe(s.x, a.x, u / tn()), m.x = this.pos.x), this.pos.y == m.y && (this.pos.y = fe(s.y, a.y, u / tn()), m.y = this.pos.y));
    }, fixedUpdate() {
      if (s && (this.pos.x == m.x && (this.pos.x = s.x), this.pos.y == m.y && (this.pos.y = s.y), s = null), l.game.gravity && !this.isStatic) {
        r && (e = null, n = null, this.trigger("fallOff"), r = false), e && (!this.isColliding(e) || !e.exists() || !e.is("body")) && (r = true);
        let p = this.vel.clone();
        this.vel = this.vel.add(l.game.gravity.scale(this.gravityScale * te()));
        let c = t18.maxVelocity ?? Ei;
        this.vel.slen() > c * c && (this.vel = this.vel.unit().scale(c)), p.dot(l.game.gravity) < 0 && this.vel.dot(l.game.gravity) >= 0 && this.trigger("fall");
      }
      if (this.vel.x += o.x * te(), this.vel.y += o.y * te(), this.vel.x *= 1 - this.drag * te(), this.vel.y *= 1 - this.drag * te(), this.move(this.vel), nn()) {
        s = this.pos.clone();
        let p = this.vel.add(o.scale(te()));
        a = this.pos.add(p.scale(te())), m = this.pos.clone();
      }
      o.x = 0, o.y = 0;
    }, onPhysicsResolve(u) {
      return this.on("physicsResolve", u);
    }, onBeforePhysicsResolve(u) {
      return this.on("beforePhysicsResolve", u);
    }, curPlatform() {
      return e;
    }, isGrounded() {
      return e !== null;
    }, isFalling() {
      return this.vel.dot(Vt()) > 0;
    }, isJumping() {
      return this.vel.dot(Vt()) < 0;
    }, applyImpulse(u) {
      this.vel = this.vel.add(u);
    }, addForce(u) {
      o.x += u.x / this.mass, o.y += u.y / this.mass;
    }, jump(u) {
      e = null, n = null, this.vel = Vt().scale(-u || -this.jumpForce);
    }, onGround(u) {
      return this.on("ground", u);
    }, onFall(u) {
      return this.on("fall", u);
    }, onFallOff(u) {
      return this.on("fallOff", u);
    }, onHeadbutt(u) {
      return this.on("headbutt", u);
    }, onLand(u) {
      return this.on("land", u);
    }, onHeadbutted(u) {
      return this.on("headbutted", u);
    }, inspect() {
      return `gravityScale: ${this.gravityScale}x`;
    } };
  }
  i(la, "body");
  function ma(t18 = 2) {
    let e = t18;
    return { id: "doubleJump", require: ["body"], numJumps: t18, add() {
      this.onGround(() => {
        e = this.numJumps;
      });
    }, doubleJump(n) {
      e <= 0 || (e < this.numJumps && this.trigger("doubleJump"), e--, this.jump(n));
    }, onDoubleJump(n) {
      return this.on("doubleJump", n);
    }, inspect() {
      return `jumpsLeft: ${e}`;
    } };
  }
  i(ma, "doubleJump");
  function pa(t18) {
    return { id: "surfaceEffector", require: ["area"], speed: t18.speed, speedVariation: t18.speedVariation ?? 0, forceScale: t18.speedVariation ?? 0.9, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = n?.normal.normal(), o = e.vel.project(r), a = r?.scale(this.speed)?.sub(o);
        e.addForce(a?.scale(e.mass * this.forceScale));
      });
    } };
  }
  i(pa, "surfaceEffector");
  function da(t18) {
    return { id: "areaEffector", require: ["area"], useGlobalAngle: t18.useGlobalAngle || false, forceAngle: t18.forceAngle, forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let o = C.fromAngle(this.forceAngle).scale(this.forceMagnitude);
        e.addForce(o), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  i(da, "areaEffector");
  function fa(t18) {
    return { id: "pointEffector", require: ["area", "pos"], forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, distanceScale: t18.distanceScale ?? 1, forceMode: t18.forceMode || "inverseLinear", linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = this.pos.sub(e.pos), o = r.len(), s = o * this.distanceScale / 10, a = this.forceMode === "constant" ? 1 : this.forceMode === "inverseLinear" ? 1 / s : 1 / s ** 2, m = r.scale(this.forceMagnitude * a / o);
        e.addForce(m), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  i(fa, "pointEffector");
  function ha(t18) {
    return { id: "constantForce", require: ["body"], force: t18.force, update() {
      this.force && this.addForce(this.force);
    } };
  }
  i(ha, "constantForce");
  function ga(t18) {
    return { id: "buoyancyEffector", require: ["area"], surfaceLevel: t18.surfaceLevel, density: t18.density ?? 1, linearDrag: t18.linearDrag ?? 1, angularDrag: t18.angularDrag ?? 0.2, flowAngle: t18.flowAngle ?? 0, flowMagnitude: t18.flowMagnitude ?? 0, flowVariation: t18.flowVariation ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = e, o = r.worldArea(), [s, a] = o.cut(x(-100, this.surfaceLevel), x(100, this.surfaceLevel));
        s && (this.applyBuoyancy(r, s), this.applyDrag(r, s)), this.flowMagnitude && r.addForce(C.fromAngle(this.flowAngle).scale(this.flowMagnitude));
      });
    }, applyBuoyancy(e, n) {
      let r = this.density * n.area(), o = x(0, 1).scale(-r);
      e.addForce(o);
    }, applyDrag(e, n) {
      let r = e.vel, o = this.density * this.linearDrag, s = r.scale(-o);
      e.addForce(s);
    } };
  }
  i(ga, "buoyancyEffector");
  function hn(t18) {
    if (!t18) throw new Error("Please define an anchor");
    return { id: "anchor", anchor: t18, inspect() {
      return typeof this.anchor == "string" ? "anchor: " + this.anchor : "anchor: " + this.anchor.toString();
    } };
  }
  i(hn, "anchor");
  function nr() {
    return { id: "fixed", fixed: true };
  }
  i(nr, "fixed");
  function ba(t18, e) {
    return { id: "follow", require: ["pos"], follow: { obj: t18, offset: e ?? x(0) }, add() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    }, update() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    } };
  }
  i(ba, "follow");
  function ya(t18) {
    let e = l.game.layers?.indexOf(t18);
    return { id: "layer", get layerIndex() {
      return e ?? null;
    }, get layer() {
      return e ? l.game.layers?.[e] ?? null : null;
    }, set layer(n) {
      if (e = l.game.layers?.indexOf(n), e == -1) throw Error("Invalid layer name");
    }, inspect() {
      return `layer: ${this.layer}`;
    } };
  }
  i(ya, "layer");
  function xa(t18, e) {
    let n = typeof t18 == "number" ? C.fromAngle(t18) : t18.unit();
    return { id: "move", require: ["pos"], update() {
      this.move(n.scale(e));
    } };
  }
  i(xa, "move");
  function va(t18 = {}) {
    let e = t18.distance ?? Ci, n = false;
    return { id: "offscreen", require: ["pos"], isOffScreen() {
      let r = this.screenPos();
      if (!r) return false;
      let o = new W(x(0), ie(), ue());
      return !Dt(o, r) && o.sdistToPoint(r) > e * e;
    }, onExitScreen(r) {
      return this.on("exitView", r);
    }, onEnterScreen(r) {
      return this.on("enterView", r);
    }, update() {
      this.isOffScreen() ? (n || (this.trigger("exitView"), n = true), t18.hide && (this.hidden = true), t18.pause && (this.paused = true), t18.destroy && this.destroy()) : (n && (this.trigger("enterView"), n = false), t18.hide && (this.hidden = false), t18.pause && (this.paused = false));
    } };
  }
  i(va, "offscreen");
  function St(...t18) {
    return { id: "pos", pos: x(...t18), moveBy(...e) {
      this.pos = this.pos.add(x(...e));
    }, move(...e) {
      this.moveBy(x(...e).scale(te()));
    }, moveTo(...e) {
      if (typeof e[0] == "number" && typeof e[1] == "number") return this.moveTo(x(e[0], e[1]), e[2]);
      let n = e[0], r = e[1];
      if (r === void 0) {
        this.pos = x(n);
        return;
      }
      let o = n.sub(this.pos);
      if (o.len() <= r * te()) {
        this.pos = x(n);
        return;
      }
      this.move(o.unit().scale(r));
    }, worldPos(e = null) {
      return e ? (this.pos = this.pos.add(this.fromWorld(e)), null) : this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
    }, toWorld(e) {
      return this.parent ? this.parent.transform.multVec2(this.pos.add(e)) : this.pos.add(e);
    }, fromWorld(e) {
      return this.parent ? this.parent.transform.invert().multVec2(e).sub(this.pos) : e.sub(this.pos);
    }, screenPos(e = null) {
      if (e) return this.pos = this.pos.add(this.fromScreen(e)), null;
      {
        let n = this.worldPos();
        return n ? st(this) ? n : pn(n) : null;
      }
    }, toScreen(e) {
      let n = this.toWorld(e);
      return st(this) ? n : pn(n);
    }, fromScreen(e) {
      return st(this) ? this.fromWorld(e) : this.fromWorld(er(e));
    }, toOther(e, n) {
      return e.fromWorld(this.toWorld(n));
    }, fromOther(e, n) {
      return e.toOther(this, n);
    }, inspect() {
      return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
    }, drawInspect() {
      Ne({ color: _(255, 0, 0), radius: 4 / In() });
    } };
  }
  i(St, "pos");
  function wa(t18) {
    return { id: "rotate", angle: t18 ?? 0, rotateBy(e) {
      this.angle += e;
    }, rotateTo(e) {
      this.angle = e;
    }, inspect() {
      return `angle: ${Math.round(this.angle)}`;
    } };
  }
  i(wa, "rotate");
  function Nt(...t18) {
    if (t18.length === 0) return Nt(1);
    let e = x(...t18);
    return { id: "scale", set scale(n) {
      if (!(n instanceof C)) throw Error("The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number.");
      e = x(n);
    }, get scale() {
      return e;
    }, scaleTo(...n) {
      e = x(...n);
    }, scaleBy(...n) {
      e = e.scale(x(...n));
    }, inspect() {
      return e.x == e.y ? `scale: ${e.x.toFixed(1)}x` : `scale: (${e.x.toFixed(1)}x, ${e.y.toFixed(1)}y)`;
    } };
  }
  i(Nt, "scale");
  function Ca(t18) {
    return { id: "z", z: t18, inspect() {
      return `z: ${this.z}`;
    } };
  }
  i(Ca, "z");
  var Oa = "data:image/png;base64,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";
  var Ea = "data:image/png;base64,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";
  var Lu = "3001.0.0";
  var l = { k: null, globalOpt: null, gfx: null, game: null, app: null, assets: null, fontCacheCanvas: null, fontCacheC2d: null, debug: null, audio: null, pixelDensity: null, canvas: null, gscale: null, kaSprite: null, boomSprite: null };
  var Aa = i((t18 = {}) => {
    l.k && (console.warn("KAPLAY already initialized, you are calling kaplay() multiple times, it may lead bugs!"), l.k.quit()), l.globalOpt = t18;
    let e = t18.root ?? document.body;
    e === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
    let n = t18.canvas ?? e.appendChild(document.createElement("canvas"));
    l.canvas = n;
    let r = t18.scale ?? 1;
    l.gscale = r;
    let o = t18.width && t18.height && !t18.stretch && !t18.letterbox;
    o ? (n.width = t18.width * r, n.height = t18.height * r) : (n.width = n.parentElement.offsetWidth, n.height = n.parentElement.offsetHeight);
    let s = ["outline: none", "cursor: default"];
    if (o) {
      let L = n.width, U = n.height;
      s.push(`width: ${L}px`), s.push(`height: ${U}px`);
    } else s.push("width: 100%"), s.push("height: 100%");
    t18.crisp && (s.push("image-rendering: pixelated"), s.push("image-rendering: crisp-edges")), n.style.cssText = s.join(";");
    let a = t18.pixelDensity || 1;
    l.pixelDensity = a, n.width *= a, n.height *= a, n.tabIndex = 0;
    let m = document.createElement("canvas");
    m.width = 256, m.height = 256, l.fontCacheCanvas = m;
    let u = m.getContext("2d", { willReadFrequently: true });
    l.fontCacheC2d = u;
    let p = ri({ canvas: n, touchToMouse: t18.touchToMouse, gamepads: t18.gamepads, pixelDensity: t18.pixelDensity, maxFPS: t18.maxFPS, buttons: t18.buttons });
    l.app = p;
    let c = [], f = p.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    if (!f) throw new Error("WebGL not supported");
    let d = f, v = zi(d, { texFilter: t18.texFilter }), h = rs(t18, v);
    l.gfx = h;
    let O = Is();
    l.audio = O;
    let y = Gi(v);
    l.assets = y;
    let w = Ds();
    l.game = w, w.root.use(gn());
    function V(L, U) {
      let X = new ot(v, L, U);
      return { clear: i(() => X.clear(), "clear"), free: i(() => X.free(), "free"), toDataURL: i(() => X.toDataURL(), "toDataURL"), toImageData: i(() => X.toImageData(), "toImageData"), width: X.width, height: X.height, draw: i((re) => {
        Oe(), X.bind(), re(), Oe(), X.unbind();
      }, "draw") };
    }
    i(V, "makeCanvas");
    function R() {
      d.clear(d.COLOR_BUFFER_BIT), h.frameBuffer.bind(), d.clear(d.COLOR_BUFFER_BIT), h.bgColor || qe(() => {
        it({ width: ie(), height: ue(), quad: new z(0, 0, ie() / 64, ue() / 64), tex: h.bgTex, fixed: true });
      }), h.renderer.numDraws = 0, h.fixed = false, h.transformStack.length = 0, h.transform = new he();
    }
    i(R, "frameStart");
    function P(L, U) {
      h.postShader = L, h.postShaderUniform = U ?? null;
    }
    i(P, "usePostEffect");
    function D() {
      Oe(), h.lastDrawCalls = h.renderer.numDraws, h.frameBuffer.unbind(), d.viewport(0, 0, d.drawingBufferWidth, d.drawingBufferHeight);
      let L = h.width, U = h.height;
      h.width = d.drawingBufferWidth / a, h.height = d.drawingBufferHeight / a, At({ flipY: true, tex: h.frameBuffer.tex, pos: new C(h.viewport.x, h.viewport.y), width: h.viewport.width, height: h.viewport.height, shader: h.postShader, uniform: typeof h.postShaderUniform == "function" ? h.postShaderUniform() : h.postShaderUniform, fixed: true }), Oe(), h.width = L, h.height = U;
    }
    i(D, "frameEnd");
    let b = false, E = { inspect: false, timeScale: 1, showLog: true, fps: i(() => p.fps(), "fps"), numFrames: i(() => p.numFrames(), "numFrames"), stepFrame: Pt, drawCalls: i(() => h.lastDrawCalls, "drawCalls"), clearLog: i(() => w.logs = [], "clearLog"), log: i((...L) => {
      let U = t18.logMax ?? 8, X = L.length > 1 ? L.concat(" ").join(" ") : L[0];
      w.logs.unshift({ msg: X, time: p.time() }), w.logs.length > U && (w.logs = w.logs.slice(0, U));
    }, "log"), error: i((L) => E.log(new Error(L.toString ? L.toString() : L)), "error"), curRecording: null, numObjects: i(() => N("*", { recursive: true }).length, "numObjects"), get paused() {
      return b;
    }, set paused(L) {
      b = L, L ? O.ctx.suspend() : O.ctx.resume();
    } };
    l.debug = E;
    function A(L, U) {
      try {
        return JSON.parse(window.localStorage[L]);
      } catch {
        return U ? (G(L, U), U) : null;
      }
    }
    i(A, "getData");
    function G(L, U) {
      window.localStorage[L] = JSON.stringify(U);
    }
    i(G, "setData");
    function M(L, ...U) {
      let X = L($e), re;
      typeof X == "function" ? re = X(...U)($e) : re = X;
      for (let xe in re) $e[xe] = re[xe], t18.global !== false && (window[xe] = re[xe]);
      return $e;
    }
    i(M, "plug");
    function F(L) {
      let U = p.canvas.captureStream(L), X = O.ctx.createMediaStreamDestination();
      O.masterNode.connect(X);
      let re = new MediaRecorder(U), xe = [];
      return re.ondataavailable = (J) => {
        J.data.size > 0 && xe.push(J.data);
      }, re.onerror = () => {
        O.masterNode.disconnect(X), U.getTracks().forEach((J) => J.stop());
      }, re.start(), { resume() {
        re.resume();
      }, pause() {
        re.pause();
      }, stop() {
        return re.stop(), O.masterNode.disconnect(X), U.getTracks().forEach((J) => J.stop()), new Promise((J) => {
          re.onstop = () => {
            J(new Blob(xe, { type: "video/mp4" }));
          };
        });
      }, download(J = "kaboom.mp4") {
        this.stop().then((we) => Vr(J, we));
      } };
    }
    i(F, "record");
    function K() {
      return document.activeElement === p.canvas;
    }
    i(K, "isFocused");
    let H = w.root.add.bind(w.root), q = w.root.readd.bind(w.root), Y = w.root.removeAll.bind(w.root), N = w.root.get.bind(w.root), j = w.root.wait.bind(w.root), Z = w.root.loop.bind(w.root), $ = w.root.query.bind(w.root), ee = w.root.tween.bind(w.root), Ee = Ot(null, Ea), k = Ot(null, Oa);
    l.kaSprite = Ee, l.boomSprite = k;
    function ft() {
      w.root.fixedUpdate();
    }
    i(ft, "fixedUpdateFrame");
    function Pt() {
      w.root.update();
    }
    i(Pt, "updateFrame");
    class Ut {
      static {
        i(this, "Collision");
      }
      source;
      target;
      normal;
      distance;
      resolved = false;
      constructor(U, X, re, xe, J = false) {
        this.source = U, this.target = X, this.normal = re, this.distance = xe, this.resolved = J;
      }
      get displacement() {
        return this.normal.scale(this.distance);
      }
      reverse() {
        return new Ut(this.target, this.source, this.normal.scale(-1), this.distance, this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.cross(w.gravity || x(0, 1)) > 0;
      }
      isRight() {
        return this.displacement.cross(w.gravity || x(0, 1)) < 0;
      }
      isTop() {
        return this.displacement.dot(w.gravity || x(0, 1)) > 0;
      }
      isBottom() {
        return this.displacement.dot(w.gravity || x(0, 1)) < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    function yn() {
      if (!ua()) return;
      let L = {}, U = t18.hashGridSize || 64, X = new he(), re = [];
      function xe(J) {
        if (re.push(X.clone()), J.pos && X.translate(J.pos), J.scale && X.scale(J.scale), J.angle && X.rotate(J.angle), J.transform = X.clone(), J.c("area") && !J.paused) {
          let we = J, at = we.worldArea().bbox(), lr = Math.floor(at.pos.x / U), mr = Math.floor(at.pos.y / U), pr = Math.ceil((at.pos.x + at.width) / U), dr = Math.ceil((at.pos.y + at.height) / U), wn = /* @__PURE__ */ new Set();
          for (let Xe = lr; Xe <= pr; Xe++) for (let ut = mr; ut <= dr; ut++) if (!L[Xe]) L[Xe] = {}, L[Xe][ut] = [we];
          else if (!L[Xe][ut]) L[Xe][ut] = [we];
          else {
            let qt = L[Xe][ut];
            e: for (let Ie of qt) {
              if (Ie.paused || !Ie.exists() || wn.has(Ie.id)) continue;
              for (let Je of we.collisionIgnore) if (Ie.is(Je)) continue e;
              for (let Je of Ie.collisionIgnore) if (we.is(Je)) continue e;
              let zt = ko(we.worldArea(), Ie.worldArea());
              if (zt) {
                let Je = new Ut(we, Ie, zt.normal, zt.distance);
                we.trigger("collideUpdate", Ie, Je);
                let Cn = Je.reverse();
                Cn.resolved = Je.resolved, Ie.trigger("collideUpdate", we, Cn);
              }
              wn.add(Ie.id);
            }
            qt.push(we);
          }
        }
        J.children.forEach(xe), X = re.pop();
      }
      i(xe, "checkObj"), xe(w.root);
    }
    i(yn, "checkFrame");
    function xn(L) {
      console.error(L), O.ctx.suspend();
      let U = L.message ?? String(L) ?? "Unknown error, check console for more info";
      p.run(() => {
      }, () => {
        R(), qe(() => {
          let xe = ie(), J = ue(), we = { size: 36, width: xe - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: vt, fixed: true };
          ve({ width: xe, height: J, color: _(0, 0, 255), fixed: true });
          let Ht = Ue({ ...we, text: "Error", pos: x(32), color: _(255, 128, 0), fixed: true });
          He(Ht), $r({ ...we, text: U, pos: x(32, 32 + Ht.height + 16), fixed: true }), pe(), w.events.trigger("error", L);
        }), D();
      });
    }
    i(xn, "handleErr");
    function ur(L) {
      c.push(L);
    }
    i(ur, "onCleanup");
    function cr() {
      w.events.onOnce("frameEnd", () => {
        p.quit(), d.clear(d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT | d.STENCIL_BUFFER_BIT);
        let L = d.getParameter(d.MAX_TEXTURE_IMAGE_UNITS);
        for (let U = 0; U < L; U++) d.activeTexture(d.TEXTURE0 + U), d.bindTexture(d.TEXTURE_2D, null), d.bindTexture(d.TEXTURE_CUBE_MAP, null);
        d.bindBuffer(d.ARRAY_BUFFER, null), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null), d.bindRenderbuffer(d.RENDERBUFFER, null), d.bindFramebuffer(d.FRAMEBUFFER, null), v.destroy(), c.forEach((U) => U());
      });
    }
    i(cr, "quit");
    let Gt = true;
    p.run(() => {
      try {
        y.loaded && (E.paused || ft(), yn());
      } catch (L) {
        xn(L);
      }
    }, (L, U) => {
      try {
        L(), y.loaded || Be() === 1 && !Gt && (y.loaded = true, w.events.trigger("load")), !y.loaded && t18.loadingScreen !== false || Gt ? (R(), Zi(), D()) : (E.paused || Pt(), yn(), R(), Ji(), t18.debug !== false && Qi(), D()), Gt && (Gt = false), w.events.trigger("frameEnd"), U();
      } catch (X) {
        xn(X);
      }
    }), $n(), sr();
    let $e = { _k: l, VERSION: Lu, loadRoot: Si, loadProgress: Be, loadSprite: Ot, loadSpriteAtlas: qr, loadSound: Ui, loadMusic: Hi, loadBitmapFont: Ki, loadFont: Fi, loadShader: ki, loadShaderURL: _i, loadAseprite: Bi, loadPedit: Ii, loadBean: Di, loadJSON: Vi, load: cn, getSound: Hr, getFont: _r, getBitmapFont: _n, getSprite: Ir, getShader: Ur, getAsset: Pi, Asset: ce, SpriteData: Fe, SoundData: rt, width: ie, height: ue, center: xt, dt: te, fixedDt: tn, restDt: nn, time: p.time, screenshot: p.screenshot, record: F, isFocused: K, setCursor: p.setCursor, getCursor: p.getCursor, setCursorLocked: p.setCursorLocked, isCursorLocked: p.isCursorLocked, setFullscreen: p.setFullscreen, isFullscreen: p.isFullscreen, isTouchscreen: p.isTouchscreen, onLoad: _t, onLoading: Gs, onResize: Rs, onGamepadConnect: p.onGamepadConnect, onGamepadDisconnect: p.onGamepadDisconnect, onError: Ms, onCleanup: ur, camPos: ps, camScale: ds, camFlash: hs, camRot: fs, camTransform: gs, shake: bs, toScreen: pn, toWorld: er, setGravity: Bs, getGravity: Fs, setGravityDirection: Ls, getGravityDirection: Vt, setBackground: li, getBackground: mi, getGamepads: p.getGamepads, getTreeRoot: Hs, add: H, make: dn, destroy: tr, destroyAll: Y, get: N, query: $, readd: q, pos: St, scale: Nt, rotate: wa, color: Xn, opacity: Qn, anchor: hn, area: ca, sprite: fn, text: $s, polygon: ls, rect: Zn, circle: os, uvquad: Xs, outline: us, particles: cs, body: la, surfaceEffector: pa, areaEffector: da, pointEffector: fa, buoyancyEffector: ga, constantForce: ha, doubleJump: ma, shader: ms, textInput: aa, timer: gn, fixed: nr, stay: ar, health: ra, lifespan: oa, named: ia, state: sa, z: Ca, layer: ya, move: xa, offscreen: va, follow: ba, fadeIn: ss, mask: as, drawon: is, raycast: Jn, tile: rr, animate: na, serializeAnimation: no, agent: Qs, sentry: ea, patrol: Zs, pathfinder: Js, on: Qe, onFixedUpdate: xs, onUpdate: vs, onDraw: ws, onAdd: Qr, onDestroy: Cs, onClick: As, onCollide: Os, onCollideUpdate: Es, onCollideEnd: Ts, onHover: Ss, onHoverUpdate: Vs, onHoverEnd: Ps, onKeyDown: p.onKeyDown, onKeyPress: p.onKeyPress, onKeyPressRepeat: p.onKeyPressRepeat, onKeyRelease: p.onKeyRelease, onMouseDown: p.onMouseDown, onMousePress: p.onMousePress, onMouseRelease: p.onMouseRelease, onMouseMove: p.onMouseMove, onCharInput: p.onCharInput, onTouchStart: p.onTouchStart, onTouchMove: p.onTouchMove, onTouchEnd: p.onTouchEnd, onScroll: p.onScroll, onHide: p.onHide, onShow: p.onShow, onGamepadButtonDown: p.onGamepadButtonDown, onGamepadButtonPress: p.onGamepadButtonPress, onGamepadButtonRelease: p.onGamepadButtonRelease, onGamepadStick: p.onGamepadStick, onButtonPress: p.onButtonPress, onButtonDown: p.onButtonDown, onButtonRelease: p.onButtonRelease, mousePos: jn, mouseDeltaPos: p.mouseDeltaPos, isKeyDown: p.isKeyDown, isKeyPressed: p.isKeyPressed, isKeyPressedRepeat: p.isKeyPressedRepeat, isKeyReleased: p.isKeyReleased, isMouseDown: p.isMouseDown, isMousePressed: p.isMousePressed, isMouseReleased: p.isMouseReleased, isMouseMoved: p.isMouseMoved, isGamepadButtonPressed: p.isGamepadButtonPressed, isGamepadButtonDown: p.isGamepadButtonDown, isGamepadButtonReleased: p.isGamepadButtonReleased, getGamepadStick: p.getGamepadStick, isButtonPressed: p.isButtonPressed, isButtonDown: p.isButtonDown, isButtonReleased: p.isButtonReleased, setButton: p.setButton, getButton: p.getButton, pressButton: p.pressButton, releaseButton: p.releaseButton, getLastInputDeviceType: p.getLastInputDeviceType, charInputted: p.charInputted, loop: Z, wait: j, play: ks, volume: _s, burp: ir, audioCtx: O.ctx, Line: Te, Rect: W, Circle: Ce, Ellipse: je, Point: Tn, Polygon: ye, Vec2: C, Color: I, Mat4: he, Quad: z, RNG: $t, rand: ge, randi: xr, randSeed: fo, vec2: x, rgb: _, hsl2rgb: lo, quad: le, choose: bo, chooseMultiple: go, shuffle: vr, chance: ho, lerp: fe, tween: ee, easings: tt, map: Se, mapc: po, wave: An, deg2rad: se, rad2deg: ct, clamp: Me, evaluateQuadratic: Ao, evaluateQuadraticFirstDerivative: So, evaluateQuadraticSecondDerivative: Vo, evaluateBezier: Qt, evaluateBezierFirstDerivative: Po, evaluateBezierSecondDerivative: Go, evaluateCatmullRom: Ro, evaluateCatmullRomFirstDerivative: Mo, curveLengthApproximation: Tr, normalizedCurve: Do, hermite: Ft, cardinal: Ar, catmullRom: Lt, bezier: Bo, kochanekBartels: Fo, easingSteps: jo, easingLinear: Ko, easingCubicBezier: Io, testLineLine: Sn, testRectRect: wr, testRectLine: Vn, testRectPoint: Dt, testCirclePolygon: Xt, testLinePoint: Pn, testLineCircle: Bt, isConvex: No, triangulate: Rn, NavMesh: Kn, drawSprite: ts, drawText: $r, formatText: Ue, drawRect: ve, drawLine: kt, drawLines: jt, drawTriangle: Yn, drawCircle: Ne, drawEllipse: Un, drawUVQuad: it, drawPolygon: Pe, drawCurve: Hn, drawBezier: qi, drawFormattedText: He, drawMasked: es, drawSubtracted: ns, pushTransform: be, popTransform: pe, pushTranslate: Q, pushScale: nt, pushRotate: We, pushMatrix: pi, usePostEffect: P, makeCanvas: V, debug: E, scene: qs, getSceneName: Ws, go: zs, onSceneLeave: Ys, layers: Us, addLevel: ys, getData: A, setData: G, download: Mn, downloadJSON: Yo, downloadText: Sr, downloadBlob: Vr, plug: M, ASCII_CHARS: kn, canvas: p.canvas, addKaboom: Ns, LEFT: C.LEFT, RIGHT: C.RIGHT, UP: C.UP, DOWN: C.DOWN, RED: I.RED, GREEN: I.GREEN, BLUE: I.BLUE, YELLOW: I.YELLOW, MAGENTA: I.MAGENTA, CYAN: I.CYAN, WHITE: I.WHITE, BLACK: I.BLACK, quit: cr, KEvent: ae, KEventHandler: ze, KEventController: ke };
    l.k = $e;
    let vn = t18.plugins;
    if (vn && vn.forEach(M), t18.global !== false) for (let L in $e) window[L] = $e[L];
    return t18.focus !== false && p.canvas.focus(), $e;
  }, "kaplay");
  var NC = Aa;

  // src/board.js
  function shuffle(array) {
    for (let i2 = array.length - 1; i2 > 0; i2--) {
      const j = Math.floor(Math.random() * (i2 + 1));
      [array[i2], array[j]] = [array[j], array[i2]];
    }
  }
  function prefill(grid2) {
    for (let i2 = 0; i2 < 3; i2++) {
      const digits = Array.from({ length: 9 }, (_2, i3) => i3 + 1);
      shuffle(digits);
      let start = i2 * 3;
      let stop = start + 3;
      for (let row = start; row < stop; row++) {
        for (let col = start; col < stop; col++) {
          grid2[row * 9 + col] = digits.pop();
        }
      }
    }
  }
  function getAllowed(row, col, grid2) {
    if (grid2[row * 9 + col] == 0) {
      let digits = Array.from({ length: 9 }, (_2, i2) => i2 + 1);
      let rowSlice = grid2.filter((x2, i2) => Math.floor(i2 / 9) == row && x2 != 0);
      let colSlice = grid2.filter((x2, i2) => i2 % 9 == col && x2 != 0);
      let subgrid = [];
      let subgridRowStart = Math.floor(row / 3) * 3;
      let subgridColStart = Math.floor(col / 3) * 3;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          let value = grid2[(subgridRowStart + r) * 9 + (subgridColStart + c)];
          if (value != 0) {
            subgrid.push(value);
          }
        }
      }
      let allowed = digits.filter(
        (x2) => !rowSlice.includes(x2) && !colSlice.includes(x2) && !subgrid.includes(x2)
      );
      return allowed;
    }
  }
  function fill(grid2) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid2[row * 9 + col] == 0) {
          let allowed = getAllowed(row, col, grid2);
          for (let i2 = 0; i2 < allowed.length; i2++) {
            grid2[row * 9 + col] = allowed[i2];
            if (fill(grid2)) {
              return true;
            } else {
              grid2[row * 9 + col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  function prune(grid2, n) {
    let cells = Array.from({ length: 81 }, (_2, i2) => i2);
    shuffle(cells);
    for (let i2 = 0; i2 < n; i2++) {
      grid2[cells[i2]] = 0;
    }
  }
  var grid = Array.from({ length: 81 }, () => 0);
  prefill(grid);
  fill(grid);
  var visible = grid.slice();
  prune(visible, 55);

  // src/main.js
  var WIDTH = 495;
  var HEIGHT = 495;
  var CELL = WIDTH / 9;
  var OFFSET = 10;
  var BCKGD = [51, 51, 51];
  var BEIGE = [250, 240, 230];
  var BLACK = [0, 0, 0];
  var CORAL = [255, 127, 80];
  var GREEN = [100, 255, 100];
  var WHITE = [255, 255, 255];
  var startTime = Date.now();
  var elapsedTime = 0;
  function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1e3);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  function drawTime() {
    time = updateTimer();
    add([rect(120, 20), pos(10, 495 + 25), color(BCKGD)]);
    add([
      text(`Time: ${time}`, { size: 18 }),
      pos(10, 495 + 25),
      color(WHITE),
      "time"
    ]);
  }
  var drawTimeInterval = setInterval(drawTime, 1e3);
  var lives = 5;
  var click = -1;
  NC({
    width: WIDTH + OFFSET * 2,
    height: HEIGHT + OFFSET * 2 + 40,
    canvas: document.querySelector("#mycanvas"),
    background: "#333333",
    letterbox: false,
    debug: false,
    pixelDensity: 5
  });
  loadFont("salmon", "assets/fonts/Salmon Typewriter 9 Regular.ttf");
  loadSound("correct", "assets/sounds/Misc 1.wav");
  loadSound("wrong", "assets/sounds/Misc 2.wav");
  function createCell(row, col) {
    let digit = visible[row * 9 + col];
    const cell = add([
      rect(CELL, CELL),
      pos(CELL * row + OFFSET, CELL * col + OFFSET),
      digit != 0 ? color(BEIGE) : color(WHITE),
      area(),
      outline(1)
    ]);
    add([
      text(`${digit != 0 ? digit : ""}`, { size: 26 }),
      pos(CELL * row + 30, CELL * col + 26),
      color(BLACK)
    ]);
    if (digit == 0) {
      cell.onHover(() => {
        if (click === -1) {
          cell.color = rgb(GREEN);
        }
      });
      cell.onHoverEnd(() => {
        if (click === -1) {
          cell.color = rgb(WHITE);
        }
      });
      cell.onClick(() => {
        if (click == -1) {
          click = row * 9 + col;
          cell.color = rgb(CORAL);
          document.addEventListener(
            "keydown",
            (event) => {
              if (event.key >= "1" && event.key <= "9") {
                digit = parseInt(event.key);
                if (digit == grid[row * 9 + col]) {
                  play("correct");
                  visible[row * 9 + col] = digit;
                  click = -1;
                  destroyAll();
                  DrawSudokuBoard();
                  if (!visible.includes(0)) {
                    clearInterval(drawTimeInterval);
                    destroyAll();
                    add([rect(200, 50), pos(150, 220), color(BCKGD)]);
                    add([
                      text("You Won!", { size: 32 }),
                      pos(180, 230),
                      color(WHITE)
                    ]);
                    add([
                      text(`Time: ${updateTimer()}`, { size: 24 }),
                      pos(180, 270),
                      color(WHITE)
                    ]);
                  }
                } else {
                  play("wrong");
                  lives--;
                  click = -1;
                  destroyAll();
                  DrawSudokuBoard();
                  if (lives == 0) {
                    clearInterval(drawTimeInterval);
                    destroyAll();
                    add([rect(200, 50), pos(150, 220), color(BCKGD)]);
                    add([
                      text("Game Over!", { size: 32 }),
                      pos(180, 230),
                      color(WHITE)
                    ]);
                    add([
                      text(`Time: ${updateTimer()}`, { size: 24 }),
                      pos(180, 270),
                      color(WHITE)
                    ]);
                  }
                }
              }
            },
            { once: true }
          );
        }
      });
    }
    return cell;
  }
  function DrawSudokuBoard() {
    drawTime();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        createCell(row, col);
      }
    }
    for (let i2 = 0; i2 < 3; i2++) {
      for (let j = 0; j < 3; j++) {
        add([
          rect(CELL * 3, CELL * 3, { radius: 4, fill: false }),
          pos(CELL * 3 * i2 + OFFSET, CELL * 3 * j + OFFSET),
          outline(6)
        ]);
      }
    }
  }
  DrawSudokuBoard();
})();