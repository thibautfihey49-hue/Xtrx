const { withSettingsGradle, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = (config) => {
  // 1. ajoute les includeBuild expo manquants dans settings.gradle
  config = withSettingsGradle(config, (cfg) => {
    let contents = cfg.modResults.contents;
    if (!contents.includes('expo-modules-autolinking')) {
      contents = contents.replace(
        /includeBuild\(new File\(\["node".*?@react-native\/gradle-plugin.*?\)\)/,
        `includeBuild(new File(["node", "--print", "require.resolve('expo-modules-autolinking/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getParentFile().join("android"))\n  $&`
      );
    }
    if (!contents.includes('expo-modules-core') && contents.includes('expo-modules-autolinking')) {
      contents = contents.replace(
        /includeBuild\(new File\(\["node".*?expo-modules-autolinking.*?\)\)/,
        `$&\n  includeBuild(new File(["node", "--print", "require.resolve('expo-modules-core/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getParentFile().join("android"))`
      );
    }
    cfg.modResults.contents = contents;
    return cfg;
  });

  // 2. force Gradle 8.6
  config = withDangerousMod(config, ['android', async (cfg) => {
    const wrapperPath = path.join(cfg.modRequest.platformProjectRoot, 'gradle', 'wrapper', 'gradle-wrapper.properties');
    if (fs.existsSync(wrapperPath)) {
      let content = fs.readFileSync(wrapperPath, 'utf8');
      content = content.replace(/gradle-8\.8-all\.zip/, 'gradle-8.6-all.zip');
      fs.writeFileSync(wrapperPath, content);
      console.log('Patched gradle-wrapper.properties to 8.6');
    }
    return cfg;
  }]);

  return config;
};
