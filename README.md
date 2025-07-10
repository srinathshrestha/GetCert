# Internship Certificate Generator

A premium, responsive web application built with Next.js that allows students to generate and download their internship completion certificates. The application verifies student details against a Neon database, generates professional PDF certificates, and provides secure, time-limited download links via AWS S3.

## 🌟 Features

- **Student Verification**: Secure verification against Neon database using email as unique identifier
- **Professional PDF Generation**: High-quality certificate generation with custom styling
- **AWS S3 Integration**: Secure cloud storage with time-limited download links
- **Premium UI/UX**: Modern design with Shadcn components and Framer Motion animations
- **Responsive Design**: Fully functional and visually appealing on all devices
- **Terms Acceptance**: Required terms and conditions acceptance before generation
- **Edge Case Handling**: Comprehensive error handling and user feedback
- **FAQ Section**: Built-in help section with common questions and answers

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Database**: Neon PostgreSQL with Prisma ORM
- **Cloud Storage**: AWS S3
- **PDF Generation**: PDFKit
- **Validation**: Zod
- **Date Handling**: date-fns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database
- AWS S3 bucket
- AWS access credentials

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:5432/database_name?sslmode=require"

# AWS S3 Configuration
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET_NAME="your_s3_bucket_name"

# Next.js Configuration (optional)
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Setup

The application uses the following Prisma schema:

```prisma
model Intern {
  id            Int      @id @default(autoincrement())
  name          String
  college       String
  email         String   @unique
  field         String
  startDate     DateTime
  endDate       DateTime
  certificateKey String?

  @@map("interns")
}
```

To set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 3. AWS S3 Setup

1. Create an S3 bucket in your AWS console
2. Configure bucket permissions for your access keys
3. Update the environment variables with your bucket details

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000` to see the application.

## 📋 Database Schema

The application expects an `interns` table with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | Integer | Primary key, auto-increment |
| `name` | String | Student's full name |
| `college` | String | College/University name |
| `email` | String | Student's email (unique) |
| `field` | String | Internship field/domain |
| `startDate` | DateTime | Internship start date |
| `endDate` | DateTime | Internship end date |
| `certificateKey` | String? | S3 key for generated certificate (optional) |

### Sample Data

```sql
INSERT INTO interns (name, college, email, field, "startDate", "endDate") VALUES
('John Doe', 'MIT', 'john.doe@mit.edu', 'Software Development', '2024-01-15', '2024-04-15'),
('Jane Smith', 'Stanford University', 'jane.smith@stanford.edu', 'Data Science', '2024-02-01', '2024-05-01');
```

## 🎨 Theme Customization

The application uses a custom theme defined in `src/app/globals.css`. The theme supports both light and dark modes with carefully chosen colors:

- **Primary**: Purple gradient (`oklch(0.5393 0.2713 286.7462)`)
- **Secondary**: Light gray for backgrounds
- **Accent**: Blue-purple for highlights
- **Custom fonts**: Plus Jakarta Sans, Lora, IBM Plex Mono

## 📱 Components Overview

### Core Components

- **LandingPage**: Hero section with features and CTA
- **CertificateForm**: Form with validation and processing states
- **FAQSection**: Collapsible help section
- **Processing States**: Loading, success, and error feedback

### API Routes

- **`/api/verify-student`**: Verify student email against database
- **`/api/generate-certificate`**: Complete certificate generation workflow

### Key Features

- **Form Validation**: Real-time validation with error messages
- **Student Verification**: Database lookup with exact matching
- **PDF Generation**: Professional certificate with custom styling
- **S3 Integration**: Secure upload and signed URL generation
- **Error Handling**: Comprehensive error messages and recovery

## 🔒 Security Features

- **SSL Encryption**: All data transmission encrypted
- **Time-limited URLs**: Download links expire after 1 hour
- **Server-side Validation**: All inputs validated on the server
- **Unique Email Verification**: Prevents unauthorized access
- **Secure File Storage**: S3 with server-side encryption

## 🧪 Testing

To test the application:

1. **Database Test**: Ensure your database is populated with sample intern data
2. **AWS Test**: Verify S3 bucket permissions and upload capabilities
3. **Form Test**: Try the certificate generation flow with valid data
4. **Error Test**: Test with invalid emails and mismatched data

## 🔧 Configuration

### Customizing the Certificate

Edit `src/lib/pdf-generator.ts` to customize:
- Certificate layout and design
- Colors and typography
- Company branding
- Additional fields

### Modifying the Theme

Update `src/app/globals.css` to change:
- Color scheme
- Typography
- Spacing and borders
- Animation timings

## 📚 API Documentation

### POST `/api/generate-certificate`

Generate and upload a certificate for a verified student.

**Request Body:**
```json
{
  "name": "John Doe",
  "college": "MIT", 
  "email": "john.doe@mit.edu"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Certificate generated successfully.",
  "downloadUrl": "https://s3.amazonaws.com/...",
  "certificateId": "certificates/2024-01-15/john_doe_mit_edu_abc123.pdf",
  "studentName": "John Doe",
  "isExisting": false
}
```

**Error Response:**
```json
{
  "error": "Email not registered. Please contact support for assistance."
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check your `DATABASE_URL` in `.env`
   - Ensure Neon database is accessible
   - Verify SSL mode is enabled

2. **AWS S3 Upload Failed**
   - Verify AWS credentials in `.env`
   - Check S3 bucket permissions
   - Ensure bucket exists and is accessible

3. **Certificate Generation Error**
   - Check student data exists in database
   - Verify all required fields are present
   - Ensure date formats are correct

4. **PDF Generation Issues**
   - Verify PDFKit is properly installed
   - Check memory limits for large certificates
   - Ensure all fonts are available

### Environment Variables

Make sure all required environment variables are set:
- `DATABASE_URL`: Complete Neon PostgreSQL connection string
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region (e.g., us-east-1)
- `AWS_S3_BUCKET_NAME`: Your S3 bucket name

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@example.com

---

Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies.
