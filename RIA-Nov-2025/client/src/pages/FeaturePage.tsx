import React from 'react';
import { FlippableCard } from '@/components/FlippableCard';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
// We'll reuse the icons from CarouselSection or pass them in from App.tsx
// For simplicity, we'll define a type that matches what FlippableCard expects.

interface CarouselItem {
  title: string;
  description: React.ReactNode; 
  image?: string;
  customContent?: React.ReactNode;
  link?: string;
}

interface FeaturePageProps {
  item: CarouselItem;
}

export default function FeaturePage({ item }: FeaturePageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      {/* Simple Finwise Header (Shared looking) */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="h-14 flex items-center">
            <span className="font-heading font-bold text-xl text-primary">Finwise</span>
        </Container>
      </header>

      <main className="flex-1 w-full">
        {/* HERO SECTION - Reusing the Card */}
        <Section className="bg-gradient-to-b from-[hsl(var(--fw-hero-background))] to-transparent pt-12 pb-16">
          <Container>
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {item.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                Going deeper into how we {item.title.toLowerCase()}.
              </p>
            </div>

            <div className="flex justify-center">
              {/* 
                We reuse the EXACT same card component.
                showBackLink={false} hides the 'Learn Way More' link since we are here.
              */}
              <div className="w-full max-w-[500px] h-[450px]">
                 <FlippableCard item={item} showBackLink={false} />
              </div>
            </div>
          </Container>
        </Section>

        {/* CONTENT SECTION - "Fact + Fun" */}
        <Section className="bg-background py-16">
          <Container className="max-w-3xl">
            <h2 className="font-heading text-3xl font-bold mb-8 text-primary">
              The Details (Fact + Fun)
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Here is where we would put the detailed breakdown of <strong>{item.title}</strong>. 
              </p>
              <p>
                Imagine a mix of standard financial rigor combined with a slightly cheeky, human tone.
                We aren't just giving you a fee schedule; we're explaining <em>why</em> the industry charges what it charges,
                and why we think that's silly.
              </p>
              
              <div className="my-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="text-xl font-bold text-primary mb-2">Our Take:</h3>
                <p className="m-0 italic text-gray-700">
                  "Regulations are there to protect you, and that's what we want as a society, no?
                  But that doesn't mean the paperwork has to be boring."
                </p>
              </div>

              <h3>1. The Data</h3>
              <p>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <h3>2. The "Why"</h3>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Container>
        </Section>
      </main>

      {/* DISCLOSURE FOOTER */}
      <footer className="border-t py-12 bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
             <h4 className="font-heading font-bold text-primary">In the Spirit of the Law</h4>
             <p className="text-sm text-muted-foreground leading-relaxed">
               This is where we put the mandatory disclosures, but we do it with a header that acknowledges exactly what they are. 
               We believe transparency is the ultimate fiduciary act.
             </p>
             <p className="text-xs text-muted-foreground mt-8">
               &copy; {new Date().getFullYear()} Finwise. All rights reserved.
             </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
