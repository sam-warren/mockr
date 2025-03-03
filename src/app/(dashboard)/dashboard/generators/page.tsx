import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Building,
  CreditCard,
  Database,
  Download,
  Plus,
  RefreshCw,
  Sparkles,
  User
} from "lucide-react";

export default function GeneratorsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Generators</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Generator
        </Button>
      </div>

      <Tabs defaultValue="standard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="standard">Standard Generators</TabsTrigger>
          <TabsTrigger value="ai">AI-Powered Generators</TabsTrigger>
          <TabsTrigger value="custom">Custom Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Person Generator
                  </CardTitle>
                </div>
                <CardDescription>
                  Generate realistic person data including names, addresses, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="count">Number of records</Label>
                    <Input
                      id="count"
                      type="number"
                      placeholder="100"
                      defaultValue="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locale">Locale</Label>
                    <Select defaultValue="en-US">
                      <SelectTrigger id="locale">
                        <SelectValue placeholder="Select locale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">United States</SelectItem>
                        <SelectItem value="en-GB">United Kingdom</SelectItem>
                        <SelectItem value="fr-FR">France</SelectItem>
                        <SelectItem value="de-DE">Germany</SelectItem>
                        <SelectItem value="ja-JP">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-email">Include Email</Label>
                      <Switch id="include-email" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-phone">Include Phone</Label>
                      <Switch id="include-phone" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-address">Include Address</Label>
                      <Switch id="include-address" defaultChecked />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Company Generator
                  </CardTitle>
                </div>
                <CardDescription>
                  Generate company data including names, addresses, and industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="count-company">Number of records</Label>
                    <Input
                      id="count-company"
                      type="number"
                      placeholder="50"
                      defaultValue="50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-logo">Include Logo URL</Label>
                      <Switch id="include-logo" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-description">Include Description</Label>
                      <Switch id="include-description" defaultChecked />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Generator
                  </CardTitle>
                </div>
                <CardDescription>
                  Generate payment data including credit cards and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="count-payment">Number of records</Label>
                    <Input
                      id="count-payment"
                      type="number"
                      placeholder="25"
                      defaultValue="25"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-type">Card Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="card-type">
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                        <SelectItem value="amex">American Express</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount Range</Label>
                    <div className="pt-2">
                      <Slider defaultValue={[50, 500]} min={0} max={1000} step={10} />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>$0</span>
                        <span>$1000</span>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Powered Data Generation
              </CardTitle>
              <CardDescription>
                Generate highly realistic and contextual data using AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt">Describe the data you need</Label>
                  <textarea
                    id="ai-prompt"
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Generate 50 records of software developers with their names, skills, years of experience, and current salary. Make sure the skills are relevant to their experience level."
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-count">Number of records</Label>
                  <Input
                    id="ai-count"
                    type="number"
                    placeholder="50"
                    defaultValue="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-format">Output Format</Label>
                  <Select defaultValue="json">
                    <SelectTrigger id="ai-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>AI Creativity</Label>
                  <div className="pt-2">
                    <Slider defaultValue={[70]} min={0} max={100} step={10} />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Conservative</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate with AI
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>E-commerce Products</CardTitle>
                <CardDescription>
                  Custom template for e-commerce product data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>Includes:</p>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>Product name</li>
                    <li>Description</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>SKU</li>
                    <li>Inventory count</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Blog Content</CardTitle>
                <CardDescription>
                  Custom template for blog posts and articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>Includes:</p>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>Title</li>
                    <li>Author</li>
                    <li>Publication date</li>
                    <li>Categories</li>
                    <li>Tags</li>
                    <li>Content summary</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Create New Template</CardTitle>
                <CardDescription>
                  Design a custom data template
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Create a new template with custom fields and data types
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 