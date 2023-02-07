import { style } from '@vanilla-extract/css';

export const iframeCss = style({
  margin: 0,
  border: 'none',
  flex: 1,
  alignSelf: 'stretch',
});

export const iframeBodyCss = style({
  padding: 16,
  margin: 0,
});

export const canvasPaneCss = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const canvasSectionStyle = style({
  flex: '1 1 0',
  minWidth: 0,
});

export const sourcePaneStyle = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: 8,
  flex: 1,
  overflowY: 'auto',
});

export const adjustPaneStyle = style({
  boxShadow: `0 0 3px 0 black`,
  alignItems: 'stretch',
  color: '#fff',
  overflowY: 'auto',
  width: 300,
  zIndex: 300,
});

export const adjustPaneParamsSection = style({
  flex: '1 1 auto',
});

export const adjustPaneLogSection = style({
  flex: '1 1 auto',
});

export const adjustPaneEventLog = style({
  flex: '1 1 0',
  alignSelf: 'stretch',
  marginBottom: '8px',
});

export const catalogGroup = style({
  paddingLeft: '1rem',
  height: 0,
  overflowY: 'hidden',

  selectors: {
    '&.root': {
      paddingLeft: 0,
      height: 'auto',
      overflowY: 'visible',
    },

    '&.expanded': {
      height: 'auto',
    },
  },
});

export const catalogPaneCss = style({
  boxShadow: '0 0 3px 0 black',
  alignItems: 'stretch !important',
  color: 'var(--dm-color-text-dim)',
  overflowY: 'auto',
  width: 300,
  zIndex: 800,
});

export const discloseAreaCss = style({
  width: '1.5rem',
});

export const catalogEntryStyle = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
});

export const catalogEntryName = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '4px 8px',
  fontStyle: 'italic',
  cursor: 'pointer',
});

export const selectableEntryName = style({
  color: 'var(--dm-color-text)',
  fontStyle: 'normal',

  ':hover': {
    backgroundColor: 'var(--dm-color-item-hover-bg)',
  },

  selectors: {
    '&.selected': {
      fontWeight: 'bold',
      // backgroundColor: 'var(--dm-color-item-focus-bg)',
    },
  },
});

export const paramGroupCss = style({
  marginTop: 6,
  marginBottom: 6,
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
});

export const paramSliderCss = style({
  alignSelf: 'stretch',
  flex: 1,
});

export const paramSliderValue = style({
  width: '2rem',
  display: 'flex',
});

export const rootCss = style({
  fontSize: '16px',
});
