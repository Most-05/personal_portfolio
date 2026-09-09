document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 📍 ตำแหน่งบนหน้าเว็บ: หน้าต่างป๊อปอัปแสดงรายละเอียดเชิงลึก (Case Study Modal)
    // ตัวแปรสถานะส่วนกลาง: บันทึก ID ของโปรเจกต์ที่กำลังเปิดดูอยู่ (เช่น 'srichai', 'gamestore', 'propertyapp')
    // เพื่อให้เมื่อผู้ใช้กดสลับภาษา (EN/TH) ระบบจะอัปเดตเนื้อหาในป๊อปอัปที่เปิดค้างอยู่ให้เป็นภาษานั้นทันที
    // ==========================================================================
    let activeCaseStudyId = null;

    // ==========================================================================
    // 1. ระบบจัดการหลายภาษา (Multi-language i18n System)
    // 📍 ตำแหน่งบนหน้าเว็บ: ครอบคลุมข้อความทั้งหมดทั่วทั้งหน้าเว็บ (Navbar, Hero, Bento, Works, Experience, Contact, Footer)
    // ทำไมต้องทำ: เพื่อรองรับการนำเสนอผลงานทั้งผู้ประเมินชาวไทยและบริษัทข้ามชาติ/สากล 
    // โดยใช้ระบบ data-i18n ผูกกับคำศัพท์ในพจนานุกรมนี้
    // ==========================================================================
    const translations = {
        en: {
            // 📍 ตำแหน่งบนหน้าเว็บ: แถบเมนูด้านบน (Navbar)
            nav_about: "About",
            nav_skills: "Skills",
            nav_services: "Services",
            nav_projects: "Projects",
            nav_experience: "Experience",
            nav_contact: "Contact Me",

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนหัวเว็บไซต์ (Hero Section: #about)
            hero_status: "Cooperative Education Candidate (16 Nov 2026 – 7 Mar 2027)",
            hero_th_name: "Sidtisak Hanthongchai (สิทธิศักดิ์ หาญธงไชย)",
            hero_role: "> Full Stack Developer_",
            hero_desc: "Fourth-year ICT student at Prince of Songkla University. 289 commits across 3 codebases (Web, Web App, Mobile). Specialized in Next.js, React, Node.js, and Flutter with an emphasis on clean architecture and automated testing.",
            hero_location: "📍 Hat Yai, Songkhla, Thailand",
            hero_btn_works: "View Projects",
            hero_btn_contact: "Contact Me",
            hero_btn_cv: "Resume CV",

            // 📍 ตำแหน่งบนหน้าเว็บ: แถบข้อความและโลโก้วิ่ง (Tech Marquee)
            tech_heading: "Technologies I Work With",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดตารางประวัติและทักษะ (Bento Grid / Profile)
            bento_eyebrow: "> PROFILE_",
            bento_heading: "BENTO GRID",
            bento_about_title: "> About Me",
            bento_about_desc: "Fourth-year Information and Communication Technology (ICT) student at Prince of Songkla University, Hat Yai Campus. Experienced in full-lifecycle system design (Context Diagrams, DFD, ER Models, Figma Interactive Prototyping across 5 team projects) to production deployment, owning core subsystems with verified Git commits and automated testing.",
            bento_tag_clean: "Clean Code",
            bento_tag_problem: "Problem Solving",
            bento_tag_pr: "15 Merged PRs",
            bento_tag_codebases: "3 Codebases",
            bento_tag_verified: "Git Log Verified",
            bento_tag_figma: "5 Figma Prototypes",
            bento_stat_commits: "Commits Written<br/>across 3 Projects",
            bento_stat_tests: "E2E Tests<br/>Playwright Suite",
            bento_services_title: "> Services",
            bento_service_fullstack: "> Full Stack",
            bento_service_fullstack_desc: "Next.js 16, React 19, Node.js, Prisma, PostgreSQL",
            bento_service_mobile: "> Mobile Dev",
            bento_service_mobile_desc: "Flutter, Dart, Express.js, MariaDB, REST API",
            bento_skills_title: "> SKILLS_STACK",

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนจัดแสดงผลงานและปุ่มคัดกรอง (Projects Section & Filters: #works)
            projects_eyebrow: "> WORKS_",
            projects_heading: "PROJECTS",
            filter_all: "All",
            filter_webapp: "Web App",
            filter_mobile: "Mobile App",
            project_view: "View Project",
            btn_case_study: "Case Study",
            modal_view_github: "View GitHub Repository",
            modal_close: "Close",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดผลงานโปรเจกต์ที่ 1 (Srichai Property) ในหมวด PROJECTS
            p1_title: "Srichai Property",
            p1_desc: "Real estate capstone platform. Designed 32 DB tables & 8 DFD processes. Built API access control, SLA countdown service, Recharts analytics, and rebuilt hasAgentBookingConflict to prevent overlapping client viewings.",
            p1_meta: "85 Commits · 15 PRs · 32 Tables · 32 APIs",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดผลงานโปรเจกต์ที่ 2 (GameStore) ในหมวด PROJECTS
            p2_title: "GameStore",
            p2_desc: "React storefront with 81 Playwright E2E tests covering every route and auth flow. Rebuilt lost backend as a dependency-free Node.js mock server. Optimized page assets reducing bundle size from 8.4MB to 1.25MB.",
            p2_meta: "144 Commits · 81 Tests · 8.4MB → 1.25MB",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดผลงานโปรเจกต์ที่ 3 (Property Viewing App) ในหมวด PROJECTS
            p3_title: "Property Viewing App",
            p3_desc: "Flutter mobile booking application. Built end-to-end booking flow across 5 API routes. Guarded 11 endpoints with checkAccessToken middleware, implemented 5 type-safe Model classes with fromJson, and covered with Flutter integration_test.",
            p3_meta: "60/78 Commits · 5 Models · Integration Test",

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนประวัติการทำงาน การศึกษา และกิจกรรม (Experience Section: #experience)
            exp_eyebrow: "Experience",
            exp_heading: "Work, Education & Volunteering",
            exp_job1_title: "Data Analyst Intern",
            exp_job1_date: "16 Apr – 12 Jun 2026",
            exp_job1_company: "Khunying Long Athakravisunthorn Learning Resources Center, PSU",
            exp_job1_b1: "Cleaned and restructured 5 years (2021–2025) of library statistics for 5 universities in Excel and Power Query, created a 5-page Power BI dashboard for the department head, and produced a comprehensive 21-page handover manual for successors.",
            exp_job1_b2: "Key management insight: PSU operated 48 IT systems (peer avg <25) on a 6x smaller IT budget, correlating with the group's highest average downtime.",
            exp_job1_video: "Watch Presentation Clip (YouTube)",

            exp_edu_title: "B.Sc. in ICT (Information & Communication Technology)",
            exp_edu_date: "2023 - Expected 2027",
            exp_edu_school: "Prince of Songkla University, Hat Yai Campus",
            exp_edu_b1: "Faculty of Science. Relevant Coursework: Data Structures & Algorithms (C), Object-Oriented Programming (Java), Software Engineering, ICT Project I, Database Systems, Systems Analysis & Design, Interaction Design, Software Service & Quality Management, IT Governance.",
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

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนแบบฟอร์มติดต่อ (Contact Section: #contact)
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

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนท้ายสุดของหน้าเว็บ (Footer)
            footer_rights: "All rights reserved."
        },
        th: {
            // 📍 ตำแหน่งบนหน้าเว็บ: แถบเมนูด้านบน (Navbar)
            nav_about: "เกี่ยวกับฉัน",
            nav_skills: "ทักษะ",
            nav_services: "บริการ",
            nav_projects: "ผลงาน",
            nav_experience: "ประสบการณ์",
            nav_contact: "ติดต่อผม",

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนหัวเว็บไซต์ (Hero Section: #about)
            hero_status: "ผู้สมัครฝึกสหกิจศึกษา (16 พ.ย. 2569 – 7 มี.ค. 2570)",
            hero_th_name: "สิทธิศักดิ์ หาญธงไชย",
            hero_role: "> Full Stack Developer_",
            hero_desc: "นักศึกษาปี 4 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยสงขลานครินทร์ เจ้าของ 289 Commits ใน 3 โปรเจกต์จริง (เว็บ, เว็บแอป, มือถือ) เชี่ยวชาญ Next.js, React, Node.js และ Flutter มุ่งเน้นสถาปัตยกรรมโค้ดที่สะอาดและการทดสอบอัตโนมัติ",
            hero_location: "📍 หาดใหญ่, สงขลา, ประเทศไทย",
            hero_btn_works: "ดูผลงาน",
            hero_btn_contact: "ติดต่อผม",
            hero_btn_cv: "เรซูเม CV",

            // 📍 ตำแหน่งบนหน้าเว็บ: แถบข้อความและโลโก้วิ่ง (Tech Marquee)
            tech_heading: "เทคโนโลยีและเครื่องมือที่ใช้ในปัจจุบัน",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดตารางประวัติและทักษะ (Bento Grid / Profile)
            bento_eyebrow: "> ข้อมูลส่วนตัว_",
            bento_heading: "BENTO GRID",
            bento_about_title: "> เกี่ยวกับฉัน",
            bento_about_desc: "นักศึกษาปี 4 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ม.สงขลานครินทร์ วิทยาเขตหาดใหญ่ มีประสบการณ์ออกแบบระบบตั้งแต่ต้นน้ำ (Context Diagram, DFD, ER Model, Figma Interactive Prototype ใน 5 โปรเจกต์ทีม) สู่โค้ดที่รันจริง รับผิดชอบระบบหลักพร้อมตัวเลขสถิติ Git และชุดทดสอบอัตโนมัติที่ตรวจสอบย้อนกลับได้จริง",
            bento_tag_clean: "Clean Code",
            bento_tag_problem: "Problem Solving",
            bento_tag_pr: "15 Merged PRs",
            bento_tag_codebases: "3 Codebases",
            bento_tag_verified: "ตรวจจาก Git Log จริง",
            bento_tag_figma: "Figma 5 โปรเจกต์ทีม",
            bento_stat_commits: "Commits ที่เขียนเอง<br/>ใน 3 โปรเจกต์",
            bento_stat_tests: "ชุดทดสอบ E2E<br/>ด้วย Playwright",
            bento_services_title: "> บริการที่เชี่ยวชาญ",
            bento_service_fullstack: "> Full Stack",
            bento_service_fullstack_desc: "Next.js 16, React 19, Node.js, Prisma, PostgreSQL",
            bento_service_mobile: "> Mobile Dev",
            bento_service_mobile_desc: "Flutter, Dart, Express.js, MariaDB, REST API",
            bento_skills_title: "> SKILLS_STACK",

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนจัดแสดงผลงานและปุ่มคัดกรอง (Projects Section & Filters: #works)
            projects_eyebrow: "> ผลงาน_",
            projects_heading: "PROJECTS",
            filter_all: "ทั้งหมด",
            filter_webapp: "Web App",
            filter_mobile: "Mobile App",
            project_view: "ดูรายละเอียด",
            btn_case_study: "อ่านเคสเชิงลึก",
            modal_view_github: "ดูซอร์สโค้ดบน GitHub",
            modal_close: "ปิดหน้าต่าง",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดผลงานโปรเจกต์ที่ 1 (Srichai Property) ในหมวด PROJECTS
            p1_title: "Srichai Property",
            p1_desc: "โปรเจกต์จบการศึกษาแพลตฟอร์มอสังหาริมทรัพย์ ออกแบบ 32 ตารางฐานข้อมูล & 8 กระบวนการ DFD พัฒนาระบบคุมสิทธิ์ API, ระบบนับถอยหลัง SLA, แดชบอร์ด Recharts, และรื้อระบบกันนายหน้ารับนัดชนกัน hasAgentBookingConflict",
            p1_meta: "85 Commits · 15 PRs · 32 ตาราง · 32 APIs",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดผลงานโปรเจกต์ที่ 2 (GameStore) ในหมวด PROJECTS
            p2_title: "GameStore",
            p2_desc: "เว็บร้านขายไอเทมเกมด้วย React พร้อมชุดทดสอบ Playwright 81 เคส ครอบคลุมทุก route และ auth flow รื้อระบบหลังบ้านเป็น Node.js Mock Server และย่อขนาดหน้าเว็บจาก 8.4MB เหลือ 1.25MB ต่อหน้า",
            p2_meta: "144 Commits · 81 เทส · ย่อ 8.4MB → 1.25MB",

            // 📍 ตำแหน่งบนหน้าเว็บ: การ์ดผลงานโปรเจกต์ที่ 3 (Property Viewing App) ในหมวด PROJECTS
            p3_title: "Property Viewing App",
            p3_desc: "แอปจองดูบ้านด้วย Flutter พัฒนาระบบจองครบวงจร 5 เส้นทาง API คุม 11 endpoints ด้วย checkAccessToken middleware ออกแบบ 5 คลาส Model แบบ Type-Safe พร้อม factory fromJson และครอบคลุมด้วย Flutter integration_test",
            p3_meta: "60/78 Commits · 5 Models · Integration Test",

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนประวัติการทำงาน การศึกษา และกิจกรรม (Experience Section: #experience)
            exp_eyebrow: "ประสบการณ์",
            exp_heading: "ประวัติการทำงาน การศึกษา และกิจกรรมจิตอาสา",
            exp_job1_title: "Data Analyst Intern (นักศึกษาฝึกงาน)",
            exp_job1_date: "16 เม.ย. – 12 มิ.ย. 2026",
            exp_job1_company: "สำนักทรัพยากรการเรียนรู้คุณหญิงหลง อรรถกระวีสุนทร ม.อ.",
            exp_job1_b1: "ทำความสะอาดและจัดโครงสร้างข้อมูลสถิติห้องสมุด 5 ปี (2021–2025) ของ 5 มหาวิทยาลัยด้วย Excel และ Power Query พร้อมสร้าง Dashboard บน Power BI 5 หน้าเสนอหัวหน้าฝ่าย และจัดทำคู่มือส่งต่องานฉบับสมบูรณ์ความยาว 21 หน้าสำหรับรุ่นถัดไป",
            exp_job1_b2: "ข้อค้นพบสำคัญที่ฝ่ายบริหารนำไปใช้: ม.อ. มีระบบสารสนเทศมากที่สุด 48 ระบบ แต่งบ IT น้อยกว่าคู่เทียบ 6 เท่า สอดคล้องกับค่า Downtime เฉลี่ยที่สูงที่สุด",
            exp_job1_video: "ชมคลิปนำเสนอผลงานจริง (YouTube)",

            exp_edu_title: "วิทยาศาสตรบัณฑิต (วท.บ.) ICT",
            exp_edu_date: "2566 - คาดว่าจะจบ 2570",
            exp_edu_school: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
            exp_edu_b1: "คณะวิทยาศาสตร์ รายวิชาหลัก: โครงสร้างข้อมูลและอัลกอริทึม (ภาษา C), การเขียนโปรแกรมเชิงวัตถุ OOP (Java), วิศวกรรมซอฟต์แวร์, โครงงาน ICT I, ระบบฐานข้อมูล, การวิเคราะห์และออกแบบระบบสารสนเทศ, การออกแบบเชิงปฏิสัมพันธ์, การบริการซอฟต์แวร์และประกันคุณภาพ, การจัดการ IT องค์กร",
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

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนแบบฟอร์มติดต่อ (Contact Section: #contact)
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

            // 📍 ตำแหน่งบนหน้าเว็บ: ส่วนท้ายสุดของหน้าเว็บ (Footer)
            footer_rights: "สงวนลิขสิทธิ์ทั้งหมด"
        }
    };

    // ==========================================================================
    // 📍 ตำแหน่งบนหน้าเว็บ: ระบบจดจำภาษาที่เลือกใช้งาน
    // ทำหน้าที่: ดึงค่าภาษาที่ผู้ใช้เคยเลือกไว้จาก localStorage หากเปิดเว็บครั้งแรกให้ใช้ 'en' เป็นค่าเริ่มต้น
    // ==========================================================================
    let currentLang = localStorage.getItem('portfolio_lang') || 'en';

    // ==========================================================================
    // 📍 ตำแหน่งบนหน้าเว็บ: ทั่วทั้งหน้าเว็บ และปุ่มสลับภาษาบน Navbar (ทั้ง Desktop และ Mobile)
    // ทำหน้าที่: แปลงข้อความทั้งหมดบนหน้าเว็บตามภาษาที่เลือก (EN / TH) 
    // โดยค้นหาแท็กที่มี data-i18n และ data-i18n-placeholder พร้อมปรับหน้าตาปุ่ม 🌐 บน Navbar
    // ==========================================================================
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('portfolio_lang', lang);
        document.documentElement.lang = lang;

        const dict = translations[lang] || translations.en;

        // 1. แปลงข้อความในทุกแท็กที่มี attribute: data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // หากข้อความมีการขึ้นบรรทัดใหม่ด้วย <br> หรือจัดแต่งสีด้วย <span> ให้แทรกเป็น innerHTML
                if (dict[key].includes('<br') || dict[key].includes('<span')) {
                    el.innerHTML = dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        // 2. แปลงข้อความตัวอย่าง (Placeholder) ในช่องกรอกแบบฟอร์มติดต่อ (Contact Form: #contact)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });

        // 3. ปรับสถานะไฮไลต์สีของปุ่มสลับภาษา (EN / TH) ทั้งบนจอคอมพิวเตอร์และจอมือถือ
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

        // หากหน้าต่างเคสศึกษาเชิงลึก (Case Study Modal) กำลังเปิดอยู่ ให้เรนเดอร์เนื้อหาเป็นภาษาใหม่ตามทันที
        if (activeCaseStudyId && typeof renderCaseStudyModal === 'function') {
            renderCaseStudyModal(activeCaseStudyId, lang);
        }
    }

    // ==========================================================================
    // 📍 ตำแหน่งบนหน้าเว็บ: แถบเมนูด้านบน (Navbar: #lang-toggle และ #lang-toggle-mobile)
    // ทำหน้าที่: ฟังก์ชันสลับภาษา เมื่อผู้ใช้คลิกปุ่ม 🌐 จะสลับระหว่าง EN และ TH ไปมา
    // ==========================================================================
    function toggleLanguage() {
        const nextLang = currentLang === 'en' ? 'th' : 'en';
        applyLanguage(nextLang);
    }

    // ผูก Event Listener ดักจับการคลิกปุ่มสลับภาษาทั้งบน Desktop และ Mobile
    const langToggleBtn = document.getElementById('lang-toggle');
    const langToggleMobileBtn = document.getElementById('lang-toggle-mobile');

    if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);
    if (langToggleMobileBtn) langToggleMobileBtn.addEventListener('click', toggleLanguage);

    // ปรับภาษาเริ่มต้นทันทีเมื่อเปิดหน้าเว็บ
    applyLanguage(currentLang);


    // ==========================================================================
    // 2. ระบบเปิด-ปิดเมนูบนหน้าจอมือถือ (Mobile Hamburger Menu)
    // 📍 ตำแหน่งบนหน้าเว็บ: เมนู Hamburger มุมขวาบนของแถบ Navbar เมื่อดูผ่านสมาร์ทโฟน
    // ทำหน้าที่: สลับการแสดง/ซ่อนแผงเมนู (#mobile-menu) และซ่อนเมนูอัตโนมัติเมื่อกดเลือกเมนูใด ๆ
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // เมื่อผู้ใช้แตะเลือกลิงก์เมนูบนมือถือ ให้ซ่อนแถบเมนูทันทีเพื่อให้หน้าจอเลื่อนไปยัง Section ได้อย่างชัดเจน
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // ==========================================================================
    // 3. แสดงปี ค.ศ. ลิขสิทธิ์ปัจจุบันแบบอัตโนมัติ (Dynamic Footer Year)
    // 📍 ตำแหน่งบนหน้าเว็บ: ข้อความลิขสิทธิ์ส่วนท้ายสุดของหน้าเว็บ (Footer: #current-year)
    // ทำไมต้องทำ: เพื่อให้ปีลิขสิทธิ์อัปเดตเป็นปัจจุบันเสมอ ไม่ต้องคอยแก้โค้ดทุกปี
    // ==========================================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // ==========================================================================
    // 4. สุ่มสร้างจุดอนุภาคสีลอยเคลื่อนไหว (Animated Dot Background Generation)
    // 📍 ตำแหน่งบนหน้าเว็บ: เลเยอร์พื้นหลังด้านหลังสุดของเว็บไซต์ (#dot-background)
    // ทำไมต้องเขียนแบบนี้: 
    // 1. สุ่มขนาด ความเร็ว ทิศทาง และ delay เพื่อให้อนุภาคขยับไม่พร้อมกันเป็นจังหวะเดียว ดูเป็นธรรมชาติ
    // 2. ปรับลดจำนวนจุดบนจอมือถือเหลือ 40 จุด (จากปกติ 80 จุดบนจอคอม) เพื่อความลื่นไหลและประหยัดพลังงาน
    // ==========================================================================
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

    // ==========================================================================
    // 5. คลังข้อมูลเคสศึกษาเชิงลึกของแต่ละโปรเจกต์ (Technical Case Study Modal System)
    // 📍 ตำแหน่งบนหน้าเว็บ: แสดงผลในหน้าต่างป๊อปอัป (#case-study-modal) เมื่อคลิกปุ่ม "Case Study"
    // โครงสร้าง: เก็บข้อมูล 2 ภาษา (en / th) พร้อมป้ายเทคโนโลยี, ภาพตัวอย่าง และข้อค้นพบทางเทคนิคเชิงลึก
    // ==========================================================================
    const caseStudyData = {
        // ==========================================================================
        // 📍 ตำแหน่งบนหน้าเว็บ: หน้าต่างป๊อปอัป (Case Study Modal) สำหรับโปรเจกต์ที่ 1: Srichai Property
        // ข้อมูลเชิงลึก: สถาปัตยกรรม Next.js 16, Prisma 7, ระบบจองรอบดูบ้าน และการปิดช่องโหว่ความปลอดภัย
        // ==========================================================================
        srichai: {
            en: {
                title: "Srichai Property — Real Estate Trading Platform",
                badge: "Senior Capstone Project",
                meta: "85 Commits · 15 PRs · 32 Tables · 32 APIs · 35 Pages · 3 User Roles",
                repo: "https://github.com/PHmeen/SrichaiProperty",
                tags: ["Next.js 16", "TypeScript", "Prisma ORM 7", "PostgreSQL", "NextAuth v4", "Tailwind CSS", "Pusher", "Recharts"],
                sections: [
                    {
                        heading: "Architectural Decision: Property Viewing Slots",
                        points: [
                            "Designed the <code>property_viewing_slots</code> table in Prisma schema.",
                            "Proposed decoupling availability from 'Agent' and binding it directly to 'Each Property' — an architectural pivot adopted by the entire team for the remainder of the project.",
                            "Engineered full booking lifecycle: Booking &rarr; Slot Lock &rarr; Agent Confirm/Reject/Complete &rarr; Client Reschedule/Cancel &rarr; Slot Restitution, broadcasting state changes via Pusher."
                        ]
                    },
                    {
                        heading: "API-Level Business Rules & Concurrency Control",
                        points: [
                            "Enforced business invariants on backend API routes rather than relying on UI button states.",
                            "Strict limit: 1 pending booking per client per property.",
                            "Pre-commit slot verification to eliminate race conditions.",
                            "Duplicate cancellation prevention and cross-property broker conflict checks."
                        ]
                    },
                    {
                        heading: "Security Hardening (3 Critical Vulnerabilities Fixed)",
                        points: [
                            "Enforced listing ownership resolution directly from verified session tokens, rejecting arbitrary user IDs in request bodies.",
                            "Restricted listing approval and status toggling exclusively to verified Admin role.",
                            "Implemented strict authorization check returning HTTP 403 Forbidden whenever unauthorized users attempt to cancel appointments belonging to other clients."
                        ]
                    },
                    {
                        heading: "Admin Analytics & Dedicated Microservices",
                        points: [
                            "Authored <code>/api/admin/analytics</code> executing 8 Prisma queries in parallel via <code>Promise.all</code>, aggregating data across daily, monthly, and yearly intervals for Recharts rendering.",
                            "Refactored <code>hasAgentBookingConflict</code> to evaluate conflicts against 'confirmed active appointments' rather than merely 'opened schedule windows'.",
                            "Built 3 core services: <code>slaService</code> (dynamic countdown timer with urgency color-coding and sorting), <code>viewingSlotService</code> (slot collision engine), and <code>slotAvailabilityService</code> (slot scarcity alerts with 24-hour deduplication)."
                        ]
                    },
                    {
                        heading: "Structured Rejection & Cancellation Reasons",
                        points: [
                            "Engineered structured cancellation reason modal capturing client feedback into <code>cancel_reason</code> while offering a streamlined 1-click rebooking button.",
                            "Expanded listing rejection reasons from 5 to 9 standardized criteria defined in <code>REJECT_REASONS</code> constants."
                        ]
                    }
                ]
            },
            th: {
                title: "Srichai Property — เว็บแอปซื้อขายอสังหาริมทรัพย์",
                badge: "โปรเจกต์จบการศึกษา (Senior Capstone)",
                meta: "85 Commits ของผม · 15 PRs · 32 ตาราง · 32 APIs · 35 หน้าเว็บ · 3 บทบาทผู้ใช้",
                repo: "https://github.com/PHmeen/SrichaiProperty",
                tags: ["Next.js 16", "TypeScript", "Prisma ORM 7", "PostgreSQL", "NextAuth v4", "Tailwind CSS", "Pusher", "Recharts"],
                sections: [
                    {
                        heading: "การออกแบบสถาปัตยกรรม: ตารางรอบวันว่างเข้าชม (property_viewing_slots)",
                        points: [
                            "ออกแบบตาราง <code>property_viewing_slots</code> ใน <code>prisma/schema.prisma</code>",
                            "เป็นผู้เสนอเลิกใช้ระบบวันว่างเดิมที่ผูกกับ 'นายหน้า' แล้วเปลี่ยนมาผูกกับ 'บ้านแต่ละหลัง' แทน — เป็นการตัดสินใจเชิงสถาปัตยกรรมที่ทีมใช้ต่อจนจบระบบ",
                            "พัฒนาวงจรการจองครบวงจร: จอง &rarr; ล็อกรอบเวลา &rarr; นายหน้ายืนยัน/ปฏิเสธ/ปิดงาน &rarr; ลูกค้าแก้วันหรือยกเลิก &rarr; คืนรอบเวลา โดยทุกการเปลี่ยนสถานะเขียนแจ้งเตือนแบบเรียลไทม์"
                        ]
                    },
                    {
                        heading: "คุมกฎธุรกิจที่ระดับ API (Business Rules at API Layer)",
                        points: [
                            "บังคับกฎธุรกิจไว้ที่ชั้น API ไม่ใช่แค่การซ่อนปุ่มบนหน้าเว็บ",
                            "กำหนดให้ 1 ลูกค้าต่อ 1 บ้านสามารถจองค้างได้เพียง 1 ครั้งเท่านั้น",
                            "ตรวจสอบว่ารอบเวลานั้นว่างจริงก่อนบันทึก (กันการจองชนกัน)",
                            "ป้องกันการกดยกเลิกซ้ำ และตรวจการชนกันของวันว่างข้ามบ้านของนายหน้าคนเดียวกัน"
                        ]
                    },
                    {
                        heading: "ปิดช่องโหว่ความปลอดภัย 3 จุดสำคัญ (Security Vulnerability Fixes)",
                        points: [
                            "ยึดตัวตนเจ้าของประกาศจาก Session โดยตรง แทนการรับ user ID จาก Request Body เพื่อป้องกันการสวมสิทธิ์",
                            "จำกัดให้เฉพาะบทบาทผู้ดูแลระบบ (Admin) เท่านั้นที่สามารถเปลี่ยนสถานะประกาศได้",
                            "ส่งคืน HTTP 403 Forbidden ทันทีเมื่อมีผู้ใช้คนอื่นพยายามยกเลิกนัดหมายที่ไม่ใช่ของตนเอง"
                        ]
                    },
                    {
                        heading: "ระบบสถิติผู้ดูแลระบบ (Admin Analytics) และ Microservices",
                        points: [
                            "เขียน <code>/api/admin/analytics</code> เองทั้งไฟล์ โดยยิง Prisma 8 queries ขนานกันด้วย <code>Promise.all</code> แบ่งช่วงข้อมูลเป็นราย วัน/เดือน/ปี แล้วแสดงผลด้วยกราฟ Recharts",
                            "รื้อระบบกันนายหน้ารับนัดชนกันใหม่เป็น <code>hasAgentBookingConflict</code> ให้อ่านจาก 'นัดหมายจริง' แทน 'วันว่างที่เปิดไว้'",
                            "เขียนและเป็นเจ้าของ Service สำคัญ 3 ตัว: <code>slaService</code> (นับถอยหลังตรวจประกาศตาม SLA จริงพร้อมป้ายสีตามความด่วน), <code>viewingSlotService</code> (กฎการชนกันของรอบเวลา), และ <code>slotAvailabilityService</code> (เตือนนายหน้าเมื่อบ้านหลังไหนรอบว่างใกล้หมด โดยกันเตือนซ้ำภายใน 24 ชม.)"
                        ]
                    },
                    {
                        heading: "ระบบเหตุผลการปฏิเสธและการยกเลิกนัดหมาย",
                        points: [
                            "พัฒนาโมดัลเลือกเหตุผลแทน <code>confirm()</code> เดิม บันทึกลง <code>cancel_reason</code> พร้อมแจ้งลูกค้าและมีปุ่มให้กดจองรอบใหม่ได้ทันที",
                            "ขยายเหตุผลตีกลับประกาศจาก 5 เป็น 9 ข้อ โดยแยกออกมาเป็นค่าคงที่ <code>REJECT_REASONS</code>"
                        ]
                    }
                ]
            }
        },
        // ==========================================================================
        // 📍 ตำแหน่งบนหน้าเว็บ: หน้าต่างป๊อปอัป (Case Study Modal) สำหรับโปรเจกต์ที่ 2: GameStore
        // ข้อมูลเชิงลึก: การเขียนชุดทดสอบ Playwright E2E 81 เคส, การกู้คืนระบบด้วย Node.js Mock Server และการลดขนาดหน้าเว็บลง 85%
        // ==========================================================================
        gamestore: {
            en: {
                title: "GameStore — Gaming Storefront with Automated Testing Suite",
                badge: "Solo Rebuild Project",
                meta: "144 Commits · 81 Playwright E2E Tests · 14 Web Pages · 8.4MB → 1.25MB Asset Size",
                repo: "https://github.com/Most-05/game-store",
                tags: ["React 19", "Playwright E2E", "React Router 7", "React Bootstrap", "Node.js Mock Server"],
                sections: [
                    {
                        heading: "Zero-Dependency Node.js Mock Server Architecture",
                        points: [
                            "Original backend was lost with only a SQL dump remaining. Architected a clean, dependency-free Node.js mock server from scratch.",
                            "Integrated the mock server seamlessly into the development pipeline via <code>src/setupProxy.js</code>, allowing the entire full-stack application to boot with a single command.",
                            "Structured modular test suites across 8 spec suites: <code>e2e/01-routes ... 08-rov.spec.js</code>."
                        ]
                    },
                    {
                        heading: "Critical Production Bugs Uncovered by Playwright (Undetectable by Eye)",
                        points: [
                            "<strong>Missing CartProvider:</strong> Caught an unmounted context provider that broke the shopping cart across the entire application.",
                            "<strong>Checkout Payment Bypass:</strong> Detected that checkout falsely showed success without deducting the user's actual wallet balance.",
                            "<strong>Broken Dynamic Routes:</strong> Identified subtle URL typos that prevented specific product categories from rendering.",
                            "<strong>Linux File Case-Sensitivity Trap:</strong> Uncovered mismatched casing between local asset file paths and import statements. While Windows silently tolerated the casing discrepancy, deployment to a standard Linux server would have corrupted 19 out of 26 item images!"
                        ]
                    },
                    {
                        heading: "Asset & Bundle Size Optimization (85% Reduction)",
                        points: [
                            "Reduced total page payload from 8.4 MB down to 1.25 MB.",
                            "Migrated 19 hotlinked external images into optimized, compressed local project assets to prevent broken links and reduce network latency.",
                            "Adhered to atomic Git commit standards with descriptive messages detailing 'why' changes occurred rather than just 'what'."
                        ]
                    }
                ]
            },
            th: {
                title: "GameStore — เว็บร้านขายไอเทมเกมพร้อมชุดทดสอบอัตโนมัติ",
                badge: "โปรเจกต์เดี่ยว รื้อทำใหม่ทั้งระบบ (Solo Rebuild)",
                meta: "144 Commits · 81 เทส E2E (Playwright) · 14 หน้าเว็บ · ย่อขนาด 8.4MB → 1.25MB",
                repo: "https://github.com/Most-05/game-store",
                tags: ["React 19", "Playwright E2E", "React Router 7", "React Bootstrap", "Node.js Mock Server"],
                sections: [
                    {
                        heading: "สถาปัตยกรรมกู้ชีพ Backend ด้วย Zero-Dependency Node.js Mock Server",
                        points: [
                            "Backend ตัวเดิมหายไปจากเครื่องเหลือเพียงไฟล์ SQL จึงเขียน Mock Server ขึ้นมาใหม่ด้วย Node.js ล้วนโดยไม่พึ่งพา third-party library",
                            "เชื่อมต่อเข้ากับ Dev Server ผ่าน <code>src/setupProxy.js</code> ทำให้ระบบทั้งหมดสามารถรันขึ้นมาใช้งานได้ด้วยคำสั่งเดียว",
                            "จัดโครงสร้างชุดทดสอบ 8 ไฟล์สเปก (<code>e2e/01-routes ... 08-rov.spec.js</code>) ครอบคลุมทุก route, ทุกลิงก์ภายใน, ระบบสมัคร/ล็อกอิน, ยอดเงินในกระเป๋า และร้านค้าทั้งสามร้าน"
                        ]
                    },
                    {
                        heading: "บั๊กจริงระดับ Production ที่ Playwright ตรวจพบ (การตรวจด้วยตาไม่มีวันเจอ)",
                        points: [
                            "<strong>ขาด CartProvider:</strong> ตรวจพบคอนเท็กซ์ที่ไม่ได้ครอบไว้ ทำให้ระบบตะกร้าพังทั้งเว็บเมื่อเกิดข้อผิดพลาด",
                            "<strong>หน้าชำระเงินไม่ตัดเงินจริง:</strong> หน้าบ้านขึ้นว่าชำระเงินสำเร็จ แต่เบื้องหลังไม่ได้ตัดยอดเงินใน Wallet จริง",
                            "<strong>Route สะกดผิด:</strong> จับจุดพิมพ์ตกในเส้นทาง URL ที่ทำให้บางหน้าเปิดไม่ติด",
                            "<strong>บั๊กตัวพิมพ์เล็ก-ใหญ่บน Linux (Case Sensitivity):</strong> ตรวจพบชื่อไฟล์รูปภาพตัวพิมพ์ไม่ตรงกับโค้ดเรียกใช้ ซึ่งบนเครื่อง Windows จะเปิดได้ปกติ แต่ทันทีที่ Deploy ขึ้นเซิร์ฟเวอร์ Linux รูปภาพจะพังทันที 19 จาก 26 รูป!"
                        ]
                    },
                    {
                        heading: "การเพิ่มประสิทธิภาพหน้าเว็บและขนาดไฟล์ (ลดลง 85%)",
                        points: [
                            "ลดขนาดข้อมูลต่อหน้าจาก 8.4 MB เหลือเพียง 1.25 MB",
                            "ย้ายรูปภาพ 19 ภาพที่เคย Hotlink จากภายนอกเข้ามาเก็บไว้ในโปรเจกต์ พร้อมทำการบีบอัดขนาดไฟล์ ป้องกันรูปตายและลดเวลาโหลด",
                            "คอมมิตแบบแยกเรื่องละก้อน (Atomic Commits) พร้อมระบุเหตุผล 'ทำไม' ในข้อความคอมมิต"
                        ]
                    }
                ]
            }
        },
        // ==========================================================================
        // 📍 ตำแหน่งบนหน้าเว็บ: หน้าต่างป๊อปอัป (Case Study Modal) สำหรับโปรเจกต์ที่ 3: Property Viewing App
        // ข้อมูลเชิงลึก: สถาปัตยกรรมแอปมือถือ Flutter, Dart Model แบบ Type-Safe, แกลเลอรีภาพถ่ายหน้าจอจริง 4 สเต็ป และ Integration Test
        // ==========================================================================
        propertyapp: {
            en: {
                title: "Property Viewing App — Mobile Booking Application",
                badge: "Academic Capstone (Course 308-493)",
                meta: "60 / 78 Commits (77% contribution) · 5 Core Functions · 5 Model Classes · Flutter integration_test",
                repo: "https://github.com/Most-05",
                tags: ["Flutter", "Dart", "Express.js", "MariaDB", "JWT", "Google Sign-In", "integration_test"],
                screenshotsTitle: "Mobile Application Workflow & Real UI",
                screenshots: [
                    {
                        src: "assets/images/flutter-1.png",
                        title: "1. Authentication",
                        desc: "Secure Login & Registration via Email/Password & Google Sign-In"
                    },
                    {
                        src: "assets/images/flutter-2.png",
                        title: "2. Property Discovery",
                        desc: "Property categories, featured listings, and province-based browsing"
                    },
                    {
                        src: "assets/images/flutter-3.png",
                        title: "3. Appointment Booking",
                        desc: "Interactive 3-step slot scheduling with calendar & appointment notes"
                    },
                    {
                        src: "assets/images/flutter-4.png",
                        title: "4. Booking Lifecycle",
                        desc: "Appointment status tracking, reschedule requests, and cancellations"
                    }
                ],
                sections: [
                    {
                        heading: "End-to-End Mobile Booking Lifecycle",
                        points: [
                            "Developed complete appointment scheduling pipeline: Browse viewings, create new bookings, modify dates, cancel slots, and compute booking counts per property.",
                            "Seamless coordination between client-side Flutter application and backend Express.js REST API."
                        ]
                    },
                    {
                        heading: "API Security & Access Control Guardrails",
                        points: [
                            "Guarded endpoints with custom <code>checkAccessToken</code> middleware.",
                            "Coupled token verification with ownership authorization checks to guarantee properties can only be edited or deleted by their verified creator."
                        ]
                    },
                    {
                        heading: "Type-Safe Architecture Migration",
                        points: [
                            "Refactored entire data layer away from raw untyped Maps (<code>Map<String, dynamic></code>) to strongly typed Dart Model classes.",
                            "Implemented <code>factory Model.fromJson(...)</code> constructors across all models, enabling compile-time validation of API contract mismatches and eliminating runtime null errors."
                        ]
                    },
                    {
                        heading: "Province Master Data & SQL Aggregations",
                        points: [
                            "Engineered province master data endpoints feeding dynamic dropdowns in property creation forms.",
                            "Implemented analytical backend queries using SQL <code>GROUP BY</code> to summarize and display property distribution per province."
                        ]
                    },
                    {
                        heading: "Automated Integration Testing & Live Demonstration Guide",
                        points: [
                            "Authored Flutter <code>integration_test</code> suites verifying end-to-end booking user flows on emulator/device.",
                            "Authored comprehensive step-by-step presentation manual ensuring flawless live demonstration during coursework evaluation."
                        ]
                    }
                ]
            },
            th: {
                title: "ระบบการจองดูบ้าน — แอปพลิเคชันมือถือด้วย Flutter",
                badge: "ผลงานรายวิชา 308-493 ชุดวิชาชีพเฉพาะทาง (6 หน่วยกิต)",
                meta: "60 / 78 Commits เป็นของผม (77%) · 5 ฟังก์ชันหลัก · 5 คลาส Model · Flutter integration_test",
                repo: "https://github.com/Most-05",
                tags: ["Flutter", "Dart", "Express.js", "MariaDB", "JWT", "Google Sign-In", "integration_test"],
                screenshotsTitle: "ภาพตัวอย่างขั้นตอนการทำงานบนแอปพลิเคชันจริง (Mobile Workflow)",
                screenshots: [
                    {
                        src: "assets/images/flutter-1.png",
                        title: "1. ระบบยืนยันตัวตน (Authentication)",
                        desc: "เข้าสู่ระบบและสมัครสมาชิกด้วย Email/Password และ Google Sign-In"
                    },
                    {
                        src: "assets/images/flutter-2.png",
                        title: "2. ค้นหาและดูรายการบ้าน (Discovery)",
                        desc: "หมวดหมู่อสังหาริมทรัพย์, รายการบ้านแนะนำ และค้นหาตามรายจังหวัด"
                    },
                    {
                        src: "assets/images/flutter-3.png",
                        title: "3. ระบบจองนัดหมาย (Slot Booking)",
                        desc: "ขั้นตอนการจอง 3 ระดับ เลือกวันที่, ช่วงเวลา และระบุหมายเหตุการนัด"
                    },
                    {
                        src: "assets/images/flutter-4.png",
                        title: "4. วงจรการนัดหมาย (Booking Lifecycle)",
                        desc: "ติดตามสถานะการจอง, ขอยกเลิกนัด และขอเปลี่ยนวันเวลานัดหมาย"
                    }
                ],
                sections: [
                    {
                        heading: "ระบบการจองดูบ้านครบวงจรบนมือถือ (Full Mobile Booking Lifecycle)",
                        points: [
                            "พัฒนาระบบจองครบวงจร: แสดงรายการนัด, เพิ่มการจองใหม่, แก้ไขวันเวลา, ขอยกเลิก และนับจำนวนการจองของบ้านแต่ละหลัง ทั้งฝั่งแอปพลิเคชัน Flutter และฝั่ง Express.js API",
                            "เชื่อมโยงการทำงานระหว่างหน้าบ้านและหลังบ้านอย่างลื่นไหล"
                        ]
                    },
                    {
                        heading: "ความปลอดภัยของ API และการตรวจสอบสิทธิ์",
                        points: [
                            "ป้องกัน Endpoint ของบ้านด้วย Middleware <code>checkAccessToken</code>",
                            "ทำงานร่วมกับระบบตรวจสอบสิทธิ์เจ้าของประกาศ เพื่อให้มั่นใจว่ามีเฉพาะเจ้าของตัวจริงเท่านั้นที่สามารถแก้ไขหรือลบประกาศได้"
                        ]
                    },
                    {
                        heading: "ยกระดับสู่สถาปัตยกรรม Type-Safe ด้วย Dart Model",
                        points: [
                            "เปลี่ยนจากการรับส่งข้อมูลเป็น Map ดิบทั้งแอป มาใช้คลาส Model ที่มี <code>factory Model.fromJson(...)</code> ครบถ้วน",
                            "ช่วยให้ตรวจจับข้อผิดพลาดของชื่อฟิลด์ได้ตั้งแต่ขั้นตอน Compile หมดปัญหา Null Pointer Runtime Exception"
                        ]
                    },
                    {
                        heading: "ระบบข้อมูลหลักรายจังหวัดและการคำนวณสถิติ (GROUP BY)",
                        points: [
                            "สร้าง Endpoint รายชื่อจังหวัดสำหรับแสดงผล Dropdown ในฟอร์มลงประกาศบ้าน",
                            "เขียน Query สรุปจำนวนอสังหาริมทรัพย์แบ่งตามรายจังหวัดด้วยคำสั่ง SQL <code>GROUP BY</code>"
                        ]
                    },
                    {
                        heading: "ชุดทดสอบอัตโนมัติ (Integration Test) และคู่มือนำเสนอ",
                        points: [
                            "เขียน Flutter <code>integration_test</code> จำลองและควบคุม Flow การจองดูบ้านทั้งเส้นทาง",
                            "จัดทำคู่มือเดโมทีละขั้นตอน (Step-by-step Demo Guide) สำหรับการนำเสนอต่อหน้าอาจารย์ผู้ตรวจชิ้นงาน"
                        ]
                    }
                ]
            }
        }
    };

    // ==========================================================================
    // 6. ฟังก์ชันจับคู่ชื่อเทคโนโลยีกับโลโก้เวกเตอร์สไตล์ 3D Capsule (Style #1: 3D Tactile Capsule)
    // 📍 ตำแหน่งบนหน้าเว็บ: ป้าย Tech Stack ใต้ชื่อโปรเจกต์ในหน้าต่างป๊อปอัป (Case Study Modal: #modal-project-body)
    // ทำหน้าที่: ตรวจสอบคำสำคัญของชื่อเทคโนโลยี (เช่น next.js, flutter, prisma, playwright)
    // แล้วคืนค่าเป็นแท็ก <img> เวกเตอร์ SVG คมชัด หรือ SVG ไอคอนเฉพาะทาง เพื่อนำไปแสดงคู่กับชื่อในสไตล์ 3D นูนนุ่ม
    // ==========================================================================
    function getTechTagIcon(tag) {
        const t = tag.toLowerCase().trim();
        if (t.includes('next.js')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" class="dark:invert" loading="lazy">';
        }
        if (t.includes('react router')) {
            return '<img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/reactrouter.svg" alt="React Router" class="dark:invert" loading="lazy">';
        }
        if (t.includes('bootstrap')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" loading="lazy">';
        }
        if (t.includes('react')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" loading="lazy">';
        }
        if (t.includes('typescript')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" loading="lazy">';
        }
        if (t.includes('prisma')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" class="dark:invert" loading="lazy">';
        }
        if (t.includes('postgres')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" loading="lazy">';
        }
        if (t.includes('tailwind')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" loading="lazy">';
        }
        if (t.includes('flutter')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" loading="lazy">';
        }
        if (t.includes('dart')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" loading="lazy">';
        }
        if (t.includes('express')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" class="dark:invert" loading="lazy">';
        }
        if (t.includes('mariadb')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" alt="MariaDB" loading="lazy">';
        }
        if (t.includes('playwright')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" alt="Playwright" loading="lazy">';
        }
        if (t.includes('node')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" loading="lazy">';
        }
        if (t.includes('pusher')) {
            return '<img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/pusher.svg" alt="Pusher" class="dark:invert" loading="lazy">';
        }
        if (t.includes('google')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" loading="lazy">';
        }
        if (t.includes('jwt')) {
            return '<img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/jsonwebtokens.svg" alt="JWT" class="dark:invert" loading="lazy">';
        }
        if (t.includes('nextauth') || t.includes('auth')) {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-500"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>';
        }
        if (t.includes('recharts') || t.includes('chart')) {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-teal-500"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>';
        }
        if (t.includes('test')) {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.942A4.5 4.5 0 0115.91 16.5H8.09a4.5 4.5 0 01-2.32-.658L4.2 15.3M19.8 15.3A2.25 2.25 0 0121 17.25v.75a3 3 0 01-3 3H6a3 3 0 01-3-3v-.75a2.25 2.25 0 011.2-1.95" /></svg>';
        }
        if (t.includes('git')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" loading="lazy">';
        }
        if (t.includes('figma')) {
            return '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" loading="lazy">';
        }
        return '<span class="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>';
    }

    // ==========================================================================
    // 7. ฟังก์ชันประกอบโครงสร้างเนื้อหาในหน้าต่างเคสศึกษา (Render Case Study Modal)
    // 📍 ตำแหน่งบนหน้าเว็บ: หน้าต่างป๊อปอัปรายละเอียดเชิงลึก (#case-study-modal)
    // ทำหน้าที่: ดึงข้อมูลตาม ID โปรเจกต์และภาษาปัจจุบัน (EN / TH) มาประกอบเป็น HTML ได้แก่:
    // 1. ส่วนหัว: ป้ายประเภทงาน, ตัวเลขสถิติ Git, ชื่อโปรเจกต์, และปุ่มลิงก์ GitHub (ซ่อนในงานที่ไม่มี repo สาธารณะ)
    // 2. ป้ายเทคโนโลยี 3D Tactile Capsule: แสดงรายการ Tech Stack พร้อมโลโก้เวกเตอร์
    // 3. แกลเลอรีขั้นตอนการทำงานบนมือถือ (Screenshots Gallery): แสดงเฉพาะโปรเจกต์ที่มีภาพ เช่น Flutter 4 หน้าจอ
    // 4. หัวข้อเจาะลึกสถาปัตยกรรมระบบ: แสดงการตัดสินใจทางเทคนิค และบั๊กจริงระดับ Production
    // ==========================================================================
    function renderCaseStudyModal(projectId, lang) {
        const project = caseStudyData[projectId];
        if (!project) return;

        const data = project[lang] || project.en;
        if (!data) return;

        const badgeEl = document.getElementById('modal-project-badge');
        const metaEl = document.getElementById('modal-project-meta');
        const titleEl = document.getElementById('modal-project-title');
        const repoLink = document.getElementById('modal-project-repo');
        const bodyEl = document.getElementById('modal-project-body');

        if (badgeEl) badgeEl.textContent = data.badge;
        if (metaEl) metaEl.textContent = data.meta;
        if (titleEl) titleEl.textContent = data.title;

        if (repoLink) {
            if (data.repo && projectId !== 'propertyapp') {
                repoLink.href = data.repo;
                repoLink.classList.remove('hidden');
            } else {
                repoLink.classList.add('hidden');
            }
        }

        if (bodyEl) {
            let html = '';

            // ป้ายเทคโนโลยีแบบ 3D Tactile Capsule (Style #1)
            if (data.tags && data.tags.length > 0) {
                html += '<div class="flex flex-wrap gap-2 pb-4 border-b border-gray-100 dark:border-white/5">';
                data.tags.forEach(tag => {
                    const iconHtml = getTechTagIcon(tag);
                    html += `<span class="tag-tactile-3d">${iconHtml}<span>${tag}</span></span>`;
                });
                html += '</div>';
            }

            // แกลเลอรีภาพถ่ายหน้าจอแสดงขั้นตอนการทำงานบนมือถือจริง (App Workflow Gallery)
            if (data.screenshots && data.screenshots.length > 0) {
                html += `
                    <div class="bg-gradient-to-b from-gray-50 to-white dark:from-white/[0.03] dark:to-white/[0.01] border border-gray-100 dark:border-white/5 rounded-2xl p-5">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-3.5 text-base flex items-center gap-2">
                            <svg class="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>
                            ${data.screenshotsTitle || "Application Workflow"}
                        </h4>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            ${data.screenshots.map(s => `
                                <a href="${s.src}" target="_blank" rel="noopener noreferrer" class="group block rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-gray-900/5 dark:bg-black/30 hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all duration-200">
                                    <div class="aspect-[9/16] overflow-hidden bg-slate-900 relative">
                                        <img src="${s.src}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
                                        <div class="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors pointer-events-none"></div>
                                    </div>
                                    <div class="p-2.5">
                                        <p class="font-semibold text-xs text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">${s.title}</p>
                                        <p class="text-[11px] text-gray-500 dark:text-zinc-400 leading-snug mt-0.5 line-clamp-2">${s.desc}</p>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                        <p class="text-[11px] text-gray-400 dark:text-zinc-500 text-center mt-3">* คลิกที่รูปภาพเพื่อเปิดดูขนาดเต็ม (Click to view full size)</p>
                    </div>
                `;
            }

            // หัวข้อเจาะลึกสถาปัตยกรรมระบบ (Architecture Decisions & Production Insights)
            data.sections.forEach(sec => {
                html += `
                    <div class="bg-gray-50/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-2xl p-5">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-3 text-base flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                            ${sec.heading}
                        </h4>
                        <ul class="space-y-2 text-gray-600 dark:text-zinc-300">
                            ${sec.points.map(pt => `
                                <li class="flex items-start gap-2.5 leading-relaxed">
                                    <span class="text-blue-500 dark:text-blue-400 font-bold shrink-0 mt-0.5">•</span>
                                    <span>${pt}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            });

            bodyEl.innerHTML = html;
        }
    }

    // ==========================================================================
    // 8. ฟังก์ชันควบคุมการเปิดหน้าต่างเคสศึกษา (Open Case Study Modal)
    // 📍 ตำแหน่งบนหน้าเว็บ: ทำงานเมื่อคลิกปุ่ม "Case Study" บนการ์ดผลงานโปรเจกต์ใด ๆ
    // ทำไมต้องเขียนแบบนี้:
    // 1. เก็บ ID ของโปรเจกต์ลง activeCaseStudyId สำหรับสลับภาษา
    // 2. เติมคลาส active ให้ #case-study-modal เพื่อเริ่มเอฟเฟกต์ Fade-in และขยายขนาด
    // 3. กำหนด document.body.style.overflow = 'hidden' เพื่อล็อกไม่ให้หน้าเว็บหลักด้านหลังเลื่อนขณะอ่านป๊อปอัป
    // ==========================================================================
    function openCaseStudyModal(projectId) {
        activeCaseStudyId = projectId;
        renderCaseStudyModal(projectId, currentLang);
        const modal = document.getElementById('case-study-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // ==========================================================================
    // 9. ฟังก์ชันควบคุมการปิดหน้าต่างเคสศึกษา (Close Case Study Modal)
    // 📍 ตำแหน่งบนหน้าเว็บ: ทำงานเมื่อกดปุ่มปิด (X), ปุ่มปิดล่างสุด, คลิกพื้นหลังสีดำ หรือกดปุ่ม ESC
    // ทำไมต้องเขียนแบบนี้:
    // 1. เคลียร์ activeCaseStudyId เป็น null
    // 2. ลบคลาส active ออก เพื่อเริ่มเอฟเฟกต์ Fade-out
    // 3. คืนค่า document.body.style.overflow = '' เพื่อให้หน้าเว็บหลักกลับมาเลื่อนขึ้นลงได้ตามปกติ
    // ==========================================================================
    function closeCaseStudyModal() {
        activeCaseStudyId = null;
        const modal = document.getElementById('case-study-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 📍 ตำแหน่งบนหน้าเว็บ: ปุ่ม "Case Study" บนการ์ดผลงานทุกใบในหมวด PROJECTS
    // ทำหน้าที่: ดักจับการคลิกเพื่อดึงค่า data-project ('srichai', 'gamestore', 'propertyapp') แล้วเปิด Modal
    document.querySelectorAll('.open-case-study-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            if (projectId) openCaseStudyModal(projectId);
        });
    });

    // 📍 ตำแหน่งบนหน้าเว็บ: ปุ่มปิดหน้าต่างเคสศึกษา ทั้งปุ่มกากบาทมุมขวาบน (#close-case-study-btn) และปุ่มปิดด้านล่าง (#close-case-study-bottom-btn)
    const closeBtn = document.getElementById('close-case-study-btn');
    const closeBottomBtn = document.getElementById('close-case-study-bottom-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeCaseStudyModal);
    if (closeBottomBtn) closeBottomBtn.addEventListener('click', closeCaseStudyModal);

    // 📍 ตำแหน่งบนหน้าเว็บ: พื้นหลังสีดำโปร่งแสงด้านนอกกล่องป๊อปอัป (#case-study-modal)
    // ทำหน้าที่: อำนวยความสะดวกให้ผู้ใช้สามารถคลิกพื้นที่ว่างนอกกล่องเพื่อปิดป๊อปอัปได้ทันที
    const modalEl = document.getElementById('case-study-modal');
    if (modalEl) {
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) {
                closeCaseStudyModal();
            }
        });
    }

    // 📍 ตำแหน่งบนหน้าเว็บ: การกดแป้นพิมพ์คีย์บอร์ดทั่วทั้งหน้าจอ (Keyboard Event: Escape)
    // ทำหน้าที่: ตรวจจับหากผู้ใช้กดปุ่ม 'Escape' (ESC) ขณะที่หน้าต่างเคสศึกษากำลังเปิดอยู่ ให้ปิดป๊อปอัปทันที
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeCaseStudyId) {
            closeCaseStudyModal();
        }
    });
});
