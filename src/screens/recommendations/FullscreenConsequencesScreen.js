import React from 'react';

import SecondaryButton from '../../components/buttons/SecondaryButton';
import FullscreenInfoLayout from '../../components/layout/FullscreenInfoLayout';
import ConsequencesContent from '../../components/recommendations/ConsequencesContent';

export default function FullscreenConsequencesScreen({
  onClose,
  onBackToRecommendations,
}) {
  return (
    <FullscreenInfoLayout
      onClose={onClose}
      footer={
        <SecondaryButton
          title="Zurueck zu den Empfehlungen"
          onPress={onBackToRecommendations}
        />
      }
    >
      <ConsequencesContent />
    </FullscreenInfoLayout>
  );
}