// Our Agility Modules
import RichTextArea from './modules/RichTextArea'
import PostsListing from './modules/PostListing'
import PostDetails from './modules/PostDetails'
import HeroBackgroundAsImage from './modules/HeroBackgroundAsImage'
import ImageLink from './modules/ImageLink'
import ImageSlider from './modules/ImageSlider'
import FeaturedPosts from './modules/FeaturedPosts'

// Our Agility PageTemplates
import MainTemplate from './templates/MainTemplate'

export default {
    moduleComponents: {
        RichTextArea,
        PostsListing,
		HeroBackgroundAsImage,
		PostDetails,
		ImageLink,
		ImageSlider,
		FeaturedPosts

    },
    pageTemplateComponents: {
        "Main Template": MainTemplate
    }
}