import { useNavigate } from "react-router-dom";
import { 
  DirectoryItemContainer ,
  BackgroundImage,
  DirectoryItemBodyContainer,
  BodyTitle,
  BodySubtitle
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate()  ;
  const { title, imageUrl, route } = category;

  const navigateHandler = () => navigate(route);

  return (
      <DirectoryItemContainer onClick={navigateHandler} >
        <BackgroundImage  $imageUrl={imageUrl} />
        <DirectoryItemBodyContainer >
          <BodyTitle>{title}</BodyTitle>
          <BodySubtitle >Shop Now</BodySubtitle>
        </DirectoryItemBodyContainer>
      </DirectoryItemContainer>
  )
}

export default DirectoryItem