document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Multi-language (i18n) System
    // ==========================================
    const translations = {
        en: {
            // Navbar
            nav_about: "About",
            nav_skills: "Skills",
            nav_services: "Services",
            nav_projects: "Projects",
            nav_experience: "Experience",
            nav_contact: "Contact Me",

            // Hero Section
            hero_status: "Available for Full Stack Developer roles",
            hero_th_name: "Sidtisak Hanthongchai",
            hero_role: "> Full Stack Developer_",
            hero_desc: "Fourth-year ICT student at Prince of Songkla University. Passionate about building robust applications with modern web and mobile technologies.",
            hero_location: "📍 Hat Yai, Songkhla, Thailand",
            hero_btn_works: "View Projects",
            hero_btn_contact: "Contact Me",
            hero_btn_cv: "Resume CV",
            hero_avatar_label: "[Profile Photo]",

            // Tech Marquee
            tech_heading: "Technologies I Work With",

            // Bento Grid / Profile
            bento_eyebrow: "> PROFILE_",
            bento_heading: "BENTO GRID",
            bento_about_title: "> About Me",
            bento_about_desc: "Fourth-year Information and Communication Technology (ICT) student at Prince of Songkla University, Hat Yai Campus. Passionate about Full Stack Web and Mobile Application development, with a focus on writing clean, efficient, and maintainable code.",
            bento_tag_clean: "Clean Code",
            bento_tag_problem: "Problem Solving",
            bento_stat_projects: "Projects<br/>Completed",
            bento_stat_years: "Years<br/>Coding",
            bento_services_title: "> Services",
            bento_service_fullstack: "> Full Stack",
            bento_service_fullstack_desc: "React, Next.js, Node.js, SQL",
            bento_service_mobile: "> Mobile Dev",
            bento_service_mobile_desc: "Flutter Cross-platform",
            bento_skills_title: "> SKILLS_STACK",

            // Projects Section
            projects_eyebrow: "> WORKS_",
            projects_heading: "PROJECTS",
            filter_all: "All",
            filter_webapp: "Web App",
            filter_mobile: "Mobile App",
            project_view: "View Project",

            // Project 1: Srichai Property
            p1_title: "Srichai Property",
            p1_desc: "Capstone project real estate platform. Designed database schema and DFD. Built API access control, cross-property conflict detection, and agent double-booking checks.",

            // Project 2: GameStore
            p2_title: "GameStore",
            p2_desc: "React Storefront with an End-to-End Test Suite. Wrote an 81-case Playwright suite covering all routes, catching bugs missed in visual review. Rebuilt backend as a mock server.",

            // Project 3: Property Viewing App
            p3_title: "Property Viewing App",
            p3_desc: "Flutter Mobile App. Built booking feature end to end. Guarded endpoints with checkAccessToken middleware and covered the booking flow with Flutter integration tests.",

            // Experience Section
            exp_eyebrow: "Experience",
            exp_heading: "Work & Education",
            exp_job1_title: "Data Analyst Intern",
            exp_job1_date: "16 Apr – 12 Jun 2026",
            exp_job1_company: "Khunying Long Athakravisunthorn Learning Resources Center, PSU",
            exp_job1_b1: "Cleaned and restructured five years of library statistics for five universities in Excel and Power Query.",
            exp_job1_b2: "Built a five-page Power BI dashboard whose findings management acted on.",

            exp_edu_title: "B.Sc. in ICT",
            exp_edu_date: "2023 - Expected 2027",
            exp_edu_school: "Prince of Songkla University, Hat Yai Campus",
            exp_edu_b1: "Fourth-year ICT student, Faculty of Science.",
            exp_edu_b2: "Mobile App Development with Flutter workshop, PSU ICT club (Aug 2025).",

            // Contact Section
            contact_eyebrow: "Contact",
            contact_heading: "Interested in working together?",
            contact_subheading: "Feel free to email me directly or leave a message in the form below. I will get back to you as soon as possible.",
            contact_email_label: "Email",
            contact_phone_label: "Phone",
            contact_github_label: "GitHub",
            contact_form_name_label: "Name",
            contact_form_name_placeholder: "Your Name",
            contact_form_email_label: "Email",
            contact_form_email_placeholder: "your.email@example.com",
            contact_form_msg_label: "Message",
            contact_form_msg_placeholder: "How can I help you?",
            contact_form_submit: "Send Message",

            // Footer
            footer_rights: "All rights reserved."
        },
        th: {
            // Navbar
            nav_about: "เกี่ยวกับฉัน",
            nav_skills: "ทักษะ",
            nav_services: "บริการ",
            nav_projects: "ผลงาน",
            nav_experience: "ประสบการณ์",
            nav_contact: "ติดต่อผม",

            // Hero Section
            hero_status: "พร้อมรับตำแหน่ง Full Stack Developer",
            hero_th_name: "สิทธิศักดิ์ หาญธงชัย",
            hero_role: "> Full Stack Developer_",
            hero_desc: "นักศึกษาปี 4 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยสงขลานครินทร์ มุ่งมั่นและหลงใหลในการพัฒนา Web และ Mobile Application ด้วยเทคโนโลยีสมัยใหม่",
            hero_location: "📍 หาดใหญ่, สงขลา, ประเทศไทย",
            hero_btn_works: "ดูผลงาน",
            hero_btn_contact: "ติดต่อผม",
            hero_btn_cv: "เรซูเม CV",
            hero_avatar_label: "[รูปโปรไฟล์ขนาดใหญ่]",

            // Tech Marquee
            tech_heading: "เทคโนโลยีและเครื่องมือที่เชี่ยวชาญ",

            // Bento Grid / Profile
            bento_eyebrow: "> ข้อมูลส่วนตัว_",
            bento_heading: "BENTO GRID",
            bento_about_title: "> เกี่ยวกับฉัน",
            bento_about_desc: "นักศึกษาปี 4 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ที่มีความหลงใหลในการพัฒนา Web Application และ Mobile Application มุ่งเน้นการเขียนโค้ดที่สะอาด สวยงาม และมีประสิทธิภาพสูงสุด",
            bento_tag_clean: "Clean Code",
            bento_tag_problem: "Problem Solving",
            bento_stat_projects: "โปรเจกต์<br/>ที่สำเร็จ",
            bento_stat_years: "ปีแห่งการ<br/>เขียนโค้ด",
            bento_services_title: "> บริการที่เชี่ยวชาญ",
            bento_service_fullstack: "> Full Stack",
            bento_service_fullstack_desc: "React, Next.js, Node.js, SQL",
            bento_service_mobile: "> Mobile Dev",
            bento_service_mobile_desc: "Flutter Cross-platform",
            bento_skills_title: "> SKILLS_STACK",

            // Projects Section
            projects_eyebrow: "> ผลงาน_",
            projects_heading: "PROJECTS",
            filter_all: "ทั้งหมด",
            filter_webapp: "Web App",
            filter_mobile: "Mobile App",
            project_view: "ดูรายละเอียด",

            // Project 1: Srichai Property
            p1_title: "Srichai Property",
            p1_desc: "Capstone Project แพลตฟอร์มอสังหาริมทรัพย์ ออกแบบโครงสร้างฐานข้อมูลและ DFD พัฒนาระบบตรวจสอบสิทธิ์ API ตรวจจับข้อขัดแย้งข้ามอสังหาฯ และป้องกันการจองคิวซ้ำซ้อนของนายหน้า",

            // Project 2: GameStore
            p2_title: "GameStore",
            p2_desc: "หน้าร้านขายเกมด้วย React พร้อมชุดทดสอบ End-to-End ด้วย Playwright ครอบคลุม 81 เทสเคส ดักจับข้อผิดพลาดทั้งหมดอย่างละเอียด พร้อมจำลอง Mock Server หลังบ้าน",

            // Project 3: Property Viewing App
            p3_title: "Property Viewing App",
            p3_desc: "แอปพลิเคชันมือถือด้วย Flutter พัฒนาระบบจองคิวครบวงจร มี Middleware ป้องกันเส้นทาง API ด้วย Access Token และครอบคลุมโฟลว์ด้วย Integration Tests",

            // Experience Section
            exp_eyebrow: "ประสบการณ์",
            exp_heading: "ประวัติการทำงานและการศึกษา",
            exp_job1_title: "Data Analyst Intern (นักศึกษาฝึกงาน)",
            exp_job1_date: "16 เม.ย. – 12 มิ.ย. 2026",
            exp_job1_company: "สำนักทรัพยากรการเรียนรู้คุณหญิงหลง อรรถกระวีสุนทร ม.อ.",
            exp_job1_b1: "ทำความสะอาดและจัดโครงสร้างสถิติห้องสมุด 5 ปีย้อนหลังสำหรับ 5 มหาวิทยาลัย ด้วย Excel และ Power Query",
            exp_job1_b2: "สร้างแดชบอร์ด Power BI จำนวน 5 หน้า สำหรับผู้บริหารใช้ตัดสินใจเชิงนโยบาย",

            exp_edu_title: "วิทยาศาสตรบัณฑิต (วท.บ.) ICT",
            exp_edu_date: "2566 - คาดว่าจะจบ 2570",
            exp_edu_school: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
            exp_edu_b1: "นักศึกษาชั้นปีที่ 4 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร คณะวิทยาศาสตร์",
            exp_edu_b2: "เวิร์กช็อปการพัฒนา Mobile Application ด้วย Flutter, PSU ICT club (ส.ค. 2568)",

            // Contact Section
            contact_eyebrow: "ติดต่อ",
            contact_heading: "สนใจติดต่อร่วมงาน?",
            contact_subheading: "สามารถส่งอีเมลมาหาผมโดยตรง หรือฝากข้อความไว้ในฟอร์มด้านขวาได้เลยครับ ยินดีตอบกลับโดยเร็วที่สุด",
            contact_email_label: "อีเมล",
            contact_phone_label: "เบอร์โทร",
            contact_github_label: "GitHub",
            contact_form_name_label: "ชื่อ - นามสกุล",
            contact_form_name_placeholder: "ชื่อของคุณ",
            contact_form_email_label: "อีเมล",
            contact_form_email_placeholder: "your.email@example.com",
            contact_form_msg_label: "ข้อความ",
            contact_form_msg_placeholder: "พิมพ์ข้อความที่คุณต้องการติดต่อ...",
            contact_form_submit: "ส่งข้อความ",

            // Footer
            footer_rights: "สงวนลิขสิทธิ์ทั้งหมด"
        }
    };

    // Initialize Language (Default to 'en' as requested)
    let currentLang = localStorage.getItem('portfolio_lang') || 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('portfolio_lang', lang);
        document.documentElement.lang = lang;

        const dict = translations[lang] || translations.en;

        // 1. Translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (dict[key].includes('<br') || dict[key].includes('<span')) {
                    el.innerHTML = dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        // 2. Translate placeholders with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });

        // 3. Update Toggle Button UI (Desktop & Mobile)
        const updateButtonUI = (btnId) => {
            const btn = document.getElementById(btnId);
            if (!btn) return;

            if (lang === 'en') {
                btn.innerHTML = `
                    <span class="text-sm">🌐</span>
                    <span class="font-bold text-blue-600 dark:text-blue-400">EN</span>
                    <span class="text-gray-300 dark:text-zinc-600">/</span>
                    <span class="text-gray-400 dark:text-zinc-500 font-normal">TH</span>
                `;
            } else {
                btn.innerHTML = `
                    <span class="text-sm">🌐</span>
                    <span class="text-gray-400 dark:text-zinc-500 font-normal">EN</span>
                    <span class="text-gray-300 dark:text-zinc-600">/</span>
                    <span class="font-bold text-blue-600 dark:text-blue-400">TH</span>
                `;
            }
        };

        updateButtonUI('lang-toggle');
        updateButtonUI('lang-toggle-mobile');
    }

    // Toggle Language Function
    function toggleLanguage() {
        const nextLang = currentLang === 'en' ? 'th' : 'en';
        applyLanguage(nextLang);
    }

    // Bind event listeners to desktop & mobile toggle buttons
    const langToggleBtn = document.getElementById('lang-toggle');
    const langToggleMobileBtn = document.getElementById('lang-toggle-mobile');

    if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);
    if (langToggleMobileBtn) langToggleMobileBtn.addEventListener('click', toggleLanguage);

    // Apply language on load
    applyLanguage(currentLang);


    // ==========================================
    // 2. Mobile Menu Toggle
    // ==========================================
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


    // ==========================================
    // 3. Set Current Year in Footer
    // ==========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 4. Animated Dot Background Generation
    // ==========================================
    const generateDots = () => {
        const container = document.getElementById('dot-background');
        if (!container) return;

        const colors = [
            'text-[#4F46E5]',
            'text-[#7C3AED]',
            'text-[#EC4899]',
            'text-[#F59E0B]',
            'text-[#10B981]',
            'text-[#EF4444]',
            'text-[#3B82F6]'
        ];

        const isMobile = window.innerWidth < 768;
        const numDots = isMobile ? 40 : 80;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            const colorClass = colors[Math.floor(Math.random() * colors.length)];
            const width = Math.floor(Math.random() * 7) + 4;
            const height = Math.floor(Math.random() * 2) + 3;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const rotation = Math.floor(Math.random() * 360);
            const tx1 = (Math.random() - 0.5) * 40;
            const ty1 = (Math.random() - 0.5) * 40;
            const tx2 = (Math.random() - 0.5) * 40;
            const ty2 = (Math.random() - 0.5) * 40;
            const duration = Math.random() * 12 + 8;
            const delay = Math.random() * 10;

            dot.className = `dot dot-animated ${colorClass}`;
            dot.style.width = `${width}px`;
            dot.style.height = `${height}px`;
            dot.style.top = `${top}%`;
            dot.style.left = `${left}%`;
            dot.style.setProperty('--rotation', `${rotation}deg`);
            dot.style.setProperty('--tx-1', `${tx1}px`);
            dot.style.setProperty('--ty-1', `${ty1}px`);
            dot.style.setProperty('--tx-2', `${tx2}px`);
            dot.style.setProperty('--ty-2', `${ty2}px`);
            dot.style.setProperty('--duration', `${duration}s`);
            dot.style.setProperty('--delay', `${delay}s`);

            fragment.appendChild(dot);
        }

        container.appendChild(fragment);
    };

    generateDots();
});
