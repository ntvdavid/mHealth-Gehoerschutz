module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Das JSX-Import-Source-Anhängsel fällt hier weg
    plugins: [
      "nativewind/babel",
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      'react-native-reanimated/plugin'
    ],
  };
};