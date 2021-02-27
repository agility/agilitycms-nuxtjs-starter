// Our Agility Modules
import RichTextArea from './modules/RichTextArea'
import PostsListing from './modules/PostListing'
import PostDetails from './modules/PostDetails'
import HeroBackgroundAsImage from './modules/HeroBackgroundAsImage'

// Our Agility PageTemplates
import MainTemplate from './templates/MainTemplate'

export default {
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