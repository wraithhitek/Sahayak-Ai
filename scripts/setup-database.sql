-- Create database tables for Sahayak AI Teaching Assistant
-- This script sets up the basic structure for storing user data and content

-- Users table for teacher accounts
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    school_name VARCHAR(255),
    location VARCHAR(255),
    preferred_language VARCHAR(50) DEFAULT 'english',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content generations table
CREATE TABLE IF NOT EXISTS content_generations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content_type VARCHAR(50) NOT NULL, -- story, explanation, activity, etc.
    prompt TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    grade_level VARCHAR(20) NOT NULL,
    generated_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Worksheet creations table
CREATE TABLE IF NOT EXISTS worksheet_creations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    original_image_url TEXT,
    target_grades TEXT[], -- array of grade levels
    generated_worksheets JSONB, -- store worksheet data as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge base queries table
CREATE TABLE IF NOT EXISTS knowledge_queries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    question TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    grade_level VARCHAR(20),
    answer JSONB, -- store answer data as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visual aids table
CREATE TABLE IF NOT EXISTS visual_aids (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    description TEXT NOT NULL,
    visual_type VARCHAR(50) NOT NULL,
    complexity VARCHAR(20) NOT NULL,
    instructions JSONB, -- store drawing instructions as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audio assessments table
CREATE TABLE IF NOT EXISTS audio_assessments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    student_name VARCHAR(255),
    reading_text TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    grade_level VARCHAR(20) NOT NULL,
    assessment_results JSONB, -- store assessment data as JSON
    audio_file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lesson plans table
CREATE TABLE IF NOT EXISTS lesson_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    target_grades TEXT[], -- array of grade levels
    objectives TEXT,
    lesson_content JSONB, -- store full lesson plan as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_generations_user_id ON content_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_content_generations_created_at ON content_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_worksheet_creations_user_id ON worksheet_creations(user_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_queries_user_id ON knowledge_queries(user_id);
CREATE INDEX IF NOT EXISTS idx_visual_aids_user_id ON visual_aids(user_id);
CREATE INDEX IF NOT EXISTS idx_audio_assessments_user_id ON audio_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_plans_user_id ON lesson_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_plans_subject ON lesson_plans(subject);
