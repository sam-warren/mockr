'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

const SAMPLE_SCHEMA = `{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "email": {"type": "string", "format": "email"},
    "age": {"type": "integer", "minimum": 18}
  },
  "required": ["name", "email"]
}`

export default function NewMockPage() {
  const [prompt, setPrompt] = useState('Generate user profiles with name, email, age, and city')
  const [generationType, setGenerationType] = useState<'prompt' | 'schema' | 'hybrid'>('prompt')
  const [sampleSize, setSampleSize] = useState(5)
  const [jsonSchema, setJsonSchema] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    data?: {
      generationId: string
      mockData: unknown[]
      recordCount: number
      processingTimeMs: number
      creditsConsumed: number
    }
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const requestBody: {
        prompt: string
        generationType: 'prompt' | 'schema' | 'hybrid'
        sampleSize: number
        jsonSchema?: unknown
      } = {
        prompt,
        generationType,
        sampleSize,
      }

      // Add JSON schema if provided and not prompt-only
      if (jsonSchema && generationType !== 'prompt') {
        try {
          requestBody.jsonSchema = JSON.parse(jsonSchema)
        } catch {
          throw new Error('Invalid JSON schema format')
        }
      }

      const response = await fetch('/api/generate-mock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate mock data')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Test Mock Generation</h1>
        <p className="text-muted-foreground mt-2">
          Simple form to test the AI mock data generation functionality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Mock Data</CardTitle>
            <CardDescription>
              Configure your mock data generation parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prompt Input */}
              <div className="space-y-2">
                <Label htmlFor="prompt">Description/Prompt *</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what kind of mock data you want..."
                  rows={3}
                  required
                />
              </div>

              {/* Generation Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Generation Type</Label>
                <Select value={generationType} onValueChange={(value) => setGenerationType(value as 'prompt' | 'schema' | 'hybrid')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prompt">Prompt Only</SelectItem>
                    <SelectItem value="schema">JSON Schema Only</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Prompt + Schema)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sample Size */}
              <div className="space-y-2">
                <Label htmlFor="size">Sample Size</Label>
                <Input
                  id="size"
                  type="number"
                  value={sampleSize}
                  onChange={(e) => setSampleSize(parseInt(e.target.value) || 1)}
                  min={1}
                  max={20}
                />
              </div>

              {/* JSON Schema (conditional) */}
              {generationType !== 'prompt' && (
                <div className="space-y-2">
                  <Label htmlFor="schema">JSON Schema {generationType === 'schema' ? '*' : '(optional)'}</Label>
                  <Textarea
                    id="schema"
                    value={jsonSchema}
                    onChange={(e) => setJsonSchema(e.target.value)}
                    placeholder={SAMPLE_SCHEMA}
                    rows={8}
                    className="font-mono text-sm"
                    required={generationType === 'schema'}
                  />
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Mock Data'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Generated mock data will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Generated {result.data?.recordCount} records in {result.data?.processingTimeMs}ms
                  • Credits used: {result.data?.creditsConsumed}
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/50">
                  <pre className="text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                    {JSON.stringify(result.data?.mockData, null, 2)}
                  </pre>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(result.data?.mockData, null, 2))
                    }}
                  >
                    Copy JSON
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(result.data?.mockData, null, 2)], { 
                        type: 'application/json' 
                      })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'mock-data.json'
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                  >
                    Download JSON
                  </Button>
                </div>
              </div>
            )}

            {!result && !error && !loading && (
              <div className="text-center text-muted-foreground py-8">
                Fill out the form and click &quot;Generate Mock Data&quot; to test the functionality
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}