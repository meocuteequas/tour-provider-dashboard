import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateTourPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/protected">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Tour</h1>
          <p className="text-muted-foreground mt-2">
            Design your perfect tour experience step by step
          </p>
        </div>
      </div>

      {/* Create Tour Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Tour Creation Wizard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground">
              The step-by-step tour creation wizard is being built. 
              This will allow you to create amazing tours with ease.
            </p>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-medium mb-3">What you&apos;ll be able to do:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Step 1: Enter tour name and basic details</li>
              <li>• Step 2: Upload at least 6 images</li>
              <li>• Step 3: Write compelling descriptions</li>
              <li>• Step 4: Set pricing and availability</li>
              <li>• Step 5: Configure tour logistics</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
