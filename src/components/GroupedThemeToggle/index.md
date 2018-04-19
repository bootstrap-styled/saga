This toggle demonstrate how you can use use merged values from the unsync `themes` and sync `themes`.
 
```js
const { default: Button } = require('bootstrap-styled/lib/Button');
const { default: ConnectedBootstrapProvider } = require('bootstrap-styled-redux/lib/components/ConnectedBootstrapProvider');
<ConnectedBootstrapProvider injectGlobal={false}>
  <GroupedThemeToggle />
  <div>
    <Button color="primary">primary</Button>
    <Button color="secondary">secondary</Button>
    <Button color="success">success</Button>
    <Button color="info">info</Button>
    <Button color="warning">warning</Button>
    <Button color="danger">danger</Button>
    <Button color="link">link</Button>
  </div>
</ConnectedBootstrapProvider>
```
