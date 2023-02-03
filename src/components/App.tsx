// @refresh reload
import { Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from 'solid-start';
import styles from 'dolmen/css/styles.css?raw';
import lightTheme from 'dolmen/css/theme/light.css?raw';
import darkTheme from 'dolmen/css/theme/dark.css?raw';
import { rootCss } from './styles.css';
import { CodexContext, createCodex } from '../api';
import { createUserSettings, UserSettingsContext } from '../settings';

export function App() {
  const userSettings = createUserSettings();
  const fixtureParams = createCodex();

  return (
    <UserSettingsContext.Provider value={userSettings}>
      <CodexContext.Provider value={fixtureParams}>
        <Html lang="en" class={rootCss}>
          <Head>
            <Meta charset="utf-8" />
            <Title>Codex</Title>
            <Meta name="viewport" content="width=device-width, initial-scale=1" />
            <style innerHTML={styles} />
            <style innerHTML={lightTheme} />
            <style innerHTML={darkTheme} />
          </Head>
          <Body
            classList={{
              [userSettings[0].theme === 'dark' ? 'dm-theme-dark' : 'dm-theme-light']: true,
            }}
          >
            <ErrorBoundary>
              <Suspense>
                <Routes>
                  <FileRoutes />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            <Scripts />
          </Body>
        </Html>
      </CodexContext.Provider>
    </UserSettingsContext.Provider>
  );
}
