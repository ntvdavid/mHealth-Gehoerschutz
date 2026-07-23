import React from 'react';

import { ArrowRight } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

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
          title="Mehr über die Folgen erfahren"
          onPress={onShowConsequences}
          iconRight={<ArrowRight size={18} color={COLORS.background || '#ffffff'} />}
        />
      }
    >
      <RecommendationsContent />
    </FullscreenInfoLayout>
  );
}