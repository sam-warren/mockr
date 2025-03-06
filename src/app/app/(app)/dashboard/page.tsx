import { 
  Database, 
  FileJson, 
  LayoutTemplate, 
  ChevronRight, 
  Activity, 
  Download, 
  Layers, 
  Plus, 
  GitBranch,
  ArrowUpRight,
  BarChart,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemaCard } from "@/components/ui/schema-card";

export default async function Dashboard() {
  const session = await getSession();
  
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {session?.user?.name && (
            <p className="text-muted-foreground mt-1">
              Welcome back, {session.user.name}!
            </p>
          )}
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" /> Create New Schema
        </Button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Schemas</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
              </div>
              <div className="rounded-full p-2 bg-primary/10 dark:bg-primary/20">
                <FileJson className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Badge variant="outline" className="bg-muted text-muted-foreground gap-1">
                <ArrowUpRight className="h-3 w-3" /> 12% increase
              </Badge>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">API Calls</p>
                <h3 className="text-2xl font-bold mt-1">8.2k</h3>
              </div>
              <div className="rounded-full p-2 bg-primary/10 dark:bg-primary/20">
                <Activity className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Badge variant="outline" className="bg-muted text-muted-foreground gap-1">
                <ArrowUpRight className="h-3 w-3" /> 8% increase
              </Badge>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Records Generated</p>
                <h3 className="text-2xl font-bold mt-1">156k</h3>
              </div>
              <div className="rounded-full p-2 bg-primary/10 dark:bg-primary/20">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Badge variant="outline" className="bg-muted text-muted-foreground gap-1">
                <ArrowUpRight className="h-3 w-3" /> 23% increase
              </Badge>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Templates</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="rounded-full p-2 bg-primary/10 dark:bg-primary/20">
                <LayoutTemplate className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Badge variant="outline" className="bg-muted text-muted-foreground gap-1">
                2 new available
              </Badge>
              <span className="text-muted-foreground ml-2">this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="recent" className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Your Schemas</h2>
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="recent" className="m-0">
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-muted">
                        <FileJson className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">User Profiles Schema</CardTitle>
                        <CardDescription className="text-xs mt-0.5">Updated 2 days ago</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      View <ChevronRight className="h-3 w-3" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">API Usage</span>
                      <span className="font-medium">842 records</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-muted">
                        <FileJson className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">E-commerce Products</CardTitle>
                        <CardDescription className="text-xs mt-0.5">Updated 5 days ago</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      View <ChevronRight className="h-3 w-3" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">API Usage</span>
                      <span className="font-medium">1,428 records</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-muted">
                        <FileJson className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">Transaction Records</CardTitle>
                        <CardDescription className="text-xs mt-0.5">Updated 1 week ago</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      View <ChevronRight className="h-3 w-3" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">API Usage</span>
                      <span className="font-medium">954 records</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="m-0">
              <Card className="border-dashed flex flex-col items-center justify-center h-[300px] text-center">
                <LayoutTemplate className="w-12 h-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">No popular schemas yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  Keep using your schemas to see popularity metrics
                </p>
                <Button variant="outline">Create a new schema</Button>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-transparent hover:border-primary/20 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-secondary">
                        <Layers className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <Badge variant="outline" className="text-xs">Popular</Badge>
                    </div>
                    <CardTitle className="text-md mt-3">User Profiles</CardTitle>
                    <CardDescription className="text-xs">Names, emails, addresses</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3 pt-0">
                    <div className="text-sm text-muted-foreground">
                      Complete user profile data with realistic values
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button size="sm" variant="ghost" className="gap-1 text-xs">
                      Use template <ChevronRight className="h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-transparent hover:border-primary/20 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-secondary">
                        <Layers className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <Badge variant="outline" className="text-xs">New</Badge>
                    </div>
                    <CardTitle className="text-md mt-3">E-commerce Suite</CardTitle>
                    <CardDescription className="text-xs">Products, orders, customers</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3 pt-0">
                    <div className="text-sm text-muted-foreground">
                      Complete e-commerce data model with relationships
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button size="sm" variant="ghost" className="gap-1 text-xs">
                      Use template <ChevronRight className="h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Usage Stats</span>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">74% of limit</Badge>
              </CardTitle>
              <CardDescription>Your current usage this billing cycle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">API Calls</span>
                    <span className="font-medium">2,412 / 5,000</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Records Generated</span>
                    <span className="font-medium">156,482 / 200,000</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Schemas</span>
                    <span className="font-medium">24 / 25</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Usage Details</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted h-fit">
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Exported User Profiles</p>
                    <p className="text-xs text-muted-foreground">500 records as JSON</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted h-fit">
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Generated Product Data</p>
                    <p className="text-xs text-muted-foreground">1,200 records</p>
                    <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted h-fit">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Connected Supabase</p>
                    <p className="text-xs text-muted-foreground">New integration</p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted h-fit">
                    <FileJson className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created Transaction Schema</p>
                    <p className="text-xs text-muted-foreground">New schema template</p>
                    <p className="text-xs text-muted-foreground mt-1">4 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Schema Gallery */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Schema Gallery</h2>
          <Button variant="outline" size="sm" className="gap-1.5">
            View All <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SchemaCard 
            title="User Profiles" 
            description="Complete user data with personal details"
            lastUpdated="Updated 2 days ago"
            recordCount={12500}
            color="blue"
            badges={["users", "profiles"]}
          />
          
          <SchemaCard 
            title="E-commerce Products" 
            description="Product catalog with categories and pricing"
            lastUpdated="Updated 5 days ago"
            recordCount={8750}
            color="indigo"
            badges={["products", "e-commerce"]}
          />
          
          <SchemaCard 
            title="Blog Posts" 
            description="Blog content with metadata and comments"
            lastUpdated="Updated 1 week ago"
            recordCount={3200}
            color="purple"
            badges={["content", "blog"]}
          />
          
          <SchemaCard 
            title="Financial Transactions" 
            description="Payment and transaction records"
            lastUpdated="Updated 3 days ago"
            recordCount={25800}
            color="emerald"
            badges={["finance", "payments"]}
          />
        </div>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-dashed hover:border-border transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-muted mb-4">
                <FileJson className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Create New Schema</h3>
              <p className="text-sm text-muted-foreground mb-4">Design a new data structure</p>
              <Button variant="outline" size="sm" className="mt-auto">Get Started</Button>
            </CardContent>
          </Card>
          
          <Card className="border-dashed hover:border-border transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-muted mb-4">
                <Download className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Export Data</h3>
              <p className="text-sm text-muted-foreground mb-4">Download data in various formats</p>
              <Button variant="outline" size="sm" className="mt-auto">Export</Button>
            </CardContent>
          </Card>
          
          <Card className="border-dashed hover:border-border transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-muted mb-4">
                <Code className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">API Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">Learn how to use our API</p>
              <Button variant="outline" size="sm" className="mt-auto">View Docs</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 