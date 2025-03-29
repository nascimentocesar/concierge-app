import React from "react";
import PromptBox from "../components/promptBox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import TripDetails from "../components/tripDetails";

const HomePage: React.FC = () => {
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] =
    React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [trip, setTrip] = React.useState();
  const [currentStep, setCurrentStep] = React.useState("prompt");

  const onTripCreatedCallback = (data: any) => {
    setPrompt(data.prompt);
    setTrip(data);
    setIsGeneratingSuggestions(true);
    setCurrentStep("recommendations");
  };

  return (
    <>
      <Tabs
        value={currentStep}
        onValueChange={(value) => setCurrentStep(value)}
        defaultValue={currentStep}
        className="w-full md:w-3/4 lg:w-1/2"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger disabled={!trip} value="recommendations">
            Recommendations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="prompt">
          <PromptBox
            defaultPrompt={prompt}
            isDisabled={isGeneratingSuggestions}
            onSuccessCallback={(data) => onTripCreatedCallback(data)}
          />
        </TabsContent>
        <TabsContent value="recommendations">
          {trip && (
            <TripDetails
              onSuccessCallback={() => setIsGeneratingSuggestions(false)}
              tripId={(trip as any)._id}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default HomePage;
