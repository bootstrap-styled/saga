This toggle demonstrate how you can use use merged values from the unsync `themes` and sync `themes`.
 
```js
const { Button, Form } = require('@bootstrap-styled/v4/lib');
<React.Fragment>
  <Form className="pb-2">
    <AllThemeToggle />
  </Form>
  <div>
    <Button color="primary">primary</Button>
    <Button color="secondary">secondary</Button>
    <Button color="success">success</Button>
    <Button color="info">info</Button>
    <Button color="warning">warning</Button>
    <Button color="danger">danger</Button>
    <Button color="link">link</Button>
  </div>
</React.Fragment>
```
