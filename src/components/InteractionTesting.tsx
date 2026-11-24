export function InteractionTesting() {
  return <section id="testing" tabIndex={-1} className="section container interaction-testing">
    <p className="eyebrow">QUALITY / THIS PORTFOLIO</p>
    <h2>Testing the interaction, not just the logic.</h2>
    <p className="section-description">This portfolio includes component interaction tests with Vitest, React Testing Library and user-event. The tests run in jsdom and check visible feedback and state changes.</p>
    <dl className="interaction-test-examples">
      <div><dt>Theme controls</dt><dd>Clicking the toggle changes the theme and saves the preference. A new component mount restores it. Space and Enter also activate the control.</dd></div>
      <div><dt>Preference and storage edge cases</dt><dd>The theme follows system changes until the visitor makes a choice. The toggle also works when browser storage is unavailable.</dd></div>
      <div><dt>Image failures</dt><dd>Simulated image errors replace broken previews with a message. Gallery captions remain visible, and switching to another project displays its preview.</dd></div>
    </dl>
    <p className="testing-scope">These checks cover component behavior in a simulated DOM. They do not measure visual layout, browser rendering or full accessibility compliance.</p>
    <p className="implementation-reference"><span>Test files</span><code>Header.test.tsx</code><code>ProjectImages.test.tsx</code><span>Run with <code>npm test</code></span></p>
  </section>
}
