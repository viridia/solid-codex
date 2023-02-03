// @refresh reload
import styles from 'dolmen/css/styles.css?raw';
import darkTheme from 'dolmen/css/theme/dark.css?raw';
import lightTheme from 'dolmen/css/theme/light.css?raw';
import { Suspense } from 'solid-js';
import { Body, Head, Html, Meta, Scripts, Title, useRouteData } from 'solid-start';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { createServerData$ } from 'solid-start/server';
import { CodexContext, createCodex } from '../api';
import { CodexPage } from '../components/CodexPage';
import { rootCss } from '../components/styles.css';
import { storyIndex } from '../data/stories';
import { createUserSettings, UserSettingsContext } from '../settings';

export function routeData() {
  return createServerData$(() => {
    return storyIndex();
  });
}

export default function StoryPage() {
  const userSettings = createUserSettings();
  const fixtureParams = createCodex();
  const stories = useRouteData<typeof routeData>();

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
                <CodexPage stories={stories()} />
              </Suspense>
            </ErrorBoundary>
            <Scripts />
          </Body>
        </Html>
      </CodexContext.Provider>
    </UserSettingsContext.Provider>
  );
}
