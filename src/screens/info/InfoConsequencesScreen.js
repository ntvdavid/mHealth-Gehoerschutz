import React from 'react';

import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

import SecondaryButton from '../../components/buttons/SecondaryButton';
import InfoLayout from '../../components/layout/InfoLayout';
import ConsequencesContent from '../../components/recommendations/ConsequencesContent';

export default function InfoConsequencesScreen({ onBackToRecommendations }) {
  return (
    <InfoLayout
      footer={
        <SecondaryButton
          title="Zurück zu den Empfehlungen"
          onPress={onBackToRecommendations}
          iconLeft={<ArrowLeft size={18} color={COLORS.primary} />}
        />
      }
    >
      <ConsequencesContent />
    </InfoLayout>
  );
}
