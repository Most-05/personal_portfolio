# DESIGN.md — Personal Portfolio (Thai Developer)

> ข้อกำหนดการออกแบบสำหรับเว็บ Portfolio หน้าเดียว (long-scroll landing page)
> สไตล์: **Clean Tech Minimal + Lusion-inspired interactions**
> Agent ต้องทำตามไฟล์นี้ทุกจุด ห้ามคิดสี/ฟอนต์/เอฟเฟกต์ใหม่เอง

---

## 1. Typography

```html
<!-- โหลดใน <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

ตั้งค่าใน Tailwind config:
```js
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['"LINE Seed Sans TH"', 'Outfit', 'sans-serif'] }
    }
  }
}
```

- **ฟอนต์หลัก:** LINE Seed Sans TH (ฟอนต์ไทยฟรีจาก LINE — รองรับสระ/วรรณยุกต์ครบ)
- **ฟอนต์รอง:** Outfit สำหรับข้อความอังกฤษ/ตัวเลข
- ถ้าเครื่องไม่มี LINE Seed Sans TH ให้เพิ่ม `'Noto Sans Thai'` ต่อท้ายเป็น fallback
- หัวข้อใหญ่: `text-5xl md:text-6xl font-extrabold tracking-tight leading-none`
- ตัวเลขสถิติ: ใช้ `tabular-nums` เสมอ

---

## 2. Color System

| ชื่อ | Light Mode | Dark Mode |
|---|---|---|
| Primary | `blue-600` (#2563eb) | `blue-400` (#60a5fa) |
| Background | `bg-white` | `#0a0a0f` |
| Text หลัก | `text-gray-900` | `text-zinc-100` |
| Text รอง | `text-gray-500` | `text-zinc-400` |
| Text จาง | `text-gray-400` | `text-zinc-500` |
| Border | `border-gray-100` | `border-zinc-800/60` |
| Section สลับ | `bg-gray-50/50` | `bg-zinc-900/20` |

- **ต้องรองรับ Dark Mode** ด้วย `darkMode: 'class'` มีปุ่มสลับที่ navbar
- บันทึกค่าที่เลือกไว้ (จำได้ตอนกลับมาเปิดใหม่)
- เปลี่ยนโหมดต้องนุ่มนวล: `transition-colors duration-300` ที่ `<body>`

---

## 3. Layout & Spacing

- Container: `max-w-6xl mx-auto px-6`
- ระยะห่าง section: `py-12 md:py-20`
- ทุก section คั่นด้วย `border-t border-gray-100 dark:border-zinc-800/60`
- Section สลับพื้นหลัง: ขาว → เทาอ่อน → ขาว → เทาอ่อน
- โครง section ส่วนใหญ่ใช้ grid 3 คอลัมน์: หัวข้อซ้าย 1 ส่วน / เนื้อหาขวา 2 ส่วน
- **Border radius:** การ์ด `rounded-2xl` / ปุ่ม `rounded-full` / input `rounded-xl`

### Section Eyebrow (ป้ายหัวข้อเล็ก)
ทุก section ต้องมีป้ายตัวอักษรเล็กสีน้ำเงินเหนือหัวข้อ:
```css
.section-eyebrow {
  font-size: 11px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  color: #3b82f6;
}
.dark .section-eyebrow { color: #60a5fa; }
```

---

## 4. Interactive Effects (ต้องมีครบทุกข้อ)

### 4.1 Glass Navbar
```css
.glass-nav {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.dark .glass-nav {
  background: rgba(9,9,11,0.82);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
```
- Navbar `sticky top-0 z-50`
- โลโก้เป็นจุดกลมสีน้ำเงิน + ชื่อ + `.dev` สีจาง
- ปุ่ม "ติดต่อ" เป็นปุ่มน้ำเงินทึบ ปุ่มเดียวที่เด่นในเมนู

### 4.2 Aurora Blobs (พื้นหลัง Hero)
วงกลมเบลอขนาดใหญ่ 2 วง ขยับช้า ๆ อยู่หลังเนื้อหา
```css
@keyframes blob {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(30px,-20px) scale(1.05); }
  66%     { transform: translate(-20px,20px) scale(0.96); }
}
.blob   { animation: blob 8s ease-in-out infinite; }
.blob-d { animation: blob 8s ease-in-out 3s infinite; }
```
- วงที่ 1: บนซ้าย 650px สีฟ้าอ่อน `bg-blue-100/50 dark:bg-blue-900/15` เบลอ `blur-[140px]`
- วงที่ 2: บนขวา 550px สีม่วงอ่อน `bg-violet-100/40 dark:bg-violet-900/10` เบลอ `blur-[120px]`
- ครอบด้วย `pointer-events-none absolute inset-0 overflow-hidden`

