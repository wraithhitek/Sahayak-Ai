-- Insert sample data for demonstration purposes
-- This helps teachers understand the capabilities of Sahayak

-- Insert sample users (teachers)
INSERT INTO users (email, name, school_name, location, preferred_language) VALUES
('priya.sharma@school.edu', 'Priya Sharma', 'Government Primary School Pune', 'Pune, Maharashtra', 'marathi'),
('rajesh.kumar@school.edu', 'Rajesh Kumar', 'Village School Haryana', 'Gurgaon, Haryana', 'hindi'),
('meera.patel@school.edu', 'Meera Patel', 'Community School Gujarat', 'Ahmedabad, Gujarat', 'gujarati'),
('demo@sahayak.ai', 'Demo Teacher', 'Demo School', 'Demo Location', 'english')
ON CONFLICT (email) DO NOTHING;

-- Insert sample content generations
INSERT INTO content_generations (user_id, content_type, prompt, language, grade_level, generated_content) VALUES
(1, 'story', 'Create a story about farmers and soil types', 'marathi', '3-5', 'एकदा एका छोट्या गावात राम नावाचा एक शेतकरी राहत होता. त्याला आपल्या शेतातील वेगवेगळ्या प्रकारच्या मातीबद्दल जाणून घ्यायचे होते...'),
(2, 'explanation', 'Explain water cycle for children', 'hindi', '1-3', 'पानी का चक्र एक बहुत ही रोचक प्रक्रिया है। सूरज की गर्मी से समुद्र और नदियों का पानी भाप बनकर ऊपर जाता है...'),
(3, 'activity', 'Fun math activity for addition', 'english', '1-2', 'Let\'s play the "Number Garden" game! Each student gets flower cutouts with numbers. They plant flowers by adding the numbers together...')
ON CONFLICT DO NOTHING;

-- Insert sample knowledge queries
INSERT INTO knowledge_queries (user_id, question, language, grade_level, answer) VALUES
(1, 'Why is the sky blue?', 'english', '4-6', '{"explanation": "The sky looks blue because of tiny particles in the air...", "analogy": "Think of it like throwing different colored balls...", "activities": ["Look at the sky at different times", "Shine a flashlight through water"]}'),
(2, 'How do plants make food?', 'hindi', '3-5', '{"explanation": "पौधे अपना खाना धूप, पानी और हवा से बनाते हैं...", "analogy": "पौधे छोटे रसोइये की तरह हैं...", "activities": ["Observe leaves in sunlight", "Water a plant and watch it grow"]}')
ON CONFLICT DO NOTHING;

-- Insert sample lesson plans
INSERT INTO lesson_plans (user_id, subject, topic, duration, target_grades, objectives, lesson_content) VALUES
(1, 'science', 'Water Cycle', 45, ARRAY['grade3', 'grade4', 'grade5'], 'Students will understand the water cycle process', 
'{"phases": [{"name": "Introduction", "duration": 7, "activities": ["Greet students", "Introduce water cycle topic"]}, {"name": "Main Teaching", "duration": 23, "activities": ["Explain evaporation", "Discuss condensation", "Show precipitation"]}], "materials": ["Blackboard", "Water", "Heat source"], "assessment": ["Observe participation", "Check understanding through questions"]}'),
(2, 'mathematics', 'Addition and Subtraction', 60, ARRAY['grade1', 'grade2'], 'Students will learn basic addition and subtraction', 
'{"phases": [{"name": "Introduction", "duration": 9, "activities": ["Review numbers", "Introduce addition concept"]}, {"name": "Practice", "duration": 36, "activities": ["Use counting objects", "Practice with worksheets"]}], "materials": ["Counting stones", "Worksheets", "Blackboard"], "assessment": ["Check worksheet completion", "Oral questioning"]}')
ON CONFLICT DO NOTHING;

-- Insert sample visual aids
INSERT INTO visual_aids (user_id, description, visual_type, complexity, instructions) VALUES
(1, 'Water cycle diagram', 'diagram', 'simple', '["Draw a large cloud at the top", "Add wavy lines for evaporation", "Draw raindrops falling", "Add sun and water body", "Label each part"]'),
(2, 'Parts of a plant', 'illustration', 'moderate', '["Draw vertical stem", "Add oval leaves on sides", "Draw roots underground", "Add flower at top", "Use different colors", "Label all parts"]')
ON CONFLICT DO NOTHING;
