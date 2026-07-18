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
    backgroundColor:  '#f3f4f6',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 4,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    color: COLORS.text || '#1e293b',
    fontSize: 12,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.background || '#ffffff',
    fontWeight: 'bold',
  },
});