### 4.3 Floating 3D Icons
รูป PNG 3D ลอยกระจายรอบ Hero section (ฝั่งขวาเป็นหลัก)
```css
@keyframes floatA {
  0%,100% { transform: translateY(0px)  rotate(-3deg) scale(1);    }
  50%     { transform: translateY(-24px) rotate(3deg)  scale(1.02); }
}
@keyframes floatB {
  0%,100% { transform: translateY(-10px) rotate(2deg)  scale(1.01); }
  50%     { transform: translateY(16px)  rotate(-3deg) scale(0.98); }
}
@keyframes floatC {
  0%,100% { transform: translateY(6px)   rotate(4deg)  scale(0.99); }
  50%     { transform: translateY(-20px) rotate(-2deg) scale(1.02); }
}
.fi-a { animation: floatA 6s   ease-in-out       infinite; will-change:transform; }
.fi-b { animation: floatB 8.5s ease-in-out 1s    infinite; will-change:transform; }
.fi-c { animation: floatC 7s   ease-in-out 2s    infinite; will-change:transform; }
.fi-d { animation: floatA 9s   ease-in-out 0.5s  infinite; will-change:transform; }
.fi-e { animation: floatB 5.5s ease-in-out 1.5s  infinite; will-change:transform; }
.fi-f { animation: floatC 8s   ease-in-out 3s    infinite; will-change:transform; }
```
- ใช้ 6–8 รูป ขนาดต่างกัน (`w-14` ถึง `w-52`)
- ความโปร่งใสไล่ระดับ `opacity-50` ถึง `opacity-95` ตัวที่อยู่ไกลจางกว่า
- **ซ่อนบนมือถือทั้งหมด** (`hidden md:block`) เหลือแต่ avatar กลม
- แต่ละรูปครอบด้วย wrapper ที่ hover แล้วขยาย:
```css
.hover-scale-wrapper {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
}
.hover-scale-wrapper:hover {
  transform: scale(1.12) rotate(5deg);
  filter: drop-shadow(0 20px 30px rgba(59, 130, 246, 0.25));
}
```
- **รูป 3D หาได้จาก thiings.co หรือคลัง AI-generated 3D icons ฟรี**
- วางไว้ที่ `assets/images/` ถ้ายังไม่มีรูป ให้ใส่ placeholder และคอมเมนต์บอกชัดว่าต้องใส่รูปอะไร

### 4.4 Mouse Parallax
ไอคอนลอยและ blobs ขยับตามเมาส์แบบหน่วง ๆ
- ใส่ `data-depth="0.3"` ถึง `data-depth="2.4"` ให้แต่ละ element (ค่ามาก = ขยับมาก)
- ใช้ `lerp()` หน่วงการเคลื่อนที่ (factor 0.05) ให้ลื่นไม่กระตุก
- คำนวณใน `requestAnimationFrame` loop
- **ปิดบนมือถือ** ตรวจด้วย `window.matchMedia('(max-width: 768px)')`

### 4.5 Custom Cursor
เมาส์เป็นจุดน้ำเงินเล็ก + วงแหวนตามหลังแบบหน่วง
```css
.custom-cursor {
  width: 8px; height: 8px;
  background-color: #3b82f6;
  border-radius: 50%; position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none; z-index: 9999;
  transition: width 0.15s, height 0.15s, background-color 0.15s;
}
.custom-cursor-ring {
  width: 32px; height: 32px;
  border: 1.5px solid rgba(59, 130, 246, 0.45);
  border-radius: 50%; position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none; z-index: 9998;
  will-change: transform;
  transition: width 0.3s cubic-bezier(0.25,1,0.5,1), height 0.3s cubic-bezier(0.25,1,0.5,1), border-color 0.3s, background-color 0.3s;
}
.custom-cursor.hovered { width: 0; height: 0; }
.custom-cursor-ring.hovered {
  width: 52px; height: 52px;
  border-color: rgba(59, 130, 246, 0.8);
  background-color: rgba(59, 130, 246, 0.08);
}
```
- วงแหวนตามเมาส์แบบ lerp (factor 0.12) จุดตรงกลางตามทันที
- hover ปุ่ม/ลิงก์/การ์ด → จุดหาย วงแหวนขยาย (ใช้ event delegation กับ `a, button, .glow-card, .hover-scale-wrapper`)
- **แสดงเฉพาะเครื่องที่มีเมาส์จริง** เช็คด้วย `!window.matchMedia('(pointer: coarse)').matches`

### 4.6 Interactive Grid
ตารางกริดจาง ๆ ที่โผล่เฉพาะบริเวณรอบเมาส์
```css
.interactive-grid {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(350px circle at var(--mouse-x,0) var(--mouse-y,0), black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(350px circle at var(--mouse-x,0) var(--mouse-y,0), black 30%, transparent 100%);
  transition: opacity 0.6s ease; opacity: 0;
}
.dark .interactive-grid {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
}
.interactive-grid.active { opacity: 1; }
```
- อัปเดต `--mouse-x` / `--mouse-y` ใน `mousemove`
- เพิ่ม class `active` ครั้งแรกที่ขยับเมาส์

