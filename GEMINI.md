# Project Rules — Antigravity Agent

> ไฟล์นี้คือ "กฎ" ที่ Agent ต้องอ่านและปฏิบัติตามทุกครั้งก่อนลงมือเขียนหรือแก้โค้ด
> **โปรเจคนี้คือ เว็บไซต์ Resume/Portfolio ส่วนตัว แบบ Landing Page หน้าเดียวยาว ๆ (static site)**
> ไม่มี Backend ไม่มี Database — deploy ขึ้น Netlify

---

## 0. บทบาทและวิธีทำงาน (Role & Working Style)

- ทำหน้าที่เป็น **Front-end Developer** ที่เขียนโค้ดสะอาด อ่านง่าย พร้อม deploy จริง
- สื่อสารกับผู้ใช้เป็น **ภาษาไทย** แต่ชื่อ class / id / ตัวแปร ใช้ **ภาษาอังกฤษ**
- ก่อนเริ่มงานใหญ่ ให้ **สรุปแผนเป็นข้อ ๆ แล้วรอผู้ใช้ยืนยันก่อน** จึงลงมือทำจริง
- ถ้าโจทย์กำกวมเกิน 1 ทางเลือก → **ถามก่อน อย่าเดา** (ถามครั้งละ 1–3 คำถาม พร้อมตัวเลือก)
- ห้ามสร้างไฟล์หรือฟีเจอร์ที่ผู้ใช้ไม่ได้ขอ ("อย่าแถม")
- **ห้ามแต่งข้อมูลปลอมใส่ Resume** (ชื่อบริษัท ผลงาน วุฒิการศึกษา ตัวเลขปีประสบการณ์)
  ถ้ายังไม่มีข้อมูลจริง ให้ใส่เป็น placeholder ที่เห็นชัดว่าต้องแก้ เช่น `[ชื่อบริษัท]` แล้วแจ้งผู้ใช้

---

## 1. Tech Stack & Architecture

| ส่วน | เทคโนโลยี |
|---|---|
| Frontend | HTML5, Tailwind CSS (CDN), Vanilla JavaScript |
| Backend | **ไม่มี** |
| Database | **ไม่มี** — ห้ามเสนอเชื่อมต่อฐานข้อมูลใด ๆ แม้เครื่องจะมี PostgreSQL/MySQL ติดตั้งอยู่ |
| Hosting | Netlify |
| ฟอร์มติดต่อ | ใช้ Netlify Forms (`data-netlify="true"`) — **ห้ามเขียน Backend เอง** |

- **ห้ามใช้ React / Vue / Next.js** หรือ framework ใด ๆ ที่ต้อง build
- ห้ามติดตั้ง library เพิ่มโดยไม่ได้รับอนุญาต
- ทุกอย่างต้องเปิดไฟล์ `index.html` ตรง ๆ ในเบราว์เซอร์แล้วทำงานได้ทันที ไม่ต้องมี server

### โครงสร้างไฟล์ (ยึดตามนี้เสมอ)
```
project/
├── index.html            # ทั้งเว็บอยู่ในไฟล์นี้ไฟล์เดียว
├── assets/
│   ├── css/style.css     # CSS เสริมนอกเหนือ Tailwind (เช่น animation)
│   ├── js/main.js        # smooth scroll, mobile menu toggle
│   └── images/
├── DESIGN.md
└── README.md
```

### Page Structure
- **Single-page long-scroll landing page** — ทั้งเว็บอยู่ในไฟล์ `index.html` ไฟล์เดียวเท่านั้น
- **ห้ามสร้างไฟล์ .html แยกสำหรับแต่ละ section**
- ทุก section ต้องมี `id` ตรงกับ anchor link ในเมนู
  (`#about`, `#skills`, `#works`, `#experience`, `#contact`)
- ห้ามสร้างโฟลเดอร์ `api/`, `config/`, `sql/`

---

## 2. Coding Standards & Readability

- ตั้งชื่อ class/id ให้สื่อความหมาย (`hero-section`, `skill-card`) ห้ามใช้ `div1`, `box2`
- ทุก section ต้องมี `id` ตรงกับ anchor link ในเมนู (`#about`, `#skills`, `#works`, `#experience`, `#contact`)
- Indent 2 spaces สำหรับ HTML/CSS, 4 spaces สำหรับ JS
- ใช้ `===` แทน `==` ใน JavaScript
- **Comment อธิบาย "ทำไม" ไม่ใช่ "ทำอะไร"**
  - ❌ `// วนลูปสร้างจุด`
  - ✅ `// สุ่ม delay ให้แต่ละจุด เพื่อไม่ให้ animation ขยับพร้อมกันเป็นจังหวะเดียว`
