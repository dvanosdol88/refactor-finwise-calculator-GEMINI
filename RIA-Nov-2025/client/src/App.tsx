import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Calculator from "@/pages/Calculator";
import FeaturePage from "@/pages/FeaturePage";
import NotFound from "@/pages/not-found";

// Import assets for the Feature Pages
import brainAiImage from '@assets/brain-plus-AI (3)_1764083318460.png';
import financialAnalysisImage from '@assets/financial-analysis-icon_1764086429828.png';
import piggyBankImage from '@assets/save_money_piggy_bank_correct_color_1764085668526.png';

const upgradeItem = {
  title: 'Upgrade Your Advice',
  image: brainAiImage,
  description: (
    <>
      The Process of a <span className="font-bold text-gray-900">CFP® Professional</span>. The Rigor of a <span className="font-bold text-gray-900">CFA Charterholder</span>.
      <br />
      The Power of Artificial Intelligence. The Experience of your personal advisor.
    </>
  ),
  customContent: undefined, 
  link: '/upgrade'
};

const improveItem = {
  title: 'Improve Your Tools',
  image: financialAnalysisImage,
  description: (
    <>
      See exactly where your returns are going.
      <br />
      <br />
      <span className="font-bold text-gray-900">Better Tools = Better Information = Better Decisions.</span>
    </>
  ),
  link: '/improve'
};

const saveItem = {
  title: 'Save a TON of Money',
  image: piggyBankImage,
  description: (
    <>
      Keep more of your investment growth with our $100/month flat fee.
    </>
  ),
  link: '/save'
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Calculator} />
      <Route path="/upgrade">
        {() => <FeaturePage item={upgradeItem} />}
      </Route>
      <Route path="/improve">
        {() => <FeaturePage item={improveItem} />}
      </Route>
      <Route path="/save">
        {() => <FeaturePage item={saveItem} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
