import React from 'react'
import { Container } from 'react-bootstrap'

import footer from './Footer.module.css'

const Footer = () => {
	return (
		<div className={ footer.Wrapper + ' text-center' }>
			<Container>
				<div className={ "mx-auto" }>
					<p className={ footer.Title }>Eat, Cook, Repeat</p>
					<p className={ footer.Subtitle }>Share your best recipe by uploading here !</p>
				</div>
				<div className={ "mx-auto " + footer.NavList }>
					<a className={ footer.NavItem } href="/sef">Product</a>
					<a className={ footer.NavItem } href="/sef">Company</a>
					<a className={ footer.NavItem } href="/sef">Learn More</a>
					<a className={ footer.NavItem } href="/sef">Get In Touch</a>
					<div className={ footer.Copyright}>
						<span>@Arkademy</span>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Footer