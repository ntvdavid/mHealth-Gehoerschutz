import React from 'react';

import SecondaryButton from '../../components/buttons/SecondaryButton';
import TipsInfoLayout from '../../components/layout/TipsInfoLayout';
import ConsequencesContent from '../../components/recommendations/ConsequencesContent';

export default function TipsConsequencesScreen({ onBackToRecommendations }) {
  return (
    <TipsInfoLayout
      footer={
        <SecondaryButton
          title="<- Zurueck zu den Empfehlungen"
          onPress={onBackToRecommendations}
        />
      }
    >
      <ConsequencesContent />
    </TipsInfoLayout>
  );
}