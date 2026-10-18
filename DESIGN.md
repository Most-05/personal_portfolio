# DESIGN.md — Personal Portfolio (Thai Developer)

> ข้อกำหนดการออกแบบสำหรับเว็บ Portfolio หน้าเดียว (long-scroll landing page)
> สไตล์: **Clean Tech Minimal + Lusion-inspired interactions** (ต้นแบบ: natjadee.dev)
> Agent ต้องทำตามไฟล์นี้ทุกจุด ห้ามคิดสี/ฟอนต์/เอฟเฟกต์ใหม่เอง

> **เวอร์ชัน 2 — ปรับให้ตรงกับโค้ดจริงเมื่อ 2026-10-18**
> ข้อกำหนดของเวอร์ชันแรก (v1) ที่ไม่ได้ใช้แล้วยังเก็บไว้ในกล่อง **"🗄️ เวอร์ชันเก่า (v1)"** ใต้หัวข้อนั้น ๆ (กดเปิดดูได้) ไว้ดูย้อนหลังเท่านั้น **ห้ามนำกลับมาใช้**
> ถ้าเอกสารนี้ขัดกับโค้ดจริง ให้ยึดโค้ดจริง

---

## 1. Typography

```html
<!-- ใน <head> ของ index.html -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<!-- ใน assets/css/style.css -->
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
@font-face { font-family: 'LINE Seed Sans TH'; ... }   /* 3 น้ำหนัก */
```

Tailwind config (จริง):
```js
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['"LINE Seed Sans TH"', 'Outfit', 'sans-serif'] },
      colors: { primary: { light: '#2563eb', dark: '#60a5fa' } }
    }
  }
}
```

- **ฟอนต์หลัก:** LINE Seed Sans TH (ไทย) → Outfit (อังกฤษ/ตัวเลข) → sans-serif
- **ฟอนต์โค้ด:** JetBrains Mono ผ่านคลาส `.font-mono-custom` ใช้กับชื่อไทยใน Hero, ตำแหน่ง `> Full Stack Developer_`, หัวการ์ด Bento (`> About Me`), ป้าย `section-eyebrow` และป้ายเทคใน modal (`.tag-tactile-3d`)
- **ชื่อใน Hero:** `text-[10vw] md:text-[6vw] xl:text-7xl font-extrabold tracking-tighter leading-none uppercase` บรรทัดแรก (`Sidtisak`) เป็นตัวกลวง `.text-outline` บรรทัดสอง (`Hanthongchai`) เป็นตัวทึบ `drop-shadow-lg` (ขนาดอิง vw เพื่อไม่ให้ชื่อล้นคอลัมน์)
- หัวข้อ section: `text-4xl md:text-5xl font-extrabold` (Bento ใช้ `.text-outline uppercase tracking-widest`)
- ตัวเลขสถิติ: ใช้ `tabular-nums` เสมอ

### `.text-outline` (ตัวอักษรกลวง)
```css
.text-outline { -webkit-text-stroke: 2px rgba(15,23,42,0.6); color: transparent; transition: all .5s cubic-bezier(.4,0,.2,1); }
.dark .text-outline { -webkit-text-stroke: 2px rgba(255,255,255,0.4); }
/* hover แล้วกลายเป็นตัวทึบพร้อมเงาเรืองแสง (ดู style.css) */
```

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

- ถ้าเครื่องไม่มี LINE Seed Sans TH ให้เพิ่ม `'Noto Sans Thai'` ต่อท้ายเป็น fallback *(ไม่ได้ใส่ในโค้ดจริง)*
- หัวข้อใหญ่: `text-5xl md:text-6xl font-extrabold tracking-tight leading-none` *(ชื่อใน Hero เปลี่ยนเป็นขนาดอิง vw แล้ว)*
- ไม่มีฟอนต์ JetBrains Mono และไม่มี `.text-outline`
</details>

---

## 2. Color System

