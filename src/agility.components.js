// Our Agility Modules
import RichTextArea from './modules/RichTextArea'
import PostsListing from './modules/PostsListing'
import PostsListingData from './data/PostsListing'
import PostDetails from './modules/PostDetails'
import HeroBackgroundAsImage from './modules/HeroBackgroundAsImage'

// Our Agility PageTemplates
import MainTemplate from './templates/MainTemplate'

export default {
	dataFetch: {
		"PostsListing": PostsListingData
	},
    moduleComponents: {
        RichTextArea,
        PostsListing,
		HeroBackgroundAsImage,
		PostDetails
    },
    pageTemplateComponents: {
        "Main Template": MainTemplate
    }
}