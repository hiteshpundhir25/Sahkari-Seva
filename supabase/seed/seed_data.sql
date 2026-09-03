-- ==============================================================================
-- SAHAKARI SEVA — REALISTIC SEED DATA (COOPERATIVES, WORKERS, CUSTOMERS, BOOKINGS)
-- ==============================================================================

-- 1. SEED COOPERATIVES
INSERT INTO cooperatives (id, name, description, registration_number, phone, email, address, city, state, pincode, logo_url, welfare_pool_balance)
VALUES 
('c0000000-0000-0000-0000-000000000001', 'Delhi Shramik Sahakari Sangh', 'Registered Multi-trade Labour Cooperative Society empowering Delhi NCR skilled professionals with social security and fair wages.', 'DL/COOP/2021/8842', '+91 11 2334 5678', 'contact@delhicoop.in', 'Plot 14, Institutional Area, Rouse Avenue', 'New Delhi', 'Delhi', '110001', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150', 245000.00),
('c0000000-0000-0000-0000-000000000002', 'Jaipur Karigar Sahakari Samiti', 'Artisan & Technical Trades Cooperative Federation registered under Rajasthan Cooperative Societies Act.', 'RJ/COOP/2019/3312', '+91 141 2780 112', 'info@jaipurkarigar.coop', 'B-12, Sahakar Bhawan Road, Jyoti Nagar', 'Jaipur', 'Rajasthan', '302005', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150', 182000.00),
('c0000000-0000-0000-0000-000000000003', 'Mumbai Shramik Swavalamban Mandal', 'Promoting dignified gig work, health insurance coverage, and fair compensation across Greater Mumbai.', 'MH/COOP/2020/5549', '+91 22 2654 9900', 'support@mumbaishramik.org', '4th Floor, Sahakar Sadan, Dadar West', 'Mumbai', 'Maharashtra', '400028', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150', 315000.00)
ON CONFLICT (registration_number) DO NOTHING;

-- 2. SEED SERVICE CATEGORIES
INSERT INTO service_categories (id, name, name_hi, description, description_hi, icon, base_price, emergency_available, active)
VALUES
('s0000000-0000-0000-0000-000000000001', 'Electrical', 'इलेक्ट्रिकल सेवाएं', 'Wiring, switchboard repair, MCB fix, fan installation, lighting, and heavy appliance cabling.', 'वायरिंग, स्विचबोर्ड मरम्मत, एमसीबी ठीक करना, पंखा लगाना, लाइटिंग और अर्थिंग।', 'Zap', 299.00, true, true),
('s0000000-0000-0000-0000-000000000002', 'Plumbing', 'प्लंबिंग सेवाएं', 'Leakage detection, pipe fitting, tap repair, bathroom installation, water pump fixing, drain blockage.', 'लीकेज जांच, पाइप फिटिंग, नल मरम्मत, बाथरूम इंस्टॉलेशन, पानी मोटर रिपेयर।', 'Wrench', 249.00, true, true),
('s0000000-0000-0000-0000-000000000003', 'Carpentry', 'बढ़ईगीरी सेवाएं', 'Furniture repair, door locks, modular kitchen assembly, hinge fixing, bespoke woodwork.', 'फर्नीचर मरम्मत, दरवाजों के लॉक, मॉड्युलर किचन असेंबली, कब्ज़ा ठीक करना।', 'Hammer', 349.00, false, true),
('s0000000-0000-0000-0000-000000000004', 'Painting', 'पेंटिंग और पुट्टी', 'Interior/exterior wall painting, waterproofing, putty finish, texture work, dampness treatment.', 'दीवारों की पेंटिंग, वाटरप्रूफिंग, पुट्टी फिनिश, टेक्सचर वर्क, सीलन का इलाज।', 'Paintbrush', 499.00, false, true),
('s0000000-0000-0000-0000-000000000005', 'Cleaning & Sanitization', 'सफाई और स्वच्छता', 'Deep home cleaning, sofa & carpet shampooing, kitchen degreasing, bathroom descaling.', 'डीप होम क्लीनिंग, सोफा और कारपेट शैम्पू, किचन डीग्रीजिंग, बाथरूम सफाई।', 'Sparkles', 399.00, true, true),
('s0000000-0000-0000-0000-000000000006', 'Gardening & Landscaping', 'बागवानी सेवाएं', 'Lawn mowing, plant pruning, organic fertilization, terrace garden maintenance, soil potting.', 'लॉन कटाई, पौधों की छंटाई, जैविक खाद, टेरेस गार्डन मेंटेनेंस, गमले तैयार करना।', 'Flower2', 299.00, false, true),
('s0000000-0000-0000-0000-000000000007', 'Appliance Repair', 'घरेलू उपकरण मरम्मत', 'Washing machine, microwave, refrigerator, geyser, mixer grinder repair by certified technicians.', 'वॉशिंग मशीन, माइक्रोवेव, फ्रिज, गीज़र, मिक्सर ग्राइंडर की मरम्मत।', 'Tv', 349.00, true, true),
('s0000000-0000-0000-0000-000000000008', 'AC Repair & Servicing', 'एसी मरम्मत एवं सर्विस', 'AC filter jet cleaning, gas charging, cooling coil repair, PCB diagnosis, compressor fixing.', 'एसी जेट क्लीनिंग, गैस चार्जिंग, कूलिंग कॉइल मरम्मत, पीसीबी जांच, इंस्टॉलेशन।', 'AirVent', 449.00, true, true),
('s0000000-0000-0000-0000-000000000009', 'Driver Services', 'ड्राइवर सेवाएं', 'Hourly city drivers, outstation journeys, commercial vehicle operation by verified chauffeurs.', 'प्रति घंटा शहर चालक, आउटस्टेशन यात्राएं, सत्यापित अनुभवी ड्राइवर।', 'Car', 399.00, true, true),
('s0000000-0000-0000-0000-000000000010', 'Caregiving & Nursing', 'देखभाल एवं परिचर्या', 'Elderly assistance, post-surgery bedside care, patient vitals monitoring by trained caregivers.', 'बुजुर्गों की सहायता, सर्जरी बाद देखभाल, प्रशिक्षित केयरगिवर्स द्वारा निगरानी।', 'HeartPulse', 599.00, true, true),
('s0000000-0000-0000-0000-000000000011', 'Domestic Help', 'घरेलू सहायता', 'Pre-screened verified helpers for cooking, dishwashing, daily house management.', 'खाना बनाने, बर्तन धोने, दैनिक घरेलू प्रबंधन के लिए सत्यापित सहायिका।', 'Home', 299.00, false, true),
('s0000000-0000-0000-0000-000000000012', 'Masonry & Civil Repair', 'चिनाई और मरम्मत', 'Tile fixing, plaster repair, slab waterproofing, brick masonry, wall crack treatment.', 'टाइल लगाना, प्लास्टर मरम्मत, स्लैब वाटरप्रूफिंग, ईंट चिनाई कार्य।', 'Building2', 499.00, false, true)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED PROFILES (Admin, Workers, Customers)
INSERT INTO profiles (id, full_name, email, phone, role, profile_photo, address, city, state, pincode, language)
VALUES
-- Admin
('p0000000-0000-0000-0000-000000000001', 'Vikram Malhotra', 'admin@delhicoop.in', '+91 98110 23456', 'admin', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'Sahakar Bhawan, Rouse Avenue', 'New Delhi', 'Delhi', '110001', 'en'),

-- Customers
('p0000000-0000-0000-0000-000000000002', 'Priya Singh', 'priya.singh@customer.in', '+91 98711 54321', 'customer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Flat 402, Royal Residency, Connaught Place', 'New Delhi', 'Delhi', '110001', 'en'),
('p0000000-0000-0000-0000-000000000003', 'Rohan Mehta', 'rohan.mehta@customer.in', '+91 99100 87654', 'customer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'E-45, Lajpat Nagar III', 'New Delhi', 'Delhi', '110024', 'en'),
('p0000000-0000-0000-0000-000000000004', 'Sunita Rao', 'sunita.rao@customer.in', '+91 94140 12389', 'customer', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', '18, Green Glen Layout, Malviya Nagar', 'Jaipur', 'Rajasthan', '302017', 'hi'),
('p0000000-0000-0000-0000-000000000005', 'Deepak Patil', 'deepak.patil@customer.in', '+91 98200 44556', 'customer', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'A/203, Sea View Towers, Andheri West', 'Mumbai', 'Maharashtra', '400053', 'en'),

-- Workers
('p0000000-0000-0000-0000-000000000010', 'Rahul Sharma', 'rahul.sharma@worker.in', '+91 98101 22334', 'worker', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Gali No. 4, Paharganj', 'New Delhi', 'Delhi', '110001', 'hi'),
('p0000000-0000-0000-0000-000000000011', 'Ankit Verma', 'ankit.verma@worker.in', '+91 98991 33445', 'worker', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', 'House 12, Daryaganj', 'New Delhi', 'Delhi', '110002', 'hi'),
('p0000000-0000-0000-0000-000000000012', 'Neha Gupta', 'neha.gupta@worker.in', '+91 97110 44556', 'worker', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 'Sector 3, RK Puram', 'New Delhi', 'Delhi', '110022', 'en'),
('p0000000-0000-0000-0000-000000000013', 'Suresh Yadav', 'suresh.yadav@worker.in', '+91 98112 55667', 'worker', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', 'Block C, Karol Bagh', 'New Delhi', 'Delhi', '110005', 'hi'),
('p0000000-0000-0000-0000-000000000014', 'Pooja Sharma', 'pooja.sharma@worker.in', '+91 99530 66778', 'worker', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', 'Pocket 2, Mayur Vihar Phase 1', 'New Delhi', 'Delhi', '110091', 'en'),
('p0000000-0000-0000-0000-000000000015', 'Rakesh Meena', 'rakesh.meena@worker.in', '+91 94141 77889', 'worker', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'Mansarovar Colony', 'Jaipur', 'Rajasthan', '302020', 'hi'),
('p0000000-0000-0000-0000-000000000016', 'Amit Kumar', 'amit.kumar@worker.in', '+91 98210 88990', 'worker', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'Prabhadevi, Worli', 'Mumbai', 'Maharashtra', '400025', 'hi'),
('p0000000-0000-0000-0000-000000000017', 'Kavita Joshi', 'kavita.joshi@worker.in', '+91 98730 99001', 'worker', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150', 'Laxmi Nagar', 'New Delhi', 'Delhi', '110092', 'hi'),
('p0000000-0000-0000-0000-000000000018', 'Manoj Tiwari', 'manoj.tiwari@worker.in', '+91 98118 11223', 'worker', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150', 'Chanakyapuri Staff Quarters', 'New Delhi', 'Delhi', '110021', 'hi'),

-- Pending Worker for Demo Verification
('p0000000-0000-0000-0000-000000000019', 'Arjun Meena', 'arjun.meena@worker.in', '+91 98109 99887', 'worker', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'Gali 9, Tilak Nagar', 'New Delhi', 'Delhi', '110001', 'hi')
ON CONFLICT (email) DO NOTHING;

-- 4. SEED WORKERS
INSERT INTO workers (id, profile_id, cooperative_id, worker_code, skill_category, skills, experience_years, bio, service_area, pincode, hourly_or_base_rate, availability_status, verification_status, certification_url, certification_name, certification_expiry, average_rating, total_jobs, total_earnings, welfare_status, insurance_status)
VALUES
('w0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0101', 'Electrical', ARRAY['House Wiring', 'MCB Tripping Fix', 'Fan Installation', 'Inverter Cabling', 'Appliance Power Point'], 8, 'Govt ITI certified electrician with 8+ years experience in domestic and commercial troubleshooting. Member of Delhi Shramik Sahakari Sangh.', 'Central & South Delhi (Connaught Place, Karol Bagh, Paharganj)', '110001', 350.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'National Trade Certificate (ITI Electrician)', '2028-12-31', 4.90, 142, 74200.00, 'Active Member', 'Ayushman Bharat + PMSBY'),
('w0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0102', 'Plumbing', ARRAY['Concealed Leakage Repair', 'Bathroom Fitting', 'RO & Geyser Piping', 'Water Motor Repair'], 6, 'Expert in sanitary installations, pipeline restoration and rapid blockage clearance.', 'Central Delhi (CP, Daryaganj, Chanakyapuri)', '110001', 300.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'NSDC Certified Plumbing Technician', '2027-08-15', 4.80, 98, 48500.00, 'Active Member', 'PMJJBY & PMSBY Active'),
('w0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0103', 'Caregiving & Nursing', ARRAY['Elderly Care', 'Vitals Check', 'Post-Op Assistance', 'Physiotherapy Support'], 5, 'Certified healthcare attendant trained in patient mobility, compassionate elderly support, and emergency first aid.', 'Central & South Delhi (110001, 110022)', '110001', 650.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'Red Cross Certified Home Caregiver', '2029-05-30', 4.95, 64, 52000.00, 'Active Member', 'Ayushman Bharat PM-JAY'),
('w0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0104', 'Carpentry', ARRAY['Modular Kitchen Repair', 'Door Hinges & Latches', 'Custom Shelving', 'Bed Assembly'], 10, 'Experienced master carpenter with deep expertise in teakwood, ply repair, and modern architectural fittings.', 'West & Central Delhi (Karol Bagh, Patel Nagar)', '110005', 400.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'Rajasthan Karigar Guild Certificate', '2030-01-01', 4.70, 85, 46750.00, 'Active Member', 'PMSBY Accidental Insurance'),
('w0000000-0000-0000-0000-000000000005', 'p0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0105', 'AC Repair & Servicing', ARRAY['Jet Foam Cleaning', 'Gas Leakage Diagnosis', 'Inverter PCB Board Repair', 'AC Uninstallation'], 7, 'Specialized in split and window AC diagnostics. Fast response within 45 minutes across central Delhi.', 'Central & East Delhi (110001, 110091)', '110001', 499.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'HVAC Technician Level 4 Certification', '2028-09-30', 4.85, 110, 68900.00, 'Active Member', 'Ayushman Bharat PM-JAY'),
('w0000000-0000-0000-0000-000000000006', 'p0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000002', 'WRK-JAI-0201', 'Painting', ARRAY['Texture Finish', 'Royal Luxury Emulsion', 'Waterproofing Dampness Seal', 'Wood Polish'], 9, 'Senior painting contractor with team under Jaipur Karigar Sahakari Samiti. High-speed dustless painting machinery.', 'Jaipur City & Suburbs (302001, 302020)', '302001', 500.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'Asian Paints Master Painter Certified', '2027-11-20', 4.60, 47, 39500.00, 'Active Member', 'Rajasthan Gig Worker Welfare Board'),
('w0000000-0000-0000-0000-000000000007', 'p0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000003', 'WRK-MUM-0301', 'Driver Services', ARRAY['Automatic/Manual Sedans & SUVs', 'Outstation Drives', 'Mumbai City Traffic Expert', 'Night Driving'], 12, 'Commercial heavy and light badge holder. Clean driving record of 12 years with 0 accidents.', 'South & Central Mumbai (400001, 400028, 400053)', '400001', 450.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'Maharashtra Transport Commercial Badge', '2031-03-15', 4.90, 120, 84000.00, 'Active Member', 'Maharashtra Shramik Bima'),
('w0000000-0000-0000-0000-000000000008', 'p0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0108', 'Cleaning & Sanitization', ARRAY['Full Kitchen Degreasing', 'Bathroom Descaling', 'Sofa Deep Shampooing', 'Eco-friendly Chemicals'], 4, 'Trained deep cleaning specialist adhering to industrial hygiene standards.', 'East & Central Delhi (110001, 110092)', '110001', 400.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'Hygiene Council Professional Certification', '2028-02-14', 4.80, 73, 41200.00, 'Active Member', 'PMJJBY & PMSBY Active'),
('w0000000-0000-0000-0000-000000000009', 'p0000000-0000-0000-0000-000000000018', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0109', 'Gardening & Landscaping', ARRAY['Terrace Garden Setup', 'Drip Irrigation', 'Bonsai Pruning', 'Organic Pest Repellent'], 7, 'Horticulture diploma holder skilled in terrace greens, flowering curation, and lawn maintenance.', 'South & Central Delhi (110001, 110021)', '110001', 350.00, 'available', 'verified', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'IARI Horticulture Training Certificate', '2029-07-10', 4.75, 52, 29800.00, 'Active Member', 'Delhi Labour Welfare Board'),

-- PENDING WORKER READY FOR ADMIN VERIFICATION DEMO
('w0000000-0000-0000-0000-000000000010', 'p0000000-0000-0000-0000-000000000019', 'c0000000-0000-0000-0000-000000000001', 'WRK-DEL-0110', 'Plumbing', ARRAY['Pipe Fitting', 'Tap Repair', 'Overhead Tank Cleaning', 'Drainage'], 4, 'Skilled young plumber seeking cooperative membership for fair wage protection and group insurance.', 'Central Delhi & Tilak Nagar (110001, 110018)', '110001', 280.00, 'available', 'pending', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', 'Govt ITI Plumber Trade Certificate', '2028-06-30', 5.00, 0, 0.00, 'Application Under Review', 'Pending Verification')
ON CONFLICT (worker_code) DO NOTHING;

-- 5. SEED WELFARE DATA
INSERT INTO welfare (id, worker_id, welfare_scheme, enrollment_status, contribution_balance, insurance_status, insurance_provider, policy_reference, valid_until)
VALUES
('wel-00000000-0000-0000-0000-000000000001', 'w0000000-0000-0000-0000-000000000001', 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) + Sahakari Health Fund', 'Active', 7420.00, 'Covered', 'National Insurance Co. Ltd.', 'POL-PMJJBY-DEL-8921', '2027-05-31'),
('wel-00000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000002', 'Ayushman Bharat PM-JAY & Gig Worker Group Accident', 'Active', 4850.00, 'Covered', 'New India Assurance', 'POL-ABPMJAY-DEL-4412', '2027-03-31'),
('wel-00000000-0000-0000-0000-000000000003', 'w0000000-0000-0000-0000-000000000003', 'Cooperative Emergency Health Shield & Pension Corpus', 'Active', 5200.00, 'Covered', 'Sahakari Parivar Trust', 'POL-COOP-HEALTH-1092', '2028-01-15')
ON CONFLICT (id) DO NOTHING;

-- 6. SEED COMPLETED & ACTIVE BOOKINGS
INSERT INTO bookings (id, booking_code, customer_id, worker_id, service_category_id, cooperative_id, booking_date, booking_time, address, city, state, pincode, service_description, estimated_amount, final_amount, is_emergency, status, payment_status)
VALUES
('b0000000-0000-0000-0000-000000000001', 'BK-2026-0811', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '2026-08-25', '10:00 AM', 'Flat 402, Royal Residency, Connaught Place', 'New Delhi', 'Delhi', '110001', 'Living room ceiling fan spark and short-circuit diagnosis.', 450.00, 450.00, false, 'completed', 'paid'),
('b0000000-0000-0000-0000-000000000002', 'BK-2026-0819', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000002', 's0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', '2026-08-28', '02:30 PM', 'Flat 402, Royal Residency, Connaught Place', 'New Delhi', 'Delhi', '110001', 'Kitchen sink pipe burst and water accumulation.', 350.00, 350.00, true, 'completed', 'paid'),
('b0000000-0000-0000-0000-000000000003', 'BK-2026-0901', 'p0000000-0000-0000-0000-000000000003', 'w0000000-0000-0000-0000-000000000005', 's0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000001', '2026-09-01', '11:00 AM', 'E-45, Lajpat Nagar III', 'New Delhi', 'Delhi', '110024', 'Split AC cooling coil check and jet water cleaning.', 550.00, 550.00, false, 'in_progress', 'pending')
ON CONFLICT (booking_code) DO NOTHING;

-- 7. SEED RATINGS
INSERT INTO ratings (id, booking_id, customer_id, worker_id, rating, feedback)
VALUES
('r0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000001', 5, 'Rahul ji was extremely punctual, professional, and solved the short circuit issue within 25 minutes. So reassuring to know he is cooperative certified!'),
('r0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000002', 5, 'Emergency burst pipe handled rapidly. Ankit arrived in 20 minutes with proper replacement fittings. Transparent cooperative rates!')
ON CONFLICT (booking_id) DO NOTHING;

-- 8. SEED PAYMENTS & INVOICES
INSERT INTO payments (id, booking_id, customer_id, worker_id, amount, payment_method, transaction_reference, status, payment_gateway)
VALUES
('pay-00000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000001', 450.00, 'upi', 'UPI/2026/8821903/COOP', 'paid', 'Sahakari Demo Payment Gateway'),
('pay-00000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000002', 350.00, 'demo', 'DEMO-TXN-99104', 'paid', 'Sahakari Demo Payment Gateway')
ON CONFLICT (id) DO NOTHING;

INSERT INTO invoices (id, booking_id, invoice_number, customer_id, worker_id, subtotal, platform_fee, cooperative_share, worker_amount, tax, total_amount, generated_at)
VALUES
('inv-00000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'INV-DEL-2026-001', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000001', 450.00, 22.50, 45.00, 382.50, 0.00, 450.00, '2026-08-25 11:30:00+05:30'),
('inv-00000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'INV-DEL-2026-002', 'p0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000002', 350.00, 17.50, 35.00, 297.50, 0.00, 350.00, '2026-08-28 15:45:00+05:30')
ON CONFLICT (booking_id) DO NOTHING;

-- 9. SEED NOTIFICATIONS
INSERT INTO notifications (id, user_id, type, title, message, read)
VALUES
('notif-00000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'worker_pending', 'New Worker Verification Request', 'Arjun Meena (Plumber) has submitted certification documents for verification.', false),
('notif-00000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', 'booking_completed', 'Service Completed', 'Your electrical service booking BK-2026-0811 with Rahul Sharma is marked complete.', true),
('notif-00000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000010', 'payment_received', 'Earnings Credited', '₹382.50 credited for Booking BK-2026-0811. ₹45.00 allocated to your Welfare Fund.', true)
ON CONFLICT (id) DO NOTHING;
