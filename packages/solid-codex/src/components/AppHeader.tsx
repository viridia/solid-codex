import { Breadcrumbs, BreadcrumbsItem, Button, ButtonGroup, Page, Spacer } from 'dolmen';
import { For, Show, VoidComponent } from 'solid-js';
import { ICatalogTreeNode } from '../data/catalogTree';
import { DarkMode, LightMode, Tune } from '../icons';
import { useUserSettings } from '../settings';

export const AppHeader: VoidComponent<{ selected: ICatalogTreeNode | undefined }> = props => {
  const [settings, setSettings] = useUserSettings();

  return (
    <Page.Header gap="md">
      <Page.Title>
        <Show when={props.selected} fallback={<i>Nothing selected</i>} keyed>
          {story => (
            <Breadcrumbs>
              <For each={story.category}>
                {category => <BreadcrumbsItem>{category}</BreadcrumbsItem>}
              </For>
              <BreadcrumbsItem>{story.title}</BreadcrumbsItem>
            </Breadcrumbs>
          )}
        </Show>
      </Page.Title>
      <Spacer />
      <ButtonGroup>
        <Button
          onClick={() => {
            setSettings({ displayMode: 'canvas' });
          }}
          selected={settings.displayMode === 'canvas'}
        >
          Canvas
        </Button>
        <Button
          onClick={() => {
            setSettings({ displayMode: 'source' });
          }}
          selected={settings.displayMode === 'source'}
        >
          Source
        </Button>
      </ButtonGroup>
      <Button
        icon
        color="subtle"
        selected={settings.showAdjust}
        aria-label="Toggle Adjustment Panel"
        onClick={() => {
          setSettings(s => ({ showAdjust: !s.showAdjust }));
        }}
      >
        <Tune />
      </Button>
      <Button
        icon
        color="subtle"
        aria-label={settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        onClick={() => {
          setSettings(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' }));
        }}
      >
        <Show when={settings.theme === 'dark'} fallback={<LightMode />}>
          <DarkMode />
        </Show>
      </Button>
    </Page.Header>
  );
};
