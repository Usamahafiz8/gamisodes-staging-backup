import { ErrorProps } from "next/error"
import { MetaTags } from "src/components/general/MetaTags"
import * as Sentry from "@sentry/nextjs"

import AppLayout from "../components/AppLayout"
import Error from "../ui/Error"

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <>
      <MetaTags />
      <AppLayout>
        <Error statusCode={statusCode}></Error>
      </AppLayout>
    </>
  )
}

ErrorPage.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  const statusCode = contextData?.res ? contextData?.res.statusCode : contextData?.err ? contextData?.err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
