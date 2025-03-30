import React from "react";
import "./App.css";
import PromptTextarea from "./components/app/promptTextarea";
import TripRecommendations from "./components/app/tripRecommendations";
import TripHistory from "./components/app/tripHistory";

const App: React.FC = () => {
  const [trip, setTrip] = React.useState<any>();

  return (
    <div className="grid gap-10 w-screen max-w-4xl p-10 pb-100">
      <div>
        <TripHistory onSelectCallback={(trip) => setTrip(trip)} />
      </div>
      <>
        <PromptTextarea
          key={`${trip?.id}-${trip?.isComplete}`}
          trip={trip}
          onSuccessCallback={(trip) => setTrip(trip)}
        />
        <>
          {trip && (
            <TripRecommendations
              key={`${trip?.id}-${trip?.isComplete}`}
              onSuccessCallback={(trip) => setTrip(trip)}
              trip={trip}
            />
          )}
        </>
      </>
    </div>
  );
};

export default App;
