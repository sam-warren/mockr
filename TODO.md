# Mockr TODO List

## Authentication
- [ ] Add auth
  - [ ] Implement Supabase auth
  - [ ] Create auth context provider
  - [ ] Add protected routes
  - [ ] Add sign-up flow
  - [ ] Add login flow
  - [ ] Add password reset flow

## Backend
- [ ] Set up Supabase
  - [ ] Create database schema
  - [ ] Set up tables for users, projects, mocks
  - [ ] Configure RLS policies
  - [ ] Set up storage buckets if needed

## Marketing Site
- [x] Organize route structure with route groups
- [x] Configure domain setup (mockr.io)
- [ ] Add pages:
    - [x] Features (basic)
    - [ ] Pricing
    - [ ] Documentation
- [ ] Add code previews to hero page
- [ ] Organize hero page to be more visually appealing
- [ ] Implement mobile responsiveness

## App
- [x] Set up app route structure with route groups
- [x] Configure subdomain setup (app.mockr.io)
- [x] Fix routing between marketing and app sections
- [ ] Create core app components:
  - [ ] Mock API builder
  - [ ] API response editor
  - [ ] API request tester
  - [ ] Dashboard analytics
  - [ ] Team management
  - [ ] Settings page

## Deployment
- [x] Register subdomain for app (app.mockr.io)
- [x] Configure domain routing in Next.js and Vercel
- [x] Set up middleware for route group handling
- [ ] Configure CI/CD pipeline
- [ ] Set up monitoring and analytics
- [ ] Configure proper error handling

## Future Features
- [ ] API versioning
- [ ] OpenAPI/Swagger integration
- [ ] Custom domains for mock APIs
- [ ] Rate limiting configuration
- [ ] Response templating
