export default ({ config }) => {
  const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";

  // Find the react-native-maps plugin and update its key, or add it if missing
  const plugins = config.plugins || [];
  const mapPluginIndex = plugins.findIndex(p => Array.isArray(p) && p[0] === 'react-native-maps');
  
  if (mapPluginIndex !== -1) {
    plugins[mapPluginIndex][1].androidGoogleMapsApiKey = googleMapsApiKey;
  } else {
    plugins.push(["react-native-maps", { "androidGoogleMapsApiKey": googleMapsApiKey }]);
  }

  return {
    ...config,
    android: {
      ...config.android,
      config: {
        ...(config.android?.config || {}),
        googleMaps: {
          apiKey: googleMapsApiKey
        }
      }
    },
    plugins
  };
};
