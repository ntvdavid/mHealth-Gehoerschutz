import React from 'react';

import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

import SecondaryButton from '../../components/buttons/SecondaryButton';
import TipsInfoLayout from '../../components/layout/TipsInfoLayout';
import ConsequencesContent from '../../components/recommendations/ConsequencesContent';

export default function TipsConsequencesScreen({ onBackToRecommendations }) {
  return (
    <TipsInfoLayout
      footer={
        <SecondaryButton
          title="Zurück zu den Empfehlungen"
          onPress={onBackToRecommendations}
          iconLeft={<ArrowLeft size={18} color={COLORS.primary} />}
        />
      }
    >
      <ConsequencesContent />
    </TipsInfoLayout>
  );
}