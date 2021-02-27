import React from 'react'

const ClubsContext = React.createContext ({
    clubs: [],
    addClub: () => {}
})

export default ClubsContext