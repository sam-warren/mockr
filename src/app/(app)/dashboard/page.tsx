import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Mocks</CardTitle>
            <CardDescription>Your recently created mock APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You haven't created any mocks yet.</p>
          </CardContent>
          <CardFooter>
            <Button>Create Mock</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>Your API usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No usage data available yet.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Free Plan</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Upgrade</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 