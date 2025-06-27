# My Schemas Feature Documentation

## Overview

The "My Schemas" feature allows users to create, manage, and reuse custom JSON schemas for mock data generation. This feature enhances the existing mock generation workflow by providing persistent, user-owned schema definitions that can be used across multiple mock data generations.

## Feature Goals

- **Schema Creation**: Enable users to build custom JSON schemas with AI assistance
- **Schema Management**: Provide CRUD operations for user-created schemas  
- **Schema Organization**: Allow naming, tagging, and categorizing schemas
- **Mock Integration**: Seamlessly use custom schemas in the Mock Generator
- **AI Enhancement**: Offer AI-powered schema generation and naming suggestions

## Database Schema

### New Table: `user_schemas`

```sql
CREATE TABLE public.user_schemas (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Schema metadata
  name text NOT NULL,
  description text,
  json_schema jsonb NOT NULL,
  
  -- Organization
  tags text[] DEFAULT '{}',
  category text DEFAULT 'custom',
  is_favorite boolean DEFAULT false,
  
  -- AI-generated metadata
  ai_generated boolean DEFAULT false,
  generation_prompt text, -- Prompt used if AI-generated
  
  -- Usage tracking
  usage_count integer DEFAULT 0,
  last_used_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraints
  CONSTRAINT name_length CHECK (length(name) >= 1 AND length(name) <= 100),
  CONSTRAINT description_length CHECK (length(description) <= 500),
  CONSTRAINT category_values CHECK (category IN ('custom', 'ai-generated', 'template'))
);

-- Indexes for performance
CREATE INDEX idx_user_schemas_user_id ON public.user_schemas(user_id);
CREATE INDEX idx_user_schemas_tags ON public.user_schemas USING gin(tags);
CREATE INDEX idx_user_schemas_category ON public.user_schemas(user_id, category);
CREATE INDEX idx_user_schemas_favorites ON public.user_schemas(user_id, is_favorite) WHERE is_favorite = true;
CREATE INDEX idx_user_schemas_usage ON public.user_schemas(user_id, usage_count DESC);

-- RLS Policies
ALTER TABLE public.user_schemas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own schemas"
  ON public.user_schemas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own schemas"
  ON public.user_schemas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schemas"
  ON public.user_schemas FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own schemas"
  ON public.user_schemas FOR DELETE
  USING (auth.uid() = user_id);
```

### Database Functions

```sql
-- Function to increment schema usage
CREATE OR REPLACE FUNCTION public.increment_schema_usage(schema_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_schemas
  SET usage_count = usage_count + 1,
      last_used_at = now()
  WHERE id = schema_id;
END;
$$;
```

## Route Structure

```
app/(app)/schemas/
├── page.tsx                    # Schema library view (/schemas)
├── new/
│   └── page.tsx               # Create new schema (/schemas/new)
├── [id]/
│   ├── page.tsx               # View schema details (/schemas/[id])
│   └── edit/
│       └── page.tsx           # Edit schema (/schemas/[id]/edit)
└── schemas.md                 # This documentation file
```

## Component Architecture

```
components/schemas/
├── schema-grid.tsx                 # Grid layout for schema cards
├── schema-card.tsx                 # Individual schema display card
├── schema-editor.tsx               # JSON schema builder/editor
├── schema-form.tsx                 # Name, description, tags form
├── schema-preview.tsx              # Live preview of schema structure
├── schema-ai-generator.tsx         # AI-powered schema generation
├── schema-filters.tsx              # Search and filter controls  
├── schemas-with-filters.tsx        # Main container with filtering
└── schema-usage-dialog.tsx         # Usage statistics modal
```

## Page Specifications

### 1. Schema Library (`/schemas`)

**Purpose**: Display all user-created schemas with management capabilities

**Features**:
- Grid/list view of user schemas
- Search by name/description
- Filter by tags, category, favorites
- Sort by created date, usage count, last used
- Quick actions: favorite, delete, duplicate
- Create new schema button
- Empty state for first-time users

