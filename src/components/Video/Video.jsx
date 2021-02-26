import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment';
// import * as moment from 'Moment'
// import moment from 'moment'

import { getSingleRecipe } from '../../redux/actionCreators/Recipes'
// import ExampleVideo from '../../assets/example.mp4'
// import NextVideo from '../../assets/step-video.jpg'
import video from './Video.module.css'

class Video extends Component {
	state = {
		recipe: {},
		videoRecipe: [],
		indexVideo: 0,
		idRecipe: 0,
		currentVideo: '',
		fileDate: '',
		title: '',
		link: '',
		time: ''
	}

	getRecipeById = async () => {
		const { id, video } = this.props.match.params

		this.setState({
			idRecipe: id,
			indexVideo: video - 1
		})
		this.setState({
		})
		await this.props.dispatch(getSingleRecipe(id))
		
		const { recipes } = this.props
		
		if ( recipes.singleRecipe.msg ) {
			this.props.history.push('/recipe')
		} else {
			const recipe = recipes.singleRecipe.data[0]
			const videos = JSON.parse(recipe.video_rcp)

			if ( video > videos.length ) {
				return this.props.history.push(`/recipe/${id}`)
			}

			const currentVideo = videos[video - 1]
			const splitVideo =  currentVideo.split('/')[4]
			const splitNameVideo = splitVideo.split('-')
			const fileName = splitNameVideo[2].split('.')[0]
			const fileDate = new Date(Number(splitNameVideo[1]))

			this.setState({
				recipe: recipes.singleRecipe.data[0],
				videoRecipe: videos,
				currentVideo,
				title: fileName,
				fileDate: fileDate.toString()
			})
		}
	}

	updateNextCard = (link, index) => {
		const { isPending } = this.props.recipes
		const splitVideo =  link.split('/')[4]
		const splitNameVideo = splitVideo.split('-')
		const fileName = splitNameVideo[2].split('.')[0]
		console.log((fileName))
		const fileDate = new Date(Number(splitNameVideo[1]))
		console.log(<Moment fromNow>{fileDate.toString()}</Moment>)
		console.log(fileDate.toString())

		return (
			<Link to={{ pathname: `/recipe/${this.state.idRecipe}/${index}` }} key={index}>
				<div className={ video.NextVideoCard }>
					<video className={ video.VideoImageCard } src={ isPending ? '' : link }>
					</video> <br/>
					<span className={ video.VideoNextText }>[Step {index}]</span>
					<span className={ video.VideoCardTitle }>{ isPending ? 'Loading' : fileName }</span>
					<br/>
					<span className={ video.VideoCardDate }>HanaLohana - {isPending ? 'loading..' : <Moment fromNow>{fileDate.toString()}</Moment>}</span>
				</div>
			</Link>
		)
	}

	componentDidMount = () => {
		this.getRecipeById()
	}

	componentDidUpdate = (_, prevState) => {
		const { id, video } = this.props.match.params
		if ( id !== prevState.idRecipe || video - 1 !== prevState.indexVideo ) {
			this.getRecipeById()
		}
		// console.log(prevState)
		// console.log(this.props)
		// console.log(this.state)
	}

	render () {
		const { isPending } = this.props.recipes
		// console.log(this.state)
		// console.log(this.props)
		return (
			<> 
				<div className={ video.LeftBar }></div>
				<Container>
					<Row className={ "mt-4" }>
						<Col xs={12} sm={12} md={12} lg={8} xl={8} className={ "mb-3"}>
							<video className={ video.VideoSize } src={ isPending ? '' : this.state.currentVideo } controls></video> <br/>
							<span className={ video.VideoTitle }>{ isPending ? 'Loading' : this.state.title }</span>
							<br/>
							<span className={ video.VideoDate }>{isPending ? 'loading..' : <Moment fromNow>{this.state.fileDate}</Moment>}</span>
						</Col>
						<Col xs={12} sm={12} md={12} lg={4} xl={4}>
							<h4>Next</h4>

							{ !isPending &&  this.state.videoRecipe.map((link, index) => {
								if (index > this.state.indexVideo) {
									index++
									return this.updateNextCard(link,index)
								} else {
									return ''
								}
							})}

							{ !isPending && this.state.videoRecipe.length === this.state.indexVideo + 1 ? 'Video Habis' : '' }
						</Col>
					</Row>
				</Container>
			</>
		)
	}
}

const mapsStateToProps = ({ recipes }) => {
	return {
		recipes
	}
}

export default connect(mapsStateToProps)(withRouter(Video))