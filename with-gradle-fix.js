const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');
module.exports = (config) => {
  return withDangerousMod(config, ['android', async (cfg) => {
    const root = cfg.modRequest.platformProjectRoot;
    // settings.gradle
    const settingsPath = path.join(root, 'settings.gradle');
    if (fs.existsSync(settingsPath)) {
      let s = fs.readFileSync(settingsPath, 'utf8');
      if (!s.includes('expo-modules-autolinking')) {
        s = s.replace('pluginManagement {', `pluginManagement {\n  includeBuild(new File(["node", "--print", "require.resolve('expo-modules-autolinking/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getParentFile().join("android"))`);
      }
      if (!s.includes('expo-modules-core')) {
        s = s.replace(/includeBuild\(.*expo-modules-autolinking.*\)/, `$&\n  includeBuild(new File(["node", "--print", "require.resolve('expo-modules-core/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getParentFile().join("android"))`);
      }
      fs.writeFileSync(settingsPath, s);
    }
    // gradle wrapper 8.6
    const wrapperPath = path.join(root, 'gradle', 'wrapper', 'gradle-wrapper.properties');
    if (fs.existsSync(wrapperPath)) {
      let w = fs.readFileSync(wrapperPath, 'utf8');
      w = w.replace(/gradle-8\.\d+.*-all\.zip/, 'gradle-8.6-all.zip');
      fs.writeFileSync(wrapperPath, w);
    }
    return cfg;
  }]);
};