**Layout**:
```tsx
<SchemasPage>
  <Header>
    <Title>My Schemas</Title>
    <CreateButton href="/schemas/new" />
  </Header>
  
  <FiltersBar>
    <SearchInput />
    <CategoryFilter />
    <TagFilter />
    <SortDropdown />
  </FiltersBar>
  
  <SchemasGrid>
    {schemas.map(schema => 
      <SchemaCard 
        key={schema.id}
        schema={schema}
        onFavorite={handleFavorite}
        onDelete={handleDelete}
        onUse={redirectToMockGenerator}
      />
    )}
  </SchemasGrid>
</SchemasPage>
```

### 2. Schema Creation (`/schemas/new`)

**Purpose**: Create new JSON schemas with AI assistance

**Features**:
- Manual JSON schema editor (Monaco Editor)
- AI-powered schema generation from natural language
- Live schema validation
- Sample data preview
- Auto-naming suggestions
- Tag management
- Save as draft functionality

**AI Integration**:
- Prompt: "Create a JSON schema for user profiles with name, email, and preferences"
- Response: Generated JSON schema + suggested name
- User can refine and save

**Layout**:
```tsx
<CreateSchemaPage>
  <Header>
    <BackButton />
    <Title>Create New Schema</Title>
    <SaveButton />
  </Header>
  
  <TwoColumnLayout>
    <LeftPanel>
      <SchemaMetadataForm>
        <NameInput />
        <DescriptionTextarea />
        <TagsInput />
        <CategorySelect />
      </SchemaMetadataForm>
      
      <AIGenerationSection>
        <PromptInput />
        <GenerateButton />
      </AIGenerationSection>
    </LeftPanel>
    
    <RightPanel>
      <Tabs>
        <TabPanel label="Editor">
          <SchemaEditor />
        </TabPanel>
        <TabPanel label="Preview">
          <SchemaPreview />
        </TabPanel>
      </Tabs>
    </RightPanel>
  </TwoColumnLayout>
</CreateSchemaPage>
```

### 3. Schema Details (`/schemas/[id]`)

**Purpose**: View and manage individual schema

**Features**:
- Schema overview and metadata
- JSON schema display (read-only)
- Usage statistics
- Quick actions: edit, duplicate, delete, use in mock
- Usage history (which mock generations used this schema)

### 4. Schema Editor (`/schemas/[id]/edit`)

**Purpose**: Edit existing schema

**Features**:
- Same as creation page but pre-populated
- Version history (future enhancement)
- Conflict resolution if schema is used in active mocks

## API Routes

### Schema Management API

```typescript
// app/api/schemas/route.ts
export async function GET(request: Request) {
  // Fetch user schemas with filtering/pagination
}

export async function POST(request: Request) {
  // Create new schema
}

// app/api/schemas/[id]/route.ts
export async function GET(params: { id: string }) {
  // Get specific schema
}

export async function PUT(params: { id: string }) {
  // Update schema
}

export async function DELETE(params: { id: string }) {
  // Delete schema (with usage checks)
}

// app/api/schemas/generate/route.ts
export async function POST(request: Request) {
  // AI-powered schema generation
  // Input: natural language prompt
  // Output: JSON schema + suggested name
}
```

## Integration Points

### 1. Mock Generator Enhancement

**File**: `components/mocks/mock-generation-form.tsx`

**Changes**:
- Add "My Schemas" dropdown/selector
- Load user schemas in addition to templates
- Pre-populate JSON schema field when user schema selected
- Increment usage count when schema is used

```tsx
<SchemaSelector>
  <TabGroup>
    <Tab label="Templates">
      <TemplateGrid templates={templates} onSelect={setSchema} />
    </Tab>
    <Tab label="My Schemas">
      <UserSchemaGrid schemas={userSchemas} onSelect={setSchema} />
    </Tab>
  </TabGroup>
</SchemaSelector>
```

### 2. Navigation Updates

