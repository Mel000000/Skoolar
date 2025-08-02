import pkg from 'pg'
import { randomUUID } from 'crypto'
import 'dotenv/config'

const { Client } = pkg

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function seed() {
  try {
    await client.connect()

    // === CLEAR DATA ===
    await client.query(`
      TRUNCATE TABLE
        submissions,
        assignments,
        messages,
        analytics,
        schedules,
        classes,
        users
      CASCADE
    `)

    // === USERS ===
    const users = [
      {
        id: randomUUID(),
        email: 'alice@example.com',
        password_hash: 'hashedpassword1',
        full_name: 'Alice Johnson',
        role: 'teacher',
      },
      {
        id: randomUUID(),
        email: 'bob@example.com',
        password_hash: 'hashedpassword2',
        full_name: 'Bob Smith',
        role: 'student',
      },
      {
        id: randomUUID(),
        email: 'carol@example.com',
        password_hash: 'hashedpassword3',
        full_name: 'Carol Lee',
        role: 'student',
      },
      {
        id: randomUUID(),
        email: 'dave@example.com',
        password_hash: 'hashedpassword4',
        full_name: 'Dave Martin',
        role: 'teacher',
      },
      {
        id: randomUUID(),
        email: 'eve@example.com',
        password_hash: 'hashedpassword5',
        full_name: 'Eve Torres',
        role: 'student',
      },
    ]

    for (const u of users) {
      await client.query(
        `INSERT INTO users (id, email, password_hash, full_name, role, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [u.id, u.email, u.password_hash, u.full_name, u.role]
      )
    }

    // === CLASSES ===
    const classes = [
      {
        id: randomUUID(),
        name: 'Math 101',
        description: 'Intro to Algebra',
        teacher_id: users[0].id,
      },
      {
        id: randomUUID(),
        name: 'History 201',
        description: 'World History overview',
        teacher_id: users[3].id,
      },
    ]
    for (const c of classes) {
      await client.query(
        `INSERT INTO classes (id, name, description, teacher_id)
         VALUES ($1, $2, $3, $4)`,
        [c.id, c.name, c.description, c.teacher_id]
      )
    }

    // === SCHEDULES ===
    const schedules = [
      {
        id: randomUUID(),
        class_id: classes[0].id,
        day_of_week: 'Monday',
        start_time: '09:00:00',
        end_time: '10:30:00',
        location: 'D101',
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        class_id: classes[0].id,
        day_of_week: 'Wednesday',
        start_time: '09:00:00',
        end_time: '10:30:00',
        location: 'D101',
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        class_id: classes[1].id,
        day_of_week: 'Tuesday',
        start_time: '11:00:00',
        end_time: '12:30:00',
        location: 'B202',
        created_at: new Date(),
      },
    ]
    for (const s of schedules) {
      await client.query(
        `INSERT INTO schedules (id, class_id, day_of_week, start_time, end_time, location, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [s.id, s.class_id, s.day_of_week, s.start_time, s.end_time, s.location, s.created_at]
      )
    }

    // === ASSIGNMENTS ===
    const assignments = [
      {
        id: randomUUID(),
        class_id: classes[0].id,
        title: 'Homework 1',
        description: 'Complete problems 1–10',
        due_date: '2025-08-10',
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        class_id: classes[0].id,
        title: 'Quiz 1',
        description: 'Algebra basics quiz',
        due_date: '2025-08-15',
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        class_id: classes[1].id,
        title: 'Essay 1',
        description: 'Write about WWI causes',
        due_date: '2025-08-12',
        created_at: new Date(),
      },
    ]
    for (const a of assignments) {
      await client.query(
        `INSERT INTO assignments (id, class_id, title, description, due_date, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [a.id, a.class_id, a.title, a.description, a.due_date, a.created_at]
      )
    }

    // === SUBMISSIONS ===
    const submissions = [
      {
        id: randomUUID(),
        assignment_id: assignments[0].id,
        student_id: users[1].id,
        submitted_at: new Date('2025-08-02T10:00:00'),
        content: 'Answers to homework 1',
        grade: 95,
        feedback: 'Good job!',
      },
      {
        id: randomUUID(),
        assignment_id: assignments[1].id,
        student_id: users[4].id,
        submitted_at: new Date('2025-08-14T14:00:00'),
        content: 'Quiz answers',
        grade: 88,
        feedback: 'Well done!',
      },
      {
        id: randomUUID(),
        assignment_id: assignments[2].id,
        student_id: users[2].id,
        submitted_at: new Date('2025-08-11T16:00:00'),
        content: 'WWI essay draft',
        grade: 90,
        feedback: 'Great analysis',
      },
    ]
    for (const sub of submissions) {
      await client.query(
        `INSERT INTO submissions (id, assignment_id, student_id, submitted_at, content, grade, feedback)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [sub.id, sub.assignment_id, sub.student_id, sub.submitted_at, sub.content, sub.grade, sub.feedback]
      )
    }

    // === MESSAGES ===
    const messages = [
      {
        id: randomUUID(),
        sender_id: users[1].id,
        recipient_id: users[0].id,
        content: 'Hi! I have a question about the homework.',
        sent_at: new Date(),
        read: true,
      },
      {
        id: randomUUID(),
        sender_id: users[2].id,
        recipient_id: users[3].id,
        content: 'Could you explain the essay topic further?',
        sent_at: new Date(),
        read: false,
      },
      {
        id: randomUUID(),
        sender_id: users[4].id,
        recipient_id: users[0].id,
        content: 'Is there extra credit work available?',
        sent_at: new Date(),
        read: false,
      },
    ]
    for (const m of messages) {
      await client.query(
        `INSERT INTO messages (id, sender_id, recipient_id, content, sent_at, read)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [m.id, m.sender_id, m.recipient_id, m.content, m.sent_at, m.read]
      )
    }

    // === ANALYTICS ===
    const analytics = [
      {
        id: randomUUID(),
        user_id: users[1].id,
        event_type: 'class_test',
        event_data: { score: 85, duration: '15min' },
        event_time: new Date(),
      },
      {
        id: randomUUID(),
        user_id: users[2].id,
        event_type: 'assignment_submission',
        event_data: { assignment_id: assignments[0].id, time_spent: '2h' },
        event_time: new Date(),
      },
      {
        id: randomUUID(),
        user_id: users[4].id,
        event_type: 'message_sent',
        event_data: { message_id: messages[2].id },
        event_time: new Date(),
      },
    ]
    for (const a of analytics) {
      await client.query(
        `INSERT INTO analytics (id, user_id, event_type, event_data, event_time)
         VALUES ($1, $2, $3, $4, $5)`,
        [a.id, a.user_id, a.event_type, a.event_data, a.event_time]
      )
    }

    console.log('✅ Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  } finally {
    await client.end()
  }
}

seed()
