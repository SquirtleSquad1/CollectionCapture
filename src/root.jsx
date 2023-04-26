// @refresh reload
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
import Navbar from "./components/Navbar";
import { CollectionProvider } from "./context/CollectionContext";
import "./root.css";
export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>MTG - card captor</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          <Navbar />
          <Suspense fallback={<div>Loading</div>}>
            <CollectionProvider>
              <Routes>
                {/* FileRoutes is a component that renders a Route for each file in the routes directory. */}
                <FileRoutes />
              </Routes>
            </CollectionProvider>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
