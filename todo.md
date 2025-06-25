- [X] Wire up search, filter, sort functionality on Mocks and Templates pages
- [X] Fix bug with icon size on my mocks page
- [X] Make the sidebar highlight the current route
- [X] Remove model from past mock view
- [X] Make the mock generation details more user friendly (drawer instead of dialog? or make it a sheet!)
- [X] Improve layout of new mock page
- [X] Don't show how many credits were used for each mock (each mock costs 1 credit)
- [X] Remove the ability for a user to change their display name, nav-user.tsx should just show their email before the @ in the case of email sign up
- [X] Fix auth bug where clicking login creates a session but does not redirect the to the dashboard or respect the 'next' route query param
credits)
- [X] Decide on a theme and style the app after that theme - should be poppy, colorful, SaaS-like
- [X] Don't show number of records on the templates page
- [X] Make sure all data fetching is done in server components (re-organize)
- [X] JSON highlighting for schema input and generated data result -> Should match theme of application
- [X] Build hero page at /
- [X] Fix "number of records" display (the response is wrapped as an object so there's always only one record, will need to tweak prompt to always return an array or adjust how we display it by indexing into the object)
- [ ] Add label field to mock generation form so users can label their mocks and generate it by default with AI
- [ ] Validation on JSON schema input (how? use ajv?)
- [ ] Check to compare generated data with schema integration
- [ ] Add Google and GitHub OAuth
- [ ] Add branding to auth pages, 404 page, also add back to home button to auth pages which redirects to /
- [ ] Add stripe integration so users can purchase credits and have their account balance updated right away
- [ ] Decide on appropriate pricing model for credits (e.g. $5 for 500 credits, $20 for 2500 credits, $50 for 7500 credits? 
- [ ] Add option to decide on number of records and add to prompt (1-20 records?)
- [ ] Add constraint for maximum size of JSON schema uploaded so we don't run into issues with large schemas
- [ ] Make the generated data card scrollable area follow the bottom of the generation until the user scrolls up
- [ ] Create pricing marketing page showing discounts for each credit package - show "most popular" on the 500 credit package
- [ ] Add mock versioning i.e. when a user generates a new mock it is saved to the generated_mocks table and then we have a new table called mock_versions which has a foreign key to the generated_mocks table and a version number so users can go back and forth through their versions and ask mockr for revisions
- [ ] Add mock deletion functionality
- [ ] Add more useful templates with existing schemas that users will love
- [ ] Fix nav-user to show actual name of user

=== TODOs for the future ===


## 🚀 Phase 1: Core Product Differentiation (Critical for Launch)
- [ ] **Switch to record-based pricing model**: Update credit system to charge per records generated (1 credit = 100 records), not per generation
- [ ] **Add AI-powered schema inference**: Let users upload sample JSON/CSV and auto-generate schemas with AI
- [ ] **Intelligent data relationships**: AI understands foreign keys and generates consistent related data across entities
- [ ] **Advanced export formats**: Add CSV, SQL INSERT statements, Parquet, and XML export options
- [ ] **Data validation engine**: Verify generated data actually matches the provided JSON schema
- [ ] **Smart templates marketplace**: 50+ high-quality, real-world templates (not just basic ones)