**Files**: 
- `components/navigation/app-sidebar.tsx`
- `app/(app)/dashboard/page.tsx`

**Changes**:
- Add "Schemas" navigation item
- Add schema count to dashboard stats
- Update breadcrumbs for schema pages

### 3. Database Types

**File**: `database.types.ts`

**Addition**:
```typescript
user_schemas: {
  Row: {
    id: string
    user_id: string
    name: string
    description: string | null
    json_schema: Json
    tags: string[] | null
    category: string
    is_favorite: boolean
    ai_generated: boolean
    generation_prompt: string | null
    usage_count: number
    last_used_at: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    // Insert type definition
  }
  Update: {
    // Update type definition
  }
}
```

## AI Integration Specifications

### Schema Generation API

**Endpoint**: `/api/schemas/generate`

**Input**:
```typescript
interface GenerateSchemaRequest {
  prompt: string;           // Natural language description
  complexity?: 'simple' | 'medium' | 'complex';
  includeExamples?: boolean;
}
```

**Output**:
```typescript
interface GenerateSchemaResponse {
  schema: object;           // Generated JSON schema
  suggestedName: string;    // AI-suggested schema name
  description: string;      // AI-generated description
  tags: string[];          // AI-suggested tags
}
```

**AI Prompt Template**:
```
Generate a JSON Schema based on this description: "{user_prompt}"

Requirements:
- Valid JSON Schema (draft-07)
- Include appropriate data types and constraints
- Add descriptions for all properties
- Suggest realistic field names
- Include examples where helpful

Respond with:
1. The JSON schema
2. A concise name for this schema
3. A brief description
4. 3-5 relevant tags
```

## User Experience Flow

### Creating a Schema

1. **Entry Points**:
   - Dashboard → "Create Schema" button
   - Schemas page → "New Schema" button  
   - Mock Generator → "Create Custom Schema" link

2. **Creation Flow**:
   ```
   /schemas/new
   ↓
   User enters description OR writes JSON schema manually
   ↓
   AI generates schema (if using prompt) + suggests name
   ↓
   User reviews/edits schema and metadata
   ↓
   Save schema → Redirect to /schemas/[id]
   ```

3. **Usage Flow**:
   ```
   /mocks/new
   ↓
   User selects "My Schemas" tab
   ↓
   User picks a schema → JSON schema field auto-populated
   ↓
   User generates mock data using their schema
   ↓
   Schema usage count incremented
   ```

## Quality Assurance

### Schema Validation
- Validate JSON schema format before saving
- Test schema against sample data generation
- Prevent circular references
- Size limits (max 100KB per schema)

### Error Handling
- Invalid JSON schema format
- Schema deletion conflicts (used in active mocks)
- AI generation failures
- Network timeout handling

### Performance Considerations
- Pagination for large schema collections
- Debounced search/filtering
- Lazy loading of schema content
- Caching frequently used schemas

## Future Enhancements

### Phase 2 Features
- **Schema Templates**: Pre-built schema templates for common use cases
- **Schema Sharing**: Public/private schema sharing between users
- **Version Control**: Schema versioning and change history
- **Schema Validation**: Real-time validation against JSON Schema standards
- **Import/Export**: Bulk schema import/export functionality
- **Collaboration**: Team schemas and shared workspaces

### Phase 3 Features
- **Visual Schema Builder**: Drag-and-drop schema construction
- **Schema Analytics**: Usage analytics and optimization suggestions
- **API Integration**: Direct API endpoint generation from schemas
- **Schema Testing**: Built-in schema testing with mock data validation

## Success Metrics

### User Engagement
- Number of schemas created per user
- Schema reuse frequency
- Time spent in schema builder
- AI generation usage vs manual creation

### Product Impact
- Increased mock generation frequency
- Reduced time-to-mock for repeat users
- Higher user retention rates
- Credit consumption patterns

This feature significantly enhances the mockr platform by providing users with powerful schema management capabilities while maintaining the simple, AI-powered workflow that defines the product experience.