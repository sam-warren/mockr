# 🚀 **Mockr 7-Day MVP Implementation Plan**

## **Day 1: Foundation & Database (Critical Infrastructure)**

### **Morning (4 hours)**
- [X] **Environment Setup**
  - [X] Create `.env.local` with Supabase keys
  - [X] Update `package.json` name from "treatmenttracker" to "mockr"
  - [X] Set up OpenAI API key for mock generation

- [X] **Database Schema & Migrations**
  - [X] Create `mocks` table (id, user_id, title, description, schema, generated_data, created_at)
  - [X] Create `user_credits` table (user_id, credits, created_at, updated_at)
  - [X] Set up Row Level Security (RLS) policies
  - [X] Create database functions for credit management

### **Afternoon (4 hours)**
- [X] **Auth Flow Completion**
  - [X] Test and fix login/signup forms
  - [X] Ensure middleware properly protects app routes
  - [X] Add user profile data handling (with server actions, proper form loading states, and nav integration)

---

## **Day 2: Core Mock Generation Engine**

### **Morning (4 hours)**
- [ ] **AI Mock Generation Logic**
  - [ ] Create `/api/generate-mock` endpoint
  - [ ] Implement prompt-based mock generation with OpenAI
  - [ ] Add JSON schema parsing and validation
  - [ ] Create reusable mock generation utilities

### **Afternoon (4 hours)**
- [ ] **Database Operations**
  - [ ] Create mock CRUD operations
  - [ ] Implement Supabase realtime for live mock updates
  - [ ] Add user credit checking and deduction

---

## **Day 3: Core User Interface**

### **Morning (4 hours)**
- [ ] **Dashboard Page**
  - [ ] Show recent 3 mocks
  - [ ] New mock button
  - [ ] Credit balance display
  - [ ] Link to mock history

### **Afternoon (4 hours)**
- [ ] **Mocks List Page (`/mocks`)**
  - [ ] Card grid of all user mocks
  - [ ] Delete functionality
  - [ ] Search/filter options
  - [ ] Click to view individual mock

---

## **Day 4: Mock Creation & Viewing**

### **Morning (4 hours)**
- [ ] **New Mock Form (`/mocks/new`)**
  - [ ] Prompt input field
  - [ ] JSON schema upload
  - [ ] Form validation with Zod
  - [ ] Loading states during generation

### **Afternoon (4 hours)**
- [ ] **Individual Mock Page (`/mocks/[id]`)**
  - [ ] Display generated mock data
  - [ ] JSON viewer/formatter
  - [ ] Copy to clipboard functionality
  - [ ] Download as JSON

---

## **Day 5: Payment System**

### **Morning (4 hours)**
- [ ] **Stripe Integration Setup**
  - [ ] Install Stripe SDK
  - [ ] Create Stripe products and prices
  - [ ] Set up webhooks for payment processing

### **Afternoon (4 hours)**
- [ ] **Credit System**
  - [ ] Credit purchase flow
  - [ ] Subscription option setup
  - [ ] Account page with billing portal link
  - [ ] Credit usage tracking

---

## **Day 6: Polish & Landing Page**

### **Morning (4 hours)**
- [ ] **Landing Page (`/`)**
  - [ ] Hero section with value proposition
  - [ ] Feature highlights
  - [ ] Pricing information
  - [ ] Call-to-action buttons

### **Afternoon (4 hours)**
- [ ] **UI/UX Polish**
  - [ ] Loading states everywhere
  - [ ] Error handling and user feedback
  - [ ] Mobile responsiveness check
  - [ ] Toast notifications with Sonner

---

## **Day 7: Deploy & Launch**

### **Morning (4 hours)**
- [ ] **Production Deployment**
  - [ ] Deploy to Vercel
  - [ ] Set up production environment variables
  - [ ] Configure custom domain (if available)
  - [ ] Set up monitoring and analytics

### **Afternoon (4 hours)**
- [ ] **Testing & Bug Fixes**
  - [ ] End-to-end user flow testing
  - [ ] Payment flow testing
  - [ ] Mobile testing
  - [ ] Fix critical bugs

---

## **Priority Features for MVP (Must-Have)**
- ✅ User authentication
- ✅ Mock generation from prompts
- ✅ Credit-based payment system
- ✅ Basic CRUD for mocks
- ✅ Simple landing page

## **Nice-to-Have (Post-MVP)**
- [ ] JSON schema upload validation
- [ ] Advanced mock customization
- [ ] Mock sharing functionality
- [ ] Usage analytics
- [ ] Advanced landing page features

## **Revenue Model Day 1**
### **Credit System**
- $5 for 100 mocks
- $15 for 500 mocks
- $25 for 1000 mocks

### **Monthly Subscription**
- $10/month for 200 mocks + $0.02 per additional mock

---

## **Daily Progress Tracking**
- [X] Day 1 Complete
- [ ] Day 2 Complete
- [ ] Day 3 Complete
- [ ] Day 4 Complete
- [ ] Day 5 Complete
- [ ] Day 6 Complete
- [ ] Day 7 Complete - **LAUNCH DAY** 🚀

---

## **Notes**
- Focus on core functionality first
- Test payment flow thoroughly
- Keep UI simple but polished
- Mobile-first responsive design
- Error handling is critical for user experience 