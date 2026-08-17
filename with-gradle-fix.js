const { withGradleWrapper, withSettingsGradle } = require('@expo/config-plugins');
module.exports = (config) => {
  config = withGradleWrapper(config, (cfg) => {
    if (cfg.modResults && cfg.modResults.properties) {
      // rien, on va patch via dangerous mod
    }
    return cfg;
  });
  config = withSettingsGradle(config, (cfg) => {
    let contents = cfg.modResults.contents;
    // force gradle 8.6 dans wrapper via settings? non, on patch le fichier wrapper plus tard via dangerous
    // ajoute les includeBuild expo si manquants
    if (!contents.includes('expo-modules-autolinking')) {
      contents = contents.replace(
        /includeBuild\(new File\(\["node".*?@react-native\/gradle-plugin.*?\)\)/,
        `includeBuild(new File(["node", "--print", "require.resolve('expo-modules-autolinking/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getParentFile().join("android"))\n  $&`
      );
    }
    if (!contents.includes('expo-modules-core')) {
      contents = contents.replace(
        /includeBuild\(new File\(\["node".*?expo-modules-autolinking.*?\)\)/,
        `$&\n  includeBuild(new File(["node", "--print", "require.resolve('expo-modules-core/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getParentFile().join("android"))`
      );
    }
    cfg.modResults.contents = contents;
    return cfg;
  });
  const { withDangerousMod } = require('@expo/config-plugins');
  const fs = require('fs');
  const path = require('path');
  config = withDangerousMod(config, ['android', async (cfg) => {
    const wrapperPath = path.join(cfg.modRequest.platformProjectRoot, 'gradle', 'wrapper', 'gradle-wrapper.properties');
    if (fs.existsSync(wrapperPath)) {
      let content = fs.readFileSync(wrapperPath, 'utf8');
      content = content.replace(/gradle-8\.8-all\.zip/, 'gradle-8.6-all.zip');
      fs.writeFileSync(wrapperPath, content);
    }
    return cfg;
  }]);
  return config;
};
