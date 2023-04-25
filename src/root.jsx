// @refresh reload
import { SessionProvider } from "@solid-auth/base";
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
export default function Root() {
  return (
    
    <Html lang="en">
      <Head>
        <Title>SolidStart</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <SessionProvider>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading</div>}>
              <Routes>
                <FileRoutes />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </SessionProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
