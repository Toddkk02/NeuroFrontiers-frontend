CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  body TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, author, category, body, upvotes, comments) VALUES
('First DMT Breakthrough', 'psychonaut_42', 'psychedelics', 'After years of meditation...', 156, 23),
('3-Hour Vipassana Insights', 'zen_seeker', 'meditation', 'During a silent retreat...', 89, 12),
('Holotropic Breathwork Journey', 'breath_explorer', 'breathwork', '45 minutes of intense breathing...', 67, 8);
