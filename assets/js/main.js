document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- 2. Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 3. Animated Dot Background Generation ---
    // สร้าง Background แบบจุดลอยที่ #hero
    const generateDots = () => {
        const container = document.getElementById('dot-background');
        if (!container) return;

        // ชุดสีของจุด ตามที่กำหนดใน DESIGN.md
        const colors = [
            'text-[#4F46E5]', // indigo
            'text-[#7C3AED]', // violet
            'text-[#EC4899]', // pink
            'text-[#F59E0B]', // amber
            'text-[#10B981]', // emerald
            'text-[#EF4444]', // red
            'text-[#3B82F6]'  // blue
        ];

        // ลดจำนวนจุดบนมือถือเพื่อประหยัดแบตเตอรี่ (Performance)
        const isMobile = window.innerWidth < 768;
        const numDots = isMobile ? 40 : 80;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            
            // สุ่มสีจากชุดสี
            const colorClass = colors[Math.floor(Math.random() * colors.length)];
            
            // ขนาดของขีด: ความกว้าง 4-10px, ความสูง 3-4px
            const width = Math.floor(Math.random() * 7) + 4;
            const height = Math.floor(Math.random() * 2) + 3;
            
            // ตำแหน่งสุ่มในพื้นที่ Hero (0-100%)
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            
            // องศาการเอียงแบบสุ่ม
            const rotation = Math.floor(Math.random() * 360);
            
            // สุ่มระยะการขยับ (Drift) ขึ้น-ลง-ซ้าย-ขวา ระยะไม่เกิน 20-30px
            const tx1 = (Math.random() - 0.5) * 40; 
            const ty1 = (Math.random() - 0.5) * 40;
            const tx2 = (Math.random() - 0.5) * 40;
            const ty2 = (Math.random() - 0.5) * 40;

            // สุ่ม duration 8-20 วินาที
            const duration = Math.random() * 12 + 8; 
            // สุ่ม delay ให้แต่ละจุด เพื่อไม่ให้ animation ขยับพร้อมกันเป็นจังหวะเดียว
            const delay = Math.random() * 10;

            // ตั้งค่า class และ inline styles พื้นฐาน
            dot.className = `dot dot-animated ${colorClass}`;
            dot.style.width = `${width}px`;
            dot.style.height = `${height}px`;
            dot.style.top = `${top}%`;
            dot.style.left = `${left}%`;
            
            // กำหนด CSS Variables สำหรับ @keyframes 
            dot.style.setProperty('--rotation', `${rotation}deg`);
            dot.style.setProperty('--tx-1', `${tx1}px`);
            dot.style.setProperty('--ty-1', `${ty1}px`);
            dot.style.setProperty('--tx-2', `${tx2}px`);
            dot.style.setProperty('--ty-2', `${ty2}px`);
            dot.style.setProperty('--duration', `${duration}s`);
            dot.style.setProperty('--delay', `${delay}s`);

            fragment.appendChild(dot);
        }

        // เพิ่มเข้า DOM ในครั้งเดียวเพื่อลด Reflow/Repaint
        container.appendChild(fragment);
    };

    generateDots();
});
