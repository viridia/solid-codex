// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  Head,
  Html,
  Meta,
  Route,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import { CodexContext, createCodex } from './api';
import { createUserSettings, UserSettingsContext } from './settings';
import styles from 'dolmen/css/styles.css?raw';
import lightTheme from 'dolmen/css/theme/light.css?raw';
import darkTheme from 'dolmen/css/theme/dark.css?raw';
import { rootCss } from './components/styles.css';
import { useFixtures } from './data/fixtures';
import { CodexPage } from './components/CodexPage';
// import './root.css';

export default function Root() {
  const userSettings = createUserSettings();
  const fixtureParams = createCodex();
  const fixtures = useFixtures({});
  // const fixtures = useFixtures(props.fixtures);

  return (
    <UserSettingsContext.Provider value={userSettings}>
      <CodexContext.Provider value={fixtureParams}>
        <Html lang="en" class={rootCss}>
          <Head>
            <Title>Codex</Title>
            <Meta charset="utf-8" />
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
            <Suspense>
              <ErrorBoundary>
                <Routes>
                  <Route path="/:fixture?/*" component={() => <CodexPage fixtures={fixtures} />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
            <Scripts />
          </Body>
        </Html>
      </CodexContext.Provider>
    </UserSettingsContext.Provider>
  );
}