| ชื่อ | Light Mode | Dark Mode |
|---|---|---|
| Primary | `blue-600` (#2563eb) | `blue-400` (#60a5fa) |
| Background (`<body>`) | `#f8fafc` | `#050508` |
| Text หลัก | `text-gray-900` | `text-zinc-100` |
| Text รอง | `text-gray-500` / `text-gray-600` | `text-zinc-400` |
| Text จาง | `text-gray-400` | `text-zinc-500` |
| Border | `border-gray-100` | `border-zinc-800/60` หรือ `border-white/5` |
| พื้นการ์ด | `bg-white/60` | `bg-white/[0.03]` |

- รองรับ Dark Mode ด้วย `darkMode: 'class'` ปุ่มสลับอยู่ใน navbar (`#theme-toggle` / `#theme-toggle-mobile`)
- ค่าเริ่มต้นตามระบบของเครื่อง (`prefers-color-scheme`) และจำค่าที่เลือกไว้ใน `localStorage.theme` สคริปต์ตั้งธีมอยู่ใน `<head>` ก่อน render เพื่อไม่ให้จอกระพริบ
- เปลี่ยนโหมดนุ่มนวล: `transition-colors duration-300` ที่ `<body>`
- จุดลอยพื้นหลังใช้ 7 สี: `#4F46E5 #7C3AED #EC4899 #F59E0B #10B981 #EF4444 #3B82F6`

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

| ชื่อ | Light Mode | Dark Mode |
|---|---|---|
| Background | `bg-white` | `#0a0a0f` |
| Section สลับ | `bg-gray-50/50` | `bg-zinc-900/20` |
</details>

---

## 3. Layout & Spacing

- Container: `max-w-6xl mx-auto px-6`
- ระยะห่าง section: `py-12 md:py-20` (Bento ใช้ `py-12 md:py-24`)
- Experience และ Contact คั่นด้วย `border-t border-gray-100 dark:border-zinc-800/60`
- Experience ใช้ grid 3 คอลัมน์ (หัวข้อซ้าย 1 / เนื้อหาขวา 2) ส่วน Bento และ Projects ใช้หัวข้อกลางจอ (`text-center`)
- **Border radius:** การ์ด Bento `rounded-3xl` / การ์ดทั่วไป `rounded-2xl` / ปุ่ม `rounded-full` / input `rounded-xl`

### Section Eyebrow (ป้ายหัวข้อเล็ก)
```css
.section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #3b82f6; }
.dark .section-eyebrow { color: #60a5fa; }
```
ใช้คู่กับ `.font-mono-custom` เขียนแบบ terminal เช่น `> PROFILE_`

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

- ทุก section คั่นด้วย `border-t` และสลับพื้นหลัง ขาว → เทาอ่อน → ขาว → เทาอ่อน
- โครง section ส่วนใหญ่ใช้ grid 3 คอลัมน์: หัวข้อซ้าย 1 ส่วน / เนื้อหาขวา 2 ส่วน
- การ์ด `rounded-2xl` ทุกใบ
</details>

---

## 4. Interactive Effects

> **กฎ performance (2026-10-08):** ห้ามใช้เบลอทั้งเว็บ (`backdrop-filter`, `backdrop-blur-*`, `filter: blur`, `blur-[...]`) เพราะต้องคำนวณใหม่ทุกเฟรมและทำให้ scroll กระตุก อยากได้ลุคกระจกให้ใช้พื้นสีกึ่งทึบ อยากได้แสงฟุ้งให้ใช้ `radial-gradient`

### 4.1 Navbar (`.glass-nav`)
```css
.glass-nav { background: rgba(255,255,255,0.94); border-bottom: 1px solid rgba(0,0,0,0.06); }
.dark .glass-nav { background: rgba(9,9,11,0.93); border-bottom: 1px solid rgba(255,255,255,0.06); }
```
- `sticky top-0 z-50` ไม่มีเบลอ (ข้อความด้านล่างทะลุให้เห็นจาง ๆ ผู้ใช้รับทราบแล้วและเลือกไม่แก้)
- โลโก้: จุดกลมสีน้ำเงิน + `Sidtisak` + `.dev` สีจาง
- เมนู: Home | About | Projects | Experience | **Contact Me** (ปุ่มน้ำเงินทึบปุ่มเดียว) + ปุ่มภาษา `🌐 EN / TH` + ปุ่มธีม
- **เมนูเต็มแสดงตั้งแต่ `lg` (1024px)** ต่ำกว่านั้นใช้ Hamburger + ปุ่มภาษา + ปุ่มธีม (`lg:flex` / `lg:hidden`)

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

```css
.glass-nav {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.dark .glass-nav { background: rgba(9,9,11,0.82); border-bottom: 1px solid rgba(255,255,255,0.06); }
```
- ปุ่ม "ติดต่อ" เป็นปุ่มน้ำเงินทึบ, เมนูยุบที่ `md` (768px)
</details>

### 4.2 Aurora (แสงฟุ้งหลัง Hero)
วงแสง 2 วงทำจาก `radial-gradient` ขยับช้า ๆ อยู่หลังเนื้อหา
```css
@keyframes blob {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(30px,-20px) scale(1.05); }
  66%     { transform: translate(-20px,20px) scale(0.96); }
}
.blob   { animation: blob 8s ease-in-out infinite; }
.blob-d { animation: blob 8s ease-in-out 3s infinite; }
.aurora-blue   { background: radial-gradient(closest-side, rgba(219,234,254,.45) 0%, rgba(219,234,254,.25) 50%, transparent 100%); }
.aurora-violet { background: radial-gradient(closest-side, rgba(237,233,254,.36) 0%, rgba(237,233,254,.2) 50%, transparent 100%); }
/* โหมดมืดใช้สีน้ำเงิน/ม่วงเข้มที่จางกว่า ดู <style> ใน index.html */
```
- วงที่ 1: `blob aurora-blue absolute -top-[376px] -left-[376px] w-[1210px] h-[1210px]`
- วงที่ 2: `blob-d aurora-violet absolute -top-[192px] -right-[368px] w-[1030px] h-[1030px]`
- ทั้ง 2 วงใส่ `mix-blend-multiply dark:mix-blend-lighten` และครอบด้วย `pointer-events-none absolute inset-0 overflow-hidden` + `aria-hidden="true"`
- ขนาดกล่องเผื่อระยะฟุ้งของเบลอเดิมไว้ จุดศูนย์กลางจึงอยู่ตำแหน่งเดิม

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว (เปลี่ยนเพราะเบลอทำให้กระตุก)</summary>

วงกลมเบลอขนาดใหญ่ 2 วง
- วงที่ 1: บนซ้าย 650px สีฟ้าอ่อน `bg-blue-100/50 dark:bg-blue-900/15` เบลอ `blur-[140px]`
- วงที่ 2: บนขวา 550px สีม่วงอ่อน `bg-violet-100/40 dark:bg-violet-900/10` เบลอ `blur-[120px]`
</details>

### 4.3 Floating 3D Icons
รูป PNG 3D 6 รูปลอยรอบ Hero (ไฟล์ `assets/images/image-*.png`)
```css
@keyframes floatA { 0%,100% { transform: translateY(0) rotate(-3deg) scale(1); } 50% { transform: translateY(-24px) rotate(3deg) scale(1.02); } }
@keyframes floatB { 0%,100% { transform: translateY(-10px) rotate(2deg) scale(1.01); } 50% { transform: translateY(16px) rotate(-3deg) scale(.98); } }
@keyframes floatC { 0%,100% { transform: translateY(6px) rotate(4deg) scale(.99); } 50% { transform: translateY(-20px) rotate(-2deg) scale(1.02); } }
.fi-a { animation: floatA 6s   ease-in-out      infinite; will-change: transform; }
.fi-b { animation: floatB 8.5s ease-in-out 1s   infinite; will-change: transform; }
.fi-c { animation: floatC 7s   ease-in-out 2s   infinite; will-change: transform; }
.fi-d { animation: floatA 9s   ease-in-out .5s  infinite; will-change: transform; }
.fi-e { animation: floatB 5.5s ease-in-out 1.5s infinite; will-change: transform; }
.fi-f { animation: floatC 8s   ease-in-out 3s   infinite; will-change: transform; }
.hover-scale-wrapper { transition: transform .5s cubic-bezier(.16,1,.3,1), filter .5s ease; }
.hover-scale-wrapper:hover { transform: scale(1.12) rotate(5deg); filter: drop-shadow(0 20px 30px rgba(59,130,246,.25)); }
```
- ขนาด `w-14` ถึง `w-32` ความทึบ `opacity-50` ถึง `opacity-90` แต่ละรูปมี `data-depth` 0.5–2.4 และ `alt=""`
- **ซ่อนบนมือถือ** (`hidden md:block`)

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

- ใช้ 6–8 รูป ขนาด `w-14` ถึง `w-52`, ความทึบ `opacity-50` ถึง `opacity-95`
- รูป 3D หาได้จาก thiings.co หรือคลัง AI-generated 3D icons ฟรี ถ้ายังไม่มีรูปให้ใส่ placeholder
</details>

### 4.4 Mouse Parallax
- element ที่มี `data-depth` (วง Aurora, ไอคอน 3D, เนื้อหา Hero `0.3`) ขยับตามเมาส์ ค่ามาก = ขยับมาก
- ใช้ lerp (factor 0.05) ใน `requestAnimationFrame` loop
- **ปิดบนจอสัมผัส** (`matchMedia('(pointer: coarse)')`) และเมื่อเปิด `prefers-reduced-motion`
- ⚠️ ตอนนี้ loop ทำงานทุกเฟรมตลอดเวลา เวอร์ชันที่หยุด loop เมื่อภาพนิ่งรออยู่ใน branch `perf/mouse-effects` (ยังไม่ merge)

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

- ปิดบนมือถือโดยตรวจด้วย `window.matchMedia('(max-width: 768px)')` *(โค้ดจริงตรวจ `pointer: coarse` แทน)*
</details>

### 4.5 Custom Cursor
จุดน้ำเงินเล็ก (`#cursor-dot`) + วงแหวนตามหลังแบบหน่วง (`#cursor-ring`)
```css
#cursor-ring {
  width: 32px; height: 32px; border: 2px solid #60a5fa; border-radius: 9999px;
  transition: width .28s cubic-bezier(.25,1,.5,1), height .28s cubic-bezier(.25,1,.5,1), border-color .25s, background-color .25s, transform .15s ease-out;
}
#cursor-ring.cursor-hovered { width: 56px; height: 32px; border-color: #3b82f6; background-color: rgba(96,165,250,.2); }   /* แคปซูลแนวนอน */
#cursor-ring.cursor-clicked { transform: translate(-50%,-50%) scale(.8); background-color: rgba(59,130,246,.4); }
#cursor-dot.cursor-hovered  { transform: translate(-50%,-50%) scale(2); }
#cursor-dot.cursor-clicked  { transform: translate(-50%,-50%) scale(.5); }
```
- จุดตามเมาส์ทันที วงแหวนตามแบบ lerp (factor 0.15)
- hover `a, button, input, textarea, .cursor-hover` → วงแหวนยืดเป็นแคปซูล 56×32 และจุดขยาย 2 เท่า
- กดเมาส์ → ทั้งคู่ย่อลง
- เปิดเมื่อ `innerWidth >= 768` (ซ่อนเคอร์เซอร์ปกติด้วย `body.custom-cursor-active`) และมองไม่เห็นจนกว่าเมาส์จะขยับครั้งแรก

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

```css
.custom-cursor { width: 8px; height: 8px; background-color: #3b82f6; border-radius: 50%; position: fixed; transform: translate(-50%,-50%); pointer-events: none; z-index: 9999; transition: width .15s, height .15s, background-color .15s; }
.custom-cursor-ring { width: 32px; height: 32px; border: 1.5px solid rgba(59,130,246,.45); border-radius: 50%; position: fixed; transform: translate(-50%,-50%); pointer-events: none; z-index: 9998; will-change: transform; transition: width .3s cubic-bezier(.25,1,.5,1), height .3s cubic-bezier(.25,1,.5,1), border-color .3s, background-color .3s; }
.custom-cursor.hovered { width: 0; height: 0; }
.custom-cursor-ring.hovered { width: 52px; height: 52px; border-color: rgba(59,130,246,.8); background-color: rgba(59,130,246,.08); }
```
- วงแหวน lerp factor 0.12, hover แล้วจุดหายและวงแหวนขยายเป็นวงกลม 52px (ใช้ event delegation กับ `a, button, .glow-card, .hover-scale-wrapper`)
- แสดงเฉพาะเครื่องที่มีเมาส์จริง เช็คด้วย `!matchMedia('(pointer: coarse)').matches`
</details>

### 4.6 Interactive Grid
ตารางกริดจาง ๆ ที่โผล่เฉพาะรอบเมาส์ (`#interactive-grid`, `hidden md:block`)
```css
.interactive-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: linear-gradient(to right, rgba(0,0,0,.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.02) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(350px circle at var(--mouse-x,0) var(--mouse-y,0), black 30%, transparent 100%);
  transition: opacity .6s ease; opacity: 0;
}
.dark .interactive-grid { /* เส้นสีขาว rgba(255,255,255,.035) */ }
.interactive-grid.active { opacity: 1; }
```
- อัปเดต `--mouse-x` / `--mouse-y` ใน `mousemove` และเพิ่ม `active` เมื่อขยับเมาส์ (ปิดบนจอสัมผัส)
- ⚠️ เป็นเอฟเฟกต์ที่ทำให้กระตุกมากที่สุดตอนขยับเมาส์ไปพร้อมกับเลื่อนหน้า มีแผนเลือกได้ 3 แบบ (ก/ข/ค) ใน `CLAUDE.md` ข้อ 8.2

### 4.7 Glow Card
ขอบการ์ดเรืองแสงตามตำแหน่งเมาส์
```css
.glow-card { position: relative; transition: all .3s cubic-bezier(.16,1,.3,1); }
.glow-card::before {
  content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
  background: radial-gradient(220px circle at var(--mouse-x,0) var(--mouse-y,0), rgba(59,130,246,.25), transparent 70%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none; opacity: 0; transition: opacity .4s ease; z-index: 10;
}
.glow-card:hover::before { opacity: 1; }
```
- คำนวณตำแหน่งเมาส์เทียบกับการ์ดด้วย `getBoundingClientRect()`
- ใช้กับการ์ด Bento ทั้ง 5 ใบ และการ์ดผลงาน 3 ใบ (คู่กับ `.border-beam`)

### 4.8 Border Beam (ลำแสงวิ่งรอบขอบการ์ด) — *เพิ่มใน v2*
```css
.border-beam { position: relative; border-radius: 1rem; overflow: hidden; }
.border-beam::before { /* conic-gradient 200% หมุนด้วย @keyframes spin-gradient 4s linear infinite, opacity .3 → hover 1 */ }
.border-beam::after { inset: 1px; background: rgba(255,255,255,.85); }   /* โหมดมืด rgba(10,10,15,.9) บังกลางการ์ดให้เหลือแค่ขอบ */
```
- ใช้พื้นทึบแทน `backdrop-filter` ใน `::after`

### 4.9 Focus Group — *เพิ่มใน v2*
```css
.focus-group:hover > .focus-item:not(:hover) { opacity: .3; transform: scale(.97); }
.focus-item { transition: all .5s cubic-bezier(.4,0,.2,1); }
```
- ชี้การ์ดใบไหน ใบอื่นจะจางและย่อลง ใช้กับกริด Bento และกริดผลงาน (ไม่ใช้เบลอ)

### 4.10 Dot Background — *เพิ่มใน v2*
- `#dot-background` (`fixed inset-0 pointer-events-none z-0`, `aria-hidden`) สุ่มสร้างจุดสีลอยด้วย JS **80 จุดบนคอม / 40 จุดบนมือถือ**
- ขยับด้วย `@keyframes float` (transform + opacity) และหยุดเมื่อเปิด `prefers-reduced-motion`

### 4.11 Scroll Animation (AOS 2.3.1)
```html
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```
- ตั้งค่าที่ `<body>`: `data-aos-easing="ease-out-cubic" data-aos-duration="700" data-aos-delay="0"` และ `AOS.init({ once: true, offset: 50 })`
- หัวข้อกลางจอใช้ `fade-up`, หัวข้อซ้ายใช้ `fade-right`, ฟอร์มติดต่อใช้ `fade-left`, เนื้อหาใช้ `fade-up` + `data-aos-delay="80"` หรือ `100`

### 4.12 Skeleton Loading
- `#skeleton-loading` มีแถบ `animate-pulse` จำลอง layout แสดง 600ms
- `#main-content` ซ่อนไว้ก่อน → โหลดเสร็จแสดงเนื้อหา แล้วเรียก `AOS.init`, เริ่ม count-up และเลื่อนไป `location.hash` (ถ้ามี)

### 4.13 Fade Up (Hero)
```css
@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
.fade-up { opacity: 0; animation: fadeUp .7s cubic-bezier(.16,1,.3,1) forwards; }
```
คอลัมน์ซ้าย delay 0.2s รูปโปรไฟล์ delay 0.4s

### 4.14 Tech Marquee
- ไอคอนเทค (devicon CDN) + ชื่อ เลื่อนแนวนอนวนไม่รู้จบ `@keyframes marquee` 20s (translateX 0 → -50%)
- `grayscale` → hover แล้วเป็นสี, hover ทั้งแถบแล้วหยุดเลื่อน

---

## 5. Component Patterns

### ปุ่ม Primary
```
inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white
rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm shadow-blue-500/20
transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/25
```
**ทุกปุ่มต้องยกขึ้นเล็กน้อยตอน hover** (`hover:-translate-y-0.5`)

### ปุ่ม Secondary
```
inline-flex items-center border border-gray-200 dark:border-zinc-700
hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-full px-6 py-2.5
text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5
```

### ปุ่ม Resume CV (outline ฟ้าอ่อน)
```
inline-flex items-center gap-2 border border-blue-200 dark:border-blue-900/50
text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full px-6 py-2.5
```
ลิงก์ไป `assets/Full-Stack-Sidtisak-Hanthongchai.pdf` พร้อม `download`

### Status Badge (มีจุดกะพริบ)
```html
<span class="relative flex h-2 w-2">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
</span>
```
ครอบด้วย pill `bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 rounded-full px-4 py-1.5` ข้อความ `text-xs font-semibold`

### การ์ด Bento — *แทนการ์ดสถิติของ v1*
```
focus-item border-beam glow-card cursor-hover p-6|p-8 rounded-3xl bg-white/60 dark:bg-white/[0.03]
```
- กริด `grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 focus-group`
- การ์ดตัวเลข (454 Commits / 81 Tests) **มี count-up** นับจาก 0 ตอนเลื่อนถึง (IntersectionObserver + `data-count`)

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — การ์ดสถิติ (Impact Stats) ไม่ใช้แล้ว</summary>

- `glow-card p-4 md:p-5 rounded-2xl border bg-white dark:bg-zinc-900/40 shadow-sm`
- ตัวเลข: `text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums`
- ใต้ตัวเลขมี label 2 บรรทัด (หลัก `text-xs font-semibold` / รอง `text-[10px] text-gray-400`)
</details>

### Case Study Modal — *เพิ่มใน v2*
- เปิดจากปุ่ม `.open-case-study-btn[data-project]` บนการ์ดผลงาน ข้อมูลอยู่ใน `caseStudyData` ใน `main.js` (2 ภาษา)
- พื้นหลัง `bg-[#050508]/[0.97]` (เกือบทึบ ไม่มีเบลอ) และซ่อนหน้าเว็บด้านหลังเมื่อเปิด (`body.modal-open`) เพื่อไม่ให้ scroll กระตุก
- กล่องเนื้อหา `.modal-scroll` (`overscroll-behavior: contain`)
- ป้ายเทค `.tag-tactile-3d` (JetBrains Mono + ไอคอน devicon/simple-icons)
- แกลเลอรีภาพหน้าจอ: ภาพจอคอม (`imageType: "desktop"`, 16:10) แถวละ 2 รูป ภาพมือถือ (`"mobile"`, 9:16) แถวละ 4 รูป คลิกเพื่อเปิดรูปเต็ม

### Input
```
w-full border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm
focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
dark:bg-zinc-900 dark:text-zinc-100 transition-shadow
```
Label ด้านบน: `text-xs font-semibold text-gray-400 uppercase tracking-wider`
ฟอร์มส่งผ่าน Web3Forms แบบไม่เปลี่ยนหน้า และแสดงสถานะใต้ปุ่ม (`#contact-form-status`, 2 ภาษา)

---

## 6. Sections (เรียงตามลำดับจริง)

| # | id | ชื่อ | Eyebrow / หัวข้อ | รายละเอียด |
|---|---|---|---|---|
| 1 | — | Navbar | — | `.glass-nav` sticky + ปุ่มภาษา + ปุ่มธีม + Hamburger ต่ำกว่า 1024px |
| 2 | `#hero` | Hero | — | `min-h-[90vh]` + Aurora + ไอคอน 3D + รูปโปรไฟล์กลม |
| 3 | — | Tech Marquee | Technologies I Work With | ไอคอนเทคเลื่อนแนวนอน |
| 4 | `#about-bento` (anchor `#about`) | Bento Grid | `> PROFILE_` / BENTO GRID | About Me, 454 Commits, 81 Tests, Services, Skills (`#skills`) |
| 5 | `#projects` (anchor `#works`) | ผลงาน | — | ปุ่มกรอง All / Web App / Mobile App + การ์ด 3 ใบ + ปุ่มเปิด Case Study |
| 6 | `#experience` | ประสบการณ์ | Experience | grid 1/2 + timeline แนวตั้ง |
| 7 | `#contact` | ติดต่อ | Contact | ช่องทางติดต่อซ้าย + ฟอร์มขวา |
| 8 | — | Footer | — | copyright (ปีอัตโนมัติ) |
| — | `#case-study-modal` | Case Study | — | ป๊อปอัปรายละเอียดโปรเจกต์ |

ทุกข้อความมี `data-i18n` (ภาษาเริ่มต้น EN สลับเป็น TH ได้)

### Hero รายละเอียด
1. Status badge (จุดเขียวกะพริบ) — "Cooperative Education Candidate (16 Nov 2026 – 7 Mar 2027)"
2. ชื่อ 2 บรรทัด `Sidtisak` (ตัวกลวง) / `Hanthongchai` (ตัวทึบ) ตัวพิมพ์ใหญ่
3. ชื่อไทยใต้ชื่ออังกฤษ (JetBrains Mono `tracking-widest`)
4. ตำแหน่ง `> Full Stack Developer_` `text-xl md:text-2xl` สีน้ำเงิน
5. ย่อหน้าแนะนำตัวสั้น ๆ
6. บรรทัดสถานที่ `📍 Hat Yai, Songkhla, Thailand` `text-xs uppercase`
7. ปุ่ม 3 อัน: View Projects (primary) / Contact Me (outline) / Resume CV (outline ฟ้าอ่อน)
8. รูปโปรไฟล์กลมขอบขาว `border-[8px]` `w-64 lg:w-80` — **มือถือแสดงด้านบน (`w-32`) คอมแสดงฝั่งขวา**
- grid `md:grid-cols-[3fr_2fr]` คอลัมน์ซ้ายมี `min-w-0` กันชื่อดันคอลัมน์ล้น

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ตาราง Sections เดิม ไม่ใช้แล้ว</summary>

| # | id | ชื่อไทย | Eyebrow | รายละเอียด |
|---|---|---|---|---|
| 1 | — | Navbar | — | glass-nav sticky + ปุ่มสลับ dark mode |
| 2 | `#hero` | Hero | — | `min-h-[90vh]` + blobs + floating icons + avatar กลม |
| 3 | — | Brand Logos | — | โลโก้องค์กรเลื่อนแนวนอนวนไม่รู้จบ (marquee) |
| 4 | `#about` | เกี่ยวกับฉัน | About | ย่อหน้าแนะนำตัว + การ์ดสถิติ 4 ใบ |
| 5 | `#skills` | ทักษะและความเชี่ยวชาญ | Skills | แบ่งหมวด แสดงเป็น tag |
| 6 | `#services` | บริการที่รับทำ | Services | การ์ดบริการ |
| 7 | `#projects` | ผลงาน | Projects | กริดการ์ด + ปุ่มกรองหมวด (ทั้งหมด/Web App/WordPress) |
| 8 | `#experience` | ประวัติการทำงาน | Experience | timeline แนวตั้ง |
| 9 | `#testimonials` | เสียงจากผู้ร่วมงาน | Testimonials | กริด 2 คอลัมน์ *(ลบออกแล้ว มีเทสตรวจว่าไม่มีอยู่)* |
| 10 | `#contact` | สนใจติดต่อร่วมงาน? | Contact | ช่องทางติดต่อซ้าย + ฟอร์มขวา |
| 11 | — | Footer | — | copyright + social |

Hero เดิม: ชื่ออังกฤษ `text-5xl md:text-6xl font-extrabold` บรรทัดเดียว, Avatar มีขอบ gradient + backdrop-blur
</details>

---

## 7. Responsive

- Mobile-first: `sm` 640 / `md` 768 / `lg` 1024
- **บนมือถือ/จอสัมผัสปิด:** ไอคอน 3D (`hidden md:block`), mouse parallax, interactive grid, glow ตามเมาส์ (`pointer: coarse`), custom cursor (`innerWidth < 768`)
- Hero บนมือถือ: จัดกึ่งกลาง (`text-center md:text-left`) แสดงรูปโปรไฟล์ด้านบน
- Navbar: ต่ำกว่า `lg` (1024px) ใช้ Hamburger + ปุ่มภาษา + ปุ่มธีม เมนูมือถือปิดเองเมื่อกดลิงก์
- กริดผลงาน: 1 → 2 (`md`) → 3 (`lg`) คอลัมน์ / Bento: 1 → 3 → 4 คอลัมน์

<details>
<summary>🗄️ เวอร์ชันเก่า (v1) — ไม่ใช้แล้ว</summary>

- Navbar บนมือถือ: เมนูยุบ (`hidden md:flex`) เหลือโลโก้ + ปุ่ม dark mode *(เปลี่ยนเป็น `lg` เพราะช่วง 768–1023px เมนูชนกัน)*
</details>

---

## 8. Accessibility & Performance

- `@media (prefers-reduced-motion: reduce)` → หยุด animation ทั้งหมด
- ทุก animation ใช้ `transform` / `opacity` เท่านั้น
- element ตกแต่งใส่ `aria-hidden="true"` และ `pointer-events-none`
- รูปทุกรูปมี `alt` (รูปตกแต่งใส่ `alt=""`)
- semantic tags: `<nav> <main> <section> <footer>`
- ปุ่มบนมือถือ ≥ 44×44px
- ใส่ `will-change: transform` เฉพาะ element ที่ animate ตลอดเวลา **ห้ามใส่กับกล่องที่เนื้อหายาว** (เช่น modal)
- **ห้ามใช้เบลอทั้งเว็บ** (ดูกฎหัวข้อ 4) และห้ามใช้ `filter: blur` ตอน hover การ์ด
- รูปในเว็บย่อขนาดก่อนใส่ (เช่นภาพหน้าจอ Srichai ย่อจาก 2880px เหลือ 1600px JPEG ราว 100–200KB)
- แก้ `style.css` / `main.js` แล้วต้องขยับเลข `?v=` ใน `index.html` กันเว็บจริงติดแคช
</content>
</invoke>
