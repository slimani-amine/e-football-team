import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to Neon database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

export { pool };

// Database helper functions
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Create team_members table
    await query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(100) DEFAULT 'Player',
        status VARCHAR(50) DEFAULT 'active',
        join_date DATE DEFAULT CURRENT_DATE,
        email VARCHAR(255),
        phone VARCHAR(50),
        bio TEXT,
        nationality VARCHAR(100),
        age INTEGER,
        stats JSONB DEFAULT '{}',
        social_links JSONB DEFAULT '{}',
        achievements TEXT[],
        preferred_position VARCHAR(100),
        contract_end_date DATE,
        salary DECIMAL(10,2),
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create news_articles table
    await query(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'draft',
        author VARCHAR(255) NOT NULL,
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        tags TEXT[],
        image VARCHAR(500),
        featured BOOLEAN DEFAULT false,
        priority VARCHAR(20) DEFAULT 'normal',
        read_time INTEGER,
        meta_description TEXT,
        publish_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create join_requests table
    await query(`
      CREATE TABLE IF NOT EXISTS join_requests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        age INTEGER,
        position VARCHAR(100) NOT NULL,
        experience VARCHAR(100) NOT NULL,
        gamertag VARCHAR(100),
        platform VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        skill_level VARCHAR(50),
        timezone VARCHAR(50),
        languages TEXT[],
        nationality VARCHAR(100),
        phone_number VARCHAR(50),
        previous_teams TEXT[],
        preferred_role VARCHAR(100),
        motivation TEXT,
        video_link VARCHAR(500),
        social_proof VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create matches table
    await query(`
      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        opponent VARCHAR(255) NOT NULL,
        opponent_logo VARCHAR(500),
        match_date DATE NOT NULL,
        match_time TIME,
        result VARCHAR(50),
        score VARCHAR(20),
        competition VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'upcoming',
        venue VARCHAR(255),
        importance VARCHAR(50) DEFAULT 'friendly',
        live_stream VARCHAR(500),
        ticket_info TEXT,
        weather VARCHAR(100),
        attendance INTEGER,
        highlights VARCHAR(500),
        match_report TEXT,
        player_ratings JSONB DEFAULT '{}',
        formations JSONB DEFAULT '{}',
        statistics JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create achievements table
    await query(`
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        achievement_date DATE NOT NULL,
        type VARCHAR(100) NOT NULL,
        image VARCHAR(500),
        importance VARCHAR(50) DEFAULT 'bronze',
        competition VARCHAR(255),
        prize VARCHAR(255),
        participants TEXT[],
        proof VARCHAR(500),
        celebration_video VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tournaments table
    await query(`
      CREATE TABLE IF NOT EXISTS tournaments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        type VARCHAR(100) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'upcoming',
        participants INTEGER DEFAULT 0,
        prize_pool VARCHAR(100),
        format VARCHAR(255) NOT NULL,
        rules TEXT,
        registration_deadline DATE,
        entry_fee DECIMAL(10,2),
        contact_person VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create training_sessions table
    await query(`
      CREATE TABLE IF NOT EXISTS training_sessions (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        session_date DATE NOT NULL,
        session_time TIME NOT NULL,
        duration INTEGER NOT NULL,
        type VARCHAR(100) NOT NULL,
        location VARCHAR(255),
        coach VARCHAR(255) NOT NULL,
        attendees INTEGER[],
        description TEXT,
        objectives TEXT[],
        equipment TEXT[],
        status VARCHAR(50) DEFAULT 'scheduled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create settings table
    await query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL DEFAULT 'Barba Blanca FC',
        team_logo VARCHAR(500),
        primary_color VARCHAR(20) DEFAULT '#dc2626',
        secondary_color VARCHAR(20) DEFAULT '#000000',
        accent_color VARCHAR(20) DEFAULT '#ffffff',
        description TEXT,
        founded VARCHAR(10),
        headquarters VARCHAR(255),
        website VARCHAR(500),
        social_links JSONB DEFAULT '{}',
        recruitment_open BOOLEAN DEFAULT true,
        max_team_size INTEGER DEFAULT 25,
        contact_email VARCHAR(255),
        motto VARCHAR(500),
        achievements_list TEXT[],
        sponsors JSONB DEFAULT '[]',
        theme VARCHAR(20) DEFAULT 'dark',
        custom_css TEXT,
        notifications JSONB DEFAULT '{}',
        game_settings JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default settings if not exists
    const settingsResult = await query('SELECT COUNT(*) FROM settings');
    if (parseInt(settingsResult.rows[0].count) === 0) {
      await query(`
        INSERT INTO settings (
          team_name, description, founded, headquarters, motto, contact_email,
          social_links, notifications, game_settings
        ) VALUES (
          'Barba Blanca FC',
          'Elite e-sports football club dedicated to excellence and teamwork',
          '2023',
          'Madrid, Spain',
          'Unity, Strength, Victory',
          'contact@barbablanca.com',
          '{"discord": "https://discord.gg/barbablanca", "twitter": "https://twitter.com/barbablancafc", "youtube": "https://youtube.com/@barbablancafc", "instagram": "https://instagram.com/barbablancafc"}',
          '{"emailNotifications": true, "discordIntegration": true, "autoAcceptRequests": false}',
          '{"primaryGame": "FIFA 24", "platforms": ["PlayStation 5", "Xbox Series X", "PC"], "competitionLevel": "Professional", "trainingSchedule": "Tuesday & Thursday 18:00 UTC"}'
        )
      `);
    }

    // Insert sample data if tables are empty
    const teamResult = await query('SELECT COUNT(*) FROM team_members');
    if (parseInt(teamResult.rows[0].count) === 0) {
      await query(`
        INSERT INTO team_members (name, position, email, bio, nationality, age, stats, achievements) VALUES
        ('CAPTAIN WHITEBEARD', 'Captain', 'captain@barbablanca.com', 'Legendary captain with exceptional leadership skills', 'Spain', 28, '{"goals": 45, "assists": 32, "matches": 120, "rating": 9.2, "yellowCards": 8, "redCards": 0, "playtime": 10800}', '{"Champion 2023", "Best Captain Award"}'),
        ('RED DEMON', 'Striker', 'striker@barbablanca.com', 'Fierce striker known for powerful shots', 'Brazil', 25, '{"goals": 67, "assists": 18, "matches": 98, "rating": 8.9, "yellowCards": 12, "redCards": 1, "playtime": 8820}', '{"Top Scorer 2023"}')
      `);
    }

    const newsResult = await query('SELECT COUNT(*) FROM news_articles');
    if (parseInt(newsResult.rows[0].count) === 0) {
      await query(`
        INSERT INTO news_articles (title, description, content, category, status, author, views, tags, featured, priority) VALUES
        ('Championship Final Victory', 'Barba Blanca FC dominates the championship final with a spectacular victory', 'We dominated the championship final with a spectacular 3-1 victory against our rivals. The team showed incredible teamwork and determination throughout the match.', 'Tournament', 'published', 'Admin Tarek', 2500, '{"championship", "victory", "tournament"}', true, 'high'),
        ('New Player Recruitment Open', 'We are looking for skilled warriors to join our ranks', 'Applications are now open for dedicated players who want to dominate the field with us.', 'Recruitment', 'published', 'Admin Tarek', 1200, '{"recruitment", "players"}', false, 'medium')
      `);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}