- ห้ามทิ้ง `console.log()` ที่ใช้ debug ไว้ในโค้ดที่ส่งงาน
- จัด CSS เป็นหมวดหมู่: layout → typography → component → animation → responsive

---

## 3. Agentic Behavior & Guardrails

- **ห้ามลบหรือเขียนทับไฟล์ที่มีอยู่ทั้งไฟล์** โดยไม่ขออนุญาต — แก้เฉพาะส่วนที่เกี่ยวข้อง
- แก้ทีละเรื่อง ห้าม refactor ทั้งโปรเจคพร้อมกัน
- ถ้าต้องแก้เกิน 3 ไฟล์ ให้แจ้งรายชื่อไฟล์ + เหตุผลก่อน
- **เวลาผู้ใช้ขอให้ออกแบบหน้าใหม่ → เสนอตัวเลือก 2–3 แบบพร้อมอธิบายสั้น ๆ ให้เลือกก่อน แล้วค่อยลงมือทำจริง**
- **อ้างอิง `DESIGN.md` ทุกครั้งที่ทำงานเกี่ยวกับ UI** ห้ามคิดสี/ฟอนต์/ระยะห่างใหม่เอง
- ถ้าไม่แน่ใจว่า API หรือ CSS property มีอยู่จริง → บอกตรง ๆ ห้ามเดา

### ทุกครั้งที่แก้โค้ดเสร็จ ต้องสรุปท้ายคำตอบตามฟอร์แมตนี้
```
📝 สรุปการแก้ไข
- ไฟล์ที่แก้: ...
- แก้อะไร: ...
- ทำไมถึงแก้แบบนี้: ...
- ต้องทำอะไรต่อ / สิ่งที่ยังค้าง: ...
```

---

## 4. UI/UX & Accessibility

- **Responsive ทุกส่วน** Mobile-first (breakpoint: `sm` 640 / `md` 768 / `lg` 1024)
- ใช้สี ฟอนต์ ระยะห่าง ตามที่ระบุใน `DESIGN.md` เท่านั้น
- ฟอนต์ภาษาไทยต้องมี fallback เสมอ: `'Be Vietnam Pro', 'Noto Sans Thai', sans-serif`
- เมนูบนมือถือต้องยุบเป็น hamburger และกดเปิด-ปิดได้จริง
- Accessibility ขั้นต่ำ:
  - รูปทุกรูปต้องมี `alt`
  - ใช้ semantic tag (`<header> <main> <nav> <section> <footer>`)
  - contrast สีตัวหนังสือกับพื้นหลังต้องอ่านออกชัดเจน
  - ปุ่ม/ลิงก์บนมือถือ พื้นที่กดไม่ต่ำกว่า 44×44 px
- ทุกปุ่มและการ์ดต้องมี hover state

---

## 5. Animation & Performance

- Animation ทั้งหมดต้องใช้ `transform` และ `opacity` เท่านั้น (ห้าม animate `top`/`left`/`width` เพราะทำให้เกิด reflow)
- ต้องรองรับ `@media (prefers-reduced-motion: reduce)` → หยุด animation ทั้งหมด
- Layer พื้นหลังตกแต่งต้องตั้ง `pointer-events: none` และ `z-index: -1` เสมอ **ห้ามบังการคลิกเนื้อหา**
- รูปภาพ: ใส่ `loading="lazy"` ยกเว้นรูป hero ด้านบนสุด และกำหนด width/height ล่วงหน้ากัน layout shift
- ห้ามใช้ canvas หรือ animation library ภายนอก

---

## 6. Definition of Done — เช็คก่อนบอกว่า "เสร็จแล้ว"

- [ ] เปิด `index.html` ตรง ๆ ในเบราว์เซอร์แล้วหน้าตาถูกต้อง ไม่ต้องมี server
- [ ] ไม่มี error ใน Console
- [ ] เมนูทุกอันกดแล้วเลื่อนไปยัง section ที่ถูกต้อง (smooth scroll ทำงาน)
- [ ] ย่อหน้าจอเป็นขนาดมือถือแล้ว layout ไม่พัง เมนูยุบเป็น hamburger ได้
- [ ] ตัวหนังสือภาษาไทยแสดงผลถูกต้อง สระ/วรรณยุกต์ไม่เพี้ยน
- [ ] สี/ฟอนต์ตรงกับ `DESIGN.md`
- [ ] พื้นหลัง animation ไม่บังการคลิกปุ่ม
- [ ] มีสรุปการแก้ไข (ตามฟอร์แมตข้อ 3) ให้ผู้ใช้แล้ว
- [ ] ลากโฟลเดอร์ทั้งหมดขึ้น Netlify ได้ทันที
