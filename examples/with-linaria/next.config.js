module.exports = {
  future: {
    webpack5: true
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    });

    // Remove all CSS handholding error rules.
    config.module.rules[2].oneOf = config.module.rules[2].oneOf.filter(rule => rule?.use?.loader !== 'error-loader');

    // CSS loader + style injection
    config.module.rules[2].oneOf.push({
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
}
