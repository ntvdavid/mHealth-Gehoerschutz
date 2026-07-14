import React from 'react';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import FullscreenInfoLayout from '../../components/layout/FullscreenInfoLayout';
import RecommendationsContent from '../../components/recommendations/RecommendationsContent';

export default function FullscreenRecommendationsScreen({
  onClose,
  onShowConsequences,
}) {
  return (
    <FullscreenInfoLayout
      onClose={onClose}
      footer={
        <PrimaryButton
          title="Mehr ueber die Folgen erfahren"
          onPress={onShowConsequences}
        />
      }
    >
      <RecommendationsContent />
    </FullscreenInfoLayout>
  );
}