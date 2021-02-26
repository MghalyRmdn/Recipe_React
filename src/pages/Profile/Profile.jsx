import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import DetailProfile from '../../components/Profile/Profile'
import Footer from '../../components/Footer/Footer'

class Profile extends Component {
	render () {
		return (
			<>
				<Navbar />
				<DetailProfile />
				<Footer />
			</>
		)
	}
}

export default Profile