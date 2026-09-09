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
            hero_status: "Cooperative Education Candidate (16 Nov 2026 – 7 Mar 2027)",
            hero_th_name: "Sidtisak Hanthongchai (สิทธิศักดิ์ หาญธงไชย)",
            hero_role: "> Full Stack Developer_",
            hero_desc: "Fourth-year ICT student at Prince of Songkla University. 289 commits across 3 codebases (Web, Web App, Mobile). Specialized in Next.js, React, Node.js, and Flutter with an emphasis on clean architecture and automated testing.",
            hero_location: "📍 Hat Yai, Songkhla, Thailand",
            hero_btn_works: "View Projects",
            hero_btn_contact: "Contact Me",
            hero_btn_cv: "Resume CV",

            // Tech Marquee
            tech_heading: "Technologies I Work With",

            // Bento Grid / Profile
            bento_eyebrow: "> PROFILE_",
            bento_heading: "BENTO GRID",
            bento_about_title: "> About Me",
            bento_about_desc: "Fourth-year Information and Communication Technology (ICT) student at Prince of Songkla University, Hat Yai Campus. Experienced in full-lifecycle system design (Context Diagrams, DFD, ER Models) to production deployment, owning core subsystems with verified Git commits and automated testing.",
            bento_tag_clean: "Clean Code",
            bento_tag_problem: "Problem Solving",
            bento_tag_pr: "15 Merged PRs",
            bento_tag_codebases: "3 Codebases",
            bento_tag_verified: "Git Log Verified",
            bento_stat_commits: "Commits Written<br/>across 3 Projects",
            bento_stat_tests: "E2E Tests<br/>Playwright Suite",
            bento_services_title: "> Services",
            bento_service_fullstack: "> Full Stack",
            bento_service_fullstack_desc: "Next.js 16, React 19, Node.js, Prisma, PostgreSQL",
            bento_service_mobile: "> Mobile Dev",
            bento_service_mobile_desc: "Flutter, Dart, Express.js, MariaDB, REST API",
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
            p1_desc: "Real estate capstone platform. Designed 32 DB tables & 8 DFD processes. Built API access control, SLA countdown service, Recharts analytics, and rebuilt hasAgentBookingConflict to prevent overlapping client viewings.",
            p1_meta: "85 Commits · 15 PRs · 32 Tables · 32 APIs",

            // Project 2: GameStore
            p2_title: "GameStore",
            p2_desc: "React storefront with 81 Playwright E2E tests covering every route and auth flow. Rebuilt lost backend as a dependency-free Node.js mock server. Optimized page assets reducing bundle size from 8.4MB to 1.25MB.",
            p2_meta: "144 Commits · 81 Tests · 8.4MB → 1.25MB",

            // Project 3: Property Viewing App
            p3_title: "Property Viewing App",
            p3_desc: "Flutter mobile booking application. Built end-to-end booking flow across 5 API routes. Guarded 11 endpoints with checkAccessToken middleware, implemented 5 type-safe Model classes with fromJson, and covered with Flutter integration_test.",
            p3_meta: "60/78 Commits · 5 Models · Integration Test",

            // Experience Section
            exp_eyebrow: "Experience",
            exp_heading: "Work, Education & Volunteering",
            exp_job1_title: "Data Analyst Intern",
            exp_job1_date: "16 Apr – 12 Jun 2026",
            exp_job1_company: "Khunying Long Athakravisunthorn Learning Resources Center, PSU",
            exp_job1_b1: "Cleaned and restructured 5 years (2021–2025) of library statistics for 5 universities in Excel and Power Query, created a 5-page Power BI dashboard for the department head, and produced a comprehensive 21-page handover manual for successors.",
            exp_job1_b2: "Key management insight: PSU operated 48 IT systems (peer avg <25) on a 6x smaller IT budget, correlating with the group's highest average downtime.",

            exp_edu_title: "B.Sc. in ICT (Information & Communication Technology)",
            exp_edu_date: "2023 - Expected 2027",
            exp_edu_school: "Prince of Songkla University, Hat Yai Campus",
            exp_edu_b1: "Faculty of Science. Relevant Software Coursework: Software Engineering, ICT Project I, IT Governance, Software Service & Quality Management, Interaction Design, Database Systems, Systems Analysis & Design.",
            exp_edu_b2: "Cooperative Education: Course 308-497 (6 Credits, 40 hrs/week, 16 Nov 2026 – 7 Mar 2027).",

            exp_act_title: "Training & Community Leadership",
            exp_act_date: "2024 – 2026",
            exp_act_school: "Prince of Songkla University, Hat Yai Campus",
            exp_act_b1: "Certified: AI Literacy for Learning and Work (Batch 6) — Education and Learning Innovation Academy (EILA), PSU (Sep 2026).",
            exp_act_b2: "Technical Workshops: Git, CI/CD & Container Deployment and AI Vibe Coding intensive training (Aug 2026).",
            exp_act_b3: "Mobile App Development with Flutter workshop — Faculty of Science / PSU ICT Club (Aug 2025), later scaled into a production coursework mobile app.",
            exp_act_b4: "Flood Relief Assistance Centre volunteer — Student Development and Alumni Relations, Hat Yai Campus (Nov 2025).",
            exp_act_b5: "Volunteer Leadership for Sustainable Community Development course — PSU Volunteer Center (Nov 2024, 3 credits).",

            exp_lead_title: "University Leadership & Certified Activities",
            exp_lead_date: "2023 – 2026",
            exp_lead_school: "Prince of Songkla University, Hat Yai Campus",
            exp_lead_b1: "136 Total Activity Hours certified by PSU Student Development Division (81 hrs Competency + 55 hrs General Interest).",
            exp_lead_b2: "Project Leader — ICT Curriculum Orientation 2024 (Lead organizer for ICT branch student activities, Dec 2024).",
            exp_lead_b3: "Co-organizer — National Science Week Exhibition 2023 (12 hours, event operations and leadership).",
            exp_lead_b4: "Co-op Readiness Training — Completed Faculty of Science Cooperative Education modules (Sci Festival 2026 & Road Map to Get Your Job).",

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
            hero_status: "ผู้สมัครฝึกสหกิจศึกษา (16 พ.ย. 2569 – 7 มี.ค. 2570)",
            hero_th_name: "สิทธิศักดิ์ หาญธงไชย",
            hero_role: "> Full Stack Developer_",
            hero_desc: "นักศึกษาปี 4 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยสงขลานครินทร์ เจ้าของ 289 Commits ใน 3 โปรเจกต์จริง (เว็บ, เว็บแอป, มือถือ) เชี่ยวชาญ Next.js, React, Node.js และ Flutter มุ่งเน้นสถาปัตยกรรมโค้ดที่สะอาดและการทดสอบอัตโนมัติ",
            hero_location: "📍 หาดใหญ่, สงขลา, ประเทศไทย",
            hero_btn_works: "ดูผลงาน",
            hero_btn_contact: "ติดต่อผม",
            hero_btn_cv: "เรซูเม CV",

            // Tech Marquee
            tech_heading: "เทคโนโลยีและเครื่องมือที่ใช้ในปัจจุบัน",

            // Bento Grid / Profile
            bento_eyebrow: "> ข้อมูลส่วนตัว_",
            bento_heading: "BENTO GRID",
            bento_about_title: "> เกี่ยวกับฉัน",
            bento_about_desc: "นักศึกษาปี 4 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ม.สงขลานครินทร์ วิทยาเขตหาดใหญ่ มีประสบการณ์ออกแบบระบบตั้งแต่ต้นน้ำ (Context Diagram, DFD, ER Model) สู่โค้ดที่รันจริง รับผิดชอบระบบหลักพร้อมตัวเลขสถิติ Git และชุดทดสอบอัตโนมัติที่ตรวจสอบย้อนกลับได้จริง",
            bento_tag_clean: "Clean Code",
            bento_tag_problem: "Problem Solving",
            bento_tag_pr: "15 Merged PRs",
            bento_tag_codebases: "3 Codebases",
            bento_tag_verified: "ตรวจจาก Git Log จริง",
            bento_stat_commits: "Commits ที่เขียนเอง<br/>ใน 3 โปรเจกต์",
            bento_stat_tests: "ชุดทดสอบ E2E<br/>ด้วย Playwright",
            bento_services_title: "> บริการที่เชี่ยวชาญ",
            bento_service_fullstack: "> Full Stack",
            bento_service_fullstack_desc: "Next.js 16, React 19, Node.js, Prisma, PostgreSQL",
            bento_service_mobile: "> Mobile Dev",
            bento_service_mobile_desc: "Flutter, Dart, Express.js, MariaDB, REST API",
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
            p1_desc: "โปรเจกต์จบการศึกษาแพลตฟอร์มอสังหาริมทรัพย์ ออกแบบ 32 ตารางฐานข้อมูล & 8 กระบวนการ DFD พัฒนาระบบคุมสิทธิ์ API, ระบบนับถอยหลัง SLA, แดชบอร์ด Recharts, และรื้อระบบกันนายหน้ารับนัดชนกัน hasAgentBookingConflict",
            p1_meta: "85 Commits · 15 PRs · 32 ตาราง · 32 APIs",

            // Project 2: GameStore
            p2_title: "GameStore",
            p2_desc: "เว็บร้านขายไอเทมเกมด้วย React พร้อมชุดทดสอบ Playwright 81 เคส ครอบคลุมทุก route และ auth flow รื้อระบบหลังบ้านเป็น Node.js Mock Server และย่อขนาดหน้าเว็บจาก 8.4MB เหลือ 1.25MB ต่อหน้า",
            p2_meta: "144 Commits · 81 เทส · ย่อ 8.4MB → 1.25MB",

            // Project 3: Property Viewing App
            p3_title: "Property Viewing App",
            p3_desc: "แอปจองดูบ้านด้วย Flutter พัฒนาระบบจองครบวงจร 5 เส้นทาง API คุม 11 endpoints ด้วย checkAccessToken middleware ออกแบบ 5 คลาส Model แบบ Type-Safe พร้อม factory fromJson และครอบคลุมด้วย Flutter integration_test",
            p3_meta: "60/78 Commits · 5 Models · Integration Test",

            // Experience Section
            exp_eyebrow: "ประสบการณ์",
            exp_heading: "ประวัติการทำงาน การศึกษา และกิจกรรมจิตอาสา",
            exp_job1_title: "Data Analyst Intern (นักศึกษาฝึกงาน)",
            exp_job1_date: "16 เม.ย. – 12 มิ.ย. 2026",
            exp_job1_company: "สำนักทรัพยากรการเรียนรู้คุณหญิงหลง อรรถกระวีสุนทร ม.อ.",
            exp_job1_b1: "ทำความสะอาดและจัดโครงสร้างข้อมูลสถิติห้องสมุด 5 ปี (2021–2025) ของ 5 มหาวิทยาลัยด้วย Excel และ Power Query พร้อมสร้าง Dashboard บน Power BI 5 หน้าเสนอหัวหน้าฝ่าย และจัดทำคู่มือส่งต่องานฉบับสมบูรณ์ความยาว 21 หน้าสำหรับรุ่นถัดไป",
            exp_job1_b2: "ข้อค้นพบสำคัญที่ฝ่ายบริหารนำไปใช้: ม.อ. มีระบบสารสนเทศมากที่สุด 48 ระบบ แต่งบ IT น้อยกว่าคู่เทียบ 6 เท่า สอดคล้องกับค่า Downtime เฉลี่ยที่สูงที่สุด",

            exp_edu_title: "วิทยาศาสตรบัณฑิต (วท.บ.) ICT",
            exp_edu_date: "2566 - คาดว่าจะจบ 2570",
            exp_edu_school: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
            exp_edu_b1: "คณะวิทยาศาสตร์ รายวิชาซอฟต์แวร์: วิศวกรรมซอฟต์แวร์, โครงงาน ICT I, การจัดการ IT องค์กร, การบริการซอฟต์แวร์และประกันคุณภาพ, การออกแบบเชิงปฏิสัมพันธ์, ระบบฐานข้อมูล, การวิเคราะห์และออกแบบระบบสารสนเทศ",
            exp_edu_b2: "สหกิจศึกษา: รายวิชา 308-497 (6 หน่วยกิต, 40 ชม./สัปดาห์, 16 พ.ย. 2569 – 7 มี.ค. 2570)",

            exp_act_title: "การอบรมและกิจกรรมจิตอาสา",
            exp_act_date: "2567 – 2569",
            exp_act_school: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
            exp_act_b1: "ผ่านการอบรมพร้อมใบรับรอง: การใช้ AI อย่างรู้เท่าทันสำหรับการเรียนและการทำงาน (AI Literacy for Learning and Work รุ่น 6) — สำนักการศึกษาและนวัตกรรมการเรียนรู้ ม.อ. (ก.ย. 2569)",
            exp_act_b2: "ผ่านการอบรมเชิงปฏิบัติการเข้มข้น: Git, CI/CD & Container Deployment และ AI Vibe Coding (ส.ค. 2569)",
            exp_act_b3: "โครงการอบรมเชิงปฏิบัติการ Mobile App Development with Flutter — คณะวิทยาศาสตร์ / ชุมนุม ICT ม.อ. (ส.ค. 2568) ซึ่งต่อยอดเป็นแอปที่ส่งจริง",
            exp_act_b4: "จิตอาสาศูนย์ช่วยเหลือผู้ประสบอุทกภัย — กองพัฒนานักศึกษาและศิษย์เก่าสัมพันธ์ วิทยาเขตหาดใหญ่ (พ.ย. 2568)",
            exp_act_b5: "รายวิชาผู้นำจิตอาสาเพื่อการพัฒนาชุมชนอย่างยั่งยืน — ศูนย์อาสาสมัคร ม.สงขลานครินทร์ (พ.ย. 2567, 3 หน่วยกิต)",

            exp_lead_title: "กิจกรรมมหาวิทยาลัยและภาวะผู้นำ",
            exp_lead_date: "2566 – 2569",
            exp_lead_school: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
            exp_lead_b1: "ผ่านกิจกรรมเสริมหลักสูตรรับรองโดยกองพัฒนานักศึกษา ม.อ. รวม 136 ชั่วโมง (สมรรถนะ 81 ชม. + ความสนใจ 55 ชม.)",
            exp_lead_b2: "ผู้รับผิดชอบโครงการ — กิจกรรมรับน้องหลักสูตร ICT 2024 (ผู้นำจัดกิจกรรมนักศึกษาหลักสูตรเทคโนโลยีสารสนเทศและการสื่อสาร, ธ.ค. 2567)",
            exp_lead_b3: "ผู้ร่วมจัด — สัปดาห์วิทยาศาสตร์แห่งชาติ ประจำปี 2566 (12 ชั่วโมง ด้านภาวะผู้นำและการทำงานเป็นทีม)",
            exp_lead_b4: "การอบรมเตรียมความพร้อมสหกิจศึกษา คณะวิทยาศาสตร์ ม.อ. (Sci Festival 2026 & Road Map to Get Your Job)",

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
