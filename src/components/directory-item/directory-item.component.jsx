import { 
  DirectoryItemContainer ,
  BackgroundImage,
  DirectoryItemBodyContainer,
  BodyTitle,
  BodySubtitle
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <DirectoryItemContainer >
          <BackgroundImage style={{backgroundImage: `url(${imageUrl})`}} />
          <DirectoryItemBodyContainer >
            <BodyTitle>{title}</BodyTitle>
            <BodySubtitle>Shop Now</BodySubtitle>
          </DirectoryItemBodyContainer>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem