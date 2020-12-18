import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/AppStore';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

const ActiveTaskBox = observer(() => {
  const store = useStore();
  const history = useHistory();
  let activeTask = store.activeTask;
  let toRender;
  if (activeTask === null) {
    toRender = (
      <div>
        N/A
      </div>
    );
  } else {
    toRender = (
      <p>
        {activeTask.description}
        <Button className="float-right" onClick={ () => history.push("/stats")}>Stats</Button>
      </p>
    );
  }
  

  return (
    <Container>
      <h5>Active Task</h5>
      {toRender}
    </Container>
  );
});

export {ActiveTaskBox}