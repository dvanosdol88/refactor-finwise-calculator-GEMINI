import { useState, useEffect } from 'react';
import { surveyOptions, type SurveyResults } from '@shared/schema';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';
import { Check, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

export default function SurveySection() {
  const [isOpen, setIsOpen] = useState(true);
  const [surveyResults, setSurveyResults] = useState<SurveyResults>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // Load local selection preference
    try {
      const storedSelection = localStorage.getItem('savingsSelectedOption');
      if (storedSelection) {
        setSelectedOption(storedSelection);
      }
    } catch (e) {
      console.warn("LocalStorage access failed", e);
    }

    // Subscribe to real-time updates from Firestore
    const unsubscribe = onSnapshot(doc(db, "surveys", "savings_calculator"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.results) {
          setSurveyResults(data.results as SurveyResults);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (optionId: string) => {
    // Update local selection
    setSelectedOption(optionId);
    try {
      localStorage.setItem('savingsSelectedOption', optionId);
    } catch (e) {
      // ignore
    }

    // Update global count in Firestore
    const surveyRef = doc(db, "surveys", "savings_calculator");
    try {
      await setDoc(surveyRef, {
        results: { [optionId]: increment(1) }
      }, { merge: true });
    } catch (e) {
      console.error("Error updating vote:", e);
    }
  };

  const totalVotes = Object.values(surveyResults).reduce((sum, votes) => sum + votes, 0);

  return (
    <div className="w-full relative group">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
        <div className="flex items-center justify-end absolute -top-8 right-0 z-10">
             <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Toggle Survey</span>
                </Button>
            </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-3">
          <div className="flex flex-col gap-3">
            {surveyOptions.map((option) => {
              const votes = surveyResults[option.id] || 0;
              const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(0) : 0;
              const isSelected = selectedOption === option.id;

              return (
                <label
                  key={option.id}
                  className={cn(
                    "relative flex items-center p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer select-none",
                    "hover:bg-accent/50",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-transparent bg-white/50 hover:border-primary/20"
                  )}
                  onClick={() => handleVote(option.id)}
                >
                  <input
                    type="radio"
                    name="survey-option"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => handleVote(option.id)}
                    className="sr-only"
                  />
                  
                  {/* Radio Indicator */}
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 bg-transparent"
                  )}>
                    {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </div>

                  {/* Label Text */}
                  <div className="flex-1">
                    <span className="text-base sm:text-lg text-foreground">
                        {option.fullBold ? (
                            <span className="font-bold">{option.label}</span>
                        ) : option.boldPart ? (
                            <>
                            {option.label.slice(0, -1)}
                            <span className="font-bold">{option.boldPart}</span>
                            </>
                        ) : (
                            option.label
                        )}
                    </span>
                  </div>

                  {/* Percentage */}
                  <div className="text-sm font-medium text-muted-foreground/80 pl-2">
                    {percentage}%
                  </div>
                  
                  {/* Progress Bar Background (Optional Flair) */}
                  {/* Could add a subtle background bar behind usage if desired, but sticking to clean cards for now */}
                </label>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
