import {Helmet} from "react-helmet-async"

const Title = ({title = "Chat App", description="Chat App is a platform for chatting with your friends and family"}) => {
  return (
   <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
   </Helmet>
  )
}

export default Title;
