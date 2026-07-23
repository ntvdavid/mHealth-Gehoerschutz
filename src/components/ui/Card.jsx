import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Card({ style, children, ...props }) {
  return (
    <View style={[card.card, style]} {...props}>
      {children}
    </View>
  );
}

function CardHeader({ style, children, ...props }) {
  return (
    <View style={[card.cardHeader, style]} {...props}>
      {children}
    </View>
  );
}

function CardTitle({ style, children, ...props }) {
  return (
    <Text style={[card.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
}

function CardDescription({ style, children, ...props }) {
  return (
    <Text style={[card.text, style]} {...props}>
      {children}
    </Text>
  );
}

function CardContent({ style, children, ...props }) {
  return (
    <View style={[card.cardContent, style]} {...props}>
      {children}
    </View>
  );
}

function CardFooter({ style, children, ...props }) {
  return (
    <View style={[card.cardFooter, style]} {...props}>
      {children}
    </View>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};


const card = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    lineHeight: 28,
  },

  text: {
    fontSize: 14,
    color: '#64748b',
  },

  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  cardFooter: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

});