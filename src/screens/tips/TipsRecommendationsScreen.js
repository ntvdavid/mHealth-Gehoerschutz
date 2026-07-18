import React from 'react';

import { ArrowRight } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import TipsInfoLayout from '../../components/layout/TipsInfoLayout';
import RecommendationsContent from '../../components/recommendations/RecommendationsContent';

export default function TipsRecommendationsScreen({ onShowConsequences }) {
  return (
    <TipsInfoLayout
      footer={
        <PrimaryButton
          title="Mehr über die Folgen erfahren"
          onPress={onShowConsequences}
          iconRight={<ArrowRight size={18} color={COLORS.background || '#ffffff'} />}
        />
      }
    >
      <RecommendationsContent />
    </TipsInfoLayout>
  );
}