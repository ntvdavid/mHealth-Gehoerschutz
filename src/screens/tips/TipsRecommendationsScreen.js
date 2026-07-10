import React from 'react';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import TipsInfoLayout from '../../components/layout/TipsInfoLayout';
import RecommendationsContent from '../../components/recommendations/RecommendationsContent';

export default function TipsRecommendationsScreen({ onShowConsequences }) {
  return (
    <TipsInfoLayout
      footer={
        <PrimaryButton
          title="Mehr ueber die Folgen erfahren ->"
          onPress={onShowConsequences}
        />
      }
    >
      <RecommendationsContent />
    </TipsInfoLayout>
  );
}