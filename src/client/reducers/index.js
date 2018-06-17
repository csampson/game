function game (state = {}, action) {
  switch (action.type) {
    default:
      return Object.assign({}, state, {
        foo: 22
      })
  }
}

export default game