### 4.7 Glow Card
ขอบการ์ดเรืองแสงตามตำแหน่งเมาส์
```css
.glow-card { position: relative; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
.glow-card::before {
  content: ''; position: absolute; inset: -1px;
  border-radius: inherit; padding: 1px;
  background: radial-gradient(220px circle at var(--mouse-x,0) var(--mouse-y,0), rgba(59,130,246,0.25), transparent 70%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none; opacity: 0;
  transition: opacity 0.4s ease; z-index: 10;
}
.glow-card:hover::before { opacity: 1; }
```
- คำนวณตำแหน่งเมาส์เทียบกับการ์ดด้วย `getBoundingClientRect()`
- ใช้กับการ์ดสถิติ การ์ดผลงาน การ์ดบริการ

### 4.8 Scroll Animation (AOS)
```html
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```
- ตั้งค่าที่ `<body>`: `data-aos-easing="ease-out-cubic" data-aos-duration="700" data-aos-delay="0"`
- หัวข้อ section ใช้ `data-aos="fade-right"`
- เนื้อหาใช้ `data-aos="fade-up" data-aos-delay="80"` หรือ `100`

### 4.9 Skeleton Loading
โครงสีเทากะพริบก่อนเนื้อหาขึ้น
- `<div id="skeleton-loading">` มีแถบ `animate-pulse` จำลอง layout
- `<main id="main-content" class="hidden">` ซ่อนไว้ก่อน
- โหลดเสร็จ → ซ่อน skeleton แสดง main

### 4.10 Fade Up (Hero)
```css
@keyframes fadeUp {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
}
.fade-up { animation: fadeUp 0.7s cubic-bezier(.16,1,.3,1) forwards; }
```

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

### Status Badge (มีจุดกะพริบ)
```html
<span class="relative flex h-2 w-2">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
</span>
```
ครอบด้วย pill สีฟ้าอ่อน `bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 rounded-full px-4 py-1.5 text-xs font-semibold`

### การ์ดสถิติ (Impact Stats)
- `glow-card p-4 md:p-5 rounded-2xl border bg-white dark:bg-zinc-900/40 shadow-sm`
- ตัวเลข: `text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums`
- **มี count-up animation** นับจาก 0 ขึ้นไปหาเลขจริงตอน scroll ถึง
- ใต้ตัวเลขมี label 2 บรรทัด (หลัก `text-xs font-semibold` / รอง `text-[10px] text-gray-400`)

### Input
```
w-full border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm
focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
dark:bg-zinc-900 dark:text-zinc-100 transition-shadow
```
Label ด้านบน: `text-xs font-semibold text-gray-400 uppercase tracking-wider`

---

## 6. Sections (เรียงตามลำดับ)

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
| 9 | `#testimonials` | เสียงจากผู้ร่วมงาน | Testimonials | กริด 2 คอลัมน์ |
| 10 | `#contact` | สนใจติดต่อร่วมงาน? | Contact | ช่องทางติดต่อซ้าย + ฟอร์มขวา |
| 11 | — | Footer | — | copyright + social |

### Hero รายละเอียด
1. Status badge (จุดเขียวกะพริบ) — "พร้อมรับตำแหน่ง ..."
2. ชื่ออังกฤษตัวใหญ่ `text-5xl md:text-6xl font-extrabold`
3. ชื่อไทยตัวเล็กสีจางใต้ชื่ออังกฤษ
4. ตำแหน่งงาน `text-xl md:text-2xl font-semibold`
5. ย่อหน้าแนะนำตัวสั้น ๆ
6. บรรทัดสถานที่ `text-xs text-gray-400`
7. ปุ่ม 3 อัน: ดูผลงาน (primary) / ติดต่อผม (outline) / Resume CV (outline ฟ้าอ่อน)
8. Avatar กลมมีขอบ gradient + backdrop-blur — **แสดงกลางจอบนมือถือ, ลอยฝั่งขวาบนเดสก์ท็อป**

---

## 7. Responsive

- Mobile-first: `sm` 640 / `md` 768 / `lg` 1024
- **บนมือถือต้องปิด:** floating icons, mouse parallax, custom cursor
- Hero บนมือถือ: จัดกึ่งกลาง (`text-center md:text-left`) แสดง avatar ด้านบน
- Navbar บนมือถือ: เมนูยุบ (`hidden md:flex`) เหลือโลโก้ + ปุ่ม dark mode
- กริดผลงาน: 1 → 2 → 3 คอลัมน์

---

## 8. Accessibility & Performance

- `@media (prefers-reduced-motion: reduce)` → หยุด animation ทั้งหมด
- ทุก animation ใช้ `transform` / `opacity` เท่านั้น
- element ตกแต่งใส่ `aria-hidden="true"` และ `pointer-events-none`
- รูปทุกรูปมี `alt` (รูปตกแต่งใส่ `alt=""`)
- semantic tags: `<nav> <main> <section> <footer>`
- ปุ่มบนมือถือ ≥ 44×44px
- ใส่ `will-change: transform` เฉพาะ element ที่ animate ตลอดเวลา
