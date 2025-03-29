function jalCal(jy) {

  // Jalali years starting the 33-year rule.
  let breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178],
    bl = breaks.length,
    gy = jy + 621,
    leapJ = -14,
    jp = breaks[0],
    jm,
    jump = 1,
    leap,
    n,
    i;

  if (jy < jp || jy >= breaks[bl - 1])
    throw new Error('Invalid Jalali year ' + jy);

  // Find the limiting years for the Jalali year jy.
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm)
      break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  // Find the number of leap years from AD 621 to the beginning
  // of the current Jalali year in the Persian calendar.
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4)
    leapJ += 1;

  // And the same in the Gregorian calendar (until the year gy).
  let leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

  // Determine the Gregorian date of Farvardin the 1st.
  let march = 20 + leapJ - leapG;

  // Find how many years have passed since the last leap year.
  if (jump - n < 6)
    n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;

  return {
    leap: leap,
    gy: gy,
    march: march
  };
}
function j2d(jy, jm, jd) {
  let r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}
function d2j(jdn) {
  let gy = d2g(jdn).gy, // Calculate Gregorian year (gy).
    jy = gy - 621,
    r = jalCal(jy),
    jdn1F = g2d(gy, 3, r.march),
    jd,
    jm,
    k;

  // Find number of days that passed since 1 Farvardin.
  k = jdn - jdn1F;
  if (k >= 0) {
    if (k <= 185) {
      // The first 6 months.
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return {
        jy: jy,
        jm: jm,
        jd: jd
      };
    } else {
      // The remaining months.
      k -= 186;
    }
  } else {
    // Previous Jalali year.
    jy -= 1;
    k += 179;
    if (r.leap === 1)
      k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return {
    jy: jy,
    jm: jm,
    jd: jd
  };
}
function g2d(gy, gm, gd) {
  let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd - 34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}
function d2g(jdn) {
  let j;
  j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  let i = div(mod(j, 1461), 4) * 5 + 308;
  let gd = div(mod(i, 153), 5) + 1;
  let gm = mod(div(i, 153), 12) + 1;
  let gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return {
    gy: gy,
    gm: gm,
    gd: gd
  };
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
function toJalali(gy, gm, gd) {
  return d2j(g2d(gy, gm, gd));
}
function toGregorian(jy, jm, jd) {
  return d2g(j2d(jy, jm, jd));
}
function isLeapJalaliYear(jy) {
  return jalCal(jy).leap === 0;
}