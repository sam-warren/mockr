# Tech Stack
- Next.js
- Supabase
- Vercel
- Shadcn
- TailwindCSS
- Stripe

# App Pages
- Very simple integration:
    - /: Home page / hero section / marketing
    - /auth: authentication routes
    - /dashboard: Dashboard for users showing three recent mocks, a new mock button, and a link to their mock history
    - /mocks: Card view of all mocks the user has created, with options to delete or view each mock (whole card clickable).
    - /mocks/:id: Page for a single mock. This is what is visited upon completing /mock/new form and generating a mock. A new mock is created in the database, the server generates the mock, and it populates using supabase realtime in front of them
    - /mocks/new: Form for creating a new mock. This is where the user can either propmt, upload json schema, or both, and then it generates a mock and redirects them to /mocks/new
    - /account: Account information and link to Stripe billing portal

# Auth
- Uses supabase auth (just username and password for now)
- Supabase UI components built by shadcn power the auth pages
- Must be authenticated to view any page in the (app) directory, i.e. users can view the landing page but must log in to proceed

# Payment
- Stripe integration
- Credit system - users can buy credits to use the app OR
- Monthly subscription service

# Mock Generation Flow
- User visits `/mocks/new`
- User inputs a prompt and/or uploads a JSON schema
- User clicks "Generate Mock"
- The mock placeholder is created in the database and the user is navigated to /mocks/:id
- The server generates the mock data using OpenAI and populates the mock in the database, which is then displayed in real-time on the page using supabase realtime and streaming the response
- User can then view, edit, or delete the mock
- User can also download the mock data in various formats (JSON, SQL, Document (MongoDB))
