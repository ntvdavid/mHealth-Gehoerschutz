import React from 'react';

import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

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
          title="Zurück zu den Empfehlungen"
          onPress={onBackToRecommendations}
          iconLeft={<ArrowLeft size={18} color={COLORS.primary} />}
        />
      }
    >
      <ConsequencesContent />
    </FullscreenInfoLayout>
  );
}