import { A, Body, Head, Html, Meta, Title } from 'solid-start';

export default function NotFound() {
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Title>Codex</Title>
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <main>
          <h1 class="font-bold text-xl">Page Not Found</h1>
          <A href="/">Back to safety&hellip;</A>
        </main>
      </Body>
    </Html>
  );
}
