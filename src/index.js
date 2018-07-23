console.log('Hello cowboy');

/*
  CONNECT (name)
    -> check for slot => [Full error]
      -> Allocate => [Player Connected]

    <- [Ready for moves]

  MAKE MOVE
    -> validate => [Error]
      -> store
    <- Player Selected

  READY TO PLAY
    <- Result
*/
