// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv', 
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
