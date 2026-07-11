import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function TipsTabBar({ activeTab, onChangeTab }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'knowledge' && styles.activeTab]}
        onPress={() => onChangeTab('knowledge')}
      >
        <Text style={[styles.tabText, activeTab === 'knowledge' && styles.activeTabText]}>
          Wissen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'risks' && styles.activeTab]}
        onPress={() => onChangeTab('risks')}
      >
        <Text style={[styles.tabText, activeTab === 'risks' && styles.activeTabText]}>
          Risiken
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'recommendations' && styles.activeTab]}
        onPress={() => onChangeTab('recommendations')}
      >
        <Text style={[styles.tabText, activeTab === 'recommendations' && styles.activeTabText]}>
          Empfehlungen
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef4f5',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 4,
    marginHorizontal: 18,
    marginTop: 16,
    marginBottom: 28,
  },
  tab: {
    flex: 1,
    minHeight: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.text,
  },
  tabText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
});