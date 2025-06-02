const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})

const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "niftory-assets-prod.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "niftory-assets-staging.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dkuxa1i6sgo8h.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/server/:path*",
          destination: "https://staging.gamisodes.com/server/:path*",
        },
      ]
    }
    return []
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/collection/genesis",
        permanent: true,
      },
      {
        source: "/collection/vip",
        destination: "/collection/genesis",
        permanent: true,
      },
      {
        source: "/sign-in",
        destination: "/account",
        permanent: true,
      },
      {
        source: "/collection",
        destination: "/collection/genesis",
        permanent: true,
      },
      {
        source: "/app/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  sentry: {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: "gamisodes",
  project: "javascript-nextjs",

  // An auth token is required for uploading source maps.
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,

  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

if (
  process.env.NEXT_PUBLIC_SERVER_TAG === "preprod" ||
  process.env.NEXT_PUBLIC_SERVER_TAG === "production"
) {
  module.exports = withSentryConfig(withPWA(nextConfig), sentryWebpackPluginOptions)
} else {
  module.exports = withPWA(nextConfig)
}
