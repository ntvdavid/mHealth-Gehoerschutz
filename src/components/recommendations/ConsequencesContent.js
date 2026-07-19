import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import TipsSectionHeader from '../tips/TipsSectionHeader';

export default function ConsequencesContent() {
  return (
    <>
      <TipsSectionHeader title="Warum Lärm gefährlich sein kann">
        Lärm kann die empfindlichen Sinneszellen im Innenohr überlasten.
        Wiederholte Belastung kann zu dauerhaftem Hörverlust oder Tinnitus
        führen – oft schleichend und zunächst unbemerkt.
      </TipsSectionHeader>

      <InfoBox
        title="Kurzfristige Folgen"
        text="Nach starker Lärmbelastung können Ohrdruck, Piepen oder ein dumpfes Hörgefühl auftreten. Diese Anzeichen zeigen, dass dein Gehör gerade stark belastet wurde."
      />

      <InfoBox
        title="Langfristige Folgen"
        text="Wiederholter oder sehr lauter Lärm kann das Risiko für dauerhafte Hörschäden erhöhen. Betroffene merken Veränderungen oft erst, wenn Gespräche oder hohe Töne schwerer wahrnehmbar werden."
      />

      <DevelopmentChain />

      <InfoBox
        title="Auswirkungen im Alltag"
        text="Hörschäden fallen besonders bei Gesprächen, Hintergrundgeräuschen oder hohen Tönen auf. Das Zuhören kann dadurch anstrengender werden."
      />

      <WarningSignsCard />

      <InfoBox
        title="Wann medizinischen Rat einholen?"
        text="Bei anhaltendem Tinnitus oder länger bestehenden Hörproblemen sollte das Gehör fachlich untersucht werden. Ein plötzlich auftretender Hörverlust sollte umgehend ärztlich abgeklärt werden."
        variant="notice"
      />
    </>
  );
}

function InfoBox({ title, text, variant = 'default' }) {
  return (
    <View style={[styles.infoBox, variant === 'notice' && styles.noticeBox]}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function DevelopmentChain() {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Wie sich Belastung entwickeln kann</Text>

      <View style={styles.chainList}>
        <ChainStep
          title="Akute Lärmbelastung"
          text="Laute Geräusche beanspruchen die Sinneszellen im Innenohr."
        />
        <ChainStep
          title="Vorübergehende Überlastung"
          text="Piepen, Druck oder dumpfes Hören können auftreten."
        />
        <ChainStep
          title="Wiederholte Überlastung"
          text="Ohne ausreichend Ruhe kann sich die Belastung summieren."
        />
        <ChainStep
          title="Möglicher dauerhafter Schaden"
          text="Hörverlust oder Tinnitus können bestehen bleiben."
          isLast
        />
      </View>
    </View>
  );
}

function ChainStep({ title, text, isLast = false }) {
  return (
    <View style={styles.chainStep}>
      <View style={styles.chainMarkerColumn}>
        <View style={styles.chainDot} />
        {!isLast && <View style={styles.chainLine} />}
      </View>

      <View style={[styles.chainTextContainer, isLast && styles.chainTextContainerLast]}>
        <Text style={styles.chainTitle}>{title}</Text>
        <Text style={styles.chainText}>{text}</Text>
      </View>
    </View>
  );
}

function WarningSignsCard() {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Achte auf diese Warnzeichen</Text>

      <View style={styles.warningList}>
        <WarningSign text="Pfeifen oder Rauschen im Ohr" />
        <WarningSign text="Dumpfes oder verstopftes Hörgefühl" />
        <WarningSign text="Gespräche sind in lauter Umgebung schwer verständlich" />
        <WarningSign text="Lautstärke muss später höher eingestellt werden" />
      </View>
    </View>
  );
}

function WarningSign({ text }) {
  return (
    <View style={styles.warningItem}>
      <Text style={styles.warningBullet}>•</Text>
      <Text style={styles.warningText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeBox: {
    backgroundColor: '#e0f2f1',
    borderColor: '#b2dfdb',
  },
  infoTitle: {
    color: COLORS.text || '#1e293b',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20,
  },
  chainList: {
    marginTop: 6,
  },
  chainStep: {
    flexDirection: 'row',
  },
  chainMarkerColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  chainDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
  chainLine: {
    width: 2,
    flex: 1,
    minHeight: 26,
    backgroundColor: '#cbd5e1',
    marginTop: 4,
    marginBottom: 4,
  },
  chainTextContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  chainTextContainerLast: {
    paddingBottom: 0,
  },
  chainTitle: {
    color: COLORS.text || '#1e293b',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  chainText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20,
  },
  warningList: {
    gap: 8,
    marginTop: 6,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  warningBullet: {
    color: COLORS.primary,
    fontSize: 18,
    lineHeight: 21,
    marginRight: 8,
  },
  warningText: {
    color: '#64748b',
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
});