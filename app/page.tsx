import { Card, CardContent } from "@/components/ui/card";
import {
  Database,
  Github,
  Sparkles,
  Twitter,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LandingNavigation } from "@/components/landing/landing-navigation";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingCTA } from "@/components/landing/landing-cta";

async function getUserAuthState() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Auth error:', error);
      return false;
    }
    
    return !!user;
  } catch (error) {
    console.error('Failed to check auth state:', error);
    return false;
  }
}

export default async function Home() {
  const isAuthenticated = await getUserAuthState();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description:
        "Intelligent mock data creation through our web interface - no coding or command line required.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Cloud Storage & Management",
      description:
        "All your datasets are safely stored and organized in your personal dashboard for easy access.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Simple Data Export",
      description:
        "Download your generated data in JSON format, or copy to clipboard.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Upload or Build Schema",
      description:
        "Upload your JSON schema through the web interface.",
    },
    {
      step: "02",
      title: "Customize & Add Context",
      description:
        "Provide context about your data domain and customize generation settings in the dashboard.",
    },
    {
      step: "03",
      title: "Generate & Download",
      description:
        "Generate realistic data with one click and download in JSON format.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent)] animate-pulse"></div>
      </div>

      {/* Navigation */}
      <LandingNavigation isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <LandingHero isAuthenticated={isAuthenticated} />

      {/* Live Demo Section */}
      <div className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto animate-fade-in-up animation-delay-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Simple input, powerful output
            </h2>
            <p className="text-muted-foreground">
              Simply describe your data in natural language, and we&apos;ll
              generate realistic mock data based on the context you provide.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
            {/* Input Side */}
            <Card className="bg-card/50 border-border backdrop-blur-xl h-full flex flex-col">
              <CardContent className="p-0 text-left flex flex-col h-full">
                <div className="border-b border-border px-6 py-4 flex-shrink-0 pt-0">
                  <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Input
                  </h3>
                </div>

                <div className="p-6 space-y-6 flex-1">
                  {/* Prompt */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-primary uppercase tracking-wide">
                      Prompt
                    </label>
                    <div className="bg-muted/40 rounded-lg p-4 border border-primary/20">
                      <p className="text-card-foreground leading-relaxed">
                        Generate realistic e-commerce user data with names,
                        emails, addresses, and purchase totals
                      </p>
                    </div>
                  </div>

                  {/* JSON Schema */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-accent-foreground uppercase tracking-wide">
                      JSON Schema
                    </label>
                    <div className="bg-muted/40 rounded-lg p-4 border border-accent/20 font-mono text-sm">
                      <div className="space-y-1">
                        <div>
                          <span className="text-accent-foreground">{`{`}</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;type&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;array&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;items&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">{`{`}</span>
                        </div>
                        <div className="ml-8">
                          <span className="text-foreground">
                            &quot;type&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;object&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-8">
                          <span className="text-foreground">
                            &quot;properties&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">{`{`}</span>
                        </div>
                        <div className="ml-12">
                          <span className="text-primary">
                            &quot;name&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">{`{ `}</span>
                          <span className="text-foreground">
                            &quot;type&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;string&quot;
                          </span>{" "}
                          <span className="text-accent-foreground">{`}`}</span>,
                        </div>
                        <div className="ml-12">
                          <span className="text-primary">
                            &quot;email&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">{`{ `}</span>
                          <span className="text-foreground">
                            &quot;type&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;string&quot;
                          </span>{" "}
                          <span className="text-accent-foreground">{`}`}</span>,
                        </div>
                        <div className="ml-12">
                          <span className="text-primary">
                            &quot;address&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">{`{ `}</span>
                          <span className="text-foreground">
                            &quot;type&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;string&quot;
                          </span>{" "}
                          <span className="text-accent-foreground">{`}`}</span>,
                        </div>
                        <div className="ml-12">
                          <span className="text-primary">
                            &quot;totalSpent&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">{`{ `}</span>
                          <span className="text-foreground">
                            &quot;type&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;number&quot;
                          </span>{" "}
                          <span className="text-accent-foreground">{`}`}</span>
                        </div>
                        <div className="ml-8">
                          <span className="text-accent-foreground">{`}`}</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-accent-foreground">{`}`}</span>
                        </div>
                        <div>
                          <span className="text-accent-foreground">{`}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Output Side */}
            <Card className="bg-card/50 border-border backdrop-blur-xl h-full flex flex-col">
              <CardContent className="p-0 text-left flex flex-col h-full">
                <div className="border-b border-border px-6 py-4 flex items-center justify-between flex-shrink-0 pt-0">
                  <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Generated Output
                  </h3>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="bg-muted/40 rounded-lg p-4 border border-primary/20 font-mono text-sm flex-1 overflow-y-auto">
                    <div className="space-y-2">
                      <div>
                        <span className="text-accent-foreground">[</span>
                      </div>

                      <div className="ml-4 space-y-1">
                        <div>
                          <span className="text-primary">{`{`}</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;name&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;Sarah Johnson&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;email&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;sarah.johnson@email.com&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;address&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;123 Oak Street, Portland, OR&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;totalSpent&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">
                            1247.50
                          </span>
                        </div>
                        <div>
                          <span className="text-primary">{`},`}</span>
                        </div>
                      </div>

                      <div className="ml-4 space-y-1">
                        <div>
                          <span className="text-primary">{`{`}</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;name&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;Michael Chen&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;email&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;m.chen.dev@gmail.com&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;address&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;456 Pine Ave, Seattle, WA&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;totalSpent&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">892.25</span>
                        </div>
                        <div>
                          <span className="text-primary">{`},`}</span>
                        </div>
                      </div>

                      <div className="ml-4 space-y-1">
                        <div>
                          <span className="text-primary">{`{`}</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;name&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;Emma Rodriguez&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;email&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;emma.r.design@outlook.com&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;address&quot;:
                          </span>{" "}
                          <span className="text-primary">
                            &quot;789 Elm Dr, Austin, TX&quot;
                          </span>
                          ,
                        </div>
                        <div className="ml-4">
                          <span className="text-foreground">
                            &quot;totalSpent&quot;:
                          </span>{" "}
                          <span className="text-accent-foreground">
                            2156.75
                          </span>
                        </div>
                        <div>
                          <span className="text-primary">{`}`}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-accent-foreground">]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-24 mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-primary">mock smarter</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete web-based solution for generating, managing, and
              exporting realistic mock data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 border-border backdrop-blur-xl hover:bg-card/70 transition-all duration-300 transform hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-background border border-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to generate perfect mock data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-background border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform duration-300 text-foreground">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <LandingCTA isAuthenticated={isAuthenticated} />

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-12 py-6">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-xl font-bold font-mono">{`{mockr.io}`}</span>
            </div>
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <p className="text-muted-foreground">
                &copy; {new Date().getFullYear()} JUNCTIONTECH INC. All rights
                reